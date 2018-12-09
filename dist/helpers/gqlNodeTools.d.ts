import { Mapper } from "./types";
/**
 * gets the name of a given node
 * @param node
 */
export declare function getName(node: any): any;
/**
 * get the kind of type from a node
 * @param node
 */
export declare function getTypeKind(node: any): any;
/**
 * gets the description from a node
 * @param node
 */
export declare function getDescription(node: any): any;
/**
 * gets the type of a node
 * @param node
 */
export declare function getType(node: any): any;
/**
 * returns a key value pait from an enum, optional description
 * @param enumNode
 */
export declare function getEnumKVP(enumNode: any): {
    key: any;
    value: any;
};
/**
 * returns a key value pait from an object, optional description
 * @param objectNode
 * @param ignoreFields
 */
export declare function getObjectKVP(objectNode: any, ignoreFields: Mapper): {
    key: any;
    value: {};
    description: {};
};
/**
 * returns a key value pait from a field, optional description
 * @param node
 * @param ignoreFields
 */
export declare function getFieldKVP(node: any, ignoreFields: Mapper): {
    key: any;
    value: any;
    description: any;
};
/**
 * converts an array to an object that maps strings to booleans, to allow faster lookup in the array
 * @param arr
 */
export declare function arrayToTruthMapper(arr: Array<string>): Mapper;
/**
 * gets the options out of a defined type (our custom defined types):
 * graphql `name: String!` our type `string!` the typescript type `name: string`
 * graphql `name: String` our type `string` the typescript type `name: ?string`
 * @param type
 */
export declare function getTypeOptions(type: any): {
    type: any;
    required: boolean;
};
