"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var tl = require("azure-pipelines-task-lib");
var FSData = require("./handleFSData");
var httprequest = require("request-promise-native");
function callPostman(apiEndpoint, headerApiKey, apiPause) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var reqOption, result, e_1;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, delay(apiPause)];
                            case 1:
                                _a.sent();
                                reqOption = {
                                    method: 'GET',
                                    uri: apiEndpoint,
                                    simple: true,
                                    resolveWithFullResponse: false,
                                    strictSSL: false,
                                    headers: {
                                        "x-api-key": headerApiKey, "description": "", "enabled": true
                                    },
                                    json: true
                                };
                                tl.debug("Options passed to request: " + JSON.stringify(reqOption));
                                _a.label = 2;
                            case 2:
                                _a.trys.push([2, 4, , 5]);
                                tl.debug("calling " + apiEndpoint);
                                return [4 /*yield*/, httprequest(reqOption)];
                            case 3:
                                result = _a.sent();
                                tl.debug("Result status: " + result.statusCode);
                                resolve(result);
                                return [3 /*break*/, 5];
                            case 4:
                                e_1 = _a.sent();
                                tl.warning("Error while calling Postman: " + e_1.toString());
                                reject(e_1);
                                return [3 /*break*/, 5];
                            case 5: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
exports.callPostman = callPostman;
function delay(ms) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
        });
    });
}
function ProcessAllCollections(collectionList, apiEndpoint, headerApiKey, fileSaveLocation, apiPause) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var e_2, _a, _b, _c, thisCollection, thisCollectionJSON, ex_1, e_2_1;
                    return tslib_1.__generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                _d.trys.push([0, 8, 9, 10]);
                                _b = tslib_1.__values(collectionList.collections), _c = _b.next();
                                _d.label = 1;
                            case 1:
                                if (!!_c.done) return [3 /*break*/, 7];
                                thisCollection = _c.value;
                                console.log("attempting to call Postman API for collection..");
                                console.log(thisCollection.name + " - " + thisCollection.uid.toString());
                                _d.label = 2;
                            case 2:
                                _d.trys.push([2, 5, , 6]);
                                return [4 /*yield*/, callPostman(apiEndpoint + thisCollection.uid.toString(), headerApiKey, apiPause)];
                            case 3:
                                thisCollectionJSON = _d.sent();
                                return [4 /*yield*/, FSData.SaveFile(fileSaveLocation + thisCollection.name + ".json", JSON.stringify(thisCollectionJSON))];
                            case 4:
                                _d.sent();
                                resolve(true);
                                return [3 /*break*/, 6];
                            case 5:
                                ex_1 = _d.sent();
                                tl.debug("Error attempting to retrieve and/or save json for collection");
                                tl.debug(ex_1.toString());
                                reject(ex_1);
                                return [3 /*break*/, 6];
                            case 6:
                                _c = _b.next();
                                return [3 /*break*/, 1];
                            case 7: return [3 /*break*/, 10];
                            case 8:
                                e_2_1 = _d.sent();
                                e_2 = { error: e_2_1 };
                                return [3 /*break*/, 10];
                            case 9:
                                try {
                                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                }
                                finally { if (e_2) throw e_2.error; }
                                return [7 /*endfinally*/];
                            case 10: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
exports.ProcessAllCollections = ProcessAllCollections;
function RunPostmanCollectionGet(apiEndpoint, headerApiKey, fileSaveLocation, apiPause) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var collections, ex_2;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 6, , 7]);
                                return [4 /*yield*/, callPostman(apiEndpoint, headerApiKey, apiPause)];
                            case 1:
                                collections = _a.sent();
                                tl.debug("There were " + collections.collections.length.toString() + " collections found in Postman");
                                return [4 /*yield*/, FSData.SaveFile(fileSaveLocation + "collectionlist.json", JSON.stringify(collections))];
                            case 2:
                                if (!_a.sent()) return [3 /*break*/, 4];
                                return [4 /*yield*/, ProcessAllCollections(collections, apiEndpoint, headerApiKey, fileSaveLocation, apiPause)];
                            case 3:
                                _a.sent();
                                return [3 /*break*/, 5];
                            case 4:
                                tl.error("The Save File of the collection list failed...?");
                                _a.label = 5;
                            case 5:
                                resolve(true);
                                return [3 /*break*/, 7];
                            case 6:
                                ex_2 = _a.sent();
                                reject(ex_2);
                                return [3 /*break*/, 7];
                            case 7: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
