
import path from 'path';
import proxy from './proxy.config.js';

export default {
  proxy,
  multipage: true,
  theme: 'antd.config.js',
  entry: [ 'src/common.js', 'src/index.js' ],
  env: {
    development: {
      extraBabelPlugins: [
        'dva-hmr',
        'transform-runtime',
        [ 'import', { libraryName: 'antd-mobile', style: true }]
      ]
    },
    production: {
      extraBabelPlugins: [
        'transform-runtime',
        [ 'import', { libraryName: 'antd-mobile', style: true }]
      ]
    }
  }
};

