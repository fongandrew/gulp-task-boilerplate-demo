// NB: This gulp file is intended to be used with Gulp 4.x and won't
// work with Gulp 3.x or below.
var gulp = require("gulp"),
    helpers = require("gulp-boilerplate-example")(gulp);

var config = {
  // Directory with LESS files
  lessDir: "less",

  // Where to write our LESS files relative to pubDir
  lessOutDir: "css",

  // Where to publish destination files
  pubDir: "build"
};

helpers.less.build("build", config);
helpers.less.watch("watch", config);

