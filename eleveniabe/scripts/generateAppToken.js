const jwt = require('jsonwebtoken');
const secret = 'shhhh!thisasecretbetweenus'

run = () => {
    const args = process.argv.slice(2);
    const appName = args && args.length?args[0]:'eleveniafe';
    const token = jwt.sign({
        aud: 'eleveniafe',
        iss: 'eleveniabe',
        appName
    }, secret, {
        expiresIn: '30d'
    });
    console.log(token);
    return token;
}

run();