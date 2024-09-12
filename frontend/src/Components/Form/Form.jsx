import { useState } from "react";
import toast from "react-hot-toast";
const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const categories = [
    { label: "NET Development" },
    { label: "ASP.NET Development" },
    { label: "Android App Development" },
    { label: "Angular.js Development" },
    { label: "Animation" },
    { label: "Architecture" },
    { label: "Artificial Intelligence (AI)" },
    { label: "Audio Making/Editing" },
    { label: "Auditing" },
    { label: "Backend Development" },
    { label: "Blockchain Development" },
    { label: "Business/MBA" },
    { label: "CA Articleship" },
    { label: "Cloud Computing" },
    { label: "Cyber Security" },
    { label: "Data Entry" },
    { label: "Data Science" },
    { label: "Flutter Development" },
    { label: "Front End Development" },
    { label: "Full Stack Development" },
    { label: "Game Design" },
    { label: "Game Development" },
    { label: "Graphic Design" },
    { label: "Java Development" },
    { label: "Javascript Development" },
    { label: "Machine Learning" },
    { label: "Mobile App Development" },
    { label: "Node.js Development" },
    { label: "PHP Development" },
    { label: "Python/Django Development" },
    { label: "Ruby on Rails" },
    { label: "Software Development" },
    { label: "UI/UX Design" },
    { label: "Videography" },
    { label: "Video Making/Editing" },
    { label: "Web Development" },
    { label: "Web3 Development" },
    { label: "Wordpress Development" },
  ];

  const handleSubmit = async (e) => {
    if (!email || !password || !coverLetter) {
      return toast.error("Please Provide All Info");
    } else {
      toast.success("Check New Browser");
    }
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, fieldName, coverLetter }),
      });

      if (response.ok) {
        console.log("Application submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting application", error);
      toast.error("Please Try Again Later");
    }
  };
  console.log(fieldName);

  return (
    <div
      id="form"
      className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>
        <p className="mt-4 text-gray-600">
          Please provide your Internshala email and password
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-0 mt-8 max-w-md space-y-8"
      >
        <div className="grid gap-4  items-center">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-gray-400"
            >
              Email Address
            </label>
            <div className="relative mt-1">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                id="email"
                name="email"
                className="w-full border-2 rounded-lg border-gray-200 p-4 text-xs shadow-sm"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium text-gray-400"
            >
              Password
            </label>
            <div className="relative mt-1">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                id="password"
                name="password"
                className="w-full border-2 rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                placeholder="Enter your password"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-7 justify-between">
          <div>
            <label
              htmlFor="FieldName"
              className="block text-xs font-medium text-gray-400"
            >
              Field Name
            </label>
            <div className="relative mt-1">
              <select
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                className="w-full border-2 rounded-lg border-gray-200 p-4 px-2 cursor-pointer text-sm shadow-sm"
              >
                {categories.map((name, i) => (
                  <option key={i} value={name.label}>
                    {name.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="cover"
              className="block text-xs font-medium text-gray-400"
            >
              Cover Letter
            </label>
            <div className="relative  mt-1">
              <textarea
                onChange={(e) => setCoverLetter(e.target.value)}
                value={coverLetter}
                type="text"
                rows={10}
                id="cover"
                name="cover"
                className="w-full resize-none border-2  rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                placeholder="Enter your Cover Letter"
              />
            </div>
          </div>
        </div>
        <div className="text-center">
          <button
            onClick={handleSubmit}
            type="button"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium w-full py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
