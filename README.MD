# Rx7zip

## Getting Started
```bash
npm install rx7z --save
```

## About Rx7z
Rx7z installs the latest 7zip from [7zip.org](http://www.7-zip.org/download.html) for Windows. Other operating systems (p7zip) have not been configured yet. Plans for an `assumed` global installation of (p)7zip via configuration is on the table for discussion.

For simplicity sake i took a redux-ish approach because i would like to implement compression ques and other features in the future.

## Example

```typescript
let rx7 = new Rx7z();
let files = [
    `${path.join('c:/','path','tofiles')}*.txt`,
    `${path.join('c:/','path','tofiles')}*.jpg`
];
rx7.Manager.subscribe((action: Rx7zActions) => {
    switch (action.type) {
        case Rx7zActionType.CreateArchiveProgress: {
            // contains the string value of percentage complete.
            console.log(action);
        }
        case Rx7zActionType.CreateArchiveCurrentFile: {
            // do something when current file changes.
            console.log(action);
        }
        case Rx7zActionType.CreateArchiveError: {
            console.log(action);
        }
        case Rx7zActionType.CreateArchiveFailure: {
            // do something if it fails.
        }
        case Rx7zActionType.CreateArchiveSuccess: {
            // Do something when its done.
        }
        default:
            break;
    }
})

// Dispatch the action to create an archive with the files passed in.
rx7.Archive.createArchive('./test.7z', ...files);

// Dispatch the action to create an archive with the files passed in.
rx7.dispatch(new CreateArchiveAction('output/path/to/archive.7z', files));
```




