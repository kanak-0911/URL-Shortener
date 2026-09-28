require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Url = require("./urlModel");

const app = express();

mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000
})
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log("MongoDB connection error:", error));

app.use(express.json());
app.use(express.static("public"));

app.post("/shorten", async (req, res) => {
    try {
        const longUrl = req.body.longUrl;

        if (!longUrl || (!longUrl.startsWith("http://") && !longUrl.startsWith("https://"))) {
            return res.status(400).json({
                message: "Please enter a valid URL"
            });
        }

        const shortId = Math.random().toString(36).substring(2, 7);

        const newUrl = new Url({
            longUrl: longUrl,
            shortId: shortId
        });

        await newUrl.save();

        res.json({
            shortId: shortId
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong"
        });
    }
});

app.get("/:shortId", async (req, res) => {
    try {
        const shortId = req.params.shortId;

        const urlData = await Url.findOne({ shortId: shortId });

        if (urlData) {
    urlData.clicks = urlData.clicks + 1;
    await urlData.save();

    res.redirect(urlData.longUrl);
} else {
    res.status(404).sendFile(__dirname + "/public/404.html");
}

    } catch (error) {
        res.status(500).send("Something went wrong");
    }
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});