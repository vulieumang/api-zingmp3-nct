/*
 * Music Player
 */
const audio = document.getElementById("audio");
const slider = document.getElementById("range__slider");
const time = document.getElementById("song__time");
const btn__control = document.getElementById("btn__control");
const btn__toggle = document.getElementById("btn__toggle");
const cd__img = document.querySelector(".player__cd__img");
const playlist = document.getElementById("playlist");
const top100 = document.getElementById("top100");
const titleSong = document.querySelector(".player__control__song--title");
const artistsName = document.querySelector(
  ".player__control__song--artistsNames"
);
const prev_song = document.getElementById("btn__previous");
const next_song = document.getElementById("btn__next");
let ID_SONG_ACTIVE;

let toggleStatus = false;

class Player {
  listenEvent() {
    let songInterval;
    audio.onplay = () => {
      songInterval = setInterval(() => {
        this.setPercentSLider();
        this.setTimeUI();
      }, 1000);
    };
    audio.onpause = () => {
      clearInterval(songInterval);
    };
    audio.onended = () => {
      this.nextSong();
    };
  }

  setPlay(index, encodeId) {
    axios
      .get(`/api/song?id=${encodeId}`)
      .then((res) => {
        // console.log(res);
        if (res.data.data[128] == undefined) {
          console.log("error: khong tim thay link nhac");
        } else {
          audio.src = res.data.data[128];
          axios.get(`/api/info?id=${encodeId}`).then((res) => {
            // console.log(res)
            this.setUI(
              res.data.data.thumbnailM,
              res.data.data.title,
              res.data.data.artistsNames
            );
            document.querySelector("#playlist").classList.toggle("active");
            btn__toggle.classList.remove("bx-play");
            btn__toggle.classList.add("bx-pause");
            cd__img.classList.remove("active");
            cd__img.classList.add("active");
            this.resumePlay();
          });
        }
      })
      .catch((err) => {
        console.log("error: khong ket noi dc voi api");
        console.log("chuyen bai");
        this.nextSong();
      });

    // remove active 0
    if (ID_SONG_ACTIVE == 0) {
      document.querySelector(".p__song-0").classList.toggle("active");
      document
        .querySelector(".p__song__icon--play-0")
        .classList.toggle("active");
    } else {
      // remove active prevSong
      document
        .querySelector(`.p__song-${ID_SONG_ACTIVE}`)
        .classList.toggle("active");
      document
        .querySelector(`.p__song__icon--play-${ID_SONG_ACTIVE}`)
        .classList.toggle("active");
    }

    // active song
    document.querySelector(`.p__song-${index}`).classList.toggle("active");
    document
      .querySelector(`.p__song__icon--play-${index}`)
      .classList.toggle("active");

    ID_SONG_ACTIVE = index;
  }

  setUI(urlImage, title, name) {
    cd__img.src = urlImage;
    titleSong.innerHTML = title;
    artistsName.innerHTML = name;
  }

  resumePlay() {
    audio.play();
  }

  pause() {
    audio.pause();
  }

  nextSong() {
    let encodeId = document
      .querySelector(`.p__song__icon--play-${ID_SONG_ACTIVE + 1}`)
      .getAttribute("encodeId-song");

    axios
      .get(`/api/song?id=${encodeId}`)
      .then((res) => {
        // console.log(res);
        if (res.data.data[128] == undefined) {
          console.log("error: khong get dc link nhac");
          this.nextSong();
        } else {
          audio.src = res.data.data[128];
          axios.get(`/api/info?id=${encodeId}`).then((res) => {
            // console.log(res)
            this.setUI(
              res.data.data.thumbnailM,
              res.data.data.title,
              res.data.data.artistsNames
            );
            this.resumePlay();
            btn__toggle.classList.remove("bx-play");
            btn__toggle.classList.add("bx-pause");
            cd__img.classList.remove("active");
            cd__img.classList.add("active");
          });
        }
      })
      .catch((err) => {
        console.log("error: khong ket noi dc voi api");
        console.log("chuyen bai");
        this.nextSong();
      });
    if (ID_SONG_ACTIVE == 0) {
      document.querySelector(".p__song-0").classList.toggle("active");
      document
        .querySelector(".p__song__icon--play-0")
        .classList.toggle("active");
    } else {
      // remove active prevSong
      document
        .querySelector(`.p__song-${ID_SONG_ACTIVE}`)
        .classList.toggle("active");
      document
        .querySelector(`.p__song__icon--play-${ID_SONG_ACTIVE}`)
        .classList.toggle("active");
    }
    document
      .querySelector(`.p__song-${ID_SONG_ACTIVE + 1}`)
      .classList.toggle("active");
    document
      .querySelector(`.p__song__icon--play-${ID_SONG_ACTIVE + 1}`)
      .classList.toggle("active");

    ID_SONG_ACTIVE += 1;
  }

