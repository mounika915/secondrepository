const token=require("jsonwebtoken");

//write a function
verifyToken=(req,res,next)=>{
//token verification logic

//get token from localstorage for verification
let bearerToken=req.headers["interceptor"];

//if token not exists
if(bearerToken==undefined){
return res.send({message:"Unauthorized user"})
}
//if token  exists and validity expires get token
let oToken=bearerToken.slice(7,bearerToken.length);
console.log(oToken)
//check validity of token
token.verify(oToken,"secret",(err,decoded)=>{
    if(err){
        return res.send({message:"Session is expired...Login to continue"})
    }
    else{
        
        next()
    }
})

}
//export function
module.exports=verifyToken;