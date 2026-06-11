var express = require('express');
var app = express();
var randomstring = require("randomstring");
const { uuid } = require('uuidv4');
var nJwt = require('njwt');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const flightList = [
  {
    logoSrc: "https://beebom.com/wp-content/uploads/2018/12/Lufthansa-Logo.jpg",
    logoStyle: {
      height: "51px",
      margin: "22px 12px"
    },
    src: {
      country: 'Algeria',
      iso3: 'DZA',
      time: '2021-05-28T09:35:11.523Z',
      airline: 'Kempegowda International'
    },
    dst: {
      country: 'United States of America',
      iso3: 'USA',
      time: '2021-05-28T11:22:27.523Z',
      airline: 'Indira Gandhi International'
    },
    boarding: '17017',
    transfer: false,
    gates: 5,
    seat: '20A',
    price: '3000',
    class: 'economy'
  },
  {
    logoSrc: "https://beebom.com/wp-content/uploads/2015/02/airline-logos-qatar-e1424574584611.png",
    logoStyle: {
      height: "26px",
      margin: "34px 16px"
    },
    src: {
      country: 'Belgium',
      iso3: 'BEL',
      time: '2021-05-28T09:35:11.523Z',
      airline: 'Kempegowda International'
    },
    dst: {
      country: 'Germany',
      iso3: 'DEU',
      time: '2021-05-28T11:22:27.523Z',
      airline: 'Indira Gandhi International'
    },
    boarding: '6930',
    transfer: true,
    gates: 8,
    seat: '10C',
    price: '2000',
    class: 'business'
  },
  {
    logoSrc: "https://beebom.com/wp-content/uploads/2015/02/airline-logos-swiss.png",
    logoStyle: {
      height: "23px",
      margin: "41px 12px"
    },
    src: {
      country: 'Maldives',
      iso3: 'MDV',
      time: '2021-05-28T09:35:11.523Z',
      airline: 'Kempegowda International'
    },
    dst: {
      country: 'Namibia',
      iso3: 'NAM',
      time: '2021-05-28T11:22:27.523Z',
      airline: 'Indira Gandhi International'
    },
    boarding: '28956',
    transfer: true,
    gates: 3,
    seat: '13B',
    price: '100',
    class: 'economy'
  },
  {
    logoSrc: "https://beebom.com/wp-content/uploads/2018/12/Singapore-Airlines-logo.jpg",
    logoStyle: {
      height: "46px",
      margin: "22px 15px"
    },
    src: {
      country: 'Poland',
      iso3: 'POL',
      time: '2021-05-28T09:35:11.523Z',
      airline: 'Kempegowda International'
    },
    dst: {
      country: 'Korea',
      iso3: 'KOR',
      time: '2021-05-28T11:22:27.523Z',
      airline: 'Indira Gandhi International'
    },
    boarding: '17285',
    transfer: false,
    gates: 3,
    seat: '3A',
    price: '200',
    class: 'business'
  },
  {
    logoSrc: "https://beebom.com/wp-content/uploads/2018/12/Lufthansa-Logo.jpg",
    logoStyle: {
      height: "51px",
      margin: "22px 12px"
    },
    src: {
      country: 'New Zealand',
      iso3: 'NZL',
      time: '2021-05-28T09:35:11.523Z',
      airline: 'Kempegowda International'
    },
    dst: {
      country: 'Austria',
      iso3: 'AUT',
      time: '2021-05-28T11:22:27.523Z',
      airline: 'Indira Gandhi International'
    },
    boarding: '25654',
    transfer: true,
    gates: 5,
    seat: '8C',
    price: '150',
    class: 'economy'
  },
  {
    logoSrc: "https://beebom.com/wp-content/uploads/2015/02/airline-logos-qatar-e1424574584611.png",
    logoStyle: {
      height: "26px",
      margin: "34px 16px"
    },
    src: {
      country: 'South Africa',
      iso3: 'ZAF',
      time: '2021-05-28T09:35:11.523Z',
      airline: 'Kempegowda International'
    },
    dst: {
      country: 'Denmark',
      iso3: 'DNK',
      time: '2021-05-28T11:22:27.523Z',
      airline: 'Indira Gandhi International'
    },
    boarding: '19993',
    transfer: false,
    gates: 8,
    seat: '9B',
    price: '2000',
    class: 'economy'
  },
  {
    logoSrc: "https://beebom.com/wp-content/uploads/2015/02/airline-logos-swiss.png",
    logoStyle: {
      height: "23px",
      margin: "41px 12px"
    },
    src: {
      country: 'Greece',
      iso3: 'GRC',
      time: '2021-05-28T09:35:11.523Z',
      airline: 'Kempegowda International'
    },
    dst: {
      country: 'Luxembourg',
      iso3: 'LUX',
      time: '2021-05-28T11:22:27.523Z',
      airline: 'Indira Gandhi International'
    },
    boarding: '25094',
    transfer: true,
    gates: 6,
    seat: '22C',
    price: '700',
    class: 'business'
  },
  {
    logoSrc: "https://beebom.com/wp-content/uploads/2018/12/Singapore-Airlines-logo.jpg",
    logoStyle: {
      height: "46px",
      margin: "22px 15px"
    },
    src: {
      country: 'Rwanda',
      iso3: 'RWA',
      time: '2021-05-28T09:35:11.523Z',
      airline: 'Kempegowda International'
    },
    dst: {
      country: 'Burkina Faso',
      iso3: 'BFA',
      time: '2021-05-28T11:22:27.523Z',
      airline: 'Indira Gandhi International'
    },
    boarding: '34848',
    transfer: false,
    gates: 7,
    seat: '16A',
    price: '2000',
    class: 'economy'
  },
  {
    logoSrc: "https://beebom.com/wp-content/uploads/2015/02/airline-logos-qatar-e1424574584611.png",
    logoStyle: {
      height: "26px",
      margin: "34px 16px"
    },
    src: {
      country: 'South Africa',
      iso3: 'ZAF',
      time: '2021-05-28T09:35:11.523Z',
      airline: 'Kempegowda International'
    },
    dst: {
      country: 'Denmark',
      iso3: 'DNK',
      time: '2021-05-28T11:22:27.523Z',
      airline: 'Indira Gandhi International'
    },
    boarding: '19993',
    transfer: false,
    gates: 8,
    seat: '9B',
    price: '2000',
    class: 'economy'
  },
];

