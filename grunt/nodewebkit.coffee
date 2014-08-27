module.exports = (grunt, options) ->

  options:
    app_name: options.pkg.name
    app_version: options.pkg.version
    build_dir: 'build', # Where the build version of my node-webkit app is saved
    credits: 'src/credits.html'
    mac_icns: 'icons/periskop.icns'
    mac: true, # We want to build it for mac
    win: false, # We want to build it for win
    linux32: false, # We don't need linux32
    linux64: false # We don't need linux64

  src: [
    'package.json'
    'dist/index.html'
    'dist/assets/**'
  ]