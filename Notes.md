
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
