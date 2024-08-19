const puppeteer = require("puppeteer");

(async () => {
  // Launch a new browser instance
  const browser = await puppeteer.launch({
    headless: false, // Set to false for visual debugging
    args: ["--start-maximized"], // Start the browser maximized
  });

  // Open a new page
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1980 });

  // Set user agent to make the browser appear more human-like
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
  );

  // Navigate to the desired page
  await page.goto("https://internshala.com/", { waitUntil: "networkidle2" });

  // Wait for the login button to be visible and click it
  await page.waitForSelector(".login-cta");
  await page.click(".login-cta");

  await page.waitForSelector("#modal_email");
  await page.click("#modal_email");
  await page.type("#modal_email", "pathanaymaan8@gmail.com");

  await page.waitForSelector("#modal_password");
  await page.click("#modal_password");
  await page.type("#modal_password", "fostered");

  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle2" }),
    page.click("#modal_login_submit"),
  ]);

  const firstLi = await page.$(
    ".navbar-nav.nav_menu_container > li:first-child"
  );

  if (firstLi) {
    console.log("First <li> element selected successfully!");

    await firstLi.hover();
  } else {
    console.log("Failed to select the first <li> element.");
  }

  await page.waitForSelector(".internship_item_location");
  await page.click(".internship_item_location");
})();
