#!/usr/bin/env node
import path from 'path';
import { fileURLToPath } from 'url';
import fse from 'fs-extra';
import inquirer from 'inquirer';
import { fileEjsReplace } from './utils/fileEjsReplace.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

inquirer
  .prompt([
    /* Pass your questions in here */
    {
        type: 'input',
        name: 'projectName',
        message: 'Please input the project name: ',
        default: 'hello-world'
    },
    {
        type: 'input',
        name: 'age',
        message: 'Please input your age: ',
        default: 18
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    console.log(answers);
    const { projectName } = answers;

    const tmpPath = path.join(__dirname, 'template');

    const destPath = path.join(process.cwd(), projectName);
    fse.removeSync(destPath);
    fse.copy(tmpPath, destPath)
        .then(() => {
            fileEjsReplace(destPath, answers);
        })
  })
  .catch((error) => {
    console.error('error', error);
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

