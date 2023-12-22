const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log(`MongoDB failed to connect: ${error.messsage}`);
  }
};

connectDB();

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  avatar: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  boards: {
    type: Array,
    default: [],
  },
});

userSchema.plugin(plm);

module.exports = mongoose.model("User", userSchema);
