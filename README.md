## Get link zing mp3 url

### Big thank to phamhiep2506 for great code

### fork from https://github.com/phamhiep2506/music-player

`Hiện tại chỉ get nhạc việt, nhạc quốc tế sẽ ko get được, trừ khi dùng vps host vn, đang cần cao nhân chỉ cách làm`

- Get Song url direct and redirect (new):
  + https://api-zingmp3-nct.vercel.app/api/songUrl?id={param-id-song}
  > https://api-zingmp3-nct.vercel.app/api/songUrl?id=ZUUUEEIE
 return ex:
 `https://vnso-zn-23-tf-mp3-s1-zmp3.zadn.vn/956cefbc94f87da624e9/2766204956296265927?authen=exp=1639716009~acl=/956cefbc94f87da624e9/*~hmac=e58801252685398cd353c2016765930e&fs=MTYzOTU0MzIwOTY4N3x3ZWJWNnwwfDE0LjE4OC40Mi4xNA`

## Get link NCT, I'm find how to? anyone help me?


API from author
- Get Song:
  + https://api-zingmp3-nct.vercel.app/api/song?id={param-id-song}
  > https://api-zingmp3-nct.vercel.app/api/song?id=ZUUUEEIE


- Get Playlist:
  + https://api-zingmp3-nct.vercel.app/api/playlist?id={param-id-playlist}
  > https://api-zingmp3-nct.vercel.app/api/playlist?id=ZWZB969E

- Get Top 100:
  + https://api-zingmp3-nct.vercel.app/api/top100
  > https://api-zingmp3-nct.vercel.app/api/top100

- Get Charthome:
  + https://api-zingmp3-nct.vercel.app/api/chart-home
  > https://api-zingmp3-nct.vercel.app/api/chart-home

- Get Info Song:
  + https://api-zingmp3-nct.vercel.app/api/info?id={param-id-song}
  > https://api-zingmp3-nct.vercel.app/api/info?id=ZUUUEEIE

### Install Package

```bash
$ yarn install
```
or
```bash
$ npm install
```

### Run App

```bash
$ yarn start
```
or
```bash
$ npm run start
```
### Screenshot

![screenshot1](./screenshots/screenshot1.png)
![screenshot2](./screenshots/screenshot2.png)
![screenshot3](./screenshots/screenshot3.png)
