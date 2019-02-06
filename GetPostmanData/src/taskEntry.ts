import * as tl from 'azure-pipelines-task-lib';

import * as processPostman from './processPostman';

var validInputs:boolean = false;
var input_fileName:string = "";
var input_variablePrefix:string="";
var input_shouldPrefixVariables:boolean;

var postman_collection_url:string = "https://api.getpostman.com/collections/";
var postman_environment_url:string = "https://api.getpostman.com/environments/"
var postman_header_apiKey:string = "";
var get_environments:boolean = false;
var environment_folder:string="";
var fileSaveLocation:string = "";
var apiPause:number = 100;
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
        if(!(fileSaveLocation.endsWith("\\") || fileSaveLocation.endsWith("/")))
        {
            fileSaveLocation = fileSaveLocation + "\\";
        }
    }
    catch(ex)
    {
        validInputs = false;
        tl.error("There was an error setting the value of the fileLocation input");
        
    }

    
    try
    {
        get_environments = tl.getBoolInput('downloadEnvironments', true);

    }
    catch(ex)
    {
        validInputs = true;
        get_environments = false;
        tl.warning("There was an error setting the value of the get environments boolean, defaulting to false");
        
    }
    
    try
    {
        environment_folder = tl.getInput('environmentFolder', true);
        if(!(environment_folder.endsWith("\\") || environment_folder.endsWith("/")))
        {
            environment_folder = environment_folder + "\\";
        }
    }
    catch(ex)
    {
        validInputs = false;
        tl.error("There was an error setting the value of the environment folder input");
        
    }

        
    try
    {
        apiPause = parseInt(tl.getInput('pauseDuration', true));
        
    }
    catch(ex)
    {
        validInputs = false;
        tl.warning("the Pause duration was not valid or could not be found, defaulting pause to 100ms");
        
        
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
            
            var success:boolean = await processPostman.RunPostmanCollectionGet(postman_collection_url, postman_header_apiKey, fileSaveLocation, apiPause);            
            if(get_environments)
            {
                success = await processPostman.RunPostmanEnvironmentGet(postman_environment_url, postman_header_apiKey, fileSaveLocation + environment_folder, apiPause);
            }
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