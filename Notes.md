
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
-how espress jswork behind the scene to handle request
-differenece between app.use and app.all both are almost same but needs
-write a dummy auth middleware for admin
-write a dummy auth middleware for user except login

