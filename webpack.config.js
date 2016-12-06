const env = process.env.NODE_ENV || 'development';
//TODO: fetch conf depending on env

switch (env) {
    case "integration":
    case "validation":
    case "preproduction":
    case "production":
        return require('./webpack/webpack.prod');
    default:
    case "development":
        return require('./webpack/webpack.dev');
}
