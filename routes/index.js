var router = require('express').Router();
const request = require('request');
const { requiresAuth } = require('express-openid-connect');
const uploadedUsernames = new Set();

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'CarbonCount',
    isAuthenticated: req.oidc.isAuthenticated()
  });
});

router.get('/profile', requiresAuth(), function (req, res, next) {
  const nick = toString(req.oidc.user.nickname);

  uploadToKintone(nick);
  res.render('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: 'Profile page'
  });
});
router.get('/leaderboard', requiresAuth(), function (req, res, next) {
  res.render('leaderboard', {
  title: 'Leaderboard'
  });
});

module.exports = router;

//Function to upload username to Kintone
function uploadToKintone(nick) {
  if (uploadedUsernames.has(nick)) {
    console.log('Username already uploaded to Kintone:', nick);
    return;
  }
  console.log('Uploading username to Kintone:', nick);
    // Kintone API endpoint
    const kintoneEndpoint = 'https://carboncount.kintone.com/k/v1/record.json';

    // Kintone app ID where you want to upload the data
    const appId = '1';

    // Kintone API token for authentication
    const apiToken = 'A8mvHRY5yrVQhIkcTSDW9amw4bX3J4XfXv3U2cLm';

    // Data to be uploaded
    const data = {
        app: appId,
        records: [
            {
                username: {value:nick}
            }
        ],
    };
    // Make a POST request to upload data to Kintone
    fetch(kintoneEndpoint, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'X-Cybozu-API-Token': apiToken
      },
      body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
      console.log('Data uploaded to Kintone:', result);
      uploadedUsernames.add(nick);
  })
  .catch(error => {
      console.error('Error uploading data to Kintone:', error);
      
    });
    uploadedUsernames.add(nick);
}


