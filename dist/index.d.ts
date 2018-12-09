import { GqlToTSConfig, GqlToTSFilesConfig } from "./helpers/types";
export declare const getDefaultOption: () => {
    scalars: {};
    ignoreFields: string[];
    ignoreTypes: any[];
    namespace: string;
    outputFile: string;
    silent: boolean;
};
export declare function convertFiles(matcher: any, options?: GqlToTSFilesConfig): Promise<void>;
export declare function convert(options: GqlToTSConfig): Promise<void>;
