/* streamline exmple setup ⊂◉‿◉つ */
const path = require('path')
const globby = require('globby')
const chalk = require('chalk')
const ora = require('ora');
const exec = require('child_process').exec

console.log(`Welcome to the serverless gateway project`)
console.log('Hold tight while we install the dependancies for you')

globby([ "{,!(node_modules)/**/}package.json", '!node_modules{,/**}', '!*/**/node_modules{,/**}']).then(paths => {
  // Now run npm install
  const files = paths.filter((i) =>{
    return i !== 'package.json'
  })

  const command = `npm install`
  let count = 0
  files.forEach((p) => {
    var t = path.join(__dirname, p)
    var dirPath = path.dirname(t)
    var dirName = path.basename(dirPath)
    var niceName = path.basename(path.dirname(dirPath)) + '/' + dirName
    //console.log(path.dirname(t))
    let spinner = ora('Installing dependancies').start();
    spinner.color = 'yellow';
    spinner.text = `Installing dependancies for ${niceName}`;

    if (niceName === 'event-gateway-example/frontend') {
      setTimeout(() => {
        spinner.text = `Still Installing dependancies for ${niceName}. Hang tight`;
      }, 15000);
    }

    const child = exec(command, {
      cwd: path.dirname(t),
      stdio: [0, 1, 2]
    }, (error, stdout, stderr) => {
      if (error) {
        console.warn(error)
      }
    })
    child.stdout.on('data', (data) => {
      // console.log(data)
    })
    child.stderr.on('data', (data) => {
      // console.log('err', data)
    })
    child.on('close', (code) => {
      spinner.color = 'green';
      spinner.text = `Successfully installed dependancies ${niceName}`;
      spinner.succeed()
      // console.log(`${path.dirname(t)} successfully installed`)
      spinner.stop()
      count++
      if (count === files.length) {
        // ALL done
        console.log(chalk.green('You are all set'))
        console.log('---------')
        console.log(chalk.yellow('To run the gateway: '))
        console.log('- cd into a /service folder')
        console.log('- then run `sls run`')
        console.log('---------')
        console.log(chalk.yellow('To run the frontend run:'))
        console.log('`npm start`')
        process.exit(0)
      }
    })
  })
})