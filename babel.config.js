module.exports = api => {
  const isTest = api.env('test');
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: isTest ? 'commonjs' : false,
          targets: {
            ...(isTest
              ? { node: 'current' }
              : { browsers: '> 0.25%, not dead' }),
          },
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [],
  };
};
