"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var gfs = require("graceful-fs");
var tl = require("azure-pipelines-task-lib");
function OpenFile(filename) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var completeSuccess, filecontent;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            completeSuccess = true;
            filecontent = "";
            return [2 /*return*/, new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        try {
                            filecontent = gfs.readFileSync(filename, "utf8");
                            resolve(filecontent);
                        }
                        catch (err) {
                            reject(err);
                        }
                        return [2 /*return*/];
                    });
                }); })];
        });
    });
}
exports.OpenFile = OpenFile;
function SaveFile(filename, jsonData) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var success, e_1;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                success = false;
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                tl.debug("attempting to save file " + filename);
                                tl.debug("file data:");
                                return [4 /*yield*/, gfs.writeFile(filename, jsonData, function (err) {
                                        if (err)
                                            throw err;
                                        console.log('file ' + filename + ' Saved!');
                                        success = true;
                                        resolve(success);
                                    })];
                            case 2:
                                _a.sent();
                                return [3 /*break*/, 4];
                            case 3:
                                e_1 = _a.sent();
                                reject(e_1);
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
exports.SaveFile = SaveFile;
function MakeDirectory(dirname) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var success, e_2;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                success = false;
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, gfs.mkdir(dirname, function (err) {
                                        if (err.code != "EEXIST") {
                                            console.log(err);
                                            reject(err);
                                        }
                                        else {
                                            console.log("directory created or available");
                                        }
                                        resolve(success);
                                    })];
                            case 2:
                                _a.sent();
                                return [3 /*break*/, 4];
                            case 3:
                                e_2 = _a.sent();
                                reject(e_2);
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
exports.MakeDirectory = MakeDirectory;
//# sourceMappingURL=handleFSData.js.map