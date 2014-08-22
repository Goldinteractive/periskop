fs = require('fs')
amdclean = require('amdclean');

module.exports = (grunt, options) =>
    build:
      options:
        baseUrl: "src/assets/js"
        out: "dist/assets/js/build.min.js"
        mainConfigFile: "src/assets/js/require-config.js"
        # name: "../vendor/almond/almond"
        include: ["main"]
        optimize: 'uglify2'
        skipModuleInsertion: true
        wrap: true
        preserveLicenseComments: false
        findNestedDependencies:true
        onBuildWrite: (moduleName, path, contents) =>
            contents
                .replace(/@version/g, options.pkg.version)
        onModuleBundleComplete: (data) ->
            outputFile = data.path
            fs.writeFileSync outputFile, amdclean.clean(
                code: fs.readFileSync(outputFile)
            )