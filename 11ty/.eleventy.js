const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let markdown = require("markdown-it")({ html: true });


module.exports = function (eleventyConfig) {

  require('dotenv').config()

  // formats
  eleventyConfig.setTemplateFormats([
    'html',
    'md',
    'njk',
  ]);

  // deep merge to create directory based collections
  eleventyConfig.setDataDeepMerge(true);

  // this is apparently slow, its better to use a dedicated folder.
  //eleventyConfig.addPassthroughCopy("views/**/*.(js|css|png|img|jpg|jpeg|ico)");

  eleventyConfig.addPassthroughCopy("assets");

  // watch asset dir
  eleventyConfig.addWatchTarget("assets");

  // Layouts
  eleventyConfig.addLayoutAlias('base', 'base.njk')
  eleventyConfig.addLayoutAlias('blog', 'blog.njk')
  eleventyConfig.addLayoutAlias('post', 'post.njk')

  // plugins 
  eleventyConfig.addPlugin(syntaxHighlight);

  // collections

  eleventyConfig.addNunjucksShortcode("preview", function (templateContent) {
    return (new JSDOM(templateContent)).window.document.body.textContent.substring(0, 420)
  });


  eleventyConfig.addNunjucksShortcode("markdown", (content) => `<div class="md-block">${markdown.render(content)}</div>`);

  //base
  return {
    dir: {
      input: 'views',
      output: "../public"

    },
    passthroughFileCopy: true,
    markdownTemplateEngine: "md",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
}