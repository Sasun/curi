const building = process.env.BABEL_ENV === 'build';

const plugins = [
  'transform-export-extensions'
];

if (building) {
  plugins.push('external-helpers');
}

module.exports = {
  presets: [
    ['env', {
      modules: building ? false : 'commonjs',
      targets: {
        browsers: ['> 1%']
      }
    }],
    'react'
  ],
  plugins: plugins
};
