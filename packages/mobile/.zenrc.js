const url = require('url');

const config = {
  builders: {
    android: {
      buildDir: 'build/android',
      dllBuildDir: '../../.cache/dll',
      defines: {
        __CLIENT__: true
      },
      enabled: false
    },
    ios: {
      buildDir: 'build/ios',
      dllBuildDir: '../../.cache/dll',
      defines: {
        __CLIENT__: true
      },
      enabled: false
    }
  },
  options: {
    cache: '../../.cache',
    webpackDll: true,
    defines: {
      __DEV__: process.env.NODE_ENV !== 'production',
      __API_URL__: '"http://localhost:8080/graphql"',
      __WEBSITE_URL__: '"http://localhost:8080"',
      'process.env.STRIPE_PUBLIC_KEY': !!process.env.STRIPE_PUBLIC_KEY
        ? `"${process.env.STRIPE_PUBLIC_KEY}"`
        : undefined
    }
  }
};

if (process.env.NODE_ENV === 'production') {
  config.builders.android.enabled = true;
  config.builders.ios.enabled = true;
  config.options.defines.__API_URL__ = '"https://apollo-universal-starter-kit.herokuapp.com/graphql"';
  config.options.defines.__WEBSITE_URL__ = '"https://apollo-universal-starter-kit.herokuapp.com"';
  // Generating source maps for production will slowdown compilation for roughly 25%
  config.options.sourceMap = false;
}

const extraDefines = {};

config.options.defines = Object.assign(config.options.defines, extraDefines);

module.exports = config;
