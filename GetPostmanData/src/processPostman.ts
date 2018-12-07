import * as tl from 'azure-pipelines-task-lib';
import * as FSData from './handleFSData';

import * as httprequest from 'request-promise-native';
import { resolveSrv } from 'dns';

export async function callPostman(apiEndpoint:string, headerApiKey:string):Promise<any>
{

    return new Promise<any>(async (resolve, reject) => { 
        
        var reqOption = {
            method:'GET',
            uri:apiEndpoint,
            simple:true,
            resolveWithFullResponse: false,
            strictSSL: false,
            headers: {
                "x-api-key":headerApiKey,"description":"","enabled":true
            },
            json: true
        };

        tl.debug("Options passed to request: " + JSON.stringify(reqOption));        
        try
        {
            tl.debug("calling " + apiEndpoint);
            var result = await httprequest(reqOption);            
            tl.debug("Result status: " + result.statusCode);            
            resolve(result);
        }
        catch(e)
        {
            tl.debug("error calling Postman: " + e.toString())        
            reject(e);
        }
    });


}


export async function ProcessAllCollections(collectionList:any, apiEndpoint:string, headerApiKey:string, fileSaveLocation:string):Promise<boolean>
{
    return new Promise<boolean>(async (resolve, reject) => { 
        for (let thisCollection of collectionList.collections) 
        {
            console.log("attempting to call Postman API for collection..");
            console.log(thisCollection.name + " - " + thisCollection.uid.toString()) ;
            try {
            var thisCollectionJSON = await callPostman(apiEndpoint + thisCollection.uid.toString(), headerApiKey);
            
            await FSData.SaveFile( fileSaveLocation + thisCollection.name + ".json", JSON.stringify(thisCollectionJSON));
            resolve(true);
            }
            catch(ex)
            {
                tl.debug("Error attempting to retrieve and/or save json for collection");
                tl.debug(ex.toString());
                reject(ex);

                
            }
        }
    });

}

export async function RunPostmanCollectionGet(apiEndpoint:string, headerApiKey:string, fileSaveLocation:string):Promise<boolean>
{
    return new Promise<boolean>(async (resolve, reject) => { 
        try
        {
            var collections:any = await callPostman(apiEndpoint, headerApiKey);
            tl.debug("There were " + collections.collections.length.toString() + " collections found in Postman");
            if (await FSData.SaveFile( fileSaveLocation +"collectionlist.json", JSON.stringify(collections)))
            {
                await ProcessAllCollections(collections, apiEndpoint, headerApiKey, fileSaveLocation);
            }
            else
            {
                tl.error("The Save File of the collection list failed...?");
            }
            resolve(true);

        }
        catch(ex)
        {
            reject(ex);
        }
    
        
    });
}




export async function RunPostmanEnvironmentGet(apiEndpoint:string, headerApiKey:string, fileSaveLocation:string):Promise<boolean>
{
    return new Promise<boolean>(async (resolve, reject) => { 
        try 
        {
            var environments:any = await callPostman(apiEndpoint, headerApiKey);
        // tl.debug("There were " + environments.collections.length.toString() + " collections found in Postman");
            
            try
            {   await FSData.MakeDirectory(fileSaveLocation);
            }
            catch(ex)
            {
                console.log("if folder could not be created, then the save of environments will not proceed");
            }
            if (await FSData.SaveFile( fileSaveLocation +"environments.json", JSON.stringify(environments)))
            {
                
              await ProcessAllEnvironments(environments, apiEndpoint, headerApiKey, fileSaveLocation);
            }
            else
            {
                tl.error("The Save File of the collection list failed...?");
            }
            resolve(true);
        }
        catch(ex)
        {
            reject(ex);
        }
    });
}


export async function ProcessAllEnvironments(environmentList:any, apiEndpoint:string, headerApiKey:string, fileSaveLocation:string):Promise<boolean>
{
    return new Promise<boolean>(async (resolve, reject) => { 
        for (let thisEnvironment of environmentList.environments) 
        {
            console.log("attempting to call Postman API for environment..");
            console.log(thisEnvironment.name + " - " + thisEnvironment.uid.toString()) ;
            try {
            var thisEnvironmentJSON = await callPostman(apiEndpoint + thisEnvironment.uid.toString(), headerApiKey);
            
            await FSData.SaveFile( fileSaveLocation + thisEnvironment.name + ".json", JSON.stringify(thisEnvironmentJSON));
            resolve(true);
            }
            catch(ex)
            {
                tl.debug("Error attempting to retrieve and/or save json for collection");
                tl.debug(ex.toString());
                reject(ex);

                
            }
        }
    });

}