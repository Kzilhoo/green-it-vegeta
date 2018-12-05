'use strict';
const vegeta = require('node-vegeta');
const Attack = vegeta.Attack;
const testAttack = new Attack();
const fs = require('fs');
const Hapi = require('hapi');

// Create a server with a host and port
const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT
});

// Add the route
server.route({
    method: 'GET',
    path: '/attack',
    handler: function (request, h) {
        console.log("Starting receiving request of the gros sac")
        const promiseMonCul = new Promise(function (resolve, reject) {
            const wstream = fs.createWriteStream('targets.txt');
            wstream.write(request.query.method + ' ' + request.query.protocol + request.query.url);
            wstream.end(function () {
                resolve();
            });
        });

        return promiseMonCul.then(() => {
            return new Promise(function (resolve, reject) {
                testAttack
                    .targets('targets.txt')
                    .rate(9001)
                    .duration(request.query.duration + 's')
                    .report()
                    .process()
                    .stdout.on('data', (data) => {
                        console.log('report', data.toString());
                        resolve();
                    })
            }).then(() => {
                return h.redirect(process.env.REDIRECTION);
            })


        })

    }
});

// Start the server
async function start() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();