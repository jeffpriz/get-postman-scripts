
import * as processPostman from './processPostman';
 
var postman_collection_url:string = "https://api.getpostman.com/collections/";

var postman_header_apiKey:string = "<insert key here>";
var input_fileName = "testJsonData.json";
async function Run()
{
    console.log("Reading JSON file to generate variables for future tasks... ");
    var validInputs:boolean=true;

    var fileContent:string = "";
    try
    {
        var fileSaveLocation:string = "c:\\temp\\";
        var success:boolean = await processPostman.RunPostmanCollectionGet(postman_collection_url, postman_header_apiKey, fileSaveLocation);
    }
    catch(err)
    {
        console.log(err);
    }
}

Run();