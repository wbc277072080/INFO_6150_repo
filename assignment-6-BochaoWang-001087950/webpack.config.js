// module.exports = {
//     entry: './js/main.js',
//     output: {
//         filename: 'main.boundle.js'
//     }
// }

const path = require('path');
module.exports = {
    entry: './js/main.js',
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
};