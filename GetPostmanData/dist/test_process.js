"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var processPostman = require("./processPostman");
var postman_collection_url = "https://api.getpostman.com/collections/";
var postman_header_apiKey = "api key here";
var postman_environment_url = "https://api.getpostman.com/environments/";
var input_fileName = "testJsonData.json";
function Run() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var validInputs, fileContent, fileSaveLocation, environment_folder, success, err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Reading JSON file to generate variables for future tasks... ");
                    validInputs = true;
                    fileContent = "";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    fileSaveLocation = "c:\\temp\\";
                    environment_folder = "environments\\";
                    return [4 /*yield*/, processPostman.RunPostmanCollectionGet(postman_collection_url, postman_header_apiKey, fileSaveLocation, 4000)];
                case 2:
                    success = _a.sent();
                    return [4 /*yield*/, processPostman.RunPostmanEnvironmentGet(postman_environment_url, postman_header_apiKey, fileSaveLocation + environment_folder, 4000)];
                case 3:
                    success = _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
Run();
//# sourceMappingURL=test_process.js.map