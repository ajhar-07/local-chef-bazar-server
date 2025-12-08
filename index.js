const express=require('express')
const cors=require("cors")
const port=process.env.PORT || 5000
const app=express()
app.use(cors())
app.use(express.json())
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ufivfja.mongodb.net/?appName=Cluster0`;

app.get('/',(req,res)=>{
    res.send('local chef is running')
})


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    
   const db=client.db('Local-Bazar')
const userCollection=db.collection('users')

//post & update user

app.post('/users', async(req,res)=>{
    const userData=req.body
    const result=await userCollection.insertOne(userData)
    res.send(result)
})

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port,()=>{
    console.log('data is running in port :}',port);
    
})