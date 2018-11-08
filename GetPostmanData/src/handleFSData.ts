import * as gfs from 'graceful-fs';
import * as tl from 'azure-pipelines-task-lib';

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
            tl.debug(jsonData);
            await gfs.writeFile(filename, jsonData,  function (err) {
            if (err) throw err;

            tl.debug('file ' + filename  + ' Saved!');
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