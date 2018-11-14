const assert = require("assert");
const cheerio = require("cheerio");

describe("server", () => {
  it("renders in the same component", () => {
    const template = require("./fixtures/same-component");
    return template.render({ data: "[provided content]" }).then(html => {
      const $ = cheerio.load(`<html><head></head><body>${html}</body></html>`);
      assert.equal($("body").text(), "[receiver content] [provided content]");
    });
  });

  it("renders in two separate components", () => {
    const template = require("./fixtures/external-components");
    return template.render({ data: "[provided content]" }).then(html => {
      const $ = cheerio.load(`<html><head></head><body>${html}</body></html>`);
      assert.equal(
        $("body").text(),
        "[example content] [receiver content] [provided content]"
      );
    });
  });

  it("renders across distant components", () => {
    const template = require("./fixtures/distant-components");
    return template
      .render({ data: "[provided content]", show: true })
      .then(html => {
        const $ = cheerio.load(
          `<html><head></head><body>${html}</body></html>`
        );
        assert.equal(
          $("body").text(),
          "[example content] [receiver content] [provided content]"
        );
      });
  });

  it("renders with multiple context components", () => {
    const template = require("./fixtures/multiple-context-components");
    return template.render({ data: "[provided content]" }).then(html => {
      const $ = cheerio.load(`<html><head></head><body>${html}</body></html>`);
      assert.equal(
        $("body").text(),
        "[example 1 content] [receiver 1 content] [provided content] [seperator][example 2 content] [receiver 2 content] [provided content]"
      );
    });
  });
});
