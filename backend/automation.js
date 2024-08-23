const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

const category = "web development";
const cover = `I am writing to express my interest in the internship opportunity at Your as advertised on Internshala. As a passionate and dedicated Full-Stack Developer currently in my third year of BCA, I am eager to apply my technical skills and knowledge in a professional environment where I can contribute meaningfully while gaining invaluable experience.

Over the course of my studies and personal projects, I have developed a robust skill set that includes HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB. I have applied these technologies in various projects, such as creating an e-commerce website with payment integration, developing a library management system, and building an AI chatbot. These experiences have not only strengthened my technical expertise but also honed my ability to work effectively in both individual and team settings.

What excites me most about joining is the opportunity to work in a dynamic and innovative environment where I can further develop my skills and contribute to impactful projects. I am particularly drawn to the chance to learn from experienced professionals and to apply my knowledge in ways that benefit the company.

I am confident that my enthusiasm, strong technical foundation, and willingness to learn make me a valuable addition to your team. I am eager to bring my skills to this company and contribute to the success of your projects.

Thank you for considering my application. I look forward to the opportunity to discuss how I can contribute to your team and grow as a professional during this internship.

Sincerely,

Aymaan Pathan`;

puppeteer.use(StealthPlugin());

(async () => {
  const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

  let browser;

  try {
    browser = await puppeteer.launch({
      headless: false,
      args: ["--start-maximized"],
    });

    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    await page.goto("https://internshala.com/", { waitUntil: "networkidle2" });

    await page.waitForSelector(".login-cta");
    await page.click(".login-cta");

    await page.waitForSelector("#modal_email");
    await page.type("#modal_email", "pathanaymaan8@gmail.com");

    await page.waitForSelector("#modal_password");
    await page.type("#modal_password", "fostered");

    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle2" }),
      page.click("#modal_login_submit"),
    ]);

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

    async function applyForInternships() {
      await page.waitForSelector("#select_category_chosen");
      await page.click("#select_category_chosen");
      await page.waitForSelector("#select_category_chosen > ul > li > input");
      await delay(3000);
      await page.type(
        "#select_category_chosen > ul > li > input",
        ` ${category} `,
        {
          delay: 150,
        }
      );
      await page.keyboard.press("Enter");

      await delay(3000);

      await page.waitForSelector("#internship_list_container_1");

      const internshipElements = await page.$$(
        ".container-fluid.individual_internship.easy_apply.button_easy_apply_t.visibilityTrackerItem"
      );

      for (let i = 1; i <= 14; i++) {
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
        await delay(1000);
        await page.waitForSelector(
          "#cover_letter_holder > div.ql-editor.ql-blank"
        );
        await page.type("#cover_letter_holder > div.ql-editor.ql-blank", cover);

        const textareas = await page.$$('textarea[name^="text_"]');
        for (let textarea of textareas) {
          await textarea.focus();
        }
        console.log("Please type your text manually in the textareas.");
        await delay(13000);
        await page.waitForSelector(
          ".submit_button_container.easy_apply_footer #submit"
        );
        await page.click(".submit_button_container.easy_apply_footer #submit");
        await delay(3000);

        // Check if the modal appears
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
        await applyForInternships();
      }
    }

    await applyForInternships();
  } catch (error) {
    console.error("Error:", error);
  }
})();
