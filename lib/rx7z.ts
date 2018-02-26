import { Rx7zArchive } from './archive/archive';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CreateArchiveAction, CreateArchiveProgress, CreateArchiveSuccess, CreateArchiveFailure } from './archive/archive.models';

export class Rx7z {
    public Manager: BehaviorSubject<Rx7zActions>;
    public Archive: Rx7zArchive;
    private managerSub: Subscription;

    constructor() {
        this.Manager = new BehaviorSubject<Rx7zActions>(new Rx7zInitAction);
        this.managerSub = this.Manager.subscribe((action: Rx7zActions) => {
            this.processAction(action);
        })
        this.Archive = new Rx7zArchive(this.Manager);
    }

    public dispatch(action: Rx7zActions) {
        this.Manager.next(action);
    }

    private processAction(action: Rx7zActions) {
        switch (action.type) {
            case Rx7zActionType.Create: {
                this.Archive.createArchive(action.archivePath, ...action.files);
            }
                break;
            default:
                break;
        }
    }
}

export enum Rx7zActionType {
    Initialize = 'Initialize',
    Create = 'Archive_Create',
    CreateArchiveProgress = 'Archive_Create_Progress',
    CreateArchiveSuccess = 'Archive_Creation_Success',
    CreateArchiveFailure = 'Archive_Creation_Failure'
}

export class Rx7zInitAction {
    public readonly type = Rx7zActionType.Initialize
}

export type Rx7zActions = 
    | Rx7zInitAction
    | CreateArchiveAction
    | CreateArchiveProgress
    | CreateArchiveSuccess
    | CreateArchiveFailure;

