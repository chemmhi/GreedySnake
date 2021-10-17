const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    environment: {
      arrowFunction: false,
      const: false,
    }
  },
  module: {
    rules: [
      {
        test: /.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                  [
                    '@babel/preset-env',
                    {
                      targets: {
                        'chrome': '58',
                        'ie': '11'
                      },
                      'corejs': '3',
                      'useBuiltIns': 'usage'
                    }
                  ]
              ]
            }
          },
          'ts-loader'
        ],
        exclude: /node-modules/
      },
      {
        test: /.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      browsers: 'last 2 versions'
                    }
                  ]
                ]
              }
            }
          },
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      // title: 'GreedySnake'
      template: './src/index.html'
    })
  ],
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.js']
  }
}