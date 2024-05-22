const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { UserRole } = require("../constants/app.const");
const saltRounds = 10;

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: UserRole.user,
    },
    cart: {
      type: Array,
      default: [],
    },
    address: [{ type: mongoose.Types.ObjectId, ref: "Address" }],
    wishlist: [{ type: mongoose.Types.ObjectId, ref: "Wishlist" }],
  },
  {
    timestamps: true,
  }
);

// hash password before save to db
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, saltRounds);
});

// check user login
userSchema.methods.isMatchedPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

//Export the model
module.exports = mongoose.model("User", userSchema);
