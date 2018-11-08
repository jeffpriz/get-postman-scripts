import * as tl from 'azure-pipelines-task-lib';

import * as processPostman from './processPostman';

var validInputs:boolean = false;
var input_fileName:string = "";
var input_variablePrefix:string="";
var input_shouldPrefixVariables:boolean;

var postman_collection_url:string = "https://api.getpostman.com/collections/";
var postman_header_apiKey:string = "253485c02dcf4b7ab628af0e9f6e337e";
var fileSaveLocation:string = "";
//=----------------------------------------------------------
//=  Validate that the inputs were provided as expected
//=----------------------------------------------------------
function validateInputs()
{
    //File name input
    tl.debug("validating inputs...");
    
    validInputs = true;
    try {
        postman_header_apiKey = tl.getInput('apiKey',true);
        

    }
    catch(ex)
    {
        tl.error("a filename is a required input to this task, but was not supplied");
        validInputs = false;
    }

    //Variable Prefix

    try
    {
        fileSaveLocation = tl.getInput('fileLocation', true);
        
    }
    catch(ex)
    {
        validInputs = false;
        tl.error("There was an error setting the value of the fileLocation input");
        
    }

}




    ///Run function to handle the async running process of the task
async function Run()
{
    tl.debug("Running task");
    validateInputs();
    validInputs = true;

    var fileContent:string = "";
    try{

        if(validInputs)
        {
            
            var success:boolean = await processPostman.RunPostmanCollectionGet(postman_collection_url, postman_header_apiKey, fileSaveLocation);            
        }
        else
        {
            tl.setResult(tl.TaskResult.Failed, "Invalid Inputs");
        }
    }
    catch(err)
    {
        tl.error(err);        
        tl.setResult(tl.TaskResult.Failed, "Retrieving Files from Postman failed");
    }
}

//main
try
{
    Run();
}
catch(err)
{
    
    tl.setResult(tl.TaskResult.Failed, "Unable to retrieve Postman data.");
}