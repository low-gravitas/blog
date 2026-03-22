import pluginRss from "@11ty/eleventy-plugin-rss";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import markdownIt from "markdown-it";

export default function (eleventyConfig) {
  // ── Plugins ──────────────────────────────────────────────────────────────

  // RSS plugin — adds absoluteUrl, dateToRfc3339, htmlToAbsoluteUrls filters
  eleventyConfig.addPlugin(pluginRss);

  // Syntax highlighting (Prism-based, CSS is in src/css/blog.css)
  eleventyConfig.addPlugin(syntaxHighlight);

  // ── Collections ──────────────────────────────────────────────────────────

  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/posts/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // ── Filters ──────────────────────────────────────────────────────────────

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return new Date(dateObj).toISOString().split("T")[0];
  });

  eleventyConfig.addFilter("readingTime", (content) => {
    const text = content.replace(/<[^>]*>/g, "");
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  });

  // ── Passthrough copies ───────────────────────────────────────────────────

  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });

  // ── Markdown ─────────────────────────────────────────────────────────────

  const md = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });
  eleventyConfig.setLibrary("md", md);

  // ── Config ───────────────────────────────────────────────────────────────

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
    pathPrefix: "/blog/",
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
