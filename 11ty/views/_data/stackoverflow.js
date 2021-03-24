const request = require('request');
const { promisify } = require('util')
const fetch = promisify(request)

module.exports = async function () {
  try {
    let res1 = await fetch({
      method: 'GET',
      uri: 'https://api.stackexchange.com/2.2/users/9208887/answers?site=stackoverflow&sort=votes&order=desc&pagesize=6&filter=withbody',
      gzip: true
    })
    const { items: answers } = JSON.parse(res1.body)

    let res2 = await fetch({
      method: 'GET',
      uri: `https://api.stackexchange.com/2.2/questions/${answers.map(a => a.question_id).join(';')}?site=stackoverflow`,
      gzip: true
    }
    )
    const { items: questions } = JSON.parse(res2.body)

    answers.forEach(a => a.question = questions.find(q => q.question_id === a.question_id))
    return answers

  } catch (error) {
    console.warn(error);
    return []
  }
}



