import {collectGQLTypeDefs} from "./helpers/files";
import {GqlToTSConfig, GqlToTSFilesConfig, IKVP} from "./helpers/types";
import {arrayToTruthMapper, getEnumKVP, getObjectKVP} from "./helpers/gqlNodeTools";
import {TypescriptFileWriter} from "./helpers/TypescriptFileWriter";

const defaultsDeep = require('lodash/defaultsDeep');

const customTypes = {};

const defaultOptions = {
    scalars: customTypes,
    ignoreFields: ['_empty'],
    ignoreTypes: [],
    namespace: 'GraphqlTypes',
    outputFile: 'types.ts',
    silent: false
};

const fileMessage = `/*
*****************************************************
* This file was auto generated by gql-to-typescript *
*                  Type everything!                 *
*****************************************************
*/`;

export const getDefaultOption = () => Object.assign({}, defaultOptions);

export function convertFiles(matcher, options:GqlToTSFilesConfig = {}) {
    return collectGQLTypeDefs(matcher)
        .then((typeDefs) => {
            convert(Object.assign(options, {typeDefs}))
        });
}

export function convert(options: GqlToTSConfig) {
    const {typeDefs, scalars, ignoreFields, ignoreTypes, silent} = defaultsDeep(options, defaultOptions);

    const ignoreMap = arrayToTruthMapper([...ignoreTypes, ...ignoreFields]);
    const typedValues = defaultsDeep({
        Boolean: 'boolean',
        String: 'string',
        ID: 'string|number',
        Int: 'number',
        Float: 'number'
    }, scalars);

    const state = {};
    const descriptionState = {};

    function assignToState(kvp: IKVP) {
        const { key, value, description } = kvp;
        if (state[key]) {
            return defaultsDeep(state, { [key]: value })
        }
        // assign this as a new type
        if (!typedValues[key]) {
            typedValues[key] = key;
        }

        defaultsDeep(descriptionState, description);
        state[key] = value;
        return;
    }

    typeDefs.forEach(doc => {
        doc.definitions.forEach((node) => {
            switch (node.kind) {
                case 'ObjectTypeDefinition':
                case 'InputObjectTypeDefinition':
                case 'ObjectTypeExtension':
                    assignToState(getObjectKVP(node, ignoreMap));
                    break;
                case 'EnumTypeDefinition':
                    assignToState(getEnumKVP(node));
                    break;
                default:
                    return;
            }
        })
    });

    const writer = new TypescriptFileWriter(options, typedValues, fileMessage);
    Object.entries(state).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            writer.writeEnum(key, value,descriptionState);
        } else {
            writer.writeInterface(key, value, descriptionState);
        }
    });
    return writer.finish(silent);
}
