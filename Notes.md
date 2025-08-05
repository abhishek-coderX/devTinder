
app.use('/',(req,res)=>{
    res.send("Namaste JI")
})


Here routes matching pe kaam karta hai / hai 
uske aage kuchh bhi hoga to / walaa code hi chalega

2) Order of routes is important kyuki starting se routes match karta 
hai jab request api ke pass jata hai

3) Bydefault you type url in browser is get api call 

4) Dont use browser for api testing use postman 

5) .use  and other api creation like get post delete mein ya farak hai

6) use wala sabhi api calls ko  match karta hai and get wala sirf get ko karega  post wala sirf post ko karega


ADVANCE ROUTING CONCEPTS
if /ab?c  matabl b optional hai path mein

/abc /ac


if /ab*c  matlab start mein ab  last mein c middle mein kuchh bhi ho sakta hai chacha bhi

if /a(bc)+d matlab bc bc kitne baar bhi repeat kar sakte hai

if /ab+c  matlab b ko kitna bi repaet kar sakte hai

if /a/  slash a rejesx means path mein kahi bhi bas a aan chahiye it will work

reading query params -- passed dynamically 

    console.log(req.query)
    console.log(req.params)

Reading about dynamic routing 


//MORE PLAYING WITH ROUTES

app.use('/user', ()=>{},()=>{}  aise karke kitna bhi route send kar skte hai also 
arry of routes bhi pass kar sakte hai and ek ka arry 2 ka arry and evrything)

next()  express find karta hai ki aage koi route hai kya
res.send karne ke baad next  rote again kuch send nahi kar sakta kyuki alredy send 
hogaya hai response tcp connection banta hai and send hota hai than close ho jata hai


// next part 
thses function which we are calling routes put in middle are called middlewares
when request send to express it will match and if match it will send the response and go no further

//get /user=>middlewarechain=>request handler(wo wala route jo response send kar rah ahi matlab request handle kar raha hai)

-what is middlewares read about itrt and 
-how espress js work behind the scene to handle request
-differenece between app.use and app.all both are almost same but needs
-write a dummy auth middleware for admin
-write a dummy auth middleware for user except login
-error handling using app.use and always write it at the end 
-use try catch block for error handling



//database how to connect mongoose.connect("clusterurl")

-create free cluster on mongodb atlas website
-connect you application to databse and with mongoose
-call the db funtion and connect to database begore listining to port starting application

//schema so refer to mongoose doc its very handy when you are stuck 

-schema is basically defining the model of collection how the user collection will look
name,pass,email and lot more other details 
-create user schema and then user model and export the user model
-model is like a class suppose its user model then it will store the instance of user class
when some user type data is coming
-after creating schema and model we can craete api to store data in the collection


//lets insert the data in the database
-we create a post api to send the data to collection and 
-we will create signup api for signup of the user which means creating a new instace of model user with new keyword
-most of the mongoose functions give promises so we use asyn await most of the time 
-the schema defined only that values are stored in database other info trying to post is not stored and ignored because model hi nahi hai waise 
-mondodb adds _id by default we can also mess and play with it but its kyu karna hai  and __v (version)
-push some document with postman into user collection and play ithit
-use trycatch block to handle the error efficiently
-to send data from json in postman we need to define json parser before the routes
-Add this line to parse JSON bodies --> app.use(express.json());

-js object vs json object 
-req is readable stream which have lots of data req.body se we can get the post data we send to api but it is undefined 
-to use it we need to convert json into js object to read  or we can say parse the data to json than we can read so we use middleware express.json() to 
-app.use(express.json()); as said earlier




//lets a read the data from the database and craete /feed and  enjoy
-use method .find to get the data from the datbase 
-no typo mistake should be there it should be same as defined in the schema
-findout which is written when empty object is passed ist arbitary or the first one or we say oldest
-findOne if more then one doc is there which will be written 
-api and try out other methods of model 


//lets update and delete the data from the database'
-create a delete user api delete and play with the documentation
-create and update user api and play with the doc
-differnce between patch and put  
-explore the model methods in doc and always refer the doc for any sort of confusion and errors first 
-api update with userID and also do it with emailid
-backend key (in req.body) must exactly match the JSON key sent by the client.
-The variable name you assign it to (like userId) can be anything you want.

    

//validation at schema level

- refer mongoose schematypes for various validation and explore it
- we implemented basic required,lowercase,unique,trim,min for number and minLength for string,validate,default
- validate function runs only when new object is created not for patch and put to use options.validator  refer  officialdocumentation
- timestamps provided by mongoose we can do custom by createdAt and passing the datae for recording the time  when user registered
- improve the db schema put all the required validation for the db 


