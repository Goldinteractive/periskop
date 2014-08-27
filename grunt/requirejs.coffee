module.exports = (grunt, options) =>
    build:
      options:
        baseUrl: "src/assets/js"
        out: "dist/assets/js/build.min.js"
        mainConfigFile: "src/assets/js/require-config.js"
        name: "../vendor/bower/almond/almond"
        include: ["main"]
        optimize: 'uglify2'
        skipModuleInsertion: false
        wrap: true
        preserveLicenseComments: false
        findNestedDependencies:true
