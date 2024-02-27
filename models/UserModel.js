import { Schema, models, model } from "mongoose";
import validation from "validator";
import bcrypt from "bcryptjs";
import environment from "@utils/environment";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return validation.isEmail(value);
        },
        message: (props) => `${props.value} is not a valid email`,
      },
    },
    password: {
      type: String,
      default: null,
    },
    OAuthId: {
      type: String,
      default: null,
    },
    OAuthProvider: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    loginCount: {
      type: Number,
      default: 1,
    },
    lastLogin: {
      type: Date,
      default: Date.now(),
    },
    doubleVerify: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.checkPassword = function (given_password) {
  //   WORK: CHECK IF USER PASSWORD DOES NOT MATCH WITH HASH PASSWORD
  const checkPassword = bcrypt.compareSync(
    String(given_password),
    this.password
  ); // Boolean

  return checkPassword;
};

userSchema.pre("save", function (next) {
  // Check if there's a password to hash
  if (this.password) {
    this.password = bcrypt.hashSync(this.password, environment.SALT_ROUND);
  }

  next();
});

const User = models.User || model("User", userSchema);

export default User;
