module.exports = {
  // Other Webpack configurations, like entry, output, module rules, etc.
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      // Add your custom middleware logic here
      // For example, logging requests or adding specific routes
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      devServer.app.get('/some/path', (req, res) => {
        res.json({ custom: 'response' });
      });

      // Always return the middlewares array
      return middlewares;
    },
    // Additional devServer options:
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 3000, // Your preferred port number
  },
};
