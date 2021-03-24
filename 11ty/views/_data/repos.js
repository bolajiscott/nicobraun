const https = require('https')

module.exports = async function () {
  const {GITHUB_TOKEN, GITHUB_USER}  = process.env
  if (!GITHUB_TOKEN || !GITHUB_USER) return []

  return new Promise((resolve, reject) => {

    const req = https.request({
      'method': 'POST',
      'hostname': 'api.github.com',
      'path': '/graphql',
      'headers': {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': '11ty-cv'
      },
      'maxRedirects': 20
    }, (res) => {
      let b = ''
      res.setEncoding('utf-8')
      res.on('data', d => b+=d)
      res.on('end', () => {
        const resp = JSON.parse(b)
        resolve(resp.data.user.pinnedItems.edges)
      })
    })
    
    req.on('error', reject)

    req.write(JSON.stringify({
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
    }))

    req.end()
  
  })
}