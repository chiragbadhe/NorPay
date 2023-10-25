// next.config.ts

const { withFonts } = require('next-fonts');

module.exports = withFonts({
  // Specify the fonts you want to load here
  fonts: {
    // Example configuration for loading Poppins font
    poppins: [
      'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
    ],
  },
});
