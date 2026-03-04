const Url = require('../models/Url');
const generateCode = require('../utils/generateCode');

exports.shortenUrl = async (req, res) => {
  const { fullUrl } = req.body;
  if (!fullUrl) return res.status(400).json({ message: 'fullUrl is required' });

  try {
    let url = await Url.findOne({ fullUrl });
    if (url) return res.json({ shortCode: url.shortCode });

    let shortCode;
    let exists;
    do {
      shortCode = generateCode(6);
      exists = await Url.findOne({ shortCode });
    } while (exists);

    url = new Url({ fullUrl, shortCode });
    await url.save();

    res.json({ shortCode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.redirect = async (req, res) => {
  const { code } = req.params;
  try {
    const url = await Url.findOne({ shortCode: code });
    if (!url) return res.status(404).json({ message: 'Not found' });

    url.clicks += 1;
    await url.save();

    res.redirect(url.fullUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
