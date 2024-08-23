import { useState } from "react";

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldname, setFieldName] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, fieldname, coverLetter }), // Include location in the request body
      });

      if (response.ok) {
        console.log("Application submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting application", error);
    }
  };

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
        <div className="flex justify-between items-center gap-12">
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
                className="w-full border-2 rounded-lg border-gray-200 p-4 text-sm shadow-sm"
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
        <div className="flex justify-between">
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
                id="cover"
                // rows={2}
                // cols={8}
                name="cover"
                className="w-full resize-none border-2  rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                placeholder="Enter your Cover Letter"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="FieldName"
              className="block text-xs font-medium text-gray-400"
            >
              Field Name
            </label>
            <div className="relative mt-1">
              <input
                onChange={(e) => setFieldName(e.target.value)}
                value={fieldname}
                type="text"
                id="FieldName"
                name="FieldName"
                className="w-full border-2 rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                placeholder="Enter your Field"
              />
            </div>
          </div>
        </div>
        <div className="text-center">
          <button
            type="btn"
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
