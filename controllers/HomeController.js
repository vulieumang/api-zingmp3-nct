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
  readme(req, res) {
    res.render(
      "readme"
    )
  }
}

module.exports = new HomeController
