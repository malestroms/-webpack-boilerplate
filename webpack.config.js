const webpack = require('webpack')
const path = require('path')
const glob = require('glob')


const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const PurgecssPlugin = require('purgecss-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin")

const PATHS = {
  src: path.join(__dirname, 'src')
}

module.exports = {
	mode: "development",
	entry : {
		main : './src/index.js'
	},
	output: {
		path: path.resolve(__dirname,"dist"),
		filename: '[name].[hash].js'	
	},
	module:{
		rules: [
			{
				test: /\.s[ac]ss$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			},
			{
		        test: /\.css$/,
		        use:  ['style-loader', MiniCssExtractPlugin.loader, 'css-loader']
		    },
		    {
        		test: /\.(png|jpe?g|gif)$/,
		    	loader: [
		    		{
		    			loader: 'file-loader',
		    			options: {
				    		name: '[name].[ext]',
				    	}
		    		},
		    		{
				      	loader: 'image-webpack-loader',
				    	options: {
					    	bypassOnDebug: true, // webpack@1.x
					    }
		    		}
		    	]
		    },
		    {
    	        test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
    	        loader: 'file-loader',
    	        options: {
    	        	name: '[name].[ext]',
    	        	outputPath: "./fonts/"
    	        }
		    }
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
      		filename: '[name].[contenthash].css',
		}),
		new PurgecssPlugin({
	      paths: glob.sync(`${PATHS.src}/../index.html`,  { nodir: true }),
	    }),
	    new CleanWebpackPlugin(['dist'], {
	    	root: __dirname,
	    	verbose: true,
	    	dry: false
	    }),
	    new HtmlWebpackPlugin({
	      inject: false,
	      hash: true,
	      template: "./index.html",
	      filename: "index.html"
	    }),
	    // new ManifestPlugin(),
	]
}