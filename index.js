var express = require('express');
var http = require('http');
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

// Retrieve Generic Food Data
app.get('/dailylog', function (req, res) {
    res.send('hello world')
})

// Data Fetching from USDA API
app.get('/barcode', function (req, res) {
    const options = {
        hostname: 'https://api.nal.usda.gov',
        path: '/fdc/v1/food/534358',
        method: 'GET'
    };

    const req = http.request(options, (res) => {
        let data = ''

        res.on('data', (chunk) => {
            data += chunk;
        });

        // Ending the response 
        res.on('end', () => {
            console.log('Body:', JSON.parse(data))
        });

    }).on("error", (err) => {
        console.log("Error: ", err)
    }).end()

    res.send('API Call Made');
})

app.listen(3000)
