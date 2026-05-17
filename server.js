const express = require("express");
const path = require("path");

const app = express();
const PORT = 4000;

app.use(express.json());

// Serve static files
app.use(express.static(__dirname));

// Home Route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "calculator.html"));
});

// Calculate Route
app.post("/calculate", (req, res) => {
  try {
    const { expression } = req.body;

    if (!expression) {
      return res.status(400).json({
        error: "Empty Expression"
      });
    }

    const result = Function(
      '"use strict"; return (' + expression + ')'
    )();

    res.json({ result });

  } catch (error) {
    res.status(400).json({
      error: "Invalid Expression"
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});