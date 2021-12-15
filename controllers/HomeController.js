/**
 * class HomeController
 */
class HomeController {
  /**
   * @param {*} req
   * @param {*} res
   */
  index(req, res) {
    res.render(
      "index"
    )
  }
}

module.exports = new HomeController
