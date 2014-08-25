module.exports = main:
  files: [
    {
      expand: true
      cwd: "src/assets"
      src: [
        "css/**"
        "img/*"
      ]
      dest: "dist/assets"
    }
    {
      cwd: "src/"
      expand: true
      src: ["*.!(json|rb|md|js|coffee)"]
      dest: "dist"
      filter: "isFile"
    }
  ]