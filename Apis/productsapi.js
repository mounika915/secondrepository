//create mini express
const exp=require("express")
const productsApiObj=exp.Router();

//import modules
const cloudinary=require("cloudinary").v2;
const multer=require("multer");
const { CloudinaryStorage }=require("multer-storage-cloudinary");

//configure cloudinary
cloudinary.config({
    cloud_name:"dqjqrhjbh",
    api_key:"759956696947164",
    api_secret:"0StlRULiQQfa4OmsHx6ZiUB8wZM"
});

//configure storage setting
var clStorage= new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'MyFolder',
        format:async (req,file)=>('png','jpg'),//supports promises as well
        public_id: (req,file)=>file.fieldname + '-' + Date.now()
    },
});

//configure multer
var upload=multer({storage:clStorage});
//body parsing middleware to get json data
productsApiObj.use(exp.json());

//post req to register purchaser
productsApiObj.post("/register",upload.single("profilepic"),(req,res)=>{
    //get  image cdn links from cloudinary
let profilepic=req.file.path;
console.log("profile",profilepic)
let product=JSON.parse(req.body.productsData)
console.log("req body is",req.body.productsData)
console.log("product is",product)
product.profilepic=profilepic;
const productsData=product;

    //get data to register
    //let productData=req.body;
    //get collection
    let productsCollectionObj=req.app.get("productsCollectionObj")
    productsCollectionObj.insertOne(productsData)
                .then((success)=>{res.send({message:"Your product is added successfully"})})
                .catch(err=>console.log(err))
       
})


//req handler to add item to cart

//get req to get user by username
productsApiObj.get("/read",(req,res)=>{
     let productsCollectionObj=req.app.get("productsCollectionObj")
    productsCollectionObj.find().toArray()
     .then(productsArray=>res.send({message:"success",products:productsArray}))
      .catch(err=>{console.log(err)})
 })


//  productsApiObj.get("/add",(req,res)=>{
//     let productsCollectionObj=req.app.get("productsCollectionObj")
//    productsCollectionObj.find().toArray()
//     .then(cartArray=>res.send({message:"success",cart:cartArray}))
//      .catch(err=>{console.log(err)})
// })



//get req to get all users
productsApiObj.get("/allProducts",(req,res)=>{
    //get usercollectionobj
    let productsCollectionObj=req.app.get("productsCollectionObj")
    productsCollectionObj.find().toArray()
    .then(productsArray=>res.send({message:"success",products:productsArray}))
    .catch(err=>res.send({message:"error"}))
})

//export this obj
module.exports=productsApiObj;