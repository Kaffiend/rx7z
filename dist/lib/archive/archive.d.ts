import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Rx7zActions } from '../..';
export declare class Rx7zArchive {
    private manager;
    constructor(manager: BehaviorSubject<Rx7zActions>);
    createArchive(archivePath: string, ...files: string[]): void;
}
