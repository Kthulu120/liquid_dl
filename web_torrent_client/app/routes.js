const express = require('express');
const router = express.Router();
var WebTorrent = require('webtorrent');
var client = new WebTorrent();
var magnetURI = 'magnet:?xt=urn:btih:19f52af36c1e5d42ef8aa5628934479b65b06f5c&dn=101+Ready-to-Use+Excel+Formulas+-+Michael+Alexander%2C+Dick+Kuslei&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969';
const methods = require("./routes");
// REST API
router.route('/torrents')
    .get(function (req, res, next) {
        methods.addTorrent(client, magnetURI, "C:/tmp/toot/")
    })
    .post(function (req, res, next) {
        res.send('Post');
    });

router.route('/items/:id')
    .get(function (req, res, next) {
        res.send('Get id: ' + req.params.id);
    })
    .put(function (req, res, next) {
        res.send('Put id: ' + req.params.id);
    })
    .delete(function (req, res, next) {
        res.send('Delete id: ' + req.params.id);
    });

//app.use('/api', router);

module.exports = router;
