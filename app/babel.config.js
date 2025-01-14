module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          "@": "./src",
          "@components": "./src/components",
          "@screens": "./src/screens",
          "@styles": "./src/styles",
          "@utils": "./src/utils",
          "@assets": "./src/assets",
          "@state": "./src/state",
          "@features": "./src/features",
          "@navigation": "./src/navigation",
          "@services": "./src/services"
        }
      }
    ]
  ]
};
