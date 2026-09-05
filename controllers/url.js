const { nanoid } = require("nanoid");

const { Url } = require("../models/url");

async function handleCreateNewShortUrl(req, res) {
  const url = req.body.url;
 
  if (!url) {
    return res.status(400).json({ message: "Provide a correct url" });
  }

  const shortId = nanoid();

  await Url.create({
    shortId: shortId,
    redirectURL: url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  /*
return res.status(201).json({ message: "Url created successfully", shortId });
*/
  
return res.redirect(`/?id=${shortId}`);}

async function handleRedirectUrl(req, res) {
  const shortId = req.params.shortId;
  const updatedUrl = await Url.findOneAndUpdate(
    {
      shortId: shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
  );
  if (!updatedUrl) {
    return res.status(404).json({ message: "Short URL not found" });
  }
  res.redirect(updatedUrl.redirectURL);
}

async function handleGetUrlAnalytics(req, res) {
  const shortId = req.params.shortId;
  const url = await Url.findOne({
    shortId: shortId,
  });
  if (!url) {
    return res.status(404).json({ message: "Url not found" });
  }
  const totalClicks = url.visitHistory.length;
  res.json({
    totalClicks: totalClicks,
    analytics: url.visitHistory,
  });
}

async function handleHomePage(req, res) {
  const allUrls = await Url.find({
        createdBy: req.user._id,

  });
  res.render("home", {
    urls: allUrls,
     id: req.query.id,
  });
}



module.exports = {
  handleCreateNewShortUrl,
  handleRedirectUrl,
  handleGetUrlAnalytics,
  handleHomePage,
  
};
