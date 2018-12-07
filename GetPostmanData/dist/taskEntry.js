"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var tl = require("azure-pipelines-task-lib");
var processPostman = require("./processPostman");
var validInputs = false;
var input_fileName = "";
var input_variablePrefix = "";
var input_shouldPrefixVariables;
var postman_collection_url = "https://api.getpostman.com/collections/";
var postman_environment_url = "https://api.getpostman.com/environments/";
var postman_header_apiKey = "";
var get_environments = false;
var environment_folder = "";
var fileSaveLocation = "";
//=----------------------------------------------------------
//=  Validate that the inputs were provided as expected
//=----------------------------------------------------------
function validateInputs() {
    //File name input
    tl.debug("validating inputs...");
    validInputs = true;
    try {
        postman_header_apiKey = tl.getInput('apiKey', true);
    }
    catch (ex) {
        tl.error("a filename is a required input to this task, but was not supplied");
        validInputs = false;
    }
    //Variable Prefix
    try {
        fileSaveLocation = tl.getInput('fileLocation', true);
        if (!(fileSaveLocation.endsWith("\\") || fileSaveLocation.endsWith("/"))) {
            fileSaveLocation = fileSaveLocation + "\\";
        }
    }
    catch (ex) {
        validInputs = false;
        tl.error("There was an error setting the value of the fileLocation input");
    }
    try {
        get_environments = tl.getBoolInput('downloadEnvironments', true);
    }
    catch (ex) {
        validInputs = true;
        get_environments = false;
        tl.warning("There was an error setting the value of the get environments boolean, defaulting to false");
    }
    try {
        environment_folder = tl.getInput('environmentFolder', true);
        if (!(environment_folder.endsWith("\\") || environment_folder.endsWith("/"))) {
            environment_folder = environment_folder + "\\";
        }
    }
    catch (ex) {
        validInputs = false;
        tl.error("There was an error setting the value of the environment folder input");
    }
}
///Run function to handle the async running process of the task
function Run() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var fileContent, success, err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tl.debug("Running task");
                    validateInputs();
                    validInputs = true;
                    fileContent = "";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    if (!validInputs) return [3 /*break*/, 5];
                    return [4 /*yield*/, processPostman.RunPostmanCollectionGet(postman_collection_url, postman_header_apiKey, fileSaveLocation)];
                case 2:
                    success = _a.sent();
                    if (!get_environments) return [3 /*break*/, 4];
                    return [4 /*yield*/, processPostman.RunPostmanEnvironmentGet(postman_environment_url, postman_header_apiKey, fileSaveLocation + environment_folder)];
                case 3:
                    success = _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    tl.setResult(tl.TaskResult.Failed, "Invalid Inputs");
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_1 = _a.sent();
                    tl.error(err_1);
                    tl.setResult(tl.TaskResult.Failed, "Retrieving Files from Postman failed");
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
//main
try {
    Run();
}
catch (err) {
    tl.setResult(tl.TaskResult.Failed, "Unable to retrieve Postman data.");
}
//# sourceMappingURL=taskEntry.js.map