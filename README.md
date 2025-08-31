# GEC Bidar Application Form

A Next.js web application for the "Application Form for Examination / Revaluation / Photocopy" for Government Engineering College, Bidar.

## Features

- **Responsive Design**: Built with Tailwind CSS for mobile and desktop compatibility
- **Dynamic Form**: Add/remove subjects dynamically
- **PDF Export**: Download form as PDF using html2canvas and jsPDF
- **Print-Friendly**: Optimized for printing with proper page breaks
- **Professional Layout**: Clean, government form-style design

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── components/
│   └── Form.jsx          # Main form component
├── pages/
│   ├── _app.js          # App wrapper
│   └── index.js         # Home page
├── styles/
│   └── globals.css      # Global styles with Tailwind
├── package.json         # Dependencies
├── tailwind.config.js   # Tailwind configuration
└── postcss.config.js    # PostCSS configuration
```

## Technologies Used

- **Next.js** (Pages Router)
- **React**
- **Tailwind CSS**
- **html2canvas** (for PDF generation)
- **jsPDF** (for PDF export)

## Form Features

- Candidate details input
- Dynamic subjects table
- Bank details section
- Signature areas
- Automatic fee calculation
- PDF download functionality
- Print-optimized layout