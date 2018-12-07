import {ensureFileExistence} from "./files";

const fs = require('fs');

/**
 * abstracts the process of writing data into a file
 */
export class FileWriter {
    constructor(private filePath) {
        ensureFileExistence(filePath);
    }
    public appendLine(str: string) {
        fs.appendFileSync(this.filePath, `\n${str}`);
        return this;
    }
    public finish() {
        return Promise.resolve()
    }
}
