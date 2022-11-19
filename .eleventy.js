const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const Image = require("@11ty/eleventy-img");
const path = require("path");
const { DateTime, Duration } = require("luxon");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const renderPermalink = require("./renderPermalink.js");
const slugify = require("slugify");

function imageShortcode(
  src,
  alt = "alt",
  sizes = "(min-width: 1024px) 100vw, 50vw"
) {
  console.log(`Generating image(s) from:  ${src}`);
  const srcPath = path.parse(src);
  let options = {
    widths: [600, 900, 1500],
    formats: ["webp", "jpeg"],
    urlPath: `/img/${srcPath.dir}`,
    outputDir: `./_site/img/${srcPath.dir}`,
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `${name}-${width}w.${format}`;
    },
  };

  // generate images
  Image(`./src/img/${src}`, options);

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };
  // get metadata
  metadata = Image.statsSync(`./src/img/${src}`, options);
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary(
    "md",
    markdownIt({
      breaks: true,
      html: true,
      linkify: true,
    }).use(markdownItAnchor, {
      permalink: true,
      slugify: slugify,
      renderPermalink,
    })
  );
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/js");
  eleventyConfig.addPassthroughCopy("./src/icons");

  eleventyConfig.addShortcode("image", imageShortcode);

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addFilter("ttr", (value) => {
    const words = value.trim().split(/\s+/).length;
    const time = Math.ceil(words / 225);
    return Duration.fromObject({ minutes: time }).toHuman();
  });
  eleventyConfig.addFilter("formatDate", (value) =>
    DateTime.fromJSDate(new Date(value)).toLocaleString(DateTime.DATE_FULL)
  );

  eleventyConfig.addFilter("sortByDate", (value) => {
    return value.sort((a, b) => new Date(b.date) - new Date(a.date));
  });
  eleventyConfig.addFilter("filterTags", (value) =>
    value.filter((it) => it !== "posts")
  );

  eleventyConfig.addFilter("collectTags", (value) => {
    return value
      .map((it) => it.data.tag)
      .flat()
      .filter((it) => it);
  });
  eleventyConfig.addFilter("stringify", (value) => JSON.stringify(value));

  return {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: ["md", "njk", "html", "liquid"],

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: "njk",

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: "njk",

    // -----------------------------------------------------------------
    // If your site deploys to a subdirectory, change `pathPrefix`.
    // Don’t worry about leading and trailing slashes, we normalize these.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`

    // Optional (default is shown)
    pathPrefix: "/",
    // -----------------------------------------------------------------

    // These are all optional (defaults are shown):
    dir: {
      input: "./src",
      includes: "/_includes",
      data: "/_data",
      output: "_site",
    },
  };
};
