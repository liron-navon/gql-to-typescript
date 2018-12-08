import gql from 'graphql-tag';
import * as path from 'path'
import * as fs from 'fs';
import * as glob from 'glob';

/**
 * find the gql tag and gets it's value using regex
 * @param fileContent
 */
export function getTypeDefsFromFile(fileContent) {
    // keep older regex versions please.
    // *********8
    // /(gql`)[\S\s]*?(`;|`\s)/g; - had issues with template syntax (${}), and it captured itself.
    // *********8
    const reg = /(gql`)(?!\))[A-Za-z0-9\s{}"!:\(\)_-]*?((?!\()`;|(?!\()`\s)/g

    let matches = reg.exec(fileContent);
    if (!matches || matches.length === 0) {
        return null;
    }

    let gqlTag = matches[0];
    gqlTag = gqlTag.substr(0, gqlTag.lastIndexOf('`'));
    gqlTag = gqlTag.substr(gqlTag.indexOf('`') + 1);
    return gqlTag;
}

/**
 * returning a promise from the glob function and applies needed options
 * @param matcher
 */
export function getFileNamesFromGlob(matcher: string) {
    return new Promise<Array<string>>((resolve, reject) => {
        return glob(matcher, {}, (err, fileNames) => err ? reject(err) : resolve(fileNames))
    })
}

/**
 * matches files, extract the graphql schema and use gql to create node trees
 * @param matcher
 * @param turnToNodeTree
 */
export function collectGQLTypeDefs(matcher: string, turnToNodeTree: boolean = true) {
    return getFileNamesFromGlob(matcher)
        .then(fileNames => {
            // map files into gql definitions
            return fileNames.map((filePath) => {
                const content = fs.readFileSync(filePath, "utf8");
                return getTypeDefsFromFile(content);
            })
             // filter out matching files without gql
            .filter(item => item !== null)
            .map((item) => {
                return turnToNodeTree ? gql`${item}` : item
            })
        });
}

/**
 * Creates a file with the path to it's directory synchronously,
 * the file cam be emptied by passing true as the second parameter
 * @param filePath
 * @param makeSureEmpty
 */
export function ensureFileExistence(filePath: string, makeSureEmpty = true) {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }

    const options = makeSureEmpty ? { flag: 'w+' } : {};
    fs.writeFileSync(filePath, '', options);
}
