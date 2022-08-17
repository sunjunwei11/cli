import fse from 'fs-extra';
import ejs from 'ejs';
import path from 'path';

function fileEjsReplace(file, options) {
    const stat = fse.statSync(file);
    if (stat.isFile()) {
        ejs.renderFile(file, options, (err, result) => {
            if (err) throw err;
            fse.writeFile(file, result);
        })
    } else if (stat.isDirectory()) {
        fse.readdir(file).then(items => {
            console.log(items);
            items.forEach(item => fileEjsReplace(path.join(file, item), options));
        })
    }
};

export {
    fileEjsReplace
}
