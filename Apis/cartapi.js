//create mini express
const exp=require("express")
const cartApiObj=exp.Router();


cartApiObj.use(exp.json());


//post req to add item in cart
cartApiObj.post("/add",(req,res)=>{
    let cartData=req.body;
    console.log("cartData is",cartData);
    //search user by username
    //get collection
   let cartCollectionObj=req.app.get("cartCollectionObj")
    cartCollectionObj.findOne({Id:cartData.Id})
    .then((cartObj)=>{
        if(cartObj==null){
            cartCollectionObj.insertOne(cartData)
            .then((success)=>{res.send({message:"Product is added in to your cart"})})
            .catch((err)=>console.log(err))
        }
        else{
            res.send({message:"This product is already added into your cart"})
        }
    })
    .catch((err)=>console.log(err))
        
    
    

    
})


//get req to get user by username
cartApiObj.get("/read/:name",(req,res)=>{
    //get collection
    let cartCollectionObj=req.app.get("cartCollectionObj")
    //get username from params
    //let itemName=req.params.name;
    
    //finding for  user
    cartCollectionObj.find().toArray()
    .then(itemsArray=>res.send({message:"success",items:itemsArray}))
     .catch(err=>{console.log(err)})
})


cartApiObj.get("/allItems",(req,res)=>{
    //get collection
   let cartCollectionObj=req.app.get("cartCollectionObj")
   cartCollectionObj.find().toArray()
   .then(cartArray=>res.send({cart:cartArray}))
   .catch(err=>console.log(err))
})

cartApiObj.delete("/delete/:name",(req,res)=>{
    //get collection
    let cartCollectionObj=req.app.get("cartCollectionObj")
    let Pcartname=req.params.name;
    cartCollectionObj.deleteOne({name:Pcartname})
    .then(success=>{res.send({message:"This Item is removed from cart",cartCredentials:success})})
    .catch(err=>{console.log(err)})
}) 














module.exports=cartApiObj;