(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("glob"), require("graphql-tag"), require("lodash/defaultsDeep"));
	else if(typeof define === 'function' && define.amd)
		define(["glob", "graphql-tag", "lodash/defaultsDeep"], factory);
	else if(typeof exports === 'object')
		exports["gqlToTypescript"] = factory(require("glob"), require("graphql-tag"), require("lodash/defaultsDeep"));
	else
		root["gqlToTypescript"] = factory(root[undefined], root[undefined], root[undefined]);
})(global, function(__WEBPACK_EXTERNAL_MODULE_glob__, __WEBPACK_EXTERNAL_MODULE_graphql_tag__, __WEBPACK_EXTERNAL_MODULE_lodash_defaultsDeep__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/helpers/FileWriter.ts":
/*!***********************************!*\
  !*** ./src/helpers/FileWriter.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var files_1 = __webpack_require__(/*! ./files */ "./src/helpers/files.ts");
var fs = __webpack_require__(/*! fs */ "fs");
/**
 * abstracts the process of writing data into a file
 */
var FileWriter = /** @class */ (function () {
    function FileWriter(filePath) {
        this.filePath = filePath;
        files_1.ensureFileExistence(filePath);
    }
    FileWriter.prototype.appendLine = function (str) {
        fs.appendFileSync(this.filePath, "\n" + str);
        return this;
    };
    FileWriter.prototype.finish = function () {
        return Promise.resolve();
    };
    return FileWriter;
}());
exports.FileWriter = FileWriter;


/***/ }),

/***/ "./src/helpers/TypescriptFileWriter.ts":
/*!*********************************************!*\
  !*** ./src/helpers/TypescriptFileWriter.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FileWriter_1 = __webpack_require__(/*! ./FileWriter */ "./src/helpers/FileWriter.ts");
var gqlNodeTools_1 = __webpack_require__(/*! ./gqlNodeTools */ "./src/helpers/gqlNodeTools.ts");
var path = __webpack_require__(/*! path */ "path");
var TypescriptFileWriter = /** @class */ (function () {
    function TypescriptFileWriter(options, typedValues, startMessage) {
        this.options = options;
        this.typedValues = typedValues;
        this.fullFilePath = path.join(options.outputFile);
        this.fw = new FileWriter_1.FileWriter(this.fullFilePath);
        this.fw.appendLine(startMessage);
        if (options.namespace) {
            this.fw
                .appendLine("export namespace " + options.namespace + " {");
        }
    }
    TypescriptFileWriter.prototype.append = function (str) {
        this.fw.appendLine(str);
        return this;
    };
    TypescriptFileWriter.prototype.writeDescription = function (indentation, description) {
        if (description) {
            this.append(indentation + "/* " + description + " */");
        }
    };
    TypescriptFileWriter.prototype.writeEnum = function (name, enumarations, descriptionMap) {
        var _this = this;
        this.writeDescription("\t", descriptionMap[name]);
        this.append("\texport enum " + name + " {");
        enumarations.forEach(function (e) { return _this.append("\t\t" + e + ","); });
        this.append('\t}');
    };
    TypescriptFileWriter.prototype.fixTyping = function (unknownType) {
        return this.typedValues[unknownType] || 'any';
    };
    TypescriptFileWriter.prototype.createAdvancedInterfaceField = function (label, rawType) {
        var _this = this;
        var advancedType = 'any';
        if (rawType.kind === 'function') {
            var returnType = rawType.returnType, args = rawType.args;
            var printableArguments = args.map(function (_a) {
                var name = _a.name, required = _a.required, type = _a.type;
                return "" + name + (required ? '' : '?') + ": " + _this.fixTyping(type);
            }).join(', ');
            advancedType = "(" + printableArguments + ") => " + this.fixTyping(returnType);
        }
        else {
            // unknown field...
            console.warn("unknown field " + label);
        }
        return "\t\t" + label + "?: " + advancedType + ";";
    };
    TypescriptFileWriter.prototype.createRegularInterfaceField = function (label, rawType) {
        var _a = gqlNodeTools_1.getTypeOptions(rawType), type = _a.type, required = _a.required;
        return "\t\t" + label + (required ? '' : '?') + ": " + this.fixTyping(type) + ";";
    };
    TypescriptFileWriter.prototype.writeInterface = function (name, data, descriptionMap) {
        var _this = this;
        this.writeDescription("\t", descriptionMap[name]);
        this.append("\texport interface " + name + " {");
        Object.entries(data).forEach(function (_a) {
            var label = _a[0], rawType = _a[1];
            _this.writeDescription("\t", descriptionMap[name + "->" + label]);
            if (typeof rawType === "string") {
                _this.append(_this.createRegularInterfaceField(label, rawType));
            }
            else {
                _this.append(_this.createAdvancedInterfaceField(label, rawType));
            }
        });
        this.append('\t}');
    };
    TypescriptFileWriter.prototype.finish = function () {
        var _a = this, namespace = _a.options.namespace, fullFilePath = _a.fullFilePath;
        return this.fw
            .appendLine('}')
            .appendLine('')
            .finish()
            .then(function () {
            console.log("\n                The file was saved!.\n                You can import it like so:\n                import { " + namespace + " } from '" + fullFilePath + "';\n            ");
        });
    };
    return TypescriptFileWriter;
}());
exports.TypescriptFileWriter = TypescriptFileWriter;


