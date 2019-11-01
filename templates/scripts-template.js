"use strict";

const newScriptsTemplate = {
    "start": "webpack-dev-server --mode development --open --hot",
    "build-dev": "webpack --mode development",
    "build-prod": "webpack --mode production"
};

module.exports.newScriptsTemplate = newScriptsTemplate;