const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 8080;

// Define the directories containing the modules
const myModuleDirs = ["product", "report", "user"];

// Dynamically import modules from multiple directories
myModuleDirs.forEach((dir) => {
  const myModuleDirPath = path.join(__dirname, dir);

  // Check if the directory exists
  if (fs.existsSync(myModuleDirPath)) {
    // Get the directory contents
    const files = fs.readdirSync(myModuleDirPath);

    // Import and use the modules
    files.forEach((file) => {
      const myModulePath = path.join(myModuleDirPath, file);
      const myModule = require(myModulePath);

      // Check if the module is a valid middleware function or router
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
