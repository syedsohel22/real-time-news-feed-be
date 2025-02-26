const express = require("express");
const auth = require("../middleware/auth.middleware");
const User = require("../models/User.model");

const router = express.Router();

router.post("/subscribe", auth, async (req, res) => {
  try {
    const { categories } = req.body;
    const user = await User.findById(req.user.id);

    user.subscribedCategories = categories;
    await user.save();

    res.json({
      msg: "Subscribed successfully",
      categories: user.subscribedCategories,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

router.get("/subscriptions", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ categories: user.subscribedCategories });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
