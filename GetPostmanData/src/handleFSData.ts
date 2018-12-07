import * as gfs from 'graceful-fs';
import * as tl from 'azure-pipelines-task-lib';
import { EEXIST } from 'constants';
import { resolveSrv } from 'dns';

export async function OpenFile(filename:string):Promise<string>
{
    var completeSuccess:boolean = true;
    var filecontent:string = "";

    return new Promise<string>(async (resolve, reject) => {
        try 
        {
            filecontent =  gfs.readFileSync(filename,"utf8");
            resolve(filecontent);
        }
        catch(err)
        {            
            reject(err);
        }
        
    });
}

export async function SaveFile(filename:string, jsonData:any):Promise<boolean>
{
    return new Promise<boolean>(async(resolve, reject) => {
        var success:boolean = false;
        try
        {
            tl.debug("attempting to save file " + filename);
            tl.debug("file data:")
            
            await gfs.writeFile(filename, jsonData,  function (err) {
            if (err) throw err;

           console.log('file ' + filename  + ' Saved!');
            success = true;
            resolve(success);
            });
        }
        catch(e)
        {
            reject(e);
        }

    });
}

export async function MakeDirectory(dirname:string):Promise<boolean>
{
    return new Promise<boolean>(async(resolve, reject) => {
        var success:boolean = false;
        try
        {
         
            await gfs.mkdir(dirname, function(err){
                if(err != null)
                {
                    if(err.code != "EEXIST")
                    {
                        console.log(err);
                        reject(err);
                    }
                    else{
                        console.log("directory created or available");
                    }
                    resolve(success);
                }
                else{
                    resolve(success);
                }
            });
            
        }
        catch(e)
        {
            reject(e);
        }

    });
}