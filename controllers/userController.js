import mongoose from "mongoose";
import Code from "../models/codeModel.js";
import Portfolio from "../models/portfolio.js";

// Login User
const loginUser = async (req, res, next) => {
  const { code, name } = req.body;
  console.log("login ", code, name);

  // checking if the user has name and password both

  if (!code || !name) {
    return res.status(400).json({
      message: "Fill the empty fields",
    });
  }

  const user = await Code.findOne({ code });
  console.log(user);

  if (!user) {
    return res.status(400).json({
      message: "Invalid Code",
    });
  }

  user.name = name;
  user.isActive = true;
  await user.save();
  const token = await user.getJWTToken();
  const userId = user._id;
  res.status(200).json({
    success: true,
    info: user,
    token,
    userId: userId,
  });
};

const alredyLoggedIn = async (req, res) => {
  const user = await Code.findById(req.id);
  if (!user)
    return res.status(400).json({
      error: "User not found",
    });
  res.status(200).json({
    success: true,
    user: user,
  });
};

const getStartupBuyingDetails = async (req, res) => {
  try {
    const userId = req.id;
    if (!userId) {
      return new Error(`userId is not found`)
    }
    const user = await Code.findById(userId);

    if (!user) {
      return new Error(`userId is invalid`)
    }
    let startupsName = [];
    let buyStartupStocks = [];
    let multiplier = [];
    for (const elem of user.buyHistory) {
      buyStartupStocks.push(elem.boughtStock);
      const portfolio = await Portfolio.findById(elem.portfolio_id);
      startupsName.push(portfolio.name);
      multiplier.push(portfolio.multiplier);
    };


    return res.json({
      startupsName,
      buyStartupStocks,
      multiplier,
    });
  }
  catch (err) {
    console.log("Error: ", err.message);
    return res.json({
      error: err.message,
    })
  }
};
export { loginUser, alredyLoggedIn, getStartupBuyingDetails };
