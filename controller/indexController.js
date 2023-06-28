const ProdModel = require("../model/ProdModel");
const UserModel = require("../model/UserModel");
const yup = require("yup");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Mail } = require("../services/Mail");

// Get all products
exports.products = async function (req, res, next) {
  const products = await ProdModel.find();
  const total = await ProdModel.countDocuments();
  res.setHeader("Content-Range", `products 0-${products.length}/${total}`);

  return res.send(products);
};

// Get product by category
exports.category = async function (req, res, next) {
  const products = await ProdModel.find({ category: req.body.category });
  const total = await ProdModel.countDocuments({ category: req.body.category });

  res.setHeader("Content-Range", `products 0-${products.length}/${total}`);

  return res.json({
    products,
  });
};

// Get one product
exports.eachproduct = async function (req, res, next) {
  const products = await ProdModel.findById(req.params.id);
  // console.log(products);
  return res.send({
    products: products,
  });
};

// fetch one product based on id
exports.oneProduct = async function (req, res, next) {
  const products = await ProdModel.findOne({ id: Number(req.params.id) });
  console.log(products);
  return res.send({
    products: products,
  });
};

// Create a new product
exports.createProduct = async function (req, res, next) {
  try {
    const newProduct = new ProdModel(req.body);
    // return console.log(newProduct);
    const savedProduct = await newProduct.save();
    return res.status(201).json({
      id: savedProduct._id.toString(), // Transform _id to string format
      ...savedProduct._doc, // Include other product properties
    });
    // return res.status(201).json(savedProduct);
  } catch (error) {
    return res.status(500).json({
      message: "Error creating product",
      error: error.message,
    });
  }
};

// Update a product
exports.updateProduct = async function (req, res, next) {
  try {
    const updatedProduct = await ProdModel.findOneAndUpdate(
      { id: Number(req.params.id) },
      req.body,
      { new: true }
    );

    if (updatedProduct) {
      // Send a response with the updated product
      res.status(200).json({
        message: "Product updated successfully",
        data: updatedProduct,
      });
    } else {
      // If the product is not found, send a response indicating the product does not exist
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error updating product",
      error: error.message,
    });
  }
};

// Delete a product
exports.deleteProduct = async function (req, res, next) {
  try {
    const deletedProduct = await ProdModel.findOneAndDelete({
      id: Number(req.params.id),
    });
    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting product",
      error: error.message,
    });
  }
};

// Registration
exports.register = async function (req, res, next) {
  let schema = yup.object().shape({
    first_name: yup.string().required("First name is required").min(2),
    last_name: yup.string().required("Last name is required").min(2),
    email: yup
      .string()
      .email("Email is not valid")
      .required("Email is required"),
    phone: yup.string().required("Phone is required"),
    sex: yup.string().required("Sex is required"),
    nationality: yup.string().required("Nationality is required"),
    region: yup.string().required("Region is required"),
    address: yup.string().required("Address is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });
  try {
    await schema.validate(req.body);
    let user = await UserModel.find({ email: req.body.emai });
    if (user.length > 1) {
      return res
        .status(400)
        .send({ status: "error", message: "Email has already been used" });
    }

    let password = await bcrypt.hash(req.body.password, 10);
    await UserModel.create({ ...req.body, password });
    res.send({
      status: "ok",
      message: "Your account has been created successfully",
    });
  } catch (error) {
    res.send(error);
  }
};

// Login
exports.login = async function (req, res) {
  let schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  try {
    await schema.validate(req.body);

    let user = await UserModel.findOne({ email: req.body.email });
    // res.send(user);

    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

        return res.send({
          status: "ok",
          message: "Sign in successful",
          token: token,
          user: user,
        });
      } else {
        res.send({
          status: "Incorrect login details",
          message: "Invalid email or password",
        });
      }
    } else {
      res.send({
        status: "User not found",
        message: "Email is not registered",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
};

// Verification
exports.verification = function (req, res) {
  let message = req.body.code;
  let mail = req.body.mail;

  Mail(
    mail,
    "Harrears Email Verification",
    `Your one time authentication code is ${message}`,
    (response) => {
      res.send(response);
    }
  );
};

// Users
exports.users = async function (req, res, next) {
  const users = await UserModel.find();
  const total = await UserModel.countDocuments();
  res.setHeader("Content-Range", `users 0-${users.length}/${total}`);

  return res.send(users);
};

// fetch one user based on id
exports.oneUser = async function (req, res, next) {
  // console.log(req.body);
  // const user = await UserModel.findOne({ id: Number(req.params.id) });
  const user = await UserModel.findById(req.params.id);
  // console.log(user);
  return res.send({
    user,
  });
};

// Update a user
exports.updateUser = async function (req, res, next) {
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (updatedUser) {
      // Send a response with the updated product
      res.status(200).json({
        message: "user updated successfully",
        data: { id: updatedUser._id, ...updatedUser },
      });
    } else {
      // If the product is not found, send a response indicating the product does not exist
      res.status(404).json({ message: "user not found" });
      console.log("nott found");
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error updating product",
      error: error.message,
    });
  }
};

// Create a new user
exports.createUser = async function (req, res, next) {
  try {
    const newUser = new UserModel(req.body);

    const savedUser = await newUser.save();
    return res.status(201).json({
      id: savedUser._id.toString(), // Transform _id to string format
      ...savedUser._doc, // Include other user properties
    });
    // return res.status(201).json(savedUser);
  } catch (error) {
    return res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};

// Delete a user
exports.deleteUser = async function (req, res, next) {
  try {
    const deletedUser = await UserModel.findOneAndDelete({
      _id: req.params.id,
    });

    if (deletedUser) {
      return res.json({
        message: "user deleted successfully",
      });
    } else {
      return res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting user",
      error: error.message,
    });
  }
};
