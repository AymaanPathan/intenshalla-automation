import { useState } from "react";

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const categories = [
    { label: "NET Development" },
    { label: "3D Printing" },
    { label: "ASP.NET Development" },
    { label: "Accounts" },
    { label: "Acting" },
    { label: "Aerospace Engineering" },
    { label: "Agriculture & Food Engineering" },
    { label: "Analytics" },
    { label: "Anchoring" },
    { label: "Android App Development" },
    { label: "Angular.js Development" },
    { label: "Animation" },
    { label: "Architecture" },
    { label: "Artificial Intelligence (AI)" },
    { label: "Audio Making/Editing" },
    { label: "Auditing" },
    { label: "Backend Development" },
    { label: "Bank" },
    { label: "Big Data" },
    { label: "Bioinformatics" },
    { label: "Biology" },
    { label: "Biotechnology Engineering" },
    { label: "Blockchain Development" },
    { label: "Blogging" },
    { label: "Brand Management" },
    { label: "Business Development" },
    { label: "Business/MBA" },
    { label: "CA Articleship" },
    { label: "CAD Design" },
    { label: "Campus Ambassador" },
    { label: "Chartered Accountancy (CA)" },
    { label: "Chemistry" },
    { label: "Cinematography" },
    { label: "Civil Engineering" },
    { label: "Client Servicing" },
    { label: "Cloud Computing" },
    { label: "Commerce" },
    { label: "Company Secretary (CS)" },
    { label: "Computer Science" },
    { label: "Computer Vision" },
    { label: "Content Writing" },
    { label: "Copywriting" },
    { label: "Creative Design" },
    { label: "Creative Writing" },
    { label: "Customer Service" },
    { label: "Cyber Security" },
    { label: "Data Entry" },
    { label: "Data Science" },
    { label: "Database Building" },
    { label: "Design" },
    { label: "Dietetics/Nutrition" },
    { label: "Digital Marketing" },
    { label: "E-commerce" },
    { label: "Editorial" },
    { label: "Electric Vehicle" },
    { label: "Electrical Engineering" },
    { label: "Electronics Engineering" },
    { label: "Embedded Systems" },
    { label: "Engineering" },
    { label: "Engineering Design" },
    { label: "Engineering Physics" },
    { label: "Environmental Sciences" },
    { label: "Event Management" },
    { label: "Facebook Marketing" },
    { label: "Fashion Design" },
    { label: "Film Making" },
    { label: "Finance" },
    { label: "Flutter Development" },
    { label: "Front End Development" },
    { label: "Full Stack Development" },
    { label: "Fundraising" },
    { label: "Game Design" },
    { label: "Game Development" },
    { label: "General Management" },
    { label: "Government" },
    { label: "Graphic Design" },
    { label: "Hospitality" },
    { label: "Hotel Management" },
    { label: "Human Resources (HR)" },
    { label: "Humanities" },
    { label: "Image Processing" },
    { label: "Industrial Design" },
    { label: "Information Technology" },
    { label: "Instrumentation & Control Engineering" },
    { label: "Interior Design" },
    { label: "International" },
    { label: "Internet of Things (IoT)" },
    { label: "Java Development" },
    { label: "Javascript Development" },
    { label: "Journalism" },
    { label: "Law" },
    { label: "Legal Research" },
    { label: "Machine Learning" },
    { label: "Market/Business Research" },
    { label: "Marketing" },
    { label: "Material Science" },
    { label: "Mathematics" },
    { label: "Mechanical Engineering" },
    { label: "Media" },
    { label: "Medicine" },
    { label: "Merchandise Design" },
    { label: "Mobile App Development" },
    { label: "Motion Graphics" },
    { label: "Music" },
    { label: "NGO" },
    { label: "Network Engineering" },
    { label: "Node.js Development" },
    { label: "Operations" },
    { label: "PHP Development" },
    { label: "Pharmaceutical" },
    { label: "Photography" },
    { label: "Physics" },
    { label: "Political/Economics/Policy Research" },
    { label: "Product Management" },
    { label: "Programming" },
    { label: "Project Management" },
    { label: "Python/Django Development" },
    { label: "Recruitment" },
    { label: "Robotics" },
    { label: "Ruby on Rails" },
    { label: "Sales" },
    { label: "SAP" },
    { label: "Search Engine Optimization (SEO)" },
    { label: "Social Media Marketing" },
    { label: "Software Development" },
    { label: "Software Testing" },
    { label: "SolidWorks" },
    { label: "Statistics" },
    { label: "Strategy" },
    { label: "Supply Chain Management (SCM)" },
    { label: "Teaching" },
    { label: "Technical Writing" },
    { label: "Telecalling" },
    { label: "Textile Design" },
    { label: "Training & Development" },
    { label: "Transcription" },
    { label: "Travel & Tourism" },
    { label: "UI/UX Design" },
    { label: "Videography" },
    { label: "Video Making/Editing" },
    { label: "VLSI/Embedded Systems" },
    { label: "Volunteering" },
    { label: "Web Development" },
    { label: "Web3 Development" },
    { label: "Wordpress Development" },
    { label: "Yoga & Naturopathy" },
  ];

  const handleSubmit = async (e) => {
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
            type="submit"
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
