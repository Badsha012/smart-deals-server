const  express=require('express');

const { MongoClient, ServerApiVersion } = require('mongodb');
const cors=require('cors');
const app=express();
const port=process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://smartbdUser:Sz9aPq0m96MbI6cE@cluster0.cyspe14.mongodb.net/?appName=Cluster0";


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run(){
    try{
        await client.connect();

       const db=client.db('smart_db');
       const productsCollection=db.collection('products');
       app.post('/products',async(req,res) =>{
        const newProdct=req.body;
        const result=await productsCollection.insertOne(newProdct);
        res.send(result);


       })
       app.delete('/products/:id',(req,res)=>{
        const id=req.params.id;
       })

         await client.db("admin").command({ ping: 1 });
             console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally{

    }

}
run().catch(console.dir)



app.get('/',(req,res)=>{
    res.send('smart server is runnng');
})

app.listen(port,()=>{
    console.log(`smart server is Running on port:${port}`);
})