  prevSong() {
    if (ID_SONG_ACTIVE <= 0) {
      alert("error");
    } else {
      let encodeId = document
        .querySelector(`.p__song__icon--play-${ID_SONG_ACTIVE - 1}`)
        .getAttribute("encodeId-song");

      axios
        .get(`/api/song?id=${encodeId}`)
        .then((res) => {
          // console.log(res);
          if (res.data.data[128] == undefined) {
            console.log("error: khong get dc link nhac");
            this.nextSong();
          } else {
            audio.src = res.data.data[128];
            axios.get(`/api/info?id=${encodeId}`).then((res) => {
              // console.log(res)
              this.setUI(
                res.data.data.thumbnailM,
                res.data.data.title,
                res.data.data.artistsNames
              );
              this.resumePlay();
              btn__toggle.classList.remove("bx-play");
              btn__toggle.classList.add("bx-pause");
              cd__img.classList.remove("active");
              cd__img.classList.add("active");
            });
          }
        })
        .catch((err) => {
          console.log("error: khong ket noi dc voi api");
          console.log("chuyen bai");
        });

      if (ID_SONG_ACTIVE == 0) {
        document.querySelector(".p__song-0").classList.toggle("active");
        document
          .querySelector(".p__song__icon--play-0")
          .classList.toggle("active");
      } else {
        // remove active prevSong
        document
          .querySelector(`.p__song-${ID_SONG_ACTIVE}`)
          .classList.toggle("active");
        document
          .querySelector(`.p__song__icon--play-${ID_SONG_ACTIVE}`)
          .classList.toggle("active");
      }
      document
        .querySelector(`.p__song-${ID_SONG_ACTIVE - 1}`)
        .classList.toggle("active");
      document
        .querySelector(`.p__song__icon--play-${ID_SONG_ACTIVE - 1}`)
        .classList.toggle("active");
      ID_SONG_ACTIVE -= 1;
    }
  }

  setPercentSLider() {
    let timePercent = (audio.currentTime / audio.duration) * 100;
    slider.value = timePercent;
    slider.style.background = `linear-gradient(90deg, #e1592e ${timePercent}%, white ${timePercent}%)`;
  }

  setPercentHandleSLider(percent) {
    slider.value = percent;
    slider.style.background = `linear-gradient(90deg, #e1592e ${percent}%, white ${percent}%)`;
    let currentTime = (audio.duration / 100) * percent;
    audio.currentTime = currentTime;
  }

  getHandleSlider(percent) {
    // console.log("change slider")
    this.setPercentHandleSLider(percent);
  }

  setTimeUI() {
    const sec = parseInt(audio.currentTime, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
    let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
    // console.log(minutes + ":" + seconds)
    time.innerHTML = `${minutes}:${seconds}`;
  }

  getHandleControl() {
    if (toggleStatus == false) {
      btn__toggle.classList.remove("bx-play");
      btn__toggle.classList.add("bx-pause");
      cd__img.classList.remove("active");
      cd__img.classList.add("active");
      // console.log("play song")
      this.resumePlay();
      toggleStatus = true;
      // console.log(toggleStatus)
    } else {
      btn__toggle.classList.remove("bx-pause");
      btn__toggle.classList.add("bx-play");
      cd__img.classList.remove("active");
      // console.log("pause song")
      this.pause();
      toggleStatus = false;
      // console.log(toggleStatus)
    }
  }

  setPlayList(id) {
    axios.get(`/api/playlist?id=${id}`).then((res) => {
      this.renderPlaylist(res.data.data.song.items);
    });
    document.querySelector("#top100").classList.toggle("active");
    this.getHandleControl();
  }

  renderPlaylist(data) {
    let playlistHtml = "";
    data.forEach((element, index) => {
      if (index == 0) {
        axios
          .get(`/api/song?id=${element.encodeId}`)
          .then((res) => {
            if (res.data.data == undefined) {
              console.log("bai nhac loi hoac nhac ban quyen");
              console.log("chuyen bai");
              this.nextSong();
            } else {
              audio.src = res.data.data[128];
            }
          })
          .catch((err) => {
            console.log("err render playlist: ", err);
            this.nextSong();
          });
      }
      playlistHtml =
        playlistHtml +
        `
          <div class="p__song-${index}">
            <div class="p__song__img">
              <img
                class="p__song__img--thumbnail"
                src=${element.thumbnail}
                alt="thumbnail"
              />
            </div>
            <div class="p__song__info">
              <p class="p__song__info__title">${element.title}</p>
              <p class="p__song__info__artist">${element.artistsNames}</p>
            </div>
            <div class="p__song__icon">
              <button class="p__song__icon--play-${index} player__btn" encodeId-song="${element.encodeId}" onclick="player.setPlay(${index}, '${element.encodeId}')">
                <i class="bx bx-play"></i>
              </button>
            </div>
          </div>
      `;
    });
    playlist.innerHTML = playlistHtml;
    this.setUI(data[0].thumbnailM, data[0].title, data[0].artistsNames);
    ID_SONG_ACTIVE = 0;
    document.querySelector(".p__song-0").classList.toggle("active");
    document.querySelector(".p__song__icon--play-0").classList.toggle("active");
  }

  renderChartHome() {
    let chartHomeHtml = "";
    axios("/api/chart-home").then((res) => {
      res.data.data.RTChart.items.forEach((element, index) => {
        if (index == 0) {
          axios.get(`/api/song?id=${element.encodeId}`).then((res) => {
            audio.src = res.data.data[128];
          });
        }
        chartHomeHtml =
          chartHomeHtml +
          `
              <div class="p__song-${index}">
                <div class="p__song__img">
                  <img
                    class="p__song__img--thumbnail"
                    src=${element.thumbnail}
                    alt="thumbnail"
                  />
                </div>
                <div class="p__song__info">
                  <p class="p__song__info__title">${element.title}</p>
                  <p class="p__song__info__artist">${element.artistsNames}</p>
                </div>
                <div class="p__song__icon">
                  <button class="p__song__icon--play-${index} player__btn" encodeId-song="${element.encodeId}" onclick="player.setPlay(${index}, '${element.encodeId}')">
                    <i class="bx bx-play"></i>
                  </button>
                </div>
              </div>
          `;
      });
      playlist.innerHTML = chartHomeHtml;
      this.setUI(
        res.data.data.RTChart.items[0].thumbnailM,
        res.data.data.RTChart.items[0].title,
        res.data.data.RTChart.items[0].artistsNames
      );
      ID_SONG_ACTIVE = 0;
      document.querySelector(".p__song-0").classList.toggle("active");
      document
        .querySelector(".p__song__icon--play-0")
        .classList.toggle("active");
    });
  }

  renderToplist() {
    let top100Html = "";
    axios.get("/api/top100").then((res) => {
      res.data.data.forEach((element) => {
        element.items.forEach((e) => {
          // console.log(e.encodeId + ":" + e.title)
          top100Html =
            top100Html +
            `
              <div class="p__song-">
                <div class="p__song__info">
                  <p class="p__song__info__title">${e.title}</p>
                </div>
                <div class="p__song__icon">
                  <button
                    class="p__song__icon--play- player__btn"
                    onclick="player.setPlayList('${e.encodeId}')"
                  >
                    <i class="bx bx-play"></i>
                  </button>
                </div>
              </div>
            `;
          top100.innerHTML = top100Html;
        });
      });
    });
  }
}

// add event change on slider
slider.addEventListener("change", (e) => {
  player.getHandleSlider(e.target.value);
});

btn__control.onclick = () => {
  // console.log("click toggle")
  player.getHandleControl();
};

next_song.onclick = () => {
  player.nextSong();
};

prev_song.onclick = () => {
  player.prevSong();
};

let player = new Player();
player.renderChartHome();
player.renderToplist();
player.listenEvent();
