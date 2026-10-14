const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    description: String,
    image: {
      type: String,
      default: 
        "https://tse2.mm.bing.net/th/id/OIP.P-gYsqgJDg7RvTaaG1sIWwHaJ4?r=0&pid=Api&P=0&h=180",
      set: (v) => 
        v === ""
          ? "https://tse2.mm.bing.net/th/id/OIP.P-gYsqgJDg7RvTaaG1sIWwHaJ4?r=0&pid=Api&P=0&h=180" 
          : v,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews }});
  }
});

const Listing = mongoose.model("listing", listingSchema);
module.exports = Listing;