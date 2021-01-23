//create express app
const exp=require("express")
const app=exp();
//import path
const path=require("path");
app.use(exp.static(path.join(__dirname,'./dist/amazon')));

//import mongodb client
const mongoclient=require("mongodb").MongoClient
const databaseurl="mongodb+srv://mounika:3HfQHtS1t7TabpYY@cluster0.lqbpi.mongodb.net/dbfordemo?retryWrites=true&w=majority"

//import api obj's
const userApiObj=require("./Apis/userapi")
const adminApiObj=require("./Apis/adminapi")
const productsApiObj=require("./Apis/productsapi")
const cartApiObj=require("./Apis/cartapi")

//forward req obj's to specify api's based on path
app.use("/user",userApiObj);
app.use("/admin",adminApiObj);
app.use("/products",productsApiObj);
app.use("/cart",cartApiObj);

//error handling 
app.use((req,res,next)=>{
    res.send({message:"Path does not exists"})
})

app.use((err,req,res,nex)=>{
    console.log("error is",err)
})

//call connect method on mongoclient
mongoclient.connect(databaseurl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
    if(err){
        console.log("error in database connection")
    }
    else{
        //get db objects
        const dbObj=client.db("dbfordemo")
        //get collection objects
        const userCollectionObj=dbObj.collection("usercollection")
        const adminCollectionObj=dbObj.collection("admincollection")
        const productsCollectionObj=dbObj.collection("productscollection")
        const cartCollectionObj=dbObj.collection("cartcollection")
        //make collection obj's available to api's
        app.set("userCollectionObj",userCollectionObj)
        app.set("adminCollectionObj",adminCollectionObj)
        app.set("productsCollectionObj",productsCollectionObj)
        app.set("cartCollectionObj",cartCollectionObj)
        console.log("database initialized successfully")
    }
})

//assign port number
const port=3000
app.listen(port,()=>{
    console.log(`server is listening on ${port}`)
})