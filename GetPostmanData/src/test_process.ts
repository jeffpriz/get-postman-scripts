
import * as processPostman from './processPostman';
 
var postman_collection_url:string = "https://api.getpostman.com/collections/";

var postman_header_apiKey:string = "253485c02dcf4b7ab628af0e9f6e337e";
var postman_environment_url:string = "https://api.getpostman.com/environments/";


var input_fileName = "testJsonData.json";
async function Run()
{
    console.log("Reading JSON file to generate variables for future tasks... ");
    var validInputs:boolean=true;

    var fileContent:string = "";
    try
    {
        var fileSaveLocation:string = "c:\\temp\\";
        var environment_folder:string="environments\\";
        var success:boolean = await processPostman.RunPostmanCollectionGet(postman_collection_url, postman_header_apiKey, fileSaveLocation);
        success = await processPostman.RunPostmanEnvironmentGet(postman_environment_url, postman_header_apiKey, fileSaveLocation + environment_folder);

    }
    catch(err)
    {
        console.log(err);
    }
}

Run();