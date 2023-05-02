import { crawlPage } from "./crawl.js";

function main() {
  if (process.argv.length < 3) {
    console.log("No url found.");
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log("Can only provide one url.");
    process.exit(1);
  }
  const url = process.argv[2];
  console.log(`Crawling ${url}`);

  crawlPage(url);
}

main();
