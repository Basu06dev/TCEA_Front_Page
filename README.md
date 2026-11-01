# TCEA Student Cover Page Maker — Updated Faculty Controls

Independent student utility for generating printable academic cover pages.

## Update: Optional faculty members
- Faculty 1 is displayed by default and remains the primary faculty section.
- Use **Add another faculty** to reveal Faculty 2, and use it again to reveal Faculty 3.
- Faculty 2 and Faculty 3 are hidden until requested; they do not appear in the form or document preview by default.
- Each additional faculty member has separate Name, Designation, and Department fields.
- Additional faculty can be removed from the form.
- The preview updates automatically, and the selected faculty count and entered details are saved locally in the browser.
- Existing saved drafts containing a second faculty are migrated and shown correctly.

## Existing features retained
- Existing four template designs and template selection.
- A4 portrait document layout and TCEA logo.
- Live preview, browser printing, and PDF download.
- Course, student, submission, and faculty department fields.
- Local draft saving.

## Run locally
1. Extract the ZIP file.
2. Open the extracted folder.
3. Open `index.html` in Chrome, Edge, or Firefox.

## Deploy/update on GitHub and Vercel
See `DEPLOYMENT_GUIDE.md` for the complete update procedure.

## Project structure
```text
tcea-student-cover-page-maker/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── assets/
│   └── tcea-logo.jpg
├── README.md
└── DEPLOYMENT_GUIDE.md
```
