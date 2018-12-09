import {FileWriter} from './FileWriter';
import {GqlToTSConfig, Mapper} from "./types";
import {getTypeOptions} from "./gqlNodeTools";

const path = require('path');

export class TypescriptFileWriter {
    private fw: FileWriter;
    private readonly fullFilePath: string;

    constructor(private options: GqlToTSConfig, private typedValues: Mapper, startMessage: string) {
        this.fullFilePath = path.join(options.outputFile);
        this.fw = new FileWriter(this.fullFilePath);
        this.fw.appendLine(startMessage);
        if (options.namespace) {
            this.fw.appendLine(`export namespace ${options.namespace} {`);
        }
    }

    append(str: string) {
        this.fw.appendLine(str);
        return this;
    }

    writeDescription(indentation: string, description: string) {
        if (description) {
            this.append(`${indentation}/* ${description} */`);
        }
    }

    writeEnum(name: string, enumarations: Array<string>, descriptionMap: Mapper) {
        this.writeDescription(`\t`, descriptionMap[name]);
        this.append(`\texport enum ${name} {`);
        enumarations.forEach(e => this.append(`\t\t${e},`));
        this.append('\t}');
    }

    private fixTyping(unknownType: string) {
        return this.typedValues[unknownType] || 'any';
    }

    private createAdvancedInterfaceField(label: string, rawType: any) {
        let advancedType = 'any';
        if (rawType.kind === 'function') {
            const {returnType, args} = rawType;
            const printableArguments = args.map(({name, required, type}) => {
                return `${name}${required ? '' : '?'}: ${this.fixTyping(type)}`;
            }).join(', ');
            advancedType = `(${printableArguments}) => ${this.fixTyping(returnType)}`;
        } else {
            // unknown field...
            console.warn(`unknown field ${label}`);
        }
        return `\t\t${label}?: ${advancedType};`;
    }

    private createArrayInterfaceField(label: string, rawType: string) {
        // this is in order to support 1d/2d/3d... arrays
        const arraySymbols = getArraySymbols(rawType);
        const childType = removeArraySymbols(rawType);
        const {type, required} = getTypeOptions(childType);
        return `\t\t${label}${required ? '' : '?'}: ${this.fixTyping(type)}${arraySymbols};`;
    }

    private createRegularInterfaceField(label: string, rawType: string) {
        const {type, required} = getTypeOptions(rawType);
        return `\t\t${label}${required ? '' : '?'}: ${this.fixTyping(type)};`;
    }

    writeInterface(name: string, data: Mapper, descriptionMap: Mapper) {
        this.writeDescription(`\t`, descriptionMap[name]);
        this.append(`\texport interface ${name} {`);
        Object.entries(data).forEach(([label, rawType]) => {
            this.writeDescription(`\t`, descriptionMap[`${name}->${label}`]);
            if (typeof rawType === "string") {
                if (rawType.endsWith('[]') || rawType.endsWith('[]!')) {
                    this.append(this.createArrayInterfaceField(label, rawType))
                } else {
                    this.append(this.createRegularInterfaceField(label, rawType))
                }
            } else {
                this.append(this.createAdvancedInterfaceField(label, rawType))
            }
        });
        this.append('\t}')
    }

    finish(silent: boolean = false) {
        const {options: {namespace}, fullFilePath} = this;
        return this.fw
            .appendLine('}')
            .appendLine('')
            .finish()
            .then(() => {
                if (!silent) {
                    console.log(`
                The types file was saved!.
                You can import it like so:
                import { ${namespace} } from '${fullFilePath}';
            `);
                }
            })
    }
}

/**
 * accept a string with an array symbols such as number[][], and returns the array symbols ('[][]')
 * @param rawString
 */
function getArraySymbols(rawString: string) {
    const numberOfMatches = rawString.match(/\[\]/g).length;
    return '[]'.repeat(numberOfMatches);
}

/**
 * Accept a string with array symbols and return the type without the array part
 * @param rawString
 */
function removeArraySymbols(rawString: string) {
    return rawString.replace(/\[\]/g, '')
}
