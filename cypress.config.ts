import {defineConfig} from "cypress";

export default defineConfig({
  // video: true,
  e2e: {
    baseUrl: 'http://localhost:4200',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        seedDatabase(filename) {
          return filename;
        }
      });
    },
  },
});
