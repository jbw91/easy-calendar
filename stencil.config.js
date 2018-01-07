exports.config = {
  namespace: 'easy-calendar',
  generateDistribution: true,
  bundles: [
    { components: ['easy-calendar'] }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
