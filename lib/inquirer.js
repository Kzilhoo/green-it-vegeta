const inquirer = require('inquirer');

module.exports = {

    askParameters: () => {
        const questions = [
            {
                name: 'method',
                type: 'input',
                message: 'Enter the REST method you want to use:',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter REST method ...';
                    }
                }
            },
            {
                name: 'url',
                type: 'input',
                message: 'Enter the URL you want to attack:',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter an URL ...';
                    }
                }
            },
            {
                name: 'port',
                type: 'input',
                message: 'Enter the port you want to attack:',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter a port...';
                    }
                }
            },
            {
                name: 'route',
                type: 'input',
                message: 'Enter the route you want to attack (WITH GET DEFAULT):',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter a route...';
                    }
                }
            },
            {
                name: 'duration',
                type: 'input',
                message: 'Enter the duration :',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please specify a duration, you fucking dick..'
                    }
                }
            }
        ];
        return inquirer.prompt(questions);
    },
}