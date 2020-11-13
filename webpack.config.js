const path = require(`path`);

module.exports = {
  entry: [
    `./js/util.js`,
    `./js/gallery.js`,
    `./js/load.js`,
    `./js/preview.js`,
    `./js/upload.js`,
    `./js/img-scale.js`,
    `./js/effects.js`,
    `./js/form.js`,
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname),
    iife: true,
  },
  devtool: false
};
