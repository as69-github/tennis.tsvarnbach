module.exports = function (eleventyConfig) {
  // Statische Dateien direkt durchreichen (Bilder, Admin, Uploads)
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy({ "src/uploads": "uploads" });

  // Datum schön formatieren (z. B. "14. Juni 2026")
  eleventyConfig.addFilter("datumDeutsch", function (dateInput) {
    if (!dateInput) return "";
    const date = new Date(dateInput);
    return date.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  });

  // Uhrzeit formatieren (z. B. "18:00")
  eleventyConfig.addFilter("uhrzeit", function (dateInput) {
    if (!dateInput) return "";
    const date = new Date(dateInput);
    return date.toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });
  });

  // Tageszahl (z. B. "14")
  eleventyConfig.addFilter("tag", function (dateInput) {
    if (!dateInput) return "";
    return new Date(dateInput).toLocaleDateString("de-DE", { day: "2-digit" });
  });

  // Monatskürzel (z. B. "Jun")
  eleventyConfig.addFilter("monatKurz", function (dateInput) {
    if (!dateInput) return "";
    return new Date(dateInput).toLocaleDateString("de-DE", { month: "short" });
  });

  // Liste auf n Einträge begrenzen
  eleventyConfig.addFilter("limit", function (arr, n) {
    return (arr || []).slice(0, n);
  });

  // Nur zukünftige/heutige Termine, chronologisch sortiert
  eleventyConfig.addCollection("kommendeTermine", function (collectionApi) {
    const jetzt = new Date();
    jetzt.setHours(0, 0, 0, 0);
    return collectionApi
      .getFilteredByGlob("src/termine/*.md")
      .filter((item) => new Date(item.data.datum) >= jetzt)
      .sort((a, b) => new Date(a.data.datum) - new Date(b.data.datum));
  });

  // Alle Termine chronologisch
  eleventyConfig.addCollection("alleTermine", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/termine/*.md")
      .sort((a, b) => new Date(a.data.datum) - new Date(b.data.datum));
  });

  // Neuigkeiten, neueste zuerst
  eleventyConfig.addCollection("neuigkeiten", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/neuigkeiten/*.md")
      .sort((a, b) => new Date(b.data.datum) - new Date(a.data.datum));
  });

  // Turniere / Fotogalerien, neueste zuerst
  eleventyConfig.addCollection("turniere", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/turniere/*.md")
      .sort((a, b) => new Date(b.data.datum) - new Date(a.data.datum));
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
