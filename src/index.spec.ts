import {convertFiles, convert} from './index';
import * as path from 'path';
import * as randomUUID from 'uuid/v4';
import gql from 'graphql-tag';
import * as fs from 'fs';

// a sample of gql tag usage, when multiple tags exist on the same page they will be merged
const inputSample1 = gql`
    type Query {
        " get my type and have fun "
        getMyType(testString: String!): MyType
    }
`;

const inputSample2 = gql`    
    type MyType {
        test: String!
        array1d: [String]
        array5d: [[[[[String]]]]]!
    }
`;

// what we are actually going to get
const outputSample = `
/*
*****************************************************
* This file was auto generated by gql-to-typescript *
*                  Type everything!                 *
*****************************************************
*/
export namespace TestNameSpace {
	export interface Query {
	/*  get my type and have fun  */
		getMyType?: (testString: string) => MyType;
	}
	export interface MyType {
		test: string;
		array1d?: string[];
		array5d: string[][][][][];
	}
}
`;

test('Detects this test file and generates a new file in temp.', () => {
    const tempFilePath = path.join(__dirname, `../temp/${Date.now()}=${randomUUID()}-types.ts`);
    const expectedOutput = removeAllSpaces(outputSample);

    return convertFiles('./**/*.ts', {
        outputFile: tempFilePath,
        namespace: 'TestNameSpace',
        silent: true
    })
        .then(() => {
            const generatedFileContent = fs.readFileSync(tempFilePath, 'utf8');
            const output = removeAllSpaces(generatedFileContent);
            expect(expectedOutput).toEqual(output);
        });
});

test('Creates a file by passing type definitions.', () => {
    const tempFilePath = path.join(__dirname, `../temp/${Date.now()}=${randomUUID()}-types.ts`);
    const expectedOutput = removeAllSpaces(outputSample);

    return convert({
        outputFile: tempFilePath,
        namespace: 'TestNameSpace',
        typeDefs: [inputSample1, inputSample2],
        silent: true
    })
        .then(() => {
            const generatedFileContent = fs.readFileSync(tempFilePath, 'utf8');
            const output = removeAllSpaces(generatedFileContent);
            expect(expectedOutput).toEqual(output);
        });
});


/**
 * A small utility to remove all the spaces from a given string,
 * it allows for faster comparison of large strings without hashing (which makes it horrible to debug).
 * @param str
 */
function removeAllSpaces(str: string) {
    return str.replace(/\s/g, '');
}
