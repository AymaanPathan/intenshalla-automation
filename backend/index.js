const express = require("express");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const cors = require("cors");
const { Keyboard } = require("puppeteer");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const router = express.Router();

router.post("/auto", async (req, res) => {
  const { email, password, fieldName, coverLetter } = req.body;
  console.log({ email, password, fieldName, coverLetter });

  const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

  let browser;

  try {
    browser = await puppeteer.launch({
      headless: false,
      args: ["--start-maximized"],
    });

    const page = await browser.newPage();
    const [width, height] = await page.evaluate(() => [
      window.screen.availWidth,
      window.screen.availHeight,
    ]);
    await page.setViewport({ width, height });

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    await page.goto("https://internshala.com/", {
      waitUntil: "networkidle2",
    });

    await page.waitForSelector(".login-cta");
    await page.click(".login-cta");

    await page.waitForSelector("#modal_email");
    await page.type("#modal_email", email);

    await page.waitForSelector("#modal_password");
    await page.type("#modal_password", password);

    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle2" }),
      page.click("#modal_login_submit"),
    ]);

    await page.waitForSelector(
      ".navbar-nav.nav_menu_container > li:first-child"
    );
    await page.hover(".navbar-nav.nav_menu_container > li:first-child");

    await page.waitForSelector(".internship_item_location");
    await page.click(".internship_item_location");

    async function applyForInternships() {
      await page.waitForSelector("#select_category_chosen");
      await page.click("#select_category_chosen");
      await page.waitForSelector("#select_category_chosen > ul > li > input");
      await delay(3000);
      await page.type(
        "#select_category_chosen > ul > li > input",
        ` ${fieldName} `,
        {
          delay: 50,
        }
      );

      await delay(3000);
      await page.keyboard.press("Enter");
      await delay(3000);

      await page.waitForSelector("#internship_list_container_1");

      const internshipElements = await page.$$(
        ".container-fluid.individual_internship.easy_apply.button_easy_apply_t.visibilityTrackerItem"
      );

      for (let i = 0; i < internshipElements.length; i++) {
        const element = internshipElements[i];

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

        const textareas = await page.$$('textarea[name^="text_"]');
        if (textareas.length > 0) {
          console.log(`Textarea found, skipping internship: ${internshipName}`);

          // Wait for and click the close button (if present)
          await page.waitForSelector("#easy_apply_modal_close", {
            visible: true,
          });

          await page.click("#easy_apply_modal_close");

          await delay(3000);
          await page.waitForSelector("#easy_apply_modal_close_confirm_exit", {
            visible: true,
          });

          // Click the "Exit" button to close the modal
          await page.click("#easy_apply_modal_close_confirm_exit");

          continue;
        }

        await delay(4000);
        await page.waitForSelector(
          "#cover_letter_holder > div.ql-editor.ql-blank"
        );
        await page.type(
          "#cover_letter_holder > div.ql-editor.ql-blank",
          coverLetter
        );

        delay(10000);

        await delay(3000);
        await page.waitForSelector(
          ".submit_button_container.easy_apply_footer #submit"
        );
        await page.click(".submit_button_container.easy_apply_footer #submit");
        await delay(3000);

        const modalSelector = ".modal-dialog";
        const modalExists = await page.$(modalSelector);
        if (modalExists) {
          console.log("Modal appeared, closing it...");
          await page.click("#backToInternshipsCta");
        } else {
          console.log("Modal did not appear, clicking #not-interested...");
          await page.waitForSelector("#not-interested");
          await page.click("#not-interested");
        }

        await delay(2000);
      }
    }

    await applyForInternships();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Automation failed.");
  }
});

app.use("/", router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
