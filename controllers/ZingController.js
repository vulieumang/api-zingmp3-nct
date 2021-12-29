const ZingMp3 = require("../modules/zing")
const Nct = require("../modules/nct")

/**
 * class ZingController
 */
class ZingController {
  /**
   * @param {*} req
   * @param {*} res
   */

  getLinkRedirect(req, res) {
    //get rid of the trailing / before doing a simple split on /
    var url_parts = req.query.id.replace(/\/\s*$/,'').split('/'); 
    var id = url_parts[5].replace(".html","");
    if(url_parts[3]=='bai-hat'){
      ZingMp3.getSong(id, (data) => {
        res.redirect(data.data[128]);
      })
    }
    if(url_parts[3]=='album'){
      ZingMp3.getPlaylist(id, (data) => {
        const id_first = data.data.song.items[0].encodeId
        ZingMp3.getSong(id_first, (data) => {
          res.redirect(data.data[128]);
        })
      })
    }
  }

  getSearch(req, res) {
    //get rid of the trailing / before doing a simple split on /
    var keyword = encodeURIComponent(req.query.id);
    console.log(keyword)
    ZingMp3.getSearch(keyword, (data) => {
      res.json({data})
    })
  }

  getLink(req, res) {
    //get rid of the trailing / before doing a simple split on /
    var url_parts = req.query.id.replace(/([^:]\/)\/+/g, "$1").replace(/\/\s*$/,'').split('/'); 
    // console.log(url_parts)
    var id;

    // Zing mp3
    if(url_parts[2].includes('zingmp3.vn')){
      id = url_parts[5].replace(".html","");
      if(url_parts[3]=='bai-hat'){
        ZingMp3.getInfo(id, (data) => {
          const id_first = data.data.encodeId
          const thumbnail = data.data.thumbnailM
          const artistsNames = getArtistName(data.data)
          const title = data.data.title
          ZingMp3.getSong(id_first, (data) => {
            data.id = id_first
            data.thumbnail = thumbnail.replace('w240','w600')
            data.artistsNames = artistsNames
            data.title = title
            res.json({data})
          })
        })
      }
      if(url_parts[3]=='album'){
        ZingMp3.getPlaylist(id, (data) => {
          const id_first = data.data.song.items[0].encodeId
          const thumbnail = data.data.song.items[0].thumbnailM
          const artistsNames = getArtistName(data.data.song.items[0])
          const title = data.data.song.items[0].title
          ZingMp3.getSong(id_first, (data) => {
            data.id = id_first
            data.thumbnail = thumbnail.replace('w240','w600')
            data.artistsNames = artistsNames
            data.title = title
            res.json({data})
          })
        })
      }
    }

    // NCT
    
    if(url_parts[2].includes('nhaccuatui.com')){
      id = url_parts[4].replace(".html","")
      id = id.substring(id.indexOf('.')+1)
      console.log(id)
      Nct.getNct(id, (data) => {
        console.log(data)
        res.json({data})
      })
    }
  }

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

  download(req, res) {
    var id = req.query.id
    ZingMp3.getInfo(id, (data) => {
      const id_first = data.data.encodeId
      const thumbnail = data.data.thumbnailM
      const artistsNames = getArtistName(data.data)
      console.log(artistsNames)
      const title = data.data.title
      ZingMp3.getSong(id_first, (data) => {
        data.id = id_first
        data.thumbnail = thumbnail.replace('w240','w600')
        data.artistsNames = artistsNames
        data.title = title
        
        res.redirect(data.data[128]+'&filename='+title+' - '+artistsNames+'.mp3');
      })
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

function getArtistName(song){
  var artistsNames;
  if(song.artists){
    artistsNames = song.artists.reduce(function(previous, current){
      if(previous.name){
        previous = previous.name
      }
      return previous + ', ' + current.name;
    })
  }
  else{
    artistsNames = song.artistsNames
  }
  return artistsNames;
}

module.exports = new ZingController
