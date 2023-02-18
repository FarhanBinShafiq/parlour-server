const express = require('express')
require('dotenv').config()
const cors = require('cors')

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const app = express()
const port = process.env.PORT || 5000

//middle ware
app.use(cors());
app.use(express.json())

const uri = "mongodb+srv://admin:zZPBWTlbZAOjEsz9@cluster0.ua4yklp.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function run() {
  try {
    await client.connect();
    const servicesCollection = client.db('parlour_server').collection('services')
    const productsCollection = client.db('parlour_server').collection('products')
    console.log("DB connected")

    //--------------------Services------------- 
    //Post Method->Add Service 

    app.post('/addservice', async (req, res) => {
      const services = req.body;
      const result = await servicesCollection.insertOne(services);
      console.log(result)
      res.send(result)
    })

    //Get method
    app.get('/services', async (req, res) => {
      const query = {}
      const serviceOptions = await servicesCollection.find(query).toArray();
      res.send(serviceOptions);

    })

    //Delete Method
    app.delete('/services/:id', async (req, res) => {
      const id = req.params.id;
      const deleteId = { _id: new ObjectId(id) }
      const result = await servicesCollection.deleteOne(deleteId);
      res.send(result);

    })

    //---------- Prodcuts-----------
    //Post method
    app.post('/addproduct', async (req, res) => {
      const products = req.body;
      const result = await productsCollection.insertOne(products);
      console.log(result)
      res.send(result)
    })



  } finally { }
}

run().catch(console.dir)


app.get('/', (req, res) => {
  res.send('Hello from Doctors World!')
})

app.listen(port, () => {
  console.log(`Doctors app listening on port ${port}`)
})