TOKEN_VALUE = null;

app.post("/login", function(req, res){
  var _username = req.body.username;
  var _password = req.body.password;
  var token = null;
  var result = "wrong_pass";
  var secretKey = uuid();
  var claims = {
    sub: 'user9876',
    iss: 'https://mytrustyapp.com',
    permissions: 'upload-photos'
  }
  var jwt = nJwt.create(claims,secretKey);
  if(_username == "admin" && _password == "123456"){
    TOKEN_VALUE = randomstring.generate();
    TOKEN_VALUE = jwt.compact();
    token = TOKEN_VALUE;
    result = "success";
  }else{
    res.send({"result" : result})
    return;
  }
  res.send({"token":token, "result" : result})
});

app.post("/logout", function(req, res){
  if(TOKEN_VALUE == null || req.headers.authorization != "Bearer " + TOKEN_VALUE){
    res.status(401).send({"result":"unauthorized"});
    return;
  }
  TOKEN_VALUE = null;
  res.send({"result" : "success"});
});


app.get("/username", function(req, res){
  if(TOKEN_VALUE == null || req.headers.authorization != "Bearer " + TOKEN_VALUE){
    res.status(401).send({"result":"unauthorized"});
    return;
  }
  res.send({"username":"admin","result":"success"});
});

app.get('/list', function (req, res){
  if(TOKEN_VALUE == null || req.headers.authorization != "Bearer " + TOKEN_VALUE){
    res.status(401).send({"result":"unauthorized"});
    return;
  }
  const page = req.query.page;
  const size = req.query.size;
  const result = {
    total: flightList.length,
    result: flightList.slice((page-1)*size, page*size)
  };
  res.send(result);
});

app.listen(3001, function () {
  console.log('Fake Backend listening on port 3001!');
  console.log('Copyright DSHasin (Dade Sanji Hasin)');
});