exports.RunPostmanCollectionGet = RunPostmanCollectionGet;
function RunPostmanEnvironmentGet(apiEndpoint, headerApiKey, fileSaveLocation, apiPause) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var environments, ex_3, ex_4;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 10, , 11]);
                                return [4 /*yield*/, callPostman(apiEndpoint, headerApiKey, apiPause)];
                            case 1:
                                environments = _a.sent();
                                _a.label = 2;
                            case 2:
                                _a.trys.push([2, 4, , 5]);
                                return [4 /*yield*/, FSData.MakeDirectory(fileSaveLocation)];
                            case 3:
                                _a.sent();
                                return [3 /*break*/, 5];
                            case 4:
                                ex_3 = _a.sent();
                                console.log("if folder could not be created, then the save of environments will not proceed");
                                return [3 /*break*/, 5];
                            case 5: return [4 /*yield*/, FSData.SaveFile(fileSaveLocation + "environments.json", JSON.stringify(environments))];
                            case 6:
                                if (!_a.sent()) return [3 /*break*/, 8];
                                return [4 /*yield*/, ProcessAllEnvironments(environments, apiEndpoint, headerApiKey, fileSaveLocation, apiPause)];
                            case 7:
                                _a.sent();
                                return [3 /*break*/, 9];
                            case 8:
                                tl.error("The Save File of the collection list failed...?");
                                _a.label = 9;
                            case 9:
                                resolve(true);
                                return [3 /*break*/, 11];
                            case 10:
                                ex_4 = _a.sent();
                                reject(ex_4);
                                return [3 /*break*/, 11];
                            case 11: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
exports.RunPostmanEnvironmentGet = RunPostmanEnvironmentGet;
function ProcessAllEnvironments(environmentList, apiEndpoint, headerApiKey, fileSaveLocation, apiPause) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var e_3, _a, _b, _c, thisEnvironment, thisEnvironmentJSON, ex_5, e_3_1;
                    return tslib_1.__generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                _d.trys.push([0, 8, 9, 10]);
                                _b = tslib_1.__values(environmentList.environments), _c = _b.next();
                                _d.label = 1;
                            case 1:
                                if (!!_c.done) return [3 /*break*/, 7];
                                thisEnvironment = _c.value;
                                console.log("attempting to call Postman API for environment..");
                                console.log(thisEnvironment.name + " - " + thisEnvironment.uid.toString());
                                _d.label = 2;
                            case 2:
                                _d.trys.push([2, 5, , 6]);
                                return [4 /*yield*/, callPostman(apiEndpoint + thisEnvironment.uid.toString(), headerApiKey, apiPause)];
                            case 3:
                                thisEnvironmentJSON = _d.sent();
                                return [4 /*yield*/, FSData.SaveFile(fileSaveLocation + thisEnvironment.name + ".json", JSON.stringify(thisEnvironmentJSON))];
                            case 4:
                                _d.sent();
                                resolve(true);
                                return [3 /*break*/, 6];
                            case 5:
                                ex_5 = _d.sent();
                                tl.debug("Error attempting to retrieve and/or save json for collection");
                                tl.debug(ex_5.toString());
                                reject(ex_5);
                                return [3 /*break*/, 6];
                            case 6:
                                _c = _b.next();
                                return [3 /*break*/, 1];
                            case 7: return [3 /*break*/, 10];
                            case 8:
                                e_3_1 = _d.sent();
                                e_3 = { error: e_3_1 };
                                return [3 /*break*/, 10];
                            case 9:
                                try {
                                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                }
                                finally { if (e_3) throw e_3.error; }
                                return [7 /*endfinally*/];
                            case 10: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
exports.ProcessAllEnvironments = ProcessAllEnvironments;
//# sourceMappingURL=processPostman.js.map