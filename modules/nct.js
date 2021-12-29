const axios = require("axios");
const encrypt = require("./encrypt");
const Nhaccuatui = require("nhaccuatui-api")

class Nct{
  getUrlSong(id) {
    let CTIME = Math.floor(Date.now() / 1000);
    let signature_song = encrypt.getHmac512(
      PATH_SONG +
        encrypt.getHash256(`ctime=${CTIME}id=${id}version=${VERSION}`),
      SECRET_KEY
    );
    let songUrl = `${URL}${PATH_SONG}?id=${id}&ctime=${CTIME}&version=${VERSION}&sig=${signature_song}&apiKey=${API_KEY}`;
    return songUrl;
  }

  setCookie(callback) {
    axios.get(`${URL}`).then((res) => {
      callback(res.headers["set-cookie"][1]);
    });
  }
  getNct(id, callback) {
    Nhaccuatui.getSong(id).then((data) => 
      callback(data)
    );
  }
  
}

module.exports = new Nct();
