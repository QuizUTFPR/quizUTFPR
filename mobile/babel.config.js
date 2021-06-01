module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['react-native', 'babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          "root": [
            "./src"
          ],
        "alias": {
           "src": "./src",
         }
        } 
      ] 
    ]
  };
};
