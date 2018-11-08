# Azure Pipeline Get Postman Scripts
TFS and Azure Pipeline task that will call the Postman API to retrieve the JSON scripts from your account and workspaces.

Utilizing this task you can leverage your Postman Enterprise account to manage your scripts, and then pull them down locally so you can put them in a Git repo for better version control.  AND/OR You can also utilize this in conjunction with the Postman Newman task in the Marketplace to pull the JSON files locally for use with that task to run your Postman scripts as part of your build and release pipeline.


## Functionality
This task will pull your Postman scripts from your Postman enterprise account.  You will need to provide the api credentials Token for the task to validate with Postman


## Input Value usage
**Script Output location**
 The Path where the retrieved JSON files should be stored.  If you want to begin managing those scripts in 


**Variable Name Prefix**
The initial prefix of the Variable names.  This lets you specify the root prefix, so you can utilize this task multiple times for multiple files and still organize them accordingly.

![input preview](images/taskSetup.PNG)
     

## Images
![json text](images/jsontext.png)
![task output](images/taskOutput.PNG)

## Source
[GitHub](https://github.com/jeffpriz/vsts-json-to-variable)

## Issues
[File an issue](https://github.com/jeffpriz/vsts-json-to-variable/issues)

## Credits
[Jeff Przylucki](http://www.oneluckidev.com)