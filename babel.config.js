module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['react-native-unistyles/plugin'],

      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './code/tamaguiConfig.ts',
          logTimings: true,
          disableExtraction: process.env.NODE_ENV === 'development',
        },
      ],
    ],
  }
}
