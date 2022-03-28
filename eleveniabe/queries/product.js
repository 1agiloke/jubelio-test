module.exports = (db) => ({
    getAllCount: () => {
        return db.one('select count(*) from products')
            .then(function (data) {
                return parseInt(data.count);
            })
            .catch(function (err) {
                return;
            })
    },
    getAllProducts: (page = 1, limit = 10) => {
        return db.any('select * from products order by id desc limit $1 offset $2', [limit, limit * (page - 1)])
            .then(function (data) {
                return data;
            })
            .catch(function (err) {
                return;
            })
    },
    getSingleProduct: (id) => {
        return db.one('select * from products where id = $1', id)
            .then(function (data) {
                return data;
            })
            .catch(function (err) {
                return;
            })
    },
    getSingleProductBySku: (sku) => {
        return db.one('select * from products where sku = $1', sku)
            .then(function (data) {
                return data;
            })
            .catch(function (err) {
                return;
            })
    },
    createProduct: (data) => {
        return db.none('insert into products(name, sku, price, image, description) values(${name}, ${sku}, ${price}, ${image}, ${description})', data)
            .then(function (data) {
                console.log({data});
                return true;
            })
            .catch(function (err) {
                return err;
            });
    },
    updateProduct: (data) => {
        console.log({data});
        return db.none('update products set name=${name}, sku=${sku}, price=${price}, image=${image}, description=${description} where id=${id}', data)
            .then(function (data) {
                console.log({data});
                return true;
            })
            .catch(function (err) {
                console.log({err});
                return false;
            });
    },
    deleteProduct: (id) => {
        return db.result('delete from products where id = $1', [id])
            .then(function (result) {
                return true;
            })
            .catch(function (err) {
                console.log({err});
                return false;
            });
    },
    refreshAndMigrate: (products = []) => {
        return db.tx(t => {
            const queries = [
                t.none('DROP TABLE IF EXISTS products'),
                t.none('CREATE TABLE products(id SERIAL NOT NULL, name TEXT NOT NULL, sku VARCHAR(100) NOT NULL UNIQUE, price INT NOT NULL, image TEXT NOT NULL, description TEXT NULL)'),
                t.none('CREATE INDEX idx_products_sku ON products(sku)'),
                t.none('CREATE INDEX idx_products_price ON products(price)'),
            ];
            if (products && products.length) {
                for (let i = 0; i < products.length; i++) {
                    let product = products[i];
                    queries.push(t.none('INSERT INTO products (name, sku, price, image, description) values(${name}, ${sku}, ${price}, ${image}, ${description})', product));
                }
            }
            queries.push(
                t.tx(t1 => {
                    return t1.tx(t2 => {
                        return t2.one('SELECT count(*) FROM products');
                    });
                }));
            return t.batch(queries);
        }).then(data => {
            console.log({ data })
        }).catch(error => {
            console.log({ error })
        });
    }
});