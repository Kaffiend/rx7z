"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
class CreateArchiveAction {
    constructor(archivePath, files) {
        this.archivePath = archivePath;
        this.files = files;
        this.type = index_1.Rx7zActionType.Create;
    }
}
exports.CreateArchiveAction = CreateArchiveAction;
class CreateArchiveProgress {
    constructor(progress) {
        this.progress = progress;
        this.type = index_1.Rx7zActionType.CreateArchiveProgress;
    }
}
exports.CreateArchiveProgress = CreateArchiveProgress;
class CreateArchiveSuccess {
    constructor() {
        this.type = index_1.Rx7zActionType.CreateArchiveSuccess;
    }
}
exports.CreateArchiveSuccess = CreateArchiveSuccess;
class CreateArchiveFailure {
    constructor() {
        this.type = index_1.Rx7zActionType.CreateArchiveFailure;
    }
}
exports.CreateArchiveFailure = CreateArchiveFailure;
//# sourceMappingURL=archive.models.js.map