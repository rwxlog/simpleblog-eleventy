const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  /**
   * Date filter (formatting)
   * Usage: {{ date | date("MMM d, yyyy") }}
   */
  eleventyConfig.addFilter("date", (dateObj, format = "MMM d, yyyy") => {
    if (!dateObj) return "";
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(format);
  });

  /**
   * Reading time filter
   * Usage: {{ content | readingTime }}
   */
  eleventyConfig.addFilter("readingTime", (content) => {
    if (!content) return "0 min read";
    const words = content.replace(/<\/?[^>]+(>|$)/g, "").split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  });

  /**
   * Filter posts by category
   * Usage: collections.posts | filterByCategory("faith")
   */
  eleventyConfig.addFilter("filterByCategory", (posts, category) => {
    if (!posts || !Array.isArray(posts)) return [];
    return posts.filter((post) => {
      const cats = post.data.categories || [];
      return cats.includes(category);
    });
  });
 // Add a "slice" filter for Nunjucks
  eleventyConfig.addNunjucksFilter("slice", function(array, start, end) {
    if (!Array.isArray(array)) return [];
    return array.slice(start, end);
  });

  /**
   * Get previous post in collection
   * Usage: collections.posts | getPrevious(page)
   */
  eleventyConfig.addFilter("getPrevious", (posts, page) => {
    if (!posts || !Array.isArray(posts)) return null;
    const index = posts.findIndex((p) => p.url === page.url);
    return index > 0 ? posts[index - 1] : null;
  });

  /**
   * Get next post in collection
   * Usage: collections.posts | getNext(page)
   */
  eleventyConfig.addFilter("getNext", (posts, page) => {
    if (!posts || !Array.isArray(posts)) return null;
    const index = posts.findIndex((p) => p.url === page.url);
    return (index !== -1 && index < posts.length - 1) ? posts[index + 1] : null;
  });

  /**
   * Define a posts collection
   * Grabs everything under /posts and sorts newest → oldest
   */
  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi.getFilteredByGlob("posts/**/*.md").sort((a, b) => b.date - a.date);
  });

  // Copy static assets (adjust paths as needed)
  eleventyConfig.addPassthroughCopy("assets");

  return {
    dir: {
      input: "",        // put your templates in ./src
      includes: "_includes", // layouts and partials
      layouts: "_includes/layouts", // explicit layouts folder
      output: "_site"      // output folder
    }
  };
};
