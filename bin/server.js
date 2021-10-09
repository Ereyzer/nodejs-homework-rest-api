const db = require("../config/db");
const app = require("../app");

const PORT = process.env.PORT || 3030;

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((e) => {
  console.log(`Server not run ${e.message}`);
});
