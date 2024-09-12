import { useState } from "react";

export default function App() {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const faqs = [
    {
      question: "What should I provide in the form?",
      answer:
        "You need to provide your Internshala email, password, the internship field name (or category), and your personalized cover letter. This information is necessary for the automation to log into your account, select the right field for internships, and submit your application with the cover letter. The cover letter highlights your qualifications and interest, helping companies assess your potential.",
    },
    {
      question: "How should I handle a captcha error?",
      answer:
        "If you encounter a captcha error on the login page, you will need to manually click the 'Submit' button to verify the captcha. Once the page reloads, the automation will resume automatically. Please refrain from interacting with the page (e.g., clicking or scrolling) after submitting the captcha to avoid disrupting the automation process. The bot is designed to handle the rest once the captcha is cleared.",
    },
    {
      question: "How many companies will the automation apply to?",
      answer:
        "This automation bot is programmed to apply to up to 5 companies within the selected field. It will seamlessly submit your application, including the cover letter, to these companies. The process saves time by automating the repetitive steps of applying for multiple internships, while still allowing you to manage more specific internships manually if needed.",
    },
    {
      question: "What should I do after submitting an application?",
      answer:
        "Once the application has been submitted, you don’t need to perform any additional actions. If you encountered a captcha error, make sure you’ve manually completed that step. Afterward, let the automation proceed without interacting with the page. The process might take 30-40 seconds to find and apply to each internship, but it will complete the task without requiring any further input from you. Avoid using the mouse or keyboard during this time to ensure smooth operation.",
    },
    {
      question: "How do I know it has completed applying for internships?",
      answer:
        "Once the automation has successfully applied to all the internships, the browser will automatically close. This signals that the process is complete. You can verify the applications by checking your Internshala profile under the 'Applied Companies' section, where you will see the list of internships you have applied to.",
    },
    {
      question:
        "How does the automation handle additional questions in internships?",
      answer:
        "If an internship has additional questions beyond the standard application form, the automation will recognize it and will not submit the application. Instead, it will bookmark that particular internship in your Internshala profile for you to review and apply to manually later. This ensures you don’t miss opportunities but allows you to handle more complex applications at your convenience.",
    },
  ];

  return (
    <section className="bg-gray-900">
      <div className="container px-6 py-12 mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl dark:text-white">
          Read Before Submit
        </h1>

        <div className="mt-8 space-y-8 lg:mt-12">
          {faqs.map((faq, index) => (
            <div key={index} className="p-8   bg-gray-100">
              <button
                className="flex items-center justify-between w-full"
                onClick={() => toggleExpand(index)}
              >
                <h1 className="font-semibold text-gray-700 dark:text-black">
                  {faq.question}
                </h1>

                <span
                  className={`text-white rounded-full ${
                    expanded === index ? "bg-blue-500" : "bg-blue-800"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={
                        expanded === index
                          ? "M12 6v6m0 0v6m0-6h6m-6 0H6"
                          : "M18 12H6"
                      }
                    />
                  </svg>
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  expanded === index ? "max-h-screen" : "max-h-0"
                }`}
              >
                <p className="mt-6 text-sm  text-gray-800 font-semibold">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
