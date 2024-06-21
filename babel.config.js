module.exports = {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
      ['import', { libraryName: 'antd', style: 'css' }] // Ensure this is the correct path to your Babel configuration file
    ]
  };
  