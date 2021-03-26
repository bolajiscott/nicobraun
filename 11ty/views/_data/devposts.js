const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async function() {
  let url = "https://dev.to/api/articles?username=codingsafari";
  let posts = await Cache(url, {
    duration: "1d", 
    type: "json",
  });

  return posts.sort((a,b) => (b.positive_reactions_count+b.comments_count) - a.positive_reactions_count+a.comments_count).slice(0,6)
};