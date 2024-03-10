var router = require('express').Router();
const request = require('request');
const { requiresAuth } = require('express-openid-connect');
const uploadedUsernames = new Set();
loadFromKintone();

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'CarbonCount',
    isAuthenticated: req.oidc.isAuthenticated()
  });
});

router.get('/profile', requiresAuth(), function (req, res, next) {
  const nick = req.oidc.user.nickname;
  uploadToKintone(nick);
  res.render('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
  });
});
router.get('/leaderboard', requiresAuth(), function (req, res, next) {
  res.render('leaderboard', {
  title: 'Leaderboard'
  });
});

module.exports = router;


function loadFromKintone() {
  // Kintone API endpoint
  const kintoneEndpoint = 'https://carboncount.kintone.com/k/v1/records.json';

  // Kintone app ID from where you want to load the data
  const appId = '1';

  // Kintone API token for authentication
  const apiToken = 'A8mvHRY5yrVQhIkcTSDW9amw4bX3J4XfXv3U2cLm';

  // Make a GET request to load data from Kintone
  request.get({
      url: kintoneEndpoint,
      headers: {
          'X-Cybozu-API-Token': apiToken
      },
      qs: {
          app: appId
      },
      json: true
  }, (error, response, body) => {
      if (error) {
          console.error('Error loading data from Kintone:', error);
          return;
      }

      // Process the response body
      if (body && body.records) {
          // Iterate over each record and do something with the data
          body.records.forEach(record => {
              console.log('Username loaded from Kintone:', record.username.value);
              uploadedUsernames.add(record.username.value);
          });
      } else {
          console.log('No records found in Kintone.');
      }
  });
}

//Function to upload username to Kintone
function uploadToKintone(nick) {
  console.log(uploadedUsernames);
  if (uploadedUsernames.has(nick)) {
    console.log('Username already uploaded to Kintone:', nick);
    return;
  }
  uploadedUsernames.add(nick);
  console.log('Uploading username to Kintone:', nick);
    // Kintone API endpoint
    const kintoneEndpoint = 'https://carboncount.kintone.com/k/v1/records.json';

    // Kintone app ID where you want to upload the data
    const appId = '1';

    // Kintone API token for authentication
    const apiToken = 'A8mvHRY5yrVQhIkcTSDW9amw4bX3J4XfXv3U2cLm';

    // Data to be uploaded
    const data = {
        'app': appId,
        'records':[
            {
                'username': {
                  'value': nick
                },
                'trips':{
                  'value': 0.0
                },
                'miles':{
                  'value': 0.0
                },
                'emissions':{
                  'value': 0.0
                },
                'points':{
                  'value': 0.0
                }

            }
          ]
    };

    // Make a POST request to upload data to Kintone
    request.post({
        url: kintoneEndpoint,
        headers: {
            'Content-Type': 'application/json',
            'X-Cybozu-API-Token': apiToken
        },
        json: true,
        body: data
    }, (error, response, body) => {
        if (error) {
            console.error('Error uploading data to Kintone:', error);
            return;
        }
        console.log('Data uploaded to Kintone:', body);
      
    });
}


