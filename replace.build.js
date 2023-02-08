const replace = require('replace-in-file');

function zeroPad(num, size) {
    num = num.toString();

    while (num.length < size)
        num = "0" + num;

    return num;
}

const now = new Date();
const year = now.getUTCFullYear();
const month = now.getUTCMonth() + 1;
const day = now.getUTCDate();
const hour = now.getUTCHours();
const minutes = now.getUTCMinutes();

const version = `v.${year}.${zeroPad(month, 2)}.${zeroPad(day, 2)}.${zeroPad(hour, 2)}.${zeroPad(minutes, 2)}`;

replace.sync({
    files: 'src/environments/environment.ts',
    from: /{BUILD_VERSION}/g,
    to: version,
    allowEmptyPaths: false,
});

replace.sync({
    files: 'src/environments/environment.prod.ts',
    from: /{BUILD_VERSION}/g,
    to: version,
    allowEmptyPaths: false,
});