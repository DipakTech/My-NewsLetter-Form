const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  console.log(firstName, lastName, email);

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = 'https://us11.api.mailchimp.com/3.0/lists/4db08ad3e1'

  const options = {
    method: 'POST',
    auth: 'dipak:788b0ab54bc00f6332a7428689ba7117-us11'
  }


  const request=https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + '/success.html');
    } else {
      res.sendFile(__dirname + '/failure.html');
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();



})

app.post("/failure", (req, res) => {
  res.redirect("/");
})
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

// API_KEY
// 788b0ab54bc00f6332a7428689ba7117-us11

//client key
// be3cef0596a3eb107dd4439c103715bb-us11

//audience id
// 4db08ad3e1