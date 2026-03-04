const express = require("express");
const router = express.Router();

const {
    createShortUrl,
    redirectUrl,
    getAnalytics
} = require("../controllers/urlController");

/*
POST /shorten
Creates short URL
*/

router.post("/shorten", createShortUrl);


/*
GET /:code
Redirects to original URL
*/

router.get("/:code", redirectUrl);


/*
GET /analytics/:code
Returns click analytics
*/

router.get("/analytics/:code", getAnalytics);

module.exports = router;