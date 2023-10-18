const express = require("express");
const cors = require("cors");
const fs = require("fs");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const app = express();

const myModuleDirs = ["product", "report", "user"];

myModuleDirs.forEach((dir) => {
  const myModuleDirPath = path.join(__dirname, dir);

  if (fs.existsSync(myModuleDirPath)) {
    const files = fs.readdirSync(myModuleDirPath);

    files.forEach((file) => {
      const myModulePath = path.join(myModuleDirPath, file);
      const myModule = require(myModulePath);

      if (typeof myModule === "function") {
        app.use(myModule);
      } else if (
        typeof myModule === "object" &&
        typeof myModule.router === "function"
      ) {
        app.use(myModule.router);
      } else {
        console.error(`Invalid module in ${myModulePath}. Skipping...`);
      }
    });
  } else {
    console.error(`Module directory ${myModuleDirPath} not found. Skipping...`);
  }
});

app.use(cors());

app.listen(process.env.EXPRESS_PORT, () => {
  console.log(`Server running on port ${process.env.EXPRESS_PORT}`);
});
