const express = require('express')
const UrlController = require('../controllers/urlController')


const router = express.Router()

router.post('/shorten',UrlController.shortenUrl)
router.get('/:shortUrl', UrlController.redirectToOriginalUrl)

module.exports = router