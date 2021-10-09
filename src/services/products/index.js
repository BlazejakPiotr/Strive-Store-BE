import express from "express";
import ProductModel from "./schema.js";

const productsRouter = express.Router();

// POST
productsRouter.post("/", async (req, res, next) => {
  try {
    const newProduct = new ProductModel(req.body);
    const { _id } = await newProduct.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});

// GET
productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await ProductModel.find();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

// GET by ID
productsRouter.get("/:productID", async (req, res, next) => {
  try {
    const productID = req.params.productID;
    const product = await ProductModel.findById(productID);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

// PUT
productsRouter.put("/:productID", async (req, res, next) => {
  try {
    const productID = req.params.productID;
    const editedProduct = await ProductModel.findByIdAndUpdate(
      productID,
      req.body,
      {
        new: true,
      }
    );
    res.send(editedProduct);
  } catch (error) {
    next(error);
  }
});

// DELETE
productsRouter.delete("/:productID", async (req, res, next) => {
  try {
    const productID = req.params.productID;
    await ProductModel.findByIdAndDelete(productID);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
