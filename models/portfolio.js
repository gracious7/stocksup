import mongoose from "mongoose";

const portfolio = mongoose.Schema({
  name: String,
  about: String,
  leader: String,
  stock: {
    type: Number,
    default: 20000,
  },


  soldHistory: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "Code",
      },
      bought: {
        type: Number,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],

  multiplier: {
    type:Number,
    default:1
  }
});

var Portfolio = mongoose.model("Portfolio", portfolio);

export default Portfolio;
