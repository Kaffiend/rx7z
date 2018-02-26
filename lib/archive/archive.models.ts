import { Rx7zActionType } from "../../index";

export class CreateArchiveAction {
    public readonly type = Rx7zActionType.CreateArchive;
    constructor(
        public archivePath: string,
        public files: string[]
    ) { }
}

export class CreateArchiveProgress {
    public readonly type = Rx7zActionType.CreateArchiveProgress;
    constructor(public progress: string) { }
}

export class CreateArchiveSuccess {
    public readonly type = Rx7zActionType.CreateArchiveSuccess;
}

export class CreateArchiveFailure {
    public readonly type = Rx7zActionType.CreateArchiveFailure;
}