- Create a repository
- intialize the repository
- node_modules, package.json ,package-lock.json
- Install express
- create a server
- Listen to port to 3000
- write request handler for different requests 
- install nodemon and update scripts inside the package.json
  - node src/app.js  ---- start
  - nodemon src/app.js  ---- dev

what are dependencies
what is the use of "-g"
difference between caret ^ and tilde ~.

------------------------------------------------
 - intialize git
- .gitignore
- create a remote repo on github
- push the all code to remote origin 
  -------------------------------------
   - play with routes and routes extensions /hello ,/hello/2 etc
   - order of the code matters a lot
-----------------------------------------------
- install postman and make workplace/ collection > make API calls
- write logic to handle different HTTP methods GET,POST ,DELETE etc
- explore routing and use of + ,* ,() ,? in routing
- use of regex in routes /a/ , /.*fly$/.
- how to read query params and how to do dynamic routing.

- Multiple route handlers and play with the code.
- next()
play with next function and errors along with res.send();
- app.use("/route",rH1,rH2,rH3,[rH4,rH5],rH6)
- what is middleware?
- how express handles the request behind the scenes.
- difference between app.use and app.all
- make a dummy auth middleware  for admin
- make a dummy auth middleware for all user routes except /user/login 
- error handling using wildcarD AS  app.use("/",(error,req,res,next)=>{})

- make ur free db on official website of mongodb (mongobd atlas)
- install the mongoose library to connect  ur appllication to DB.
- connect ur application to DB via "connection url of cluster/BD name"
- call ur connectDB function to connect to db before u start ur application on port 3000 means before starting ur server.


- create a user schemma and user model inside models folder inside src folder
- create a POST api to send data to db
- put documents to db by making api calls from postman
- error handling by try catch in  POST api

- JSON object vs JS object (differece)
- add express.json middle into ur APP
- make the dynamic signUP api to get data from the end user.
- get api  / to get user by id
- get api  for feed /feed to get all the users
- create a delete user api
- API  to update the user 
- difference between the put and patch api
- explore the documentation of mongoose api
- explore the schemmatype options from the moongoose declaration
    - required,unique ,trim ,lowercase,min,minlength etc
- add default
- put custom validation function on gender
- improve DB schemma , put appropriate validation functions on each field in schemma
- Add timestamps in userSchemma.
- add api validations on patch request and signup put request api
-  Data Sanitizaton - put validations on each field before sending data into DB
- install npm package validator
- explore validation functions on emailId, Photo URL , Password etc
- never trust the req.body ,always keep valiations

    ------ flow of  data while sign Up
- in post api first validate the signUp data by making a separate helper func and use validator package
- then install bcrypt package to encrypt the password to make it unreadable
- Create the passwordHash using bcrypt.hash and save the user with encrypted password
-  create login api
- compare password by bcrypt for valid email and password

/// authentication by jwt token in a cookie
- install cookie-parser
- send a dummy cookie  to user 
- create a /profile api and check wether u get abck the cookie
- install jesonwebtoken 
- IN login api after the validation by emailID and password ,create a JWT token and send it to the user
- IN profile api,  read the cookie  and find the logged in user.
- userAuth middleware
- add userAuth middleware in Profile ans sendConnectionRequet api.
- set the expiry of jwt token and cookies to 7 days

- create the list  of all apis
- group the multiple apis under respective routes
- read documentation of the express.router
- create routes folder for managing auth,profile,request routes
- create auth,profile and request route and import them in app.js

- create post/logout api
- create patch/profile/edit api
- create patch /profile/ password => forgot password api
- make sure to validate the data in every post and patch api

- create connectdion request schemmsa 
and do all the validations
- read about $or query

- read  about indexes
- advantages and disasvantages of indexing
- why we need index in DB.
      
