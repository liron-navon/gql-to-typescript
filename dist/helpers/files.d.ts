/**
 * find the gql tag and gets it's value using regex
 * @param fileContent
 */
export declare function getTypeDefsFromFile(fileContent: any): string;
/**
 * returning a promise from the glob function and applies needed options
 * @param matcher
 */
export declare function getFileNamesFromGlob(matcher: string): Promise<string[]>;
/**
 * matches files, extract the graphql schema and use gql to create node trees
 * @param matcher
 * @param turnToNodeTree
 */
export declare function collectGQLTypeDefs(matcher: string, turnToNodeTree?: boolean): Promise<any[]>;
/**
 * Creates a file with the path to it's directory synchronously,
 * the file cam be emptied by passing true as the second parameter
 * @param filePath
 * @param makeSureEmpty
 */
export declare function ensureFileExistence(filePath: string, makeSureEmpty?: boolean): void;
