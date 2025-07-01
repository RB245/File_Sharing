const express = require('express');
const router = express.Router();
const { shortenUrlHandler, redirectUrl } = require('../service/urlService');

// URL shortening endpoint
router.post('/shorten', shortenUrlHandler);

// URL redirection endpoint - must be after /shorten to avoid conflicts
router.get('/:shortId', async (req, res, next) => {
    try {
        const originalUrl = await redirectUrl(req.params.shortId);
        res.redirect(originalUrl);
    } catch (error) {
        if (error.message === 'URL not found') {
            return res.status(404).json({
                error: {
                    message: 'Short URL not found'
                }
            });
        }
        next(error);
    }
});

module.exports = router;