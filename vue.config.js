module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/books-test/'
  : '/',

  productionSourceMap: false
}