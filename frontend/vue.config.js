const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    // proxy: "http://localhos:5000",
      proxy: "http://20.228.159.119:5000",
  }
})
