import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { spawn } from 'child_process';
import { dir7z } from '../../util/constants';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Rx7zActions } from '../..';
import { CreateArchiveProgress, CreateArchiveSuccess, CreateArchiveFailure } from './archive.models';

export class Rx7zArchive {
    constructor(private manager: BehaviorSubject<Rx7zActions>) { }
    public createArchive( archivePath: string, ...files: string[]) {
        let arc = spawn(`${dir7z}7z.exe`, ['a', '-bsp1', `${archivePath}`, ...files])

        arc.stdout.on('data', (data) => {
            const regPercent = new RegExp('(\\d+(\\.\\d+)?|\\.\\d+) ?%').exec(data.toString());
            if (regPercent) {
                this.manager.next(new CreateArchiveProgress(regPercent[0]));
            }
        })
        arc.stderr.on('data', (data) => {
            console.log(data.toString());
        })
        arc.on('close', (code: number, signal: string) => {
            console.log(code);
            code === 0 ? this.manager.next(new CreateArchiveSuccess) : this.manager.next(new CreateArchiveFailure);
        })
    }
}