const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
    '/api':{
      target: "http://localhost:5000",
      ws: true,
      changeOrigin: true
    }
      //proxy: "http://localhost:5000",
      //  proxy: "http://20.228.159.119:5000",
  }
}
})
