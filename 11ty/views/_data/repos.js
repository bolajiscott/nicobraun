const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async function () {

  const { GITHUB_TOKEN, GITHUB_USER } = process.env
  if (!GITHUB_TOKEN || !GITHUB_USER) return []

  let url = "https://api.github.com/graphql";
  let repos = await Cache(url, {
    duration: "1d",
    type: "json",
    fetchOptions: {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': '11ty-cv'
      },
      body: JSON.stringify({
        query: `
          query {
            user(login:"${GITHUB_USER}") {
              pinnedItems(first: 6, types: [REPOSITORY, GIST]) {
                edges {
                  node {
                    ... on Repository {
                      openGraphImageUrl
                      name
                      url  
                      descriptionHTML 
                      createdAt
                      languages(first: 10) {
                        nodes {
                          name
                        }
                      }
                    }
                  }
                }
              }
            }
          }`,
      })
    }
  });

  return Promise.resolve(repos.data.user.pinnedItems.edges)
};