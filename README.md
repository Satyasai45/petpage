# Lost & Found Pets Website

A modern, responsive web application for reporting and viewing lost and found pets. Built with HTML, CSS, and JavaScript.

## Features

- 🏠 **Landing Page** with hero section, recent listings, testimonials, and about section
- 📝 **Report Lost Pet** form with conditional fields and validation
- 📝 **Report Found Pet** form with validation
- 📋 **Lost Pets Listing** page showing all reported lost pets
- 📋 **Found Pets Listing** page showing all reported found pets
- 📱 **Fully Responsive** design for desktop and mobile devices
- 💾 **LocalStorage** integration for data persistence
- 🖼️ **Image Upload** support with Base64 conversion
- ✅ **Form Validation** with error messages
- 🎨 **Modern UI** with Font Awesome icons

## Form Features

### Lost Pet Form
- Pet Name, Type, Breed, Color, Size, Gender
- Date Lost and Location
- Tag/Microchip ID (optional)
- Contact Number (10-digit validation)
- Description and Image Upload
- Conditional fields:
  - Pet Type → Breed dropdown (Dog/Cat breeds)
  - Color → Custom color textbox (when "Other" selected)
  - Size → Custom size textbox (when "Other" selected)

### Found Pet Form
- Pet Type, Breed, Color
- Found Location and Date Found
- Contact Number (10-digit validation)
- Description and Image Upload
- Same conditional fields as Lost Pet form

## Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- JavaScript (ES6+)
- Font Awesome Icons
- LocalStorage API

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Satyasai45/petpage.git
```

2. Navigate to the project directory:
```bash
cd petpage
```

3. Open `index.html` in your web browser, or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server -p 8000
```

4. Visit `http://localhost:8000` in your browser

## Project Structure

```
petpage/
├── index.html          # Landing page
├── add-lost-pet.html   # Report lost pet form
├── add-found-pet.html  # Report found pet form
├── lost-pets.html      # Lost pets listing page
├── found-pets.html     # Found pets listing page
├── styles.css          # Main stylesheet
├── script.js           # Core functionality and localStorage
├── form-handler.js     # Form handling and validation
└── README.md           # Project documentation
```

## Usage

1. **Report a Lost Pet**: Click "Report Lost Pet" button, fill out the form, and submit
2. **Report a Found Pet**: Click "Report Found Pet" button, fill out the form, and submit
3. **View Listings**: Navigate to "Lost Pets" or "Found Pets" pages to see all reports
4. **Homepage**: View recent lost and found pets on the landing page

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Edge (Chromium)

## License

This project is open source and available for personal and educational use.

## Contributing

Contributions, issues, and feature requests are welcome!

## Contact

For questions or support, please open an issue on GitHub.

