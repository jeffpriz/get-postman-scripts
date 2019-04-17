"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var tl = require("azure-pipelines-task-lib");
var FSData = require("./handleFSData");
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
var apiPause = 100;
//=----------------------------------------------------------
//=  Validate that the inputs were provided as expected
//=----------------------------------------------------------
function validateInputs() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var ex_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
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
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    fileSaveLocation = tl.getInput('fileLocation', true);
                    if (!(fileSaveLocation.endsWith("\\") || fileSaveLocation.endsWith("/"))) {
                        fileSaveLocation = fileSaveLocation + "\\";
                    }
                    return [4 /*yield*/, FSData.MakeDirectory(fileSaveLocation)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    ex_1 = _a.sent();
                    validInputs = false;
                    tl.error("There was an error setting the value of the fileLocation input");
                    return [3 /*break*/, 4];
                case 4:
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
                    try {
                        apiPause = parseInt(tl.getInput('pauseDuration', true));
                    }
                    catch (ex) {
                        validInputs = false;
                        tl.warning("the Pause duration was not valid or could not be found, defaulting pause to 100ms");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
///Run function to handle the async running process of the task
function Run() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var fileContent, success, err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tl.debug("Running task");
                    validInputs = true;
                    return [4 /*yield*/, validateInputs()];
                case 1:
                    _a.sent();
                    fileContent = "";
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 8, , 9]);
                    if (!validInputs) return [3 /*break*/, 6];
                    return [4 /*yield*/, processPostman.RunPostmanCollectionGet(postman_collection_url, postman_header_apiKey, fileSaveLocation, apiPause)];
                case 3:
                    success = _a.sent();
                    if (!get_environments) return [3 /*break*/, 5];
                    return [4 /*yield*/, processPostman.RunPostmanEnvironmentGet(postman_environment_url, postman_header_apiKey, fileSaveLocation + environment_folder, apiPause)];
                case 4:
                    success = _a.sent();
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    tl.setResult(tl.TaskResult.Failed, "Invalid Inputs");
                    _a.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    err_1 = _a.sent();
                    tl.error(err_1);
                    tl.setResult(tl.TaskResult.Failed, "Retrieving Files from Postman failed");
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
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