export declare function callPostman(apiEndpoint: string, headerApiKey: string, apiPause: number): Promise<any>;
export declare function ProcessAllCollections(collectionList: any, apiEndpoint: string, headerApiKey: string, fileSaveLocation: string, apiPause: number): Promise<boolean>;
export declare function RunPostmanCollectionGet(apiEndpoint: string, headerApiKey: string, fileSaveLocation: string, apiPause: number): Promise<boolean>;
export declare function RunPostmanEnvironmentGet(apiEndpoint: string, headerApiKey: string, fileSaveLocation: string, apiPause: number): Promise<boolean>;
export declare function ProcessAllEnvironments(environmentList: any, apiEndpoint: string, headerApiKey: string, fileSaveLocation: string, apiPause: number): Promise<boolean>;
