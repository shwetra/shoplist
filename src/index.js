const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/db");
const { ProductModel } = require("./model/cardmodel");
const { BookModel } = require("./model/bookmark");



require("dotenv").config()
const PORT = process.env.PORT;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());




app.get("/", async (req, res) => {
    const data = await ProductModel.find();
    res.send({ status: true, productsData: data, })
})

app.post("/product", async (req, res) => {
    const { title, quantity, priority, description } = req.body;
    const product = new ProductModel({
      title,
      quantity,
      priority,
      description,
    });
    try {
      await product.save();
      res.send("Note Created");
    } catch (err) {
      res.send("Something went wrong,please try again later");
    }
  });


app.delete("/delete/:id", async (req, res) => {
    const { id } = req.params
    try {
        const check = await ProductModel.deleteOne({ _id: id });
        res.send({ msg: 'Deleted Successfully', status: true })
    } catch (err) {
        res.send({ msg: 'product Not Find', status: false })
    }
});

app.post("/bookmark/:id",async(req,res)=>{
    let product_id=req.params.id;
    console.log(product_id)
    let product=await ProductModel.find({_id:product_id});
    let { title, quantity,priority,description}=product
    try{
        let bookmarked=await BookModel.find({product_id});
        // res.send(bookmarked)
        // if(!bookmarked){
            let x= new BookModel({product_id,title,quantity,priority,description});
            await x.save()
            res.send("product bookmearked successfully")
        // }
        // else{
        //     res.send("product is already in thne bookmmark")
        // }
    }
    catch(err){
        res.send("cann beadded to bookmarked")
    } 
})

app.listen(PORT, () => {
  dbConnect();
  console.log(`Server started on port ${PORT}`);
});
