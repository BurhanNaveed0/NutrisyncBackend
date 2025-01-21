## Nutrisync 🥗

Nutrisync is an app dedicated to people trying to improve their fitness and diet habits. Nutrisync allows its users to track their diet throughout the day by lettings users log food they ate while automatically keeping track of the calories and macronutrients accumulated. Users have multiple ways of logging their food including seraching up food item, scanning food barcodes, or by manually typing in food macros. 

This repository is dedicated to the backend of the product, responsible for handling requests from various users, handling user authentication, updating user food logs, and assisting in food data lookup. 

Developers: Burhan Naveed, Jonas Tirona

<a href="https://github.com/jonastirona/NutrisyncFrontend/">Link to Front-End</a>

## Technologies Used 👨‍💻
<details>
  <summary>Client 📱</summary> 
  <ul>
    <li><a href="https://www.javascript.com/">Javascript</a></li>
    <li><a href="https://reactnative.dev/">React Native</a></li>
    <li><a href="https://expo.dev/">Expo</a></li>
  </ul>
</details>

<details>
  <summary>Server 🖥</summary> 
  <ul>
    <li><a href="https://www.javascript.com/">Javascript</a></li>
    <li><a href="https://nodejs.org/en">Node.js</a></li>
    <li><a href="https://expressjs.com/">Express.js</a></li>
    <li><a href="https://aws.amazon.com/elasticbeanstalk/?gclid=CjwKCAjw1emzBhB8EiwAHwZZxWuRjXcIjGfB7YhoQUNc7JWiYm-dQ04L2BKnj-WxziukmY8n-BtrDhoC2BwQAvD_BwE&trk=b1c3dd7d-1b94-4b82-99e3-c1505e3a55fb&sc_channel=ps&ef_id=CjwKCAjw1emzBhB8EiwAHwZZxWuRjXcIjGfB7YhoQUNc7JWiYm-dQ04L2BKnj-WxziukmY8n-BtrDhoC2BwQAvD_BwE:G:s&s_kwcid=AL!4422!3!651737511569!e!!g!!elastic%20bean%20stalk!19845796021!146736269029">AWS Elastic Beanstalk</a></li>
  </ul>
</details>

<details>
<summary>Database 📚</summary> 
  <ul>
    <li><a href="https://www.mysql.com/">MySQL</a></li>
    <li><a href="https://aws.amazon.com/rds/">AWS Relational Database Service</a></li>
  </ul>
</details>

## Project Status 🏁
Backend of project complete and unit tested in isolation. Frontend React Native app in progress. 

## Backend API Guide 🧾

|      URL      |  Request Type |    Purpose   |
| ------------- | ------------- | ------------ |
| /login        | POST          | Authenticate user login user username and password parameters |
| /signup       | POST          | Register user information using email, username, and password parameters |
| /setgoal      | POST          | Set user calorie goal using username parameter and goal parameter|
| /getgoal      | GET           | Get user calorie goal user username parameter |
| /updatelog    | POST          | Update user food log using the following parameters: username, date, fooditem, calories, protein, carbs, and fat|
| /getlog       | GET           | Get user food log data using username parameter |

## Back End Architecture 📘

![Nutrition Scanner App Architecture (1)](https://github.com/BurhanNaveed0/NutrisyncBackend/assets/81490717/2c9e894a-a14f-4a5e-9cd9-716d15ba1356)

## Reflection 📝

This was a side project created in collaboration with my close friend Jonas Tirona, a fellow student at NJIT. With both of us lifting weights and improving our fitness in our free time, we wished to create an app that could help assist people with similar goals.

With this in mind, we set out to build an app allowing users to track their diet by logging foods they have eaten throughout the day. Aiming to make the logging process as quick and easy as possible, we planned on allowing users to be able to log foods by searching them up through a database or by taking a snapshot of their foods' barcodes, with our app automatically logging the nutrients for them. When planning out the layout of our app, we designed a dashboard that would allow users to quickly gauge their total calories and macronutrients in comparison to their goals in an engaging UI while also being able to scroll through all foods they logged throughout the day. 

After completing the project, it was safe to say that it was a fun yet challenging learning experience. With our development of the app including a backend running on the cloud handling requests coming from the front end mobile app, we learned a lot about connecting the front and back ends of an application to make it come together. Sometimes the information relayed by the backend was not correspending to information inputed by the user in the app. When deploying the backend, the security rules limited requests from certain IP's causing us to have to modify security rules to accomodate outside requests while maintain security. In terms of the front end side of things, neither team member was highly experienced in UI design, leaving us with no choice but to research proper UI design and implement it in our app. 

When picking the technologies used to develop the project, our aim was to pick what would help us develop the project quickly, deploy it quickly, and allow our app to be scaled onto multiple platforms all while being reliable. On the front end side of things, the framework of choice was React Native paired with Expo as it was farmiliar in terms of langauge used and made demoing our app for testing super easy. For the backend, we decided to use Express.js as it let us get running up off the ground quickly without too much extra work in comparison to using purely Node.js. As for the database system we chose to use AWS RDS to host a MySQL database since it allowed us to ingore the maintenance of a proper database server while still letting us experiment with an RDBMS. Lastly, for deployment we used AWS Elastik Beanstalk as it allows us to deploy our code in an environment handled by AWS where deployment is quick and minimum maintenance is required by us. Had we chosen to open an AWS EC2 instance we would have had to spend extra time managning it and setting it up incomparison to Elastik Beanstalk which utlizes and mananages an EC2 instance on its own. 
