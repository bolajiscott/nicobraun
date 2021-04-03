const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async function() {
  
  const { DEVTO_USERNAME } = process.env
  if (!DEVTO_USERNAME) return []

  let posts = await Cache( `https://dev.to/api/articles?username=${DEVTO_USERNAME}`, {
    duration: "1d", 
    type: "json",
  });

  return posts.sort((a,b) => (b.positive_reactions_count+b.comments_count) - a.positive_reactions_count+a.comments_count).slice(0,6)
};