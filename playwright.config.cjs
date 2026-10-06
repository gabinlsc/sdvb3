const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: "list",
  use: { baseURL: "http://127.0.0.1:4173", browserName: "chromium" },
  webServer: {
    command: "node scripts/serve.cjs",
    url: "http://127.0.0.1:4173/contact.html",
    reuseExistingServer: !process.env.CI,
    timeout: 15000,
  },
});
