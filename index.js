const axios = require('axios').default;
const chalk = require('chalk').default;
const readline = require('readline')

// colored logs
const logCool = (name, des) => {
    console.log(chalk.magentaBright('[+] ') + chalk.cyan(`${name}:: ${chalk.greenBright(des)}`));
}

// clear loading line
const clear = () => {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0, null)
};

process.stdout.write('\nCollecting info...')

axios.get(`http://registry.npmjs.org/${process.argv[2]}`)
    .then(results => {
        if(results.statusText === 'OK') {
        
            clear();
            let updatedTime = Object.keys(results.data.versions).length;
            let lastUpdate = results.data.time["modified"]
            Object.keys(results.data.versions).forEach(value => {
                if(value === Object.keys(results.data.versions)[Object.keys(results.data.versions).length - 1]) {
                    let ms = results.data.versions[value]
                    let repLength = Object.keys(ms["dependencies"]).length;
                    let name = ms["name"];
                    let description = ms["description"];
                    let version = ms["version"];
                    // let auther =  ms["author"]["name"] != undefined ? ms["author"]["name"]  : "***";
                    let size = ms["dist"]["unpackedSize"];
                    console.log('\n')
                    console.log(chalk.grey(`* ${name} has bean updated ${chalk.blueBright(updatedTime)} time`))
                    console.log(chalk.grey(`* ${name} last update at ${chalk.greenBright(lastUpdate)}`))
                    console.log("===================================")
                    logCool('Name', name);
                    logCool('Description' ,description);
                    logCool('Last Version' ,version);
                    logCool('Dependencies With Package', repLength);
                    logCool('Size',size);
                    console.log("===================================")
                    console.log('\n')
                }
            })
    } else {
        clear();
        process.stdout.write('\n[:(] package not found, or there somthing wrong with your internt!')
    }
    }).catch((e) => {
        clear();
        process.stdout.write('\n[:(] package not found, or there somthing wrong with your internt!\n')
    })