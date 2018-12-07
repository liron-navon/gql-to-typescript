export interface GqlToTSPublicConfig {
    outputFile?: string;
    namespace?: string;
    scalars?: any;
    ignoreFields?: string[];
    ignoreTypes?: string[];
}

export interface GqlToTSConfig extends GqlToTSPublicConfig{
    typeDefs?: any;
}

export interface Mapper {
    [label: string]: any
}

export interface IKVP {
    key: any,
    value: any,
    description?: Mapper
}
