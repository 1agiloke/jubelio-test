const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const Inert = require('@hapi/inert')
const productRoute = require('./routes/product');
const configs = require('./configs');
const whitelistedOrigins = configs.WHITELISTED_ORIGINS;

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: {
                origin: whitelistedOrigins, // an array of origins or 'ignore'
                headers: ['Authorization'], // an array of strings - 'Access-Control-Allow-Headers'
                exposedHeaders: ['Accept'], // an array of exposed headers - 'Access-Control-Expose-Headers',
                additionalExposedHeaders: ['Accept'], // an array of additional exposed headers
                maxAge: 60,
                credentials: true // boolean - 'Access-Control-Allow-Credentials'
            }
        }
    });
    await server.register(Inert);

    server.route({
        method: 'GET',
        path: '/uploads/{file*}',
        handler: {
          directory: {
            path: 'uploads'
          }
        }
    })

    await server.register(Jwt);

    server.auth.strategy('my_jwt_strategy', 'jwt', {
        keys: 'shhhh!thisasecretbetweenus',
        verify: {
            aud: 'eleveniafe',
            iss: 'eleveniabe',
            sub: false,
            nbf: true,
            exp: true,
            maxAgeSec: 2592000, // 30 days
            timeSkewSec: 15
        },
        validate: (artifacts, request, h) => {

            return {
                isValid: true,
                credentials: { user: artifacts.decoded.payload.user }
            };
        }
    });

    // Set the strategy

    // server.auth.default('my_jwt_strategy');
    productRoute(server);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();