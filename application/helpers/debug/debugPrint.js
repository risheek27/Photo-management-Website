const color = require('colors');

color.setTheme({
    error: ['red', 'bgWhite'],
    success: ['black', 'bgWhite'],
    request: ['black', 'bgGrey']
})

const print = {
    errorPrint: (message) => {
        console.log(color.error(message));
    }, 
    successPrint: (message) => {
        console.log(color.success(message));
    },
    requestPrint: (message) => {
        console.log(color.request(message));
    }
}

module.exports = print;