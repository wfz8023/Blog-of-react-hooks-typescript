const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath  = filePath => path.resolve(appDirectory, filePath);

module.exports = {
    appBuild: resolvePath('build'),
    appPublic: resolvePath('public'),
    appHtmlTemplate: resolvePath('public/index.html'),
    appFaviconTemplate: resolvePath('public/favicon.ico'),
    appIndexJs: resolvePath('src/index.tsx'),
    appSrc: resolvePath('src'),
    appNodeModules: resolvePath('node_modules'),
    outputDirect: resolvePath('dist'),
    appImgResource: resolvePath('src/assets/images')
};