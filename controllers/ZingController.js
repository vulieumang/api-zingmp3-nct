const ZingMp3 = require("../modules/zing")

/**
 * class ZingController
 */
class ZingController {
  /**
   * @param {*} req
   * @param {*} res
   */
  getSong(req, res) {
    ZingMp3.getSong(req.query.id, (data) => {
      res.json(data)
    })
  }

  getSongUrl(req, res) {
    ZingMp3.getSong(req.query.id, (data) => {
      // res.json(data)
      res.redirect(data.data[128]);

    })
  }

  getPlaylist(req, res) {
    ZingMp3.getPlaylist(req.query.id, (data) => {
      res.json(data)
    })
  }

  getTop100(req, res) {
    ZingMp3.getTop100((data) => {
      res.json(data)
    })
  }

  getChartHome(req, res) {
    ZingMp3.getChartHome((data) => {
      res.json(data)
    })
  }

  getInfo(req, res) {
    ZingMp3.getInfo(req.query.id, (data) => {
      res.json(data)
    })
  }
}

module.exports = new ZingController
