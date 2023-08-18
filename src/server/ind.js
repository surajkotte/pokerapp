const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(express.json());
require('dotenv').config();
const { v4: uuidv4 } = require("uuid");

app.listen(3000, () => {});
const uri = 'mongodb+srv://youcantopen9640:kotte%40123@cluster0.c8y22w4.mongodb.net/poker-app?retryWrites=true&w=majority';
mongoose
  .connect(uri)
  .then(console.log("Database connection successfull"))
  .catch((err) => {
    console.log("Databse connection failed!", err);
  });

const BasiDataSchema = new mongoose.Schema({
  groupId: String,
  Date: String,
  ObjectId: String,
  commonData: {
    oneBuyInToChips: String,
    oneBuyInToDoller: String,
    oneChipCost: String,
  },
});

const QueryDataSchema = new mongoose.Schema({
  groupId: String,
  Dates: [
    {
      Date: String,
    },
  ],
});

const GameDataSchema = new mongoose.Schema({
  groupId: String,
  Date: String,
  ObjectId: String,
  personalDetails: [
    {
      Date: String,
      playerData: [
        {
          name: String,
          Buyin: String,
          Money: String,
          StartingChips: String,
          EndingChips: String,
          profitLoss: String,
        },
      ],
    },
  ],
});

const BasicDataModel = new mongoose.model("BasicData", BasiDataSchema);
const GameDataModel = new mongoose.model("GameData", GameDataSchema);
const QueryDataModel = new mongoose.model("QueryData", QueryDataSchema);
app.use(cors());
app.post("/food/new", urlencodedParser, async (req, res) => {
  const random_uuid = uuidv4();

  const date = new Date();
  let currentDay = String(date.getDate()).padStart(2, "0");
  let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
  let currentYear = date.getFullYear();
  let time = date.getMinutes() + ":" + date.getHours();

  let currentDate =
    currentDay + "-" + currentMonth + "-" + currentYear + "-" + time;
  const groupid = req.body.text.groupId;
  const GameDataArray = req.body.text.XLData;

  var DataArrar = [];
  GameDataArray.map((Item) => {
    DataArrar.push({
      name: Item.name,
      Buyin: Item.buyins,
      Money: Item.money,
      StartingChips: Item.startingChips,
      EndingChips: Item.endingChips,
      profitLoss: Item.profitloss,
    });
  });

  const query = await QueryDataModel.find({ groupId: groupid }).exec();
  const docs = await GameDataModel.find({ groupId: groupid }).exec();

  if (docs.length === 0) {
    const GameDataSaved = new GameDataModel({
      groupId: groupid,
      Date: currentDate,
      ObjectId: random_uuid,
      personalDetails: [
        {
          Date: currentDate,
          playerData: DataArrar,
        },
      ],
    });

    const QueryDataSaved = new QueryDataModel({
      groupId: groupid,
      Dates: [
        {
          Date: currentDate,
        },
      ],
    });
    GameDataSaved.save();
    QueryDataSaved.save();
    res.json(GameDataModel);
  } else {
    docs[0].personalDetails.push({ Date: currentDate, playerData: DataArrar });
    query[0].Dates.push({ Date: currentDate });
    const newGameData = new GameDataModel(docs[0]);
    const newQueryData = new QueryDataModel(query[0]);
    newGameData.save();
    newQueryData.save();
    res.json(newGameData);
  }
});
