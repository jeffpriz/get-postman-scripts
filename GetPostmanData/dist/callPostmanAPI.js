"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var tl = require("vsts-task-lib");
var FSData = require("./handleFSData");
var httprequest = require("request-promise-native");
var validInputs = false;
var input_fileName = "";
var input_variablePrefix = "";
var input_shouldPrefixVariables;
var postman_collection_url = "https://api.getpostman.com/collections/";
var postman_collection_id = "5272367-48ff65df-2315-42b5-bc20-fd59e5b4eff8";
//=----------------------------------------------------------
//=  Validate that the inputs were provided as expected
//=----------------------------------------------------------
function validateInputs() {
    //File name input
    tl.debug("validating inputs...");
    validInputs = true;
    try {
        input_fileName = tl.getInput('scriptOutput', true);
    }
    catch (ex) {
        tl.error("a filename is a required input to this task, but was not supplied");
        validInputs = false;
    }
    //Variable Prefix
    try {
        input_shouldPrefixVariables = tl.getBoolInput('shouldPrefixVariables', true);
        tl.debug("the should prefix variables is set to " + input_shouldPrefixVariables.toString());
    }
    catch (ex) {
        tl.debug("There was an error setting the value of the shouldPrefixVariables input, defaulting to true");
        input_shouldPrefixVariables = true;
    }
    validInputs = true;
    try {
        input_variablePrefix = tl.getInput('variablePrefix', true);
        tl.debug("The Variable preix is set to " + input_variablePrefix);
    }
    catch (ex) {
        tl.debug("A Variable name Prefix was not supplied, defaulting to 'json'");
        input_variablePrefix = "json";
    }
}
function callPostman() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var endpoint, reqOption, s, result, e_1;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                endpoint = postman_collection_url + postman_collection_id;
                                reqOption = {
                                    method: 'GET',
                                    uri: postman_collection_url,
                                    simple: true,
                                    resolveWithFullResponse: false,
                                    strictSSL: false,
                                    headers: {
                                        "x-api-key": "253485c02dcf4b7ab628af0e9f6e337e", "description": "", "enabled": true
                                    },
                                    json: true
                                };
                                tl.debug("Options passed to request: " + JSON.stringify(reqOption));
                                s = 0;
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, httprequest(reqOption)];
                            case 2:
                                result = _a.sent();
                                tl.debug("Result status: " + result.statusCode);
                                s = result.statusCode;
                                resolve(result);
                                return [3 /*break*/, 4];
                            case 3:
                                e_1 = _a.sent();
                                tl.debug("error calling Postman: " + e_1.toString());
                                console.log("error calling Postman: " + e_1.toString());
                                reject(e_1);
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
///Run function to handle the async running process of the task
function Run() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var fileContent, collection, err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Call Postman API to retrieve Scripts");
                    //validateInputs();
                    validInputs = true;
                    fileContent = "";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    if (!validInputs) return [3 /*break*/, 4];
                    return [4 /*yield*/, callPostman()];
                case 2:
                    collection = _a.sent();
                    return [4 /*yield*/, FSData.SaveFile("c:\\temp\\collectionlist.json", JSON.stringify(collection))];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    tl.setResult(tl.TaskResult.Failed, "Invalid Inputs");
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_1 = _a.sent();
                    tl.error(err_1);
                    tl.setResult(tl.TaskResult.Failed, "processing JSON failed");
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
//main
try {
    Run();
}
catch (err) {
    tl.setResult(tl.TaskResult.Failed, "Unable to process JSON successfully for variables.");
}
//# sourceMappingURL=callPostmanAPI.js.map