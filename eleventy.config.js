import pluginRss from "@11ty/eleventy-plugin-rss";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import markdownIt from "markdown-it";

const isProduction = process.env.NODE_ENV === "production";

export default function (eleventyConfig) {
  // ── Plugins ──────────────────────────────────────────────────────────────

  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);

  // ── Collections ──────────────────────────────────────────────────────────

  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/posts/*.md")
      .filter((post) => !isProduction || !post.data.draft)
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

  // ── Shortcodes ───────────────────────────────────────────────────────────

  // {% image "img/bird.jpg", "Alt text", "left", "Optional caption" %}
  eleventyConfig.addShortcode("image", function (src, alt, layout, caption) {
    layout = layout || "center";
    const fullSrc = `/${src}`;
    const captionHtml = caption
      ? `\n  <figcaption>${caption}</figcaption>`
      : "";
    return (
      `<figure class="img-${layout}">` +
      `\n  <a href="${fullSrc}" class="img-link">` +
      `\n    <img src="${fullSrc}" alt="${alt}" loading="lazy">` +
      `\n  </a>${captionHtml}` +
      `\n</figure>`
    );
  });

  // ── Transforms ───────────────────────────────────────────────────────────

  // Post-process HTML to enhance code blocks with metadata attributes
  eleventyConfig.addTransform("codeBlockEnhance", function (content) {
    if (!this.page.outputPath || !this.page.outputPath.endsWith(".html")) {
      return content;
    }

    // Process <!-- code-meta: {...} --> comments preceding <pre> blocks
    // This lets markdown posts control code block features via HTML comments
    return content.replace(
      /<!--\s*code-meta:\s*(\{[^}]+\})\s*-->\s*(<pre\b)/g,
      (match, jsonStr, preTag) => {
        try {
          const meta = JSON.parse(jsonStr);
          const attrs = [];
          if (meta.title) attrs.push(`data-title="${meta.title}"`);
          if (meta.lineNumbers) attrs.push('data-line-numbers');
          if (meta.highlight) attrs.push(`data-highlight="${meta.highlight}"`);
          if (meta.noLang) attrs.push('data-no-lang');
          return `${preTag} ${attrs.join(' ')}`;
        } catch {
          return match;
        }
      }
    );
  });

  // ── Passthrough copies ───────────────────────────────────────────────────

  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/img");
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
