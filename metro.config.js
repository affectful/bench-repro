// Learn more https://docs.expo.io/guides/customizing-metro
/**
 * @type {import('expo/metro-config').MetroConfig}
 */
const { getDefaultConfig } = require('expo/metro-config');
const { watch } = require('fs');
const path = require('path');

const env = process.env.BABEL_ENV || process.env.NODE_ENV;
const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

// console.log({ projectRoot, monorepoRoot }) 

const config = getDefaultConfig(projectRoot, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
})

const { withTamagui } = require('@tamagui/metro-plugin')
module.exports = withTamagui(config, {
  components: ['tamagui'],
  config: './code/tamaguiConfig.ts',
  outputCSS: './tamagui-web.css',
})


const ALIASES = {
  'react-dom/client': 'react-dom/profiling',
};

config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Ensure you call the default resolver.
  return context.resolveRequest(
    context,
    // Use an alias if one exists.
    ALIASES[moduleName] ?? moduleName,
    platform
  );
};


// 1. Watch all files within the monorepo
// config.watchFolders = [
//   monorepoRoot,
//   // path.resolve(projectRoot, 'node_modules', '@loti', 'ui')
// ];

console.log('bundler paths', {
  modulePaths: config.resolver.nodeModulesPaths,
  watchFolders: config.watchFolders,
})
// 2. Let Metro know where to resolve packages and in what order
// config.resolver.nodeModulesPaths = [
//   path.resolve(projectRoot, 'node_modules'),
//   path.resolve(monorepoRoot, 'node_modules'),
// ];

module.exports = config
