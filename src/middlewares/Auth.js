const AdminAuth=(req,res,next)=>{
    console.log("Admin check");
    const token="abc"
    const AdminToken= token==="abc"
    if(!AdminToken)
    {
        res.status(401).send("unauthorized admin")
    }
    else{
        next()
    }
}

const UserAuth=(req,res,next)=>{
    console.log("User check");
    const token="abc"
    const UserToken= token==="abc"
    if(!UserToken)
    {
        res.status(401).send("unauthorized user")
    }
    else{
        next()
    }
}


module.exports={
    AdminAuth,
    UserAuth
}