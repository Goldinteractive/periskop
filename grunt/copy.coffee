module.exports = main:
  files: [
    {
      expand: true
      cwd: "public/assets"
      src: [
        "css/**"
        "img/**"
        "vendor/**"
        "!vendor/bower"
      ]
      dest: "dist/public/assets"
    }
    {
      expand: true
      src: ["*.!(json|rb|md|js)"]
      dest: "dist"
      filter: "isFile"
    }
  ]