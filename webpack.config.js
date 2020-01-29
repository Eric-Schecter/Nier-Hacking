const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const merge = require('webpack-merge');
// const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const TerserPlugin = require('terser-webpack-plugin');
// const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
// const CompressionWebpackPlugin = require('compression-webpack-plugin');
// const WorkboxPlugin = require('workbox-webpack-plugin');
// const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
// const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
// const OfflinePlugin = require('offline-plugin');

const commonConfig = merge([
  {
    entry: {
      main: `${__dirname}/src/index.tsx`,
    },
    node: {
      fs: 'empty',
    },
    externals: [
      { './cptable': 'var cptable', './jszip': 'jszip' },
    ],
    module: {
      rules: [
        // {
        //   test: /\.(js|jsx)$/,
        //   resolve: {
        //     extensions: ['.js', '.jsx'],
        //   },
        //   exclude(path) {
        //     return path.match(/node_modules/);
        //   },
        //   use: {
        //     loader: 'babel-loader',
        //     options: {
        //       presets: ['@babel/env', '@babel/react'],
        //       plugins: ['react-hot-loader/babel', '@babel/transform-runtime'],
        //     },
        //   },
        // },
        {
          test: /\.(t|j)s(x?)$/,
          resolve: {
            extensions: ['.ts', '.tsx', '.js', 'jsx'],
          },
          exclude(path) {
            return path.match(/node_modules/);
          },
          use: [
            {
              loader: 'ts-loader',
            },
          ],
        },
        {
          test: /\.css|scss$/,
          // loader: ['style-loader', 'css-loader']
          // loader: ['style-loader', 'css-loader?modules&localIdentName=[name]__[local]']
          // loader: ['style-loader', 'css-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]'],
          use: ['style-loader',
            {
              loader: 'typings-for-css-modules-loader',
              options: {
                modules: true,
                namedExport: true,
                camelCase: true,
                minimizer: true,
                localIdentName: '[local]_[hash:base64:5]',
                sass: true,
              },
            },
            {
              loader: 'sass-loader',
            }
          ]
        },
        {
          test: /\.(png|gif|jpe?g)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 100000,
              name: '[name].[ext]',
              outputPath: 'img/',
            },
          },
        },
        {
          test: /\.worker\.js$/,
          loader: 'worker-loader',
        },
      ],
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: './src/img', to: 'img', toType: 'dir' },
        { from: './manifest.json', to: '' },
        { from: './App_Icon.png', to: '' },
        // { from: './service-worker.js', to: '' },
      ]),
      new webpack.IgnorePlugin(/cptable/),
    ],
    // resolve: {
    //   plugins: [
    //     new DirectoryNamedWebpackPlugin({
    //       transformFn: dirName => `${dirName}.tsx`,
    //     }),
    //   ],
    // },
  },
]);

const developmentConfig = merge([
  {
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, 'dist/'),
      // publicPath: '/',
      filename: './js/bundle.js',
      chunkFilename: './js/[name].bundle.js',
    },
    devServer: {
      hot: true,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.ProgressPlugin(),
    ],
  }]);

const productionConfig = merge([
  {
    output: {
      path: path.resolve(__dirname, 'dist/'),
      // publicPath: '/',
      filename: './js/bundle.js',
      chunkFilename: './js/[name].lazy-chunk.js',
    },
    devServer: {
      open: true,
    },
    // optimization: {
    //   minimizer: [new TerserPlugin({
    //     parallel:true
    //   })],
    // },
    plugins: [
      new CleanWebpackPlugin(),
      // new HtmlWebpackPlugin({
      //   // title: 'MES Assembly Manager',
      //   // favicon: 'favicon.ico',
      //   template: './template/index.html',
      //   // meta: { viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0,user-scalable=no' },
      // }),
      new webpack.ProgressPlugin(),
      // new ServiceWorkerWebpackPlugin({
      //   entry: path.join(__dirname, 'service-worker.js'),
      // }),
      // new WorkboxPlugin.GenerateSW({
      //   clientsClaim: true,
      //   skipWaiting: true,
      // }),
      // new WebpackBundleAnalyzer(),
      // new CompressionWebpackPlugin(),
    ],
  },
]);

const analyzeConfig = merge([
  {
    output: {
      path: path.resolve(__dirname, 'dist/'),
      // publicPath: '/',
      filename: './js/bundle.js',
      chunkFilename: './js/[name].lazy-chunk.js',
    },
    devServer: {
      open: true,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './template/index.html',
      }),
      new webpack.ProgressPlugin(),
      // new WebpackBundleAnalyzer(),
      // new CompressionWebpackPlugin(),
    ],
  },
]);

module.exports = (mode, para) => {
  if (para.addon === 'analyze') {
    return merge(commonConfig, analyzeConfig, { mode });
  }
  if (mode === 'production') {
    return merge(commonConfig, productionConfig, { mode });
  }
  return merge(commonConfig, developmentConfig, { mode });
};
