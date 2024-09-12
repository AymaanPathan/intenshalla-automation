import "./App.css";
import Faq from "./Components/Faq/Faq";
import Footer from "./Components/Footer/Footer";
import Form from "./Components/Form/Form";
import { Hero } from "./Components/Hero/Hero";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="bottom-center" />
      <Hero />
      <Faq />
      <Form />
      <Footer />
    </>
  );
}

export default App;
