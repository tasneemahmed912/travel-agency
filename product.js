const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/products", (req, res) => {
    const { name, price, description, category } = req.body;
  
    //GET THE PRODUCTS JSON FILE
    fs.readFile("./data/products.json", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const products = JSON.parse(data);
        const product = {
          id: products.length + 1,
          name,
          price,
          description,
          category,
        };
  
        products.push(product);
        fs.writeFile("./data/products.json", JSON.stringify(products), (err) => {
          if (err) {
            console.log(err);
          } else {
            res.status(201).send(product);
          }
        });
      }
    });
  });
  //get product by id
  app.get("/products/:id", (req, res) => {
    const { id } = req.params;
    fs.readFile("./data/products.json", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const products = JSON.parse(data);
        const product = products.find((p) => p.id == id);
  
        if (product) {
          res.status(200).send(product);
        } else {
          res.status(404).send("Product not found");
        }
      }
    });
  });
  
  app.listen(8000, "localhost", () => {
    console.log("server started at http://localhost:8000");
  });