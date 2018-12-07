import {convertFiles, convert} from './index';
import * as path from 'path';
import * as randomUUID from 'uuid/v4'
import gql from "graphql-tag";
import * as fs from 'fs';

// a sample of gql tag usage
const inputSample = gql`
    type Query {
        " get my type and have fun "
        getMyType(testString: String!): MyType
    }

    type MyType {
        test: String!
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
	}
}
`;

test('Detects this test file and generates a new file in temp.', () => {
    const tempFilePath = path.join(__dirname, `../temp/${Date.now()}=${randomUUID()}-types.ts`);
    const expectedOutput = removeAllSpaces(outputSample);

    return convertFiles(__filename, {
        outputFile: tempFilePath,
        namespace: 'TestNameSpace'
    })
        .then(() => {
            const generatedFileContent = fs.readFileSync(tempFilePath, "utf8");
            const output = removeAllSpaces(generatedFileContent);
            expect(expectedOutput).toEqual(output);
        });
});

test('Creates a file without by passing type definitions.', () => {
    const tempFilePath = path.join(__dirname, `../temp/${Date.now()}=${randomUUID()}-types.ts`);
    const expectedOutput = removeAllSpaces(outputSample);

    return convert({
        outputFile: tempFilePath,
        namespace: 'TestNameSpace',
        typeDefs: [inputSample]
    })
        .then(() => {
            const generatedFileContent = fs.readFileSync(tempFilePath, "utf8");
            const output = removeAllSpaces(generatedFileContent);
            expect(expectedOutput).toEqual(output);
        });
});


function removeAllSpaces(str: string) {
    return str.replace(/\s/g, '')
}
