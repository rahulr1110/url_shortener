const mongoose = require("mongoose");

const urlSchema = mongoose.Schema(
  {
    originalUrl: {
      type: String,
      require: true,
    },
    shortUrl: {
      type: String,
      require: true,
      unique: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Url = mongoose.model("Url", urlSchema);
module.exports = Url;