/***/ }),

/***/ "./src/helpers/files.ts":
/*!******************************!*\
  !*** ./src/helpers/files.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = __webpack_require__(/*! graphql-tag */ "graphql-tag");
var path = __webpack_require__(/*! path */ "path");
var fs = __webpack_require__(/*! fs */ "fs");
var glob = __webpack_require__(/*! glob */ "glob");
/**
 * find the gql tag and gets it's value using regex
 * @param fileContent
 */
function getTypeDefsFromFile(fileContent) {
    var reg = /(gql`)[\S\s]*?(`;|`\s)/g;
    var matches = reg.exec(fileContent);
    if (!matches || matches.length === 0) {
        return null;
    }
    var gqlTag = matches[0];
    gqlTag = gqlTag.substr(0, gqlTag.lastIndexOf('`'));
    gqlTag = gqlTag.substr(gqlTag.indexOf('`') + 1);
    return gqlTag;
}
exports.getTypeDefsFromFile = getTypeDefsFromFile;
/**
 * returning a promise from the glob function and applies needed options
 * @param matcher
 */
function getFileNamesFromGlob(matcher) {
    return new Promise(function (resolve, reject) {
        return glob(matcher, {}, function (err, fileNames) { return err ? reject(err) : resolve(fileNames); });
    });
}
exports.getFileNamesFromGlob = getFileNamesFromGlob;
/**
 * matches files, extract the graphql schema and use gql to create node trees
 * @param matcher
 * @param turnToNodeTree
 */
function collectGQLTypeDefs(matcher, turnToNodeTree) {
    if (turnToNodeTree === void 0) { turnToNodeTree = true; }
    return getFileNamesFromGlob(matcher)
        .then(function (fileNames) {
        // map files into gql definitions
        return fileNames.map(function (filePath) {
            var content = fs.readFileSync(filePath, "utf8");
            return getTypeDefsFromFile(content);
        })
            // filter out matching files without gql
            .filter(function (item) { return item !== null; })
            .map(function (item) { return turnToNodeTree ? graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", ""], ["", ""])), item) : item; });
    });
}
exports.collectGQLTypeDefs = collectGQLTypeDefs;
/**
 * Creates a file with the path to it's directory synchronously,
 * the file cam be emptied by passing true as the second parameter
 * @param filePath
 * @param makeSureEmpty
 */
function ensureFileExistence(filePath, makeSureEmpty) {
    if (makeSureEmpty === void 0) { makeSureEmpty = true; }
    var dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
    var options = makeSureEmpty ? { flag: 'w+' } : {};
    fs.writeFileSync(filePath, '', options);
}
exports.ensureFileExistence = ensureFileExistence;
var templateObject_1;


/***/ }),

/***/ "./src/helpers/gqlNodeTools.ts":
/*!*************************************!*\
  !*** ./src/helpers/gqlNodeTools.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * gets the name of a given node
 * @param node
 */
function getName(node) {
    return node.name.value;
}
exports.getName = getName;
/**
 * get the kind of type from a node
 * @param node
 */
function getTypeKind(node) {
    return node.type.kind;
}
exports.getTypeKind = getTypeKind;
/**
 * gets the description from a node
 * @param node
 */
function getDescription(node) {
    return node.description ? node.description.value : null;
}
exports.getDescription = getDescription;
// handles type definition for Query/Mutation etc...
function createTypeForFunction(node) {
    var returnType = node.type.name.value;
    var args = node.arguments.map(function (argNode) {
        var argName = getName(argNode);
        var argType = getType(argNode);
        var _a = getTypeOptions(argType), type = _a.type, required = _a.required;
        return {
            name: argName,
            required: required,
            type: type
        };
    });
    return {
        kind: 'function',
        args: args,
        returnType: returnType
    };
}
/**
 * gets the type of a node
 * @param node
 */
function getType(node) {
    if (node.kind === 'FieldDefinition' || node.kind === 'InputValueDefinition') {
        var kind = getTypeKind(node);
        var requiredValue = false;
        var type = null;
        if (kind === 'ListType') {
            var childName = getName(node.type.type);
            return childName + "[]";
        }
        if (node.arguments && node.arguments.length > 0) {
            return createTypeForFunction(node);
        }
        else {
            type = node.type.type ? getName(node.type.type) : getName(node.type);
        }
        if (node.type.kind === 'NonNullType') {
            requiredValue = true;
        }
        return requiredValue ? type + '!' : type;
    }
}
exports.getType = getType;
/**
 * returns a key value pait from an enum, optional description
 * @param enumNode
 */
function getEnumKVP(enumNode) {
    var name = getName(enumNode);
    var output = {
        key: name,
        value: enumNode.values.map(function (val) { return val.name.value; })
    };
    var description = getDescription(enumNode);
    if (description) {
        output['description'] = {};
        output['description'][name] = description;
    }
    return output;
}
exports.getEnumKVP = getEnumKVP;
/**
 * returns a key value pait from an object, optional description
 * @param objectNode
 * @param ignoreFields
 */
function getObjectKVP(objectNode, ignoreFields) {
    var name = getName(objectNode);
    var value = {};
    var description = {};
    var objectDescription = getDescription(objectNode);
    if (objectDescription) {
        description[name] = objectDescription;
    }
    objectNode.fields.forEach(function (field) {
        var kvp = null;
        if (field.kind === 'FieldDefinition' || field.kind === 'InputValueDefinition') {
            kvp = getFieldKVP(field, ignoreFields);
        }
        if (kvp) {
            value[kvp.key] = kvp.value;
            if (kvp.description) {
                description[name + "->" + kvp.key] = kvp.description;
            }
        }
    });
    return {
        key: name, value: value, description: description
    };
}
exports.getObjectKVP = getObjectKVP;
/**
 * returns a key value pait from a field, optional description
 * @param node
 * @param ignoreFields
 */
function getFieldKVP(node, ignoreFields) {
    var name = getName(node);
    var value = getType(node);
    if (!ignoreFields[name]) {
        return {
            key: name,
            value: value,
            description: getDescription(node)
        };
    }
}
exports.getFieldKVP = getFieldKVP;
/**
 * converts an array to an object that maps strings to booleans, to allow faster lookup in the array
 * @param arr
 */
function arrayToTruthMapper(arr) {
    var output = {};
    arr.forEach(function (s) {
        output[s] = true;
    });
    return output;
}
exports.arrayToTruthMapper = arrayToTruthMapper;
/**
 * gets the options out of a defined type (our custom defined types):
 * graphql `name: String!` our type `string!` the typescript type `name: string`
 * graphql `name: String` our type `string` the typescript type `name: ?string`
 * @param type
 */
function getTypeOptions(type) {
    if (type.endsWith('!')) {
        return {
            type: type.substring(0, type.lastIndexOf('!')),
            required: true
        };
    }
    else {
        return {
            type: type,
            required: false
        };
    }
}
exports.getTypeOptions = getTypeOptions;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var files_1 = __webpack_require__(/*! ./helpers/files */ "./src/helpers/files.ts");
var gqlNodeTools_1 = __webpack_require__(/*! ./helpers/gqlNodeTools */ "./src/helpers/gqlNodeTools.ts");
var TypescriptFileWriter_1 = __webpack_require__(/*! ./helpers/TypescriptFileWriter */ "./src/helpers/TypescriptFileWriter.ts");
var defaultsDeep = __webpack_require__(/*! lodash/defaultsDeep */ "lodash/defaultsDeep");
var customTypes = {};
var defaultOptions = {
    scalars: customTypes,
    ignoreFields: ['_empty'],
    ignoreTypes: [],
    namespace: 'GraphqlTypes',
    outputFile: 'types.ts'
};
var fileMessage = "/*\n*****************************************************\n* This file was auto generated by gql-to-typescript *\n*                  Type everything!                 *\n*****************************************************\n*/";
function convertFiles(matcher, options) {
    if (options === void 0) { options = {}; }
    return files_1.collectGQLTypeDefs(matcher)
        .then(function (typeDefs) {
        convert(Object.assign(options, { typeDefs: typeDefs }));
    });
}
exports.convertFiles = convertFiles;
function convert(options) {
    var _a = defaultsDeep(options, defaultOptions), typeDefs = _a.typeDefs, scalars = _a.scalars, ignoreFields = _a.ignoreFields, ignoreTypes = _a.ignoreTypes;
    var ignoreMap = gqlNodeTools_1.arrayToTruthMapper(ignoreTypes.concat(ignoreFields));
    var typedValues = defaultsDeep({
        Boolean: 'boolean',
        String: 'string',
        ID: 'string|number',
        Int: 'number',
        Float: 'number'
    }, scalars);
    var state = {};
    var descriptionState = {};
    function assignToState(kvp) {
        var _a;
        var key = kvp.key, value = kvp.value, description = kvp.description;
        if (state[key]) {
            return defaultsDeep(state, (_a = {}, _a[key] = value, _a));
        }
        // assign this as a new type
        if (!typedValues[key]) {
            typedValues[key] = key;
        }
        defaultsDeep(descriptionState, description);
        state[key] = value;
        return;
    }
    typeDefs.forEach(function (doc) {
        doc.definitions.forEach(function (node) {
            switch (node.kind) {
                case 'ObjectTypeDefinition':
                case 'InputObjectTypeDefinition':
                case 'ObjectTypeExtension':
                    assignToState(gqlNodeTools_1.getObjectKVP(node, ignoreMap));
                    break;
                case 'EnumTypeDefinition':
                    assignToState(gqlNodeTools_1.getEnumKVP(node));
                    break;
                default:
                    return;
            }
        });
    });
    var writer = new TypescriptFileWriter_1.TypescriptFileWriter(options, typedValues, fileMessage);
    Object.entries(state).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        if (Array.isArray(value)) {
            writer.writeEnum(key, value, descriptionState);
        }
        else {
            writer.writeInterface(key, value, descriptionState);
        }
    });
    return writer.finish();
}
exports.convert = convert;


/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "glob":
/*!********************************************************************!*\
  !*** external {"commonjs":"glob","commonjs2":"glob","amd":"glob"} ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_glob__;

/***/ }),

/***/ "graphql-tag":
/*!*****************************************************************************************!*\
  !*** external {"commonjs":"graphql-tag","commonjs2":"graphql-tag","amd":"graphql-tag"} ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_graphql_tag__;

/***/ }),

/***/ "lodash/defaultsDeep":
/*!*****************************************************************************************************************!*\
  !*** external {"commonjs":"lodash/defaultsDeep","commonjs2":"lodash/defaultsDeep","amd":"lodash/defaultsDeep"} ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash_defaultsDeep__;

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })

/******/ });
});
//# sourceMappingURL=gql-to-typescript.js.map