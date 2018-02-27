import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { spawn } from 'child_process';
import { dir7z } from '../../util/constants';
import { Rx7zActions } from '../..';
import { CreateArchiveProgress, CreateArchiveSuccess, CreateArchiveFailure, CreateArchiveError, CreateArchiveCurrentFile } from './archive.models';

export class Rx7zArchive {
    constructor(private manager: Subject<Rx7zActions>) { }
    public createArchive(archivePath: string, ...files: string[]) {
        let arc = spawn(`${dir7z}7z.exe`, ['a', '-bb3', '-bsp1', `${archivePath}`, ...files])
        let percent: string = '';
        let currentFile: string = '';
        arc.stdout.on('data', (data) => {
            const regPercent = new RegExp('(\\d+(\\.\\d+)?|\\.\\d+) ?%').exec(data.toString());
            if (regPercent) {
                if (regPercent[0] !== percent) {
                    percent = regPercent[0];
                    this.manager.next(new CreateArchiveProgress({percent}));
                }
            }
            var re1 = '.*?';	// Non-greedy match on filler
            var re2 = '((?:[a-z][a-z\\.\\d\\-]+)\\.(?:[a-z][a-z\\-]+))(?![\\w\\.])';	// Fully Qualified Domain Name 1

            const regFileName = new RegExp(re1 + re2, 'i').exec(data.toString());
            if (regFileName) {
                if (currentFile !== regFileName[1]) {
                    currentFile = regFileName[1];
                    this.manager.next(new CreateArchiveCurrentFile({file: currentFile}))
                }
            }
        })
        arc.stderr.pipe(process.stderr);
        arc.stderr.on('data', (data) => {
            this.manager.next(new CreateArchiveError({error: data.toString()}))
        })
        arc.on('close', (code: number, signal: string) => {
            code === 0 ? this.manager.next(new CreateArchiveSuccess) : this.manager.next(new CreateArchiveFailure);
        })
    }
}