var path = require('path');
var fs = require('fs');
var wget = require('wget-improved');
var decompress = require('decompress');
var os = require('os');
var spawn = require('child_process').spawn;

var dir7z = path.join(__dirname, '../bin/');
var src7zWinX64 = 'http://www.7-zip.org/a/7z1801-x64.exe';
var outputDir = path.join(dir7z, 'install_7z.exe');

if (fs.existsSync(dir7z)) {
    fs.unlinkSync(dir7z);
} else {
    fs.mkdirSync(dir7z);
}

var download7z = wget.download(src7zWinX64, outputDir);
download7z.on('error', (err) => {
    console.log(err);
});

download7z.on('start', (fileSize) => {
    console.log(`7z Download: ${(fileSize / 1048576).toFixed(2)} MB`);
});
download7z.on('progress', (progress) => {
    process.stdout.write(`${progress}/100% \r`, 'utf8');
});
download7z.on('end', (output) => {
    console.log('Download Complete, installing 7zip');
    const install = spawn(path.join(outputDir), ['/S', `/D=${dir7z}`]);
    install.stderr.on('data', (data) => {
        console.log(data.toString());
    })
    install.on('exit', (code) => {
        if (code === 0) {
            console.log('7zip Installation Complete!');
        } else {
            console.error('7zip Installation Failed!');
        }
    })
});