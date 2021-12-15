// center container vertically
document.getElementById("container").style.marginTop = `${
  (window.innerHeight - document.getElementById("container").clientHeight) / 2
}px`;

//add marginTop playlist
document.getElementById("playlist").style.marginTop = `${
  document.getElementById("container").clientHeight * 0.14
}px`;

//add height playlist
document.getElementById("playlist").style.height = `${
  document.getElementById("container").clientHeight -
  document.getElementById("container").clientHeight * 0.14
}px`;

//add marginTop top100
document.getElementById("top100").style.marginTop = `${
  document.getElementById("container").clientHeight * 0.14
}px`;

//add height top100
document.getElementById("top100").style.height = `${
  document.getElementById("container").clientHeight -
  document.getElementById("container").clientHeight * 0.14
}px`;

// toggle playlist
function playlistToggle() {
  document.querySelector("#playlist").classList.toggle("active");
  document.querySelector("#top100").classList.remove("active");
}

// toggle top100 list
function changePlayList() {
  document.querySelector("#top100").classList.toggle("active");
  document.querySelector("#playlist").classList.remove("active");
}

