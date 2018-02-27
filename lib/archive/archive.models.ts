import { Rx7zActionType } from "../../index";

export class CreateArchiveAction {
    public readonly type = Rx7zActionType.CreateArchive;
    constructor(
        public payload: {
            archivePath: string,
            files: string[]
        }
    ) { }
}

export class CreateArchiveError {
    public readonly type = Rx7zActionType.CreateArchiveError;
    constructor(public payload: { error: string }) { }
}

export class CreateArchiveProgress {
    public readonly type = Rx7zActionType.CreateArchiveProgress;
    constructor(public payload: { percent: string }) { }
}

export class CreateArchiveCurrentFile {
    public readonly type = Rx7zActionType.CreateArchiveCurrentFile;
    constructor(public payload: { file: string }) { }
}

export class CreateArchiveSuccess {
    public readonly type = Rx7zActionType.CreateArchiveSuccess;
    constructor(public payload?: any) { }
}

export class CreateArchiveFailure {
    public readonly type = Rx7zActionType.CreateArchiveFailure;
    constructor(public payload?: any) { }
}