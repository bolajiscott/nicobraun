const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async function () {
  let {items: answers = []} = await Cache('https://api.stackexchange.com/2.2/users/9208887/answers?site=stackoverflow&sort=votes&order=desc&pagesize=6&filter=withbody', {
    duration: "1d", 
    type: "json",
  });

  let {items: questions = []} = await Cache(`https://api.stackexchange.com/2.2/questions/${answers.map(a => a.question_id).join(';')}?site=stackoverflow&&filter=withbody`, {
    duration: "1d", 
    type: "json",
  });

  answers.forEach(a => a.question = questions.find(q => q.question_id === a.question_id))

  return Promise.resolve(answers)

};
