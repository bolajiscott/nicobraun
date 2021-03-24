var https = require('follow-redirects').https;
var fs = require('fs');


module.exports = function () {
  return new Promise((resolve, reject) => {
    var https = require('follow-redirects').https;
    var fs = require('fs');

    var options = {
      'method': 'GET',
      'hostname': 'dev.to',
      'path': '/api/articles?username=codingsafari',
      'maxRedirects': 20
    };

    var req = https.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function (chunk) {
        let posts = JSON.parse(Buffer.concat(chunks).toString())
        posts = posts.sort((a,b) => (b.positive_reactions_count+b.comments_count) - a.positive_reactions_count+a.comments_count)
        resolve(posts.slice(0,6))
      });

      res.on("error", function (error) {
        reject(error)
      });
    });

    req.end();
  })
}
