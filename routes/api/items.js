const express = require("express");
const router = express.Router();

const Item = require("../../models/Item");

const auth = require("../../middleware/auth");

//@Route GET api/items
//@decs  Get All items
//@Access Public
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ date: -1 }).lean();
    res.json(items);
  } catch (error) {
    console.log(error);
  }
});

//@Route POST api/items
//@decs  create an item
//@Access Private
router.post("/", auth, async (req, res) => {
  try {
    const { name } = req.body;
    const newItem = await Item.create(req.body);

    return res.status(201).json({
      success: true,
      data: newItem,
    });
  } catch (error) {
    if (error.name === "validationError") {
      const messages = Object.values(error.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
});

//@Route  DELETE api/items
//@desc   Delete an Item
//@Access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        error: "No item not found",
      });
    }

    await item.remove();
    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

module.exports = router;
