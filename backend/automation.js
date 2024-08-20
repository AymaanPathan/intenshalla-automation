const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false, // Set to false for visual debugging
      args: ["--start-maximized"], // Start the browser maximized
    });
    const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
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
    await page.type("#modal_email", "pathanaymaan8@gmail.com");

    await page.waitForSelector("#modal_password");
    await page.type("#modal_password", "fostered");
    await page.click("#modal_login_submit");

    await page.waitForNavigation({ waitUntil: "networkidle2" });

    const firstLi = await page.$(
      ".navbar-nav.nav_menu_container > li:first-child"
    );
    if (firstLi) {
      await firstLi.hover();
    } else {
      console.log("Failed to select the first <li> element.");
    }

    await page.waitForSelector(".internship_item_location");
    await page.click(".internship_item_location");

    await page.waitForSelector("#select_category_chosen");
    await page.click("#select_category_chosen");
    await page.waitForSelector("#select_category_chosen > ul > li > input");
    await page.click("#select_category_chosen > ul > li > input");
    await delay(3000);
    await page.type("#select_category_chosen > ul > li > input", " front ", {
      delay: 150,
    });
    await page.keyboard.press("Enter");
  } catch (error) {
    console.error("Error:", error);
  }
})();
