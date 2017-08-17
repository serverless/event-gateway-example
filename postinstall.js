/* streamline exmple setup ⊂◉‿◉つ */
const path = require('path');
const globby = require('globby');
const chalk = require('chalk');
const ora = require('ora');
const exec = require('child_process').exec;

console.log(`Welcome to the Serverless Event Gateway example`);
console.log('Hold tight while we install the dependencies for you');

globby([
  '{,!(node_modules)/**/}package.json',
  '!node_modules{,/**}',
  '!*/**/node_modules{,/**}'
]).then(paths => {
  // Now run npm install
  const files = paths.filter(i => {
    return i !== 'package.json';
  });

  const command = `npm install`;
  let count = 0;
  files.forEach(p => {
    var t = path.join(__dirname, p);
    var dirPath = path.dirname(t);
    var dirName = path.basename(dirPath);
    var niceName = path.basename(path.dirname(dirPath)) + '/' + dirName;
    let spinner = ora('Installing dependencies').start();
    spinner.color = 'yellow';
    spinner.text = `Installing dependencies for ${niceName}`;

    if (niceName === 'event-gateway-example/frontend') {
      setTimeout(() => {
        spinner.text = `Still Installing dependencies for ${niceName}. Hang tight`;
      }, 15000);
    }

    const child = exec(
      command,
      {
        cwd: path.dirname(t),
        stdio: [0, 1, 2]
      },
      (error, stdout, stderr) => {
        if (error) {
          console.warn(error);
        }
      }
    );
    child.stdout.on('data', data => {});
    child.stderr.on('data', data => {});
    child.on('close', code => {
      spinner.color = 'green';
      spinner.text = `Successfully installed dependencies ${niceName}`;
      spinner.succeed();
      spinner.stop();
      count++;
      if (count === files.length) {
        // ALL done
        console.log(chalk.green('You are all set'));
        console.log('---------');
        console.log(chalk.yellow('To run a service with the gateway: '));
        console.log('- cd into a service folder e.g. services/users');
        console.log('- then run `sls run`');
        console.log('---------');
        console.log(chalk.yellow('To run the frontend run:'));
        console.log('- cd into ./frontend');
        console.log('- then run `npm start`');
        process.exit(0);
      }
    });
  });
});
