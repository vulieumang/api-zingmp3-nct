const Nhaccuatui = require("nhaccuatui-api")

class Nct{
  getNct(id, callback) {
    Nhaccuatui.getSong(id).then((data) => 
      callback(data)
    );
  }
}

module.exports = new Nct();
