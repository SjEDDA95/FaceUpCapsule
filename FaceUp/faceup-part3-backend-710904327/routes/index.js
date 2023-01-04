var express = require('express');
var router = express.Router();
var uniqid = require('uniqid');
var fs = require('fs');
var request = require('sync-request');

var cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'dvqjak***',
  api_key: '767287626552***',
  api_secret: 'BRfbaQzy3xSWMq0dNqdLAS***',
});

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', async function (req, res, next) {
  var pictureName = './tmp/' + uniqid() + '.jpg';
  var resultCopy = await req.files.avatar.mv(pictureName);

  if (!resultCopy) {
    var resultCloudinary = await cloudinary.uploader.upload(pictureName);

    var options = {
      json: {
        apiKey: '5c0a5d392c1745d2ae84dc0b1483bfd2',
        image: resultCloudinary.url,
      },
    };

    var resultDetectionRaw = await request('POST', 'https://lacapsule-faceapi.herokuapp.com/api/detect', options);
    var resultDetection = await resultDetectionRaw.body;
    resultDetection = await JSON.parse(resultDetection);

    console.log(resultDetection);

    var gender;
    var age;
    if (resultDetection.result) {
      gender = resultDetection.detectedFaces[0].gender === 'male' ? 'Homme' : 'Femme';
      age = resultDetection.detectedFaces[0].age + ' ans';
    }

    res.json({ url: resultCloudinary.url, gender, age });
  } else {
    res.json({ error: resultCopy });
  }

  fs.unlinkSync(pictureName);
});

module.exports = router;
