const db = require("../config/db");
const app = require("../app");
const mkdirp = require("mkdirp");

const {
  UPLOAD_DIR,
  AVATAR_DIR,
  PORT = 3030,
  HOST = "127.0.0.1",
} = require("../config/dotenv-info");

db.then(() => {
  app.listen(PORT, HOST, async () => {
    await mkdirp(UPLOAD_DIR);
    await mkdirp(`public/${AVATAR_DIR}`);
    console.log(`Server running. Use our API on http://127.0.0.1:${PORT}`);
  });
}).catch((e) => {
  console.log(`Server not run ${e.message}`);
});
