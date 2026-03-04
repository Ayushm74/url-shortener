const Url = require("../models/Url");
const generateCode = require("../utils/generateCode");

/*
Creates a shortened URL and stores
mapping between original and short code.
*/

exports.createShortUrl = async (req, res) => {

    const { originalUrl, customCode } = req.body;

    try {

        let shortCode = customCode || generateCode();

        const existing = await Url.findOne({ shortCode });

        if (existing) {
            return res.status(400).json({ message: "Code already taken" });
        }

        const newUrl = new Url({
            originalUrl,
            shortCode
        });

        await newUrl.save();

        res.json({
            shortUrl: `http://localhost:5000/${shortCode}`
        });

    } catch (error) {
        res.status(500).json(error);
    }
};


/*
Redirects user to original URL
and increments click counter.
*/

exports.redirectUrl = async (req, res) => {

    try {

        const url = await Url.findOne({ shortCode: req.params.code });

        if (!url) {
            return res.status(404).send("URL not found");
        }

        url.clicks += 1;
        await url.save();

        res.redirect(url.originalUrl);

    } catch (error) {
        res.status(500).send(error);
    }
};


/*
Returns analytics for the short URL
like number of clicks.
*/

exports.getAnalytics = async (req, res) => {

    try {

        const url = await Url.findOne({ shortCode: req.params.code });

        if (!url) {
            return res.status(404).send("URL not found");
        }

        res.json({
            originalUrl: url.originalUrl,
            clicks: url.clicks,
            createdAt: url.createdAt
        });

    } catch (error) {
        res.status(500).send(error);
    }
};