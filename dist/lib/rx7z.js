"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const archive_1 = require("./archive/archive");
const BehaviorSubject_1 = require("rxjs/BehaviorSubject");
class Rx7z {
    constructor() {
        this.Manager = new BehaviorSubject_1.BehaviorSubject(new Rx7zInitAction);
        this.managerSub = this.Manager.subscribe((action) => {
            this.processAction(action);
        });
        this.Archive = new archive_1.Rx7zArchive(this.Manager);
    }
    dispatch(action) {
        this.Manager.next(action);
    }
    processAction(action) {
        switch (action.type) {
            case Rx7zActionType.Create:
                {
                    this.Archive.createArchive(action.archivePath, ...action.files);
                }
                break;
            default:
                break;
        }
    }
}
exports.Rx7z = Rx7z;
var Rx7zActionType;
(function (Rx7zActionType) {
    Rx7zActionType["Initialize"] = "Initialize";
    Rx7zActionType["Create"] = "Archive_Create";
    Rx7zActionType["CreateArchiveProgress"] = "Archive_Create_Progress";
    Rx7zActionType["CreateArchiveSuccess"] = "Archive_Creation_Success";
    Rx7zActionType["CreateArchiveFailure"] = "Archive_Creation_Failure";
})(Rx7zActionType = exports.Rx7zActionType || (exports.Rx7zActionType = {}));
class Rx7zInitAction {
    constructor() {
        this.type = Rx7zActionType.Initialize;
    }
}
exports.Rx7zInitAction = Rx7zInitAction;
//# sourceMappingURL=rx7z.js.map