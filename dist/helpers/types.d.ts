export interface GqlToTSFilesConfig {
    outputFile?: string;
    namespace?: string;
    scalars?: any;
    ignoreFields?: string[];
    ignoreTypes?: string[];
    silent?: boolean;
}
export interface GqlToTSConfig extends GqlToTSFilesConfig {
    typeDefs?: any;
}
export interface Mapper {
    [label: string]: any;
}
export interface IKVP {
    key: any;
    value: any;
    description?: Mapper;
}
