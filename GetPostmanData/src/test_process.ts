
import * as processPostman from './processPostman';
import * as FSData from './handleFSData';
 
var postman_collection_url:string = "https://api.getpostman.com/collections/";

var postman_header_apiKey:string = "Api Key Here";
var postman_environment_url:string = "https://api.getpostman.com/environments/";


var input_fileName = "testJsonData.json";
async function Run()
{
    console.log("Reading JSON file to generate variables for future tasks... ");
    var validInputs:boolean=true;
    

    var fileContent:string = "";
    try
    {
        var fileSaveLocation:string = "c:\\temp\\nofolderexists\\";
        await FSData.MakeDirectory(fileSaveLocation);
        var environment_folder:string="environments\\";
        var success:boolean = await processPostman.RunPostmanCollectionGet(postman_collection_url, postman_header_apiKey, fileSaveLocation, 4000);
        success = await processPostman.RunPostmanEnvironmentGet(postman_environment_url, postman_header_apiKey, fileSaveLocation + environment_folder,4000);

    }
    catch(err)
    {
        console.log(err);
    }
}

Run();