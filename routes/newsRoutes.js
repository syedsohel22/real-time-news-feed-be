const express = require("express");
const News = require("../models/News.model");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

/**
 * @swagger
 * /api/news:
 *   get:
 *     summary: Fetch all news articles
 *     description: Get a list of all news articles sorted by the latest timestamp.
 *     responses:
 *       200:
 *         description: A list of news articles
 *       500:
 *         description: Server error
 */
router.get("/", async (req, res) => {
  try {
    const news = await News.find().sort({ timestamp: -1 });
    res.status(200).json(news);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch news", error: error.message });
  }
});

/**
 * @swagger
 * /api/news:
 *   post:
 *     summary: Create a new news article
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: News article created successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Server error
 */

/**
 * @route   POST /api/news
 * @desc    Create a new news article
 * @access  Private (Only authenticated users can post news)
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, category, content } = req.body;

    if (!title || !category || !content) {
      return res
        .status(400)
        .json({ message: "Title, category, and content are required" });
    }

    const news = new News(req.body);
    await news.save();
    req.io.emit("newsUpdate", news);

    res
      .status(201)
      .json({ message: "News article created successfully", news });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create news", error: error.message });
  }
});

/**
 * @route   GET /api/news/trending
 * @desc    Fetch trending news (Top 5 based on views & likes)
 * @access  Public
 */
router.get("/trending", async (req, res) => {
  try {
    const trendingNews = await News.aggregate([
      {
        $addFields: {
          trendingScore: {
            $add: [
              { $multiply: ["$views", 0.7] },
              { $multiply: ["$likes", 0.3] },
            ],
          },
        },
      },
      { $sort: { trendingScore: -1, timestamp: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json(trendingNews);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch trending news", error: error.message });
  }
});

module.exports = router;
