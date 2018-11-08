"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var tl = require("azure-pipelines-task-lib");
var FSData = require("./handleFSData");
var httprequest = require("request-promise-native");
function callPostman(apiEndpoint, headerApiKey) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var reqOption, result, e_1;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
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
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                tl.debug("calling " + apiEndpoint);
                                return [4 /*yield*/, httprequest(reqOption)];
                            case 2:
                                result = _a.sent();
                                tl.debug("Result status: " + result.statusCode);
                                resolve(result);
                                return [3 /*break*/, 4];
                            case 3:
                                e_1 = _a.sent();
                                tl.debug("error calling Postman: " + e_1.toString());
                                reject(e_1);
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
exports.callPostman = callPostman;
function ProcessAllCollections(collectionList, apiEndpoint, headerApiKey, fileSaveLocation) {
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
                                return [4 /*yield*/, callPostman(apiEndpoint + thisCollection.uid.toString(), headerApiKey)];
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
function RunPostmanCollectionGet(apiEndpoint, headerApiKey, fileSaveLocation) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var collections;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callPostman(apiEndpoint, headerApiKey)];
                            case 1:
                                collections = _a.sent();
                                tl.debug("There were " + collections.collections.length.toString() + " collections found in Postman");
                                return [4 /*yield*/, FSData.SaveFile(fileSaveLocation + "collectionlist.json", JSON.stringify(collections))];
                            case 2:
                                if (!_a.sent()) return [3 /*break*/, 4];
                                return [4 /*yield*/, ProcessAllCollections(collections, apiEndpoint, headerApiKey, fileSaveLocation)];
                            case 3:
                                _a.sent();
                                return [3 /*break*/, 5];
                            case 4:
                                tl.error("The Save File of the collection list failed...?");
                                _a.label = 5;
                            case 5: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
exports.RunPostmanCollectionGet = RunPostmanCollectionGet;
//# sourceMappingURL=processPostman.js.map