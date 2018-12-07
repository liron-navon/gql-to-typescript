import {Mapper} from "./types";

/**
 * gets the name of a given node
 * @param node
 */
export function getName(node) {
    return node.name.value;
}

/**
 * get the kind of type from a node
 * @param node
 */
export function getTypeKind(node) {
    return node.type.kind;
}

/**
 * gets the description from a node
 * @param node
 */
export function getDescription(node) {
    return node.description ? node.description.value : null;
}

// handles type definition for Query/Mutation etc...
function createTypeForFunction(node) {
    const returnType = node.type.name.value;
    const args = node.arguments.map((argNode) => {
        const argName = getName(argNode);
        const argType = getType(argNode);
        const { type, required } = getTypeOptions(argType);
        return {
            name: argName,
            required,
            type
        };
    });
    return {
        kind: 'function',
        args,
        returnType
    };
}

/**
 * gets the type of a node
 * @param node
 */
export function getType(node) {
    if (node.kind === 'FieldDefinition' || node.kind === 'InputValueDefinition') {
        const kind = getTypeKind(node);
        let requiredValue = false;
        let type = null;
        if (kind === 'ListType') {
            const childName = getName(node.type.type);
            return `${childName}[]`;
        } if (node.arguments && node.arguments.length > 0) {
            return createTypeForFunction(node);
        } else {
            type = node.type.type ? getName(node.type.type) : getName(node.type);
        }

        if (node.type.kind === 'NonNullType') {
            requiredValue = true;
        }
        return requiredValue ? type + '!' : type;
    }
}

/**
 * returns a key value pait from an enum, optional description
 * @param enumNode
 */
export function getEnumKVP(enumNode) {
    const name = getName(enumNode);
    const output = {
        key: name,
        value: enumNode.values.map((val) => val.name.value)
    };
    const description = getDescription(enumNode);

    if (description) {
        output['description'] = {};
        output['description'][name] = description;
    }
    return output;
}

/**
 * returns a key value pait from an object, optional description
 * @param objectNode
 * @param ignoreFields
 */
export function getObjectKVP(objectNode, ignoreFields: Mapper) {
    const name = getName(objectNode);
    const value = {};
    const description = {};

    const objectDescription = getDescription(objectNode);
    if (objectDescription) {
        description[name] = objectDescription;
    }

    objectNode.fields.forEach((field) => {
        let kvp = null;
        if (field.kind === 'FieldDefinition' || field.kind === 'InputValueDefinition') {
            kvp = getFieldKVP(field, ignoreFields);
        }

        if (kvp) {
            value[kvp.key] = kvp.value;
            if (kvp.description) {
                description[`${name}->${kvp.key}`] = kvp.description;
            }
        }
    });
    return {
        key: name, value, description
    }
}

/**
 * returns a key value pait from a field, optional description
 * @param node
 * @param ignoreFields
 */
export function getFieldKVP(node, ignoreFields: Mapper) {
    const name = getName(node);
    const value = getType(node);

    if (!ignoreFields[name]) {
        return {
            key: name,
            value,
            description: getDescription(node)
        };
    }
}

/**
 * converts an array to an object that maps strings to booleans, to allow faster lookup in the array
 * @param arr
 */
export function arrayToTruthMapper(arr: Array<string>): Mapper {
    const output = {};
    arr.forEach((s) => {
        output[s] = true;
    });
    return output;
}

/**
 * gets the options out of a defined type (our custom defined types):
 * graphql `name: String!` our type `string!` the typescript type `name: string`
 * graphql `name: String` our type `string` the typescript type `name: ?string`
 * @param type
 */
export function getTypeOptions(type) {
    if (type.endsWith('!')) {
        return {
            type: type.substring(0, type.lastIndexOf('!')),
            required: true
        };
    } else {
        return {
            type,
            required: false
        };
    }
}
