const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const router = express.Router();

router.post("/auto", async (req, res) => {
  try {
    const { email, password, fieldname, location } = req.body;
    // await automation.auto(email, password, fieldname, location);
    res.json({
      Status: "Success",
      Data: {
        email,
        password,
        fieldname,
        location,
      },
    });
  } catch (error) {
    console.error("Automation error:", error);
    res.status(500).send("Automation failed.");
  }
});

app.use("/", router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
