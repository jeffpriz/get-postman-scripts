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
            tl.debug("attempting to call Postman API for collection..");
            tl.debug(thisCollection.name + " - " + thisCollection.uid.toString()) ;
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
    });
}