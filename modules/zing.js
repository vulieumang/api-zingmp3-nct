const axios = require("axios");
const encrypt = require("./encrypt");

const VERSION = "1.4.11";
const VERSION_COOKIE = "1411";
const URL = "https://zingmp3.vn";
const PATH_SONG = "/api/v2/song/get/streaming";
const PATH_PLAYLIST = "/api/v2/page/get/playlist";
const PATH_TOP = "/api/v2/page/get/top-100";
const PATH_INFO = "/api/v2/song/get/info";
const PATH_CHARTHOME = "/api/v2/page/get/chart-home";
const PATH_SEARCH = "/api/v2/search/multi";
const SECRET_KEY = "2aa2d1c561e809b267f3638c4a307aab";
const API_KEY = "88265e23d4284f25963e6eedac8fbfa3";
// search/multi?q=
class Zing {
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
  getUrlSearch(keyword) {
    //https://zingmp3.vn/api/v2/search/multi?q=t%C3%BAy%20%C3%A2m&ctime=1640760110&version=1.5.3&sig=dcdfcbbf77cd30839b53140dfa9ec0ac47f4d50e96d45210f4d4e92f1d6f33a38d68d4e6064d5bb8bd3f4514d4c38cccd526f0108abeb398003b442b1e0aaeec&apiKey=88265e23d4284f25963e6eedac8fbfa3
    let CTIME = Math.floor(Date.now() / 1000);
    let signature_song = encrypt.getHmac512(
      PATH_SEARCH +
        encrypt.getHash256(`ctime=${CTIME}version=${VERSION}`),
      SECRET_KEY
    );
    let songUrl = `${URL}${PATH_SEARCH}?q=${keyword}&ctime=${CTIME}&version=${VERSION}&sig=${signature_song}&apiKey=${API_KEY}`;
    console.log(songUrl)
    return songUrl;
  }

  setCookie(callback) {
    axios.get(`${URL}`).then((res) => {
      callback(res.headers["set-cookie"][1]);
    });
  }

  getSong(id, callback) {
    this.setCookie((cookie) => {
      axios
        .get(this.getUrlSong(id), {
          headers: {
            Cookie: `${cookie}`,
          },
        })
        .then((res) => {
          callback(res.data);
        });
    });
  }

  getSearch(keyword, callback) {
    this.setCookie((cookie) => {
      axios
        .get(this.getUrlSearch(keyword), {
          headers: {
            Cookie: `${cookie}`,
          },
        })
        .then((res) => {
          callback(res.data);
        });
    });
  }

  getUrlPlaylist(id) {
    let CTIME = Math.floor(Date.now() / 1000);
    let signature_playlist = encrypt.getHmac512(
      PATH_PLAYLIST +
        encrypt.getHash256(`ctime=${CTIME}id=${id}version=${VERSION}`),
      SECRET_KEY
    );
    let playList = `${URL}${PATH_PLAYLIST}?id=${id}&ctime=${CTIME}&version=${VERSION}&sig=${signature_playlist}&apiKey=${API_KEY}`;
    return playList;
  }

  getPlaylist(id, callback) {
    this.setCookie((cookie) => {
      axios
        .get(this.getUrlPlaylist(id), {
          headers: {
            Cookie: `${cookie}`,
          },
        })
        .then((res) => {
          callback(res.data);
        });
    });
  }

  getUrlTop100() {
    let CTIME = Math.floor(Date.now() / 1000);
    let signature_song = encrypt.getHmac512(
      PATH_TOP + encrypt.getHash256(`ctime=${CTIME}version=${VERSION}`),
      SECRET_KEY
    );
    let songUrl = `${URL}${PATH_TOP}?ctime=${CTIME}&version=${VERSION}&sig=${signature_song}&apiKey=${API_KEY}`;
    return songUrl;
  }

  getTop100(callback) {
    this.setCookie((cookie) => {
      axios
        .get(this.getUrlTop100(), {
          headers: {
            Cookie: `${cookie}`,
          },
        })
        .then((res) => {
          callback(res.data);
        });
    });
  }

  getUrlChartHome() {
    let CTIME = Math.floor(Date.now() / 1000);
    let signature_song = encrypt.getHmac512(
      PATH_CHARTHOME + encrypt.getHash256(`ctime=${CTIME}version=${VERSION}`),
      SECRET_KEY
    );
    let songUrl = `${URL}${PATH_CHARTHOME}?ctime=${CTIME}&version=${VERSION}&sig=${signature_song}&apiKey=${API_KEY}`;
    return songUrl;
  }

  getChartHome(callback) {
    this.setCookie((cookie) => {
      axios
        .get(this.getUrlChartHome(), {
          headers: {
            Cookie: `${cookie}`,
          },
        })
        .then((res) => {
          callback(res.data);
        });
    });
  }

  getUrlInfo(id) {
    let CTIME = Math.floor(Date.now() / 1000);
    let signature_song = encrypt.getHmac512(
      PATH_INFO +
        encrypt.getHash256(`ctime=${CTIME}id=${id}version=${VERSION}`),
      SECRET_KEY
    );
    let songUrl = `${URL}${PATH_INFO}?id=${id}&ctime=${CTIME}&version=${VERSION}&sig=${signature_song}&apiKey=${API_KEY}`;
    return songUrl;
  }

  getInfo(id, callback) {
    this.setCookie((cookie) => {
      axios
        .get(this.getUrlInfo(id), {
          headers: {
            Cookie: `${cookie}`,
          },
        })
        .then((res) => {
          callback(res.data);
        });
    });
  }
}

module.exports = new Zing();
