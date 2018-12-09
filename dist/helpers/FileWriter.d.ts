/**
 * abstracts the process of writing data into a file
 */
export declare class FileWriter {
    private filePath;
    constructor(filePath: any);
    appendLine(str: string): this;
    finish(): Promise<void>;
}
