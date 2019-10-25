const shell = require("shelljs");
const fs = require("fs");

(function () {
    /*TODO: USE PROMISES!!!*/
    promisees.usethem.com.
    //shell.echo(JSON.stringify(shell.touch("newFile.txt")));
    // try {
    //     echoLine(removeFile("davai.js"));
    // } catch (error) {
    //     //do nothing as method reports own err message...
    // }

    // try {
    //     echoLine(createFile("insert.txt"));
    // } catch (error) {
    //     //do nothing as method reports own err message...
    //     console.log(error.message);
    // }

    // try {
    //     echoLine(createDirectory("./cda/ceva"));
    // } catch (error) {
    //     //do nothing as method reports own err message...
    // }

    // try {
    //     echoLine(removeDirectory("cda"));
    // } catch (error) {
    //     console.log(error.message);
    // }

    // try {
    //     echoLine(changeDir("davai"));
    //     echoLine(shell.pwd());
    // } catch (error) {
    //     console.log(error.message);
    // }

    // try {
    //     echoLine(`Before cd: ${currPath()}.`);
    //     echoLine(changeDir("davai"));
    // } catch (error) {
    //     console.log(error.message);
    // }

    // try {
    //     execute("npm install react");
    // } catch (error) {
    //     console.log(error.message);
    // }
    const content = module.export this shit in a different file
        `<!DOCTYPE html>
<html>
    <head>
        <title>Davai</title>
    </head>
    <body>
        <h1>Ce sa mai ca sa cum</h1>
    </body>
</html>`

    //echoLine(shell.find("./davai/ceva/davai.js"));
    insertContent("insert.html", content);
})();

function echoLine(message) {
    try {
        shell.echo(message);
    } catch (error) {
        //do nothing as method reports own err message...
    }
}

function removeFile(fileName, options = null) {
    let returnedObj = {};
    options ? returnedObj = shell.rm(options, fileName) : returnedObj = shell.rm(fileName)
    const {
        code,
        stderr
    } = returnedObj;
    //console.log(returnedObj);

    if (code === 0) {
        return `rm: ${fileName} has beed successfully removed.`;
    } else {
        throw Error(stderr);
    }
}

function createFile(fileName) {
    const {
        code,
        stderr
    } = shell.touch(fileName);

    if (code === 0) {
        return `touch: file [${fileName.split("/").slice(-1)[0]}] successfully created in [${fileName.split("/").slice(0, -1).join("/")}/]!`;
    } else {
        throw Error(stderr);
    }
}

function createDirectory(dirName, options = null) {
    let returnedObj = {};
    options ? returnedObj = shell.mkdir(options, dirName) : returnedObj = shell.mkdir(dirName)

    const {
        code,
        stderr
    } = returnedObj;

    if (code === 0) {
        const dname = dirName.split("/"); //TODO: use this?
        return `mkdir: directory [${dirName}] has been created`;
    } else {
        throw Error(stderr);
    }
}

function removeDirectory(dirName) {
    const {
        code,
        stderr
    } = shell.rm("-rf", dirName);

    if (code === 0) {
        return `rm: directory [${dirName}] deleted!`;
    } else {
        throw Error(stderr);
    }
}

function currPath() {
    const {
        code,
        stdout,
        stderr
    } = shell.pwd();

    if (code === 0) {
        return stdout;
    } else {
        throw Error(stderr);
    }
}

function changeDir(dir) {
    const {
        code,
        stderr
    } = shell.cd(dir);

    if (code === 0) {
        return currPath();
    } else {
        throw Error(stderr);
    }
}

function execute(command) {
    if (command) {
        const {
            code,
            stdout,
            stderr
        } = shell.exec(command);

        if (code === 0) {
            return stdout
        } else {
            throw Error(stderr);
        }
    } else {
        throw Error("exec: no command to execute!");
    }
}

function insertContent(file, content) {
    try {
        let {
            code
        } = shell.find(file);

        if (code === 0) {
            fs.writeFile(file, content, (err) => {
                if (err) throw err;
            });
        }

    } catch (error) {
        console.log(error.message);
        return;
    }
}

function updateContent(newData) {

}