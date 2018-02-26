"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const constants_1 = require("../../util/constants");
const archive_models_1 = require("./archive.models");
class Rx7zArchive {
    constructor(manager) {
        this.manager = manager;
    }
    createArchive(archivePath, ...files) {
        let arc = child_process_1.spawn(`${constants_1.dir7z}7z.exe`, ['a', '-bsp1', `${archivePath}`, ...files]);
        arc.stdout.on('data', (data) => {
            const regPercent = new RegExp('(\\d+(\\.\\d+)?|\\.\\d+) ?%').exec(data.toString());
            if (regPercent) {
                this.manager.next(new archive_models_1.CreateArchiveProgress(regPercent[0]));
            }
        });
        arc.stderr.on('data', (data) => {
            console.log(data.toString());
        });
        arc.on('close', (code, signal) => {
            console.log(code);
            code === 0 ? this.manager.next(new archive_models_1.CreateArchiveSuccess) : this.manager.next(new archive_models_1.CreateArchiveFailure);
        });
    }
}
exports.Rx7zArchive = Rx7zArchive;
//# sourceMappingURL=archive.js.map