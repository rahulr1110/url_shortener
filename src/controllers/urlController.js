const Url = require("../models/urlModel");
const UrlShortener = require("../utils/urlShortener");
class UrlController {
  static async shortenUrl(req, res) {
    try {
      const { originalUrl } = req.body;
      console.log("hello");
      if (!originalUrl)
        return res.status(400).json({ message: "url is required" });
      //check if the url is already shortend
      let url = await Url.findOne({ originalUrl });
      if (url) {
        return res.json(url);
      }
      //generate short url
      const shortUrl = UrlShortener.generateShortUrl();
      //save to the database
      url = new Url({
        originalUrl,
        shortUrl,
      });
      await url.save();
      res.json(url);
    } catch (error) {
      res.status(500).json({ message: "error on server" });
    }
  }
  static async redirectToOriginalUrl(req, res) {
    try {
      const { shortUrl } = req.params;
      const url = await Url.findOne({ shortUrl: shortUrl });
      if (!url) {
        return res.status(404).send("URL NOT FOUND");
      }
      //inc the count
      url.clicl += 1;
      await url.save();
      res.redirect(url.originalUrl);
    } catch (error) {
      console.log(error);
      res.status(500).send("server error");
    }
  }
}

module.exports = UrlController;
