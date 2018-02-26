import { Rx7zArchive } from './archive/archive';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CreateArchiveAction, CreateArchiveProgress, CreateArchiveSuccess, CreateArchiveFailure } from './archive/archive.models';
export declare class Rx7z {
    Manager: BehaviorSubject<Rx7zActions>;
    Archive: Rx7zArchive;
    private managerSub;
    constructor();
    dispatch(action: Rx7zActions): void;
    private processAction(action);
}
export declare enum Rx7zActionType {
    Initialize = "Initialize",
    Create = "Archive_Create",
    CreateArchiveProgress = "Archive_Create_Progress",
    CreateArchiveSuccess = "Archive_Creation_Success",
    CreateArchiveFailure = "Archive_Creation_Failure",
}
export declare class Rx7zInitAction {
    readonly type: Rx7zActionType;
}
export declare type Rx7zActions = Rx7zInitAction | CreateArchiveAction | CreateArchiveProgress | CreateArchiveSuccess | CreateArchiveFailure;
