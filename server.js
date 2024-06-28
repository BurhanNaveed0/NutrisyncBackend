var express = require('express');
var https = require('node:https');
var mysql = require('mysql');
var dotenv = require('dotenv');

// Configure .env file
dotenv.config();

// RDS Connection Credentials
var db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PWRD,
    database: process.env.DB_NAME,
});

// Establishing Connection w/ RDS
db.connect((err) => {
    if (err) {
        console.log("Error establishing connecting with RDS Instance");
        return;
    }
    console.log("Successful connection with RDS isntance");
});

// Initialize Express App
var app = express();
app.set('port', (process.env.PORT || 3000));

// Login Authenticaion
app.post('/login', async function (req, res) {
    let username = req.query.username;
    let password = req.query.password;

    const sql = 'SELECT user_name FROM user_list WHERE user_name = \'' + username + '\' AND user_pwrd = \'' + password + "\'";

    await db.query(sql, async function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send("SQL QUERY FAILED");
            res.end();
        }

        if (results.length > 0) {
            res.send("SUCCESSFUL LOGIN");
        } else {
            res.status(500).send("USER NOT FOUND");
        }
    });
});




// Signup Authentication
app.post('/signup', function (req, res) {
    let email = req.query.email;
    let password = req.query.password;
    let username = req.query.username;

    let sql = 'SELECT user_name FROM user_list WHERE user_email = ?';
    db.query(sql, [email], function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send("ERROR 500: INTERNAL SERVER ERROR; SQL QUERY FAILED");
            return;
        }

        if (results.length > 0) {
            res.status(500).send("EMAIL ALREADY IN USE");
            return;
        } else {
            sql = 'INSERT INTO user_list (user_name, user_calorie_goal, user_pwrd, user_email) VALUES ?';
            values = [[username, 2000, password, email]];

            db.query(sql, [values], function (error, results, fields) {
                if (error) {
                    console.log(error);
                    res.status(500).send('SQL ERROR: FAILED TO ADD USER TO TABLE');
                }

                res.send("SUCCESSFUL SIGN UP OF USER");
            });
        }
    });
})

// Setting User Goals Data 
app.post('/setgoal', function (req, res) {
    let goal = req.query.goal;
    let user = req.query.username;

    const sql = 'UPDATE user_list SET user_calorie_goal = ? WHERE user_name = ?';
    db.query(sql, [goal, user], (error, results, fields) => {
        if (error) {
            console.log(error);
            res.status(500).send("SQL ERROR: COULD NOT UPDATE USER CALORIE GOAL");
            return;
        }

        res.send("SUCCESSFUL UPDATE OF USER CALORIE GOAL");
    });
})

// Retrieve User Goals Data
app.get('/getgoal', function (req, res) {
    let user = req.query.username;
    let sql = 'SELECT user_calorie_goal FROM user_list WHERE user_name = ?';

    db.query(sql, [user], (error, results, fields) => {
        if (error) {
            console.log(error);
            res.status(500).send("SQL ERROR: COULD NOT QUERY USER CALORIE GOAL DATA");
            return;
        }

        if (results.length < 1) {
            res.status(500).send("USER NOT FOUND");
            return;
        }

        res.send(results);
    });
})

// Update Daily Log
app.post('/updatelog', function (req, res) {
    let username = req.query.username;
    let date = req.query.date;
    let fooditem = req.query.fooditem;
    let calories = req.query.calories;
    let protein = req.query.protein;
    let carbs = req.query.carbs;
    let fat = req.query.fat;

    const sql = 'INSERT INTO daily_log (user_name, date, food_item, food_cals, food_protein, food_carbs, food_fat) VALUES ?';
    values = [[username, date, fooditem, calories, protein, carbs, fat]];

    db.query(sql, [values], (error, results, fields) => {
        if (error) {
            console.log(error);
            res.status(500).send("SQL ERROR: COULD NOT UPDATE USER CALORIE LOG");
            return;
        }

        res.send("SUCESSFUL UPDATE OF USER LOG");
    });
})

// Retrieve Daily Log s
app.get('/getlog', function (req, res) {
    let username = req.query.username;
    const sql = 'SELECT * FROM daily_log WHERE user_name = ?';

    db.query(sql, [username], (error, results, fields) => {
        if (error) {
            console.log(error);
            res.status(500).send("SQL ERROR: COULD NOT QUERY USER CALORIE LOG");
            res.end();
        }

        res.send(results);
    });
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

// Helper function for HTTPS REQUEST to OpenFoodFacts API
async function barcodeReq(barcode) {
    return new Promise((resolve, reject) => {
        let data = '';

        const options = {
            host: 'world.openfoodfacts.org',
            path: '/api/v0/product/' + barcode + '.json',
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

app.listen(app.get('port'), function () {
    console.log('Server has started! http://localhost:' + app.get('port') + '/');
});
