const shell = require("shelljs");
const fs = require("fs");

class Test {
    constructor() {
        //this.text = "Ceva";
    }

    createFile(fileName) {
        try {
            const touchReturnedObj = shell.touch(fileName);
            return this;
        } catch (error) {
            throw error;
        }
    }

    insertContent(file, content) {
        try {
            let {
                code,
                stderr
            } = shell.find(file);

            if (code === 0) { //fisier gasit
                fs.writeFile(file, content, (err) => {
                    if (err) throw err;
                });
            } else {
                throw new Error(stderr);
            }

            return this;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

}

(function () {
    const testInstance = new Test();
    let fileName = "testInsert.txt";
    let text = "TEST TEXT";

    testInstance.createFile(fileName).insertContent(fileName, text);
})();