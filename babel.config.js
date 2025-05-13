const reactStrictPreset = require('react-strict-dom/babel-preset');


function getPlatform(caller) {
  // This information is populated by Expo
  return caller && caller.platform;
}

function getIsDev(caller) {
  // This information is populated by Expo
  if (caller?.isDev != null) return caller.isDev;
  // https://babeljs.io/docs/options#envname
  return (
    process.env.BABEL_ENV === 'development' ||
    process.env.NODE_ENV === 'development'
  );
}


module.exports = function (api) {
  // If not using Expo, set these values manually or by other means
  const platform = api.caller(getPlatform);
  const dev = api.caller(getIsDev);

  api.cache(true)
  return {
    presets: [
      'babel-preset-expo',
      [reactStrictPreset, {
        debug: dev,
        dev,
        platform
      }]
    ],
    plugins: [
      // ['react-native-unistyles/plugin'],

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
