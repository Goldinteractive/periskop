module.exports = (grunt, options) =>
  compile:
    options:
      namespace: "JST"
      processName: (filePath) ->
        pieces = filePath.split("/")
        pieces.splice([pieces.length - 3]).join "/"
      processContent: (contents, filepath) =>
        contents.replace(/@version/g, options.pkg.version);

    files:
      "src/assets/js/compiled-templates/templates.js": ["src/assets/js/**/**/*.hbs"]