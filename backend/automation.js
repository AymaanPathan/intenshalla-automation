const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

(async () => {
  const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

  let browser;

  try {
    browser = await puppeteer.launch({
      headless: false, // Set to false for visual debugging
      args: ["--start-maximized"], // Start the browser maximized
    });

    const page = await browser.newPage();

    // Set user agent to make the browser appear more human-like
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    // Navigate to the desired page
    await page.goto("https://internshala.com/", { waitUntil: "networkidle2" });

    // Wait for the login button to be visible and click it
    await page.waitForSelector(".login-cta");
    await page.click(".login-cta");

    // Enter login credentials
    await page.waitForSelector("#modal_email");
    await page.type("#modal_email", "pathanaymaan8@gmail.com");

    await page.waitForSelector("#modal_password");
    await page.type("#modal_password", "fostered");

    // Click the login button
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle2" }),
      page.click("#modal_login_submit"),
    ]);

    // Hover over the first <li> element in the navbar
    const firstLi = await page.$(
      ".navbar-nav.nav_menu_container > li:first-child"
    );
    if (firstLi) {
      await firstLi.hover();
    } else {
      console.log("Failed to select the first <li> element.");
    }

    // Select internship location
    await page.waitForSelector(".internship_item_location");
    await page.click(".internship_item_location");

    // Selecting category, for example: web development
    await page.waitForSelector("#select_category_chosen");
    await page.click("#select_category_chosen");
    await page.waitForSelector("#select_category_chosen > ul > li > input");
    await delay(3000);
    await page.type("#select_category_chosen > ul > li > input", " front ", {
      delay: 150,
    });
    await page.keyboard.press("Enter");

    await delay(3000);

    // Wait for internship list to load
    await page.waitForSelector("#internship_list_container_1");

    // Get all internship elements
    const internshipElements = await page.$$(
      ".container-fluid.individual_internship.easy_apply.button_easy_apply_t.visibilityTrackerItem"
    );

    for (let i = 2; i < internshipElements.length; i++) {
      const element = internshipElements[i];

      // Get internship name
      const nameElement = await element.$("h3.job-internship-name");
      const internshipName = await page.evaluate(
        (name) => name.textContent.trim(),
        nameElement
      );
      console.log(`Applying for: ${internshipName}`);

      await element.click();
      await delay(2000);

      await page.waitForSelector("#continue_button");
      await delay(1000);
      await page.click("#continue_button");
      delay(1000);
      await page.waitForSelector("#cover_letter");
      await page.click("#cover_letter");
      await page.type("cover_letter", "hi");
    }
  } catch (error) {
    console.error("Error:", error);
  }
})();
