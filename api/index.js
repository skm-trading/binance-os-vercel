const https= require("https");
const express = require('express');
const app = express();


async function getURL (url) {
    return new Promise((resolve, reject)=> {
        https.get(url, (resp)=> {
            let data = "";
            resp.on("data", (chunk) => {
                data += chunk;
            });
            resp.on("end", () => {
                resolve(data);
                // return data;
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
            reject(err);
        });
    });
}


async function getIP() {
    const ip = await getURL("https://api.ipify.org/");
    if (/^(\d{1,3}\.){3}\d{1,3}$/.test(ip)) {
        return ip;
    }
    return "0.0.0.0";
}


app.use('/api', async (req, res) => {
    const options = {
        hostname: 'api.binance.com',
        path: req.originalUrl,
        method: req.method,
        headers: {
            'X-MBX-APIKEY': req.headers['x-mbx-apikey'] || '',
            'Content-Type': 'application/json',
        },
    };

    console.log("/api options", JSON.stringify(options));
    console.log("/api headers", JSON.stringify(req.headers));

    const proxy = https.request(options, (response) => {
        res.status(response.statusCode || 500);

        const contentType = response.headers['content-type'];
        if (contentType) {
            res.setHeader('content-type', contentType);
        }

        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            res.send(data);
        });
    });

    proxy.on('error', (err) => {
        console.error(err);
        res.status(500).send('Proxy error');
    });

    proxy.end();
});


app.use('/fapi', async (req, res) => {
    const options = {
        hostname: 'fapi.binance.com',
        path: req.originalUrl,
        method: req.method,
        headers: {
            'X-MBX-APIKEY': req.headers['x-mbx-apikey'] || '',
            'Content-Type': 'application/json',
        },
    };

    console.log("/fapi options", JSON.stringify(options));
    console.log("/fapi headers", JSON.stringify(req.headers));

    const proxy = https.request(options, (response) => {
        res.status(response.statusCode || 500);

        const contentType = response.headers['content-type'];
        if (contentType) {
            res.setHeader('content-type', contentType);
        }

        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            res.send(data);
        });
    });

    proxy.on('error', (err) => {
        console.error(err);
        res.status(500).send('Proxy error');
    });

    proxy.end();
});


module.exports = app;
