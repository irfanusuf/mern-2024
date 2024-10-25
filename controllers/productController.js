const { Product } = require("../models/productModel");
const cloudinary = require("cloudinary").v2


//cloudinary api configuration 

// use dot env to store configuartions and credentails 
cloudinary.config({
  cloud_name: 'dbo0xmbd7', 
  api_key: '717735839128615', 
  api_secret: 'fqcjtd3HxpH_t1dAEtqr595ULW0'
})


//create
const createProduct = async (req, res) => {
  try {
    const { productName, description, size, color, qty, price } = req.body;


    console.log(req.body)

    const image = req.file.path

    // upload image to cloudinary

    const upload = await cloudinary.uploader.upload(image)


    const imageUrl = upload.secure_url
    // const publicUrl = upload.public_id

    // you will get an public url
    const newProduct = await Product.create({
      productName,
      description,
      size,
      color,
      qty,
      price,
      imageUrl : imageUrl
    });

    if (newProduct) {
      res.redirect("/products");
    } else {
      console.log("something wrong");
    }
  } catch (error) {
    console.error(error);
  }
};

//read 
const getProducts = async (req, res) => {
  // const {id} = req.userId
  const products = await Product.find().lean();
  res.render("productsPage", {
    products: products,
    pageTitle: "Products",
  });
};

//update
const handleProductUpdation = async (req, res) => {
  try {
    const { productId } = req.params;

    const { productName, description, size, color, qty, price } = req.body;

    const findProductEdit = await Product.findByIdAndUpdate(productId, {
      $set: {
        productName,
        description,
        size,
        color,
        qty,
        price,
      },
    });

    if (findProductEdit) {
      res.redirect("/products");
    } else {
      res.render("error", {
        message: "Some Error. Try again After Some time!",
      });
    }
  } catch (error) {
    console.log(error);
    res.render("error", { message: "Server Error" });
  }
};

//delete
const handleProductDeletion = async (req, res) => {
  try {
    const { productId } = req.params;
    // const productId =req.params.productId

    const findProduct = await Product.findByIdAndDelete(productId);

    if (findProduct) {
      res.redirect("/");
    } else {
      res.render("error", {
        message: "Some Problem During Deletion ! | Product not Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.render("error", { message: "Server Error" });
  }
};



module.exports = {
  createProduct,
  handleProductDeletion,
  handleProductUpdation,
  getProducts
};
