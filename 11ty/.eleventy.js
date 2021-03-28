const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const Prism = require('prismjs');

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
  eleventyConfig.addLayoutAlias('post', 'md-card.njk')

  // plugins 
  eleventyConfig.addPlugin(syntaxHighlight);

  // shortCodes
  eleventyConfig.addNunjucksShortcode("highligh", (html, lang = 'javascript') => {
    return Prism.highlight(html, Prism.languages[lang], lang);
  })

  const htmlmin = require("html-minifier");
  var CleanCSS = require('clean-css');

  // transforms
  eleventyConfig.addTransform("mini", function (content, outputPath) {
    if (outputPath.endsWith(".html")) {
      return  htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
      });
    }

    return content;
  });


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