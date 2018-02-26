import { Rx7zActionType } from "../../index";
export declare class CreateArchiveAction {
    archivePath: string;
    files: string[];
    readonly type: Rx7zActionType;
    constructor(archivePath: string, files: string[]);
}
export declare class CreateArchiveProgress {
    progress: string;
    readonly type: Rx7zActionType;
    constructor(progress: string);
}
export declare class CreateArchiveSuccess {
    readonly type: Rx7zActionType;
}
export declare class CreateArchiveFailure {
    readonly type: Rx7zActionType;
}
