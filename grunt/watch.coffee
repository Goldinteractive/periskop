module.exports =
  js:
    files: ["src/assets/js/**/*.js"]
    tasks: ["jshint"]

  tpl:
    files: ["src/assets/js/**/**/*.hbs"]
    tasks: ["handlebars"]

  css:
    files: ["src/assets/scss/**/*.scss"]
    tasks: ["compass"]