const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [ 
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html', // idk if we need this?
        chunks: ['main'], // idk if we need this?
      }), 
      new WebpackPwaManifest({
        name: 'Jate',
        short_name: 'Jate',
        description: 'A simple text editor',
        display: 'standalone',
        background_color: '#1e1e1e',
        theme_color: '#1e1e1e',
        start_url: '/',
        publicPath: '/',
        fingerprints: false,
        inject: true,
        icons: [
          {
            src: path.resolve('src/images/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512], 
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'sw.js',
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test:/\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/present-env'],
              plugins: ['@babel/plugin-transform-runtime',
            `@babel/plugin-proposal-object-rest-spread`]
            }
          }
        }
        
      ],
    },
  };
};