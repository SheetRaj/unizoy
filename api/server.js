const app = require("./app");

const PORT = process.env.PORT || 8000;

// Only start listening when running locally (not on Vercel)
if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
