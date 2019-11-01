const shell = require("shelljs");
const fs = require("fs");

const projectName = "test-app-v3";

const { indexHtmlTemplate } = require("./templates/index-html-template");
const { appJsTemplate } = require("./templates/app-js-template");
const { appCssTemplate } = require("./templates/app-css-template");
const { indexJsTemplate } = require("./templates/index-js-template");
const { gitignoreTemplate } = require("./templates/gitignore-template");
const {
    webpackConfigTemplate
} = require("./templates/webpack-config-template");
const { readmeTemplate } = require("./templates/readme-template");

const { newScriptsTemplate } = require("./templates/scripts-template");
const { babelConfigTemplate } = require("./templates/babel-config-template");
const { robotsTxtTemplate } = require("./templates/robots-txt-template");
const { indexCssTemplate } = require("./templates/index-css-template");

(function() {
    /**
     * The actual script goes here...
     */
    // try {
    //     let createDirectoryReturn = createDirectory(projectName);
    //     if (createDirectoryReturn.code === 0) {
    //         try {
    //             let changeDirReturn = changeDir(`./${projectName}/`);
    //             if (changeDirReturn.code === 0) {
    //                 try {
    //                     let execReturn = execute("npm init -y");
    //                     if (execReturn.code === 0) {
    //                         try {
    //                             execReturn = execute("npm install react react-dom");
    //                             if (execReturn.code === 0) {
    //                                 console.log("success!");
    //                             }
    //                         } catch (error) {
    //                             console.log(`[${error}]`);
    //                         }
    //                     }
    //                 } catch (error) {
    //                     console.log(`[${error}]`);
    //                 }
    //             }
    //         } catch (error) {
    //             console.log(`[${error}]`);
    //         }
    //     }
    // } catch (error) {
    //     console.log(`[${error}]`);
    // }
    /**
     * test proof of concept
     */

    createDirectory(projectName);
    changeDir(`./${projectName}`);
    createDirectory("public");

    changeDir("./public");
    createFileAndInsert("index.html", indexHtmlTemplate);
    createFileAndInsert("robots.txt", robotsTxtTemplate);
    changeDir("..");

    createDirectory("src");

    changeDir("./src");
    createFileAndInsert("App.js", appJsTemplate);
    createFileAndInsert("App.css", appCssTemplate);
    createFileAndInsert("index.js", indexJsTemplate);
    createFileAndInsert("index.html", indexHtmlTemplate);
    createFileAndInsert("index.css", indexCssTemplate);
    changeDir("..");

    //createFile(".gitignore");
    createFileAndInsert(".gitignore", gitignoreTemplate);
    createFileAndInsert("readme.md", readmeTemplate(projectName));
    execute("npm init -y");
    execute("npm install react react-dom");
    execute(
        "npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader style-loader css-loader"
    );
    execute(
        "npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin"
    );
    createFileAndInsert(".babelrc", babelConfigTemplate);
    createFileAndInsert("webpack.config.js", webpackConfigTemplate);

    updateScripts(JSON.parse(readFile("package.json")), newScriptsTemplate);

    console.log("success!");
})();

function echoLine(message) {
    try {
        shell.echo(message);
    } catch (error) {
        console.log(error.message);
    }
}

function removeFile(fileName, options = null) {
    if (options) {
        try {
            return shell.rm(options, fileName);
        } catch (error) {
            throw error;
        }
    } else {
        try {
            return shell.rm(fileName);
        } catch (error) {
            throw error;
        }
    }
}

function createFile(fileName) {
    try {
        return shell.touch(fileName);
    } catch (error) {
        throw error;
    }
}

function createDirectory(dirName, options = null) {
    if (options) {
        try {
            return shell.mkdir(options, dirName);
        } catch (error) {
            throw error;
        }
    } else {
        try {
            return shell.mkdir(dirName);
        } catch (error) {
            throw error;
        }
    }
}

function removeDirectory(dirName) {
    try {
        return shell.rm("-rf", dirName);
    } catch (error) {
        throw error;
    }
}

function currPath() {
    try {
        return shell.pwd();
    } catch (error) {
        throw error;
    }
}

function changeDir(dir) {
    try {
        const cdReturnedObj = shell.cd(dir);
        if (cdReturnedObj.code === 0) {
            try {
                const pwdReturnedObj = shell.pwd();
                if (pwdReturnedObj.code === 0) {
                    ///Redundant because of try...catch?
                    cdReturnedObj.stdout = pwdReturnedObj.stdout;
                    return cdReturnedObj;
                }
            } catch (error) {
                throw error;
            }
        }
    } catch (error) {
        throw error;
    }
}

function execute(command) {
    try {
        return shell.exec(command);
    } catch (error) {
        throw error;
    }
}

function insertContent(file, content) {
    try {
        const { code } = shell.find(file);

        if (code === 0) {
            try {
                fs.writeFile(file, content, err => {
                    if (err) {
                        throw err;
                    } else {
                        return true;
                    }
                });
            } catch (error) {
                throw error; //redundant because of callback?
            }
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
}

function createFileAndInsert(fileName, content) {
    try {
        const createReturnedObj = createFile(fileName);
        if (createReturnedObj.code === 0) {
            try {
                insertContent(fileName, content);
            } catch (error) {
                throw error;
            }
        }
    } catch (error) {
        throw error;
    }
}

function readFile(fileName) {
    try {
        return shell.cat(fileName);
    } catch (error) {
        throw error;
    }
}

function updateScripts(json, newScripts) {
    updateJsonObject(json.scripts, newScripts);

    fs.writeFile("./package.json", JSON.stringify(json, null, 2), function(
        err
    ) {
        if (err) {
            throw err;
        } else {
            return true;
        }
    });
}

function updateJsonObject(jsonObj, newJsonObj) {
    return Object.assign(jsonObj, newJsonObj);
}
//TODO: Write unit tests for all functions!