//aab api validation dekhenge
- put api level validation for patch and post api
- add api validation for each fields
- this is data sanitizing means before entering the data to database sanitize it
- never trust the userdata attackers can exploit the apis so make sure to add all the validation and sanitization
- explore the validator library functions use for password and email and phtouril and many moer
- never trust req.body also seek validation and sanitization



//password hashing and helpers file
- define helper functions for validation logic of signupdata
- install bcrypt library and create a password hash
- and save user with encrypted password 


//lets create a login api 
- wwrite the logic 
- compare the password 
- write the error messages and all


- when we login email and password is send and the server authenicates and gererates the JWT TOKEN and wraps inside cookie
- aab when ever any api call we make like the post commnet view profile get profile update or any operstion 
- the server validates the cookies everytime to see if user is authentic so token is shared in header in  every request
- so the web comes up with the solution of cookies to store this at user side 
- login just inject the token 
- then we need cookie parser to parse the cookie and read the value


- install cookie parser
- send a dummy cookie
- create Get/profile api and check if you get the cookie back
- install jsonwebtoken
- In login api after email and password validation  create a jwt token and send it to the user in cookie
- read the cookie and also extract the userid of the logged in user


- now lets create the middleware to handle all this functionality
- userAuth middleware
- add userAuth into login and profile api and new sendconnection api 
- set the expiry of jwt token and cookies to 7 days


- mongoose schema
- helper methods 
- Mongoose lets you attach custom methods to your schema — so logic like generating tokens, checking passwords, etc., can stay inside the model.


- explore tinder api 
- make a list of apis we will be creating
- group the apis 

- app.js should be clean routes folder will routers 
- creates routes folder 
- read the documentation of express router 
- create authRouter profileRouter requestRouter and import in app.js
- check the working of the apis made


- aab jo list mein apis hai wo create karna hai 
- create /logout, /profile/view ,/profile/edit
- /profile/password/edit and /profile/password/forget =>ye forget password wala khud se kar 
- make sure post and patch api validation kar aache se data dont trust the req.body user kuchh bhi send 
- kar sakta hai 


- advance concepts are staring from here

- create a connection request schema add vadlidation
- send connection request api
- proper validation of data 
- think about all the corner cases
- read about $or and $and  logical and comparison query in mongoose and read
- read more about indexes in mongodb 
- schema.pre("save") function kya hoata hai read
- why do we need and advantages and disadvantages 
- Always think about corner cases beacuse any attacker can exploit it

###  Logic:
-  Auth middleware applied (only logged-in users).
-  Validate `status`: only `"interested"` or `"ignored"` allowed.
-  Ensure `toUserId` exists in User collection.
-  Block duplicate requests in any direction using `$or`.
-  Prevent


- write code with proper validation api POST /request/review/:status/:requestId

###  Logic:
-  Auth middleware applied.
-  Validate `status`: only `"accepted"` or `"rejected"` allowed.
-  Find the connection request:
  - `requestId` should match
  - `toUserId` must be the logged-in user
  - `status` must be `"interested"`
-  Update the `status` and save

- take the thought process first think about happy flow corner cases then start writing the code



- now we will write get apis and there is difference in both thought process
- post matlab user is posting data attcker can attack the db so validation and attcker 
- ko consider karo sabkuchh verify karo dont trust the req.body 
- get matlab user sirf fetch kar sakta hai andisme sirf allowed access and authrorized user 
- only get and verified user have scope and uska hi access hona chahiye
- there was one error module.export karega to jab import karega {name}=require
- nahi to simple const name=require
- now simple get/request api is doen but we also need the user info ki kisne bheja hai not jsut
- from and to userid so a good way to handle this is reference pass karenge ek model ka dusre ko 
- using the ref in connection and user ka ref diya just populate karna hai
- no overfetching be specific

- read about ref and populate and create this api  get/user/requests/received 


- now feed api 
- what is the thought process 
- you will only see cards of people whom you havent seen 
- you will not see your card the cards you accepted and rejected also
- read about query operator 
- read the code small but little complex 
- explore more comparison logical query opeartor
- we will add pagination of api ek baar mein 10 hi load ho
- explore what more you can do to enhance the api

- lets talk about pagination
- in get we can use query params
- /feed?page=1&limit=10  =>1st 10    => .skip(0)&limit(10) =>
- /feed?page=1&limit=10  =>11-20      =>.skip(10)&limit(20) 
- /feed?page=1&limit=10  =>21-30
- mongo mein easy hai 
- .skip(0)&limit(10) =>



- now lets create a chat feature so that loggindin user can communicate with connections

- install socket.io
- create a modal for chat
- crete a route GET /messages/:receiverId 