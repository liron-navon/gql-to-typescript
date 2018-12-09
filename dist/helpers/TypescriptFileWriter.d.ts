import { GqlToTSConfig, Mapper } from "./types";
export declare class TypescriptFileWriter {
    private options;
    private typedValues;
    private fw;
    private readonly fullFilePath;
    constructor(options: GqlToTSConfig, typedValues: Mapper, startMessage: string);
    append(str: string): this;
    writeDescription(indentation: string, description: string): void;
    writeEnum(name: string, enumarations: Array<string>, descriptionMap: Mapper): void;
    private fixTyping;
    private createAdvancedInterfaceField;
    private createArrayInterfaceField;
    private createRegularInterfaceField;
    writeInterface(name: string, data: Mapper, descriptionMap: Mapper): void;
    finish(silent?: boolean): Promise<void>;
}
