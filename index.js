var express = require('express');
var https = require('node:https');
var mysql = require('mysql');

var db = mysql.createConnection({
    host: "database-1.cleovrzmw7r9.us-east-2.rds.amazonaws.com",
    port: "3306",
    user: "admin",
    password: "burhanis2good",
    database: "nutrisyncdb",
});

db.connect((err) => {
    if (err) {
        console.log("Error establishing connecting with RDS Instance");
        return;
    }
    console.log("Successful connection with RDS isntance");
});

var app = express();

// Login Authenticaion
app.get('/login', function (req, res) {
    res.send('hello world')
    const username = req.query.username;
    const password = req.query.password;
})

// Signup Authentication
app.get('/signup', function (req, res) {
    res.send('hello world')
})

// Setting User Goals Data
app.get('/setgoals', function (req, res) {
    res.send('hello world')
})

// Retrieve User Goals Data
app.get('/getgoals', function (req, res) {
    res.send('hello world')
})

// Update Daily Log
app.get('/dailylog', function (req, res) {
    res.send('hello world')
})

// Helper function for HTTPS REQUEST to FDC API
async function lookup(keyword, pageNum, size) {
    return new Promise((resolve, reject) => {
        let data = '';

        const options = {
            host: 'api.nal.usda.gov',
            path: '/fdc/v1/foods/search?api_key=SNg6e0kI9K0QyFsvlajEAohNqfdWyqE1eGQ6RbWi&search='
                + keyword + '&pageNumber=' + pageNum + '&pageSize=' + size,
            method: 'GET'
        };

        const req = https.request(options, (res) => {
            // Update data on retrieval
            res.on('data', (chunk) => {
                data += chunk;
            });

            // Ending the response
            res.on('end', () => {
                console.log('Body:', data);
                resolve(data);
            });
        });

        req.on('error', (err) => {
            console.log('Error: ', err);
            reject(err);
        });

        req.end();
    });
};

// Retrieve Food Data Through Keyword
app.get('/lookup', async function (req, res) {
    try {
        const data = await lookup(req.query.keyword, req.query.pageNum, req.query.size);
        res.send(data);
    } catch (err) {
        res.status(400).send("ERROR 400: BAD REQUEST");
        console.log(err);
    }
})

// Helper function for HTTPS REQUEST to FDC API
async function barcodeReq(barcode) {
    return new Promise((resolve, reject) => {
        let data = '';

        const options = {
            host: 'api.nal.usda.gov',
            path: '/fdc/v1/food/' + barcode + '?api_key=SNg6e0kI9K0QyFsvlajEAohNqfdWyqE1eGQ6RbWi',
            method: 'GET'
        };

        const req = https.request(options, (res) => {
            // Update data on retrieval
            res.on('data', (chunk) => {
                data += chunk;
            });

            // Ending the response
            res.on('end', () => {
                console.log('Body:', data);
                resolve(data);
            });
        });

        req.on('error', (err) => {
            console.log('Error: ', err);
            reject(err);
        });

        req.end();
    });
};

// Data Fetching from USDA API
app.get('/barcode', async function (req, res) {
    try {
        const data = await barcodeReq(req.query.barcode);
        res.send(data);
    } catch (err) {
        res.status(400).send("ERROR 400: BAD REQUEST");
        console.log(err);
    }
})

app.listen(3000)
