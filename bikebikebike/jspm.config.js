SystemJS.config({
  browserConfig: {
    "paths": {
      "npm:": "/jspm_packages/npm/",
      "utils": "/src/utils/",
      "bikebikebike/": "/src/"
    }
  },
  nodeConfig: {
    "paths": {
      "npm:": "jspm_packages/npm/",
      "bikebikebike/": "src/"
    }
  },
  devConfig: {
    "map": {
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.12"
    }
  },
  transpiler: "plugin-babel",
  packages: {
    "bikebikebike": {
      "main": "index.js",
      "meta": {
        "*.js": {
          "loader": "plugin-babel"
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json"
  ],
  map: {},
  packages: {}
});
