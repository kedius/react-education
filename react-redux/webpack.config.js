const webpack = require('webpack');

module.exports = {
  entry: ["babel-polyfill", "./src/main.js"],
  output: {
    path: __dirname + "/public/build",
    publicPath: "build/",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: [/node_modules/, /public/],
        query: {
          presets: ["es2015", "react", "stage-0"],
          plugins: ["transform-decorators-legacy"]
        }
      },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!autoprefixer-loader!less",
        exclude: [/node_modules/, /public/]
      }
    ]
  },
  plugins: []
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.DefinePlugin({
      "process.env": {
         NODE_ENV: JSON.stringify("production")
       }
    })
  );

  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  );
}
