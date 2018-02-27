import { Rx7zArchive } from './archive/archive';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { CreateArchiveAction, CreateArchiveProgress, CreateArchiveSuccess, CreateArchiveFailure, CreateArchiveError, CreateArchiveCurrentFile } from './archive/archive.models';
import { Observable } from 'rxjs/Observable';
import { AsyncSubject } from 'rxjs/AsyncSubject';
import { distinct } from 'rxjs/operators';
import { DistinctSubscriber } from 'rxjs/operators/distinct';

export class Rx7z {
    public Manager: Subject<Rx7zActions>;
    public Archive: Rx7zArchive;
    private managerSub: Subscription;

    constructor() {
        this.Manager = new Subject<Rx7zActions>();
        this.Archive = new Rx7zArchive(this.Manager);
    }

    public dispatch(action: Rx7zActions) {
        this.Manager.next(action);
    }

    private processAction(action: Rx7zActions) {
        switch (action.type) {
            case Rx7zActionType.CreateArchive: {
                this.Archive.createArchive(action.payload.archivePath, ...action.payload.files);
            }
                break;
            default:
                break;
        }
    }
}

export enum Rx7zActionType {
    Initialize = 'Initialize',
    CreateArchive = 'Archive_Create',
    CreateArchiveProgress = 'Archive_Create_Progress',
    CreateArchiveCurrentFile = 'Archive_Current_File',
    CreateArchiveSuccess = 'Archive_Creation_Success',
    CreateArchiveFailure = 'Archive_Creation_Failure',
    CreateArchiveError = 'Archive_Creation_Error'
}

export class Rx7zInitAction {
    public readonly type = Rx7zActionType.Initialize
    public payload?: any
}

export type Rx7zActions = 
    | Rx7zInitAction
    | CreateArchiveAction
    | CreateArchiveProgress
    | CreateArchiveSuccess
    | CreateArchiveFailure
    | CreateArchiveError
    | CreateArchiveCurrentFile;

