/* =========================================================
   TCEA STUDENT COVER PAGE MAKER
   app.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       HELPER FUNCTIONS
       ===================================================== */

    const $ = (id) => document.getElementById(id);

    const getValue = (id, fallback = "—") => {
        const element = $(id);
        if (!element) return fallback;

        const value = element.value?.trim();

        return value ? value : fallback;
    };

    const setText = (id, value) => {
        const element = $(id);
        if (element) {
            element.textContent = value;
        }
    };

    /* =====================================================
       FORM ELEMENTS
       ===================================================== */

    const formFields = [
        "courseLevel",
        "branch",
        "semester",
        "subject",
        "subjectCode",
        "session",
        "studentName",
        "studentId",
        "tuRoll",
        "tuReg",
        "facultyDept",
        "facultyName",
        "designation",
        "faculty2Name",
        "faculty2Dept",
        "faculty2Designation",
        "submissionType",
        "submissionDate"
    ];

    /* =====================================================
       LIVE PREVIEW
       ===================================================== */

    function updatePreview() {

        /* Course */
        setText("pSubject", getValue("subject", "Your Subject"));
        setText("pCode", getValue("subjectCode", "COURSE CODE"));

        /* Faculty */
        setText("pFaculty", getValue("facultyName", "Faculty Name"));
        setText("pDesignation", getValue("designation", "Lecturer"));

        const facultyDept = getValue(
            "facultyDept",
            "Computer Science & Engineering"
        );

        setText("pDept", facultyDept);

        /* Student */
        setText("pName", getValue("studentName", "Student Name"));

        setText(
            "pId",
            `Student ID: ${getValue("studentId")}`
        );

        setText(
            "pRoll",
            `TU Roll No.: ${getValue("tuRoll")}`
        );

        setText(
            "pReg",
            `TU Registration No.: ${getValue("tuReg")}`
        );

        setText(
            "pBranch",
            `Branch: ${getValue("branch")}`
        );

        setText(
            "pSem",
            `Semester: ${getValue("semester")}`
        );

        /* Session */
        setText(
            "pSession",
            getValue("session", "2026-27")
        );

        /* Submission type */
        const submissionType = getValue(
            "submissionType",
            "Assignment-I"
        );

        let documentType = "ASSIGNMENT";

        if (
            submissionType.toLowerCase().includes("lab")
        ) {
            documentType = "LAB COPY";
        } 
        else if (
            submissionType.toLowerCase().includes("practical")
        ) {
            documentType = "PRACTICAL REPORT";
        }

        setText("docType", documentType);

        /* Date */
        const dateValue = $("submissionDate")?.value;

        if (dateValue) {

            const date = new Date(dateValue);

            const formattedDate =
                date.toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                });

            setText("pDate", formattedDate);

        } else {

            setText("pDate", "—");

        }

        /* =================================================
           SECOND FACULTY
           ================================================= */

        const faculty2Name = getValue(
            "faculty2Name",
            ""
        );

        const faculty2Block = $("pFaculty2Block");

        if (faculty2Block) {

            if (faculty2Name) {

                faculty2Block.hidden = false;

                setText(
                    "pFaculty2Name",
                    faculty2Name
                );

                setText(
                    "pFaculty2Designation",
                    getValue(
                        "faculty2Designation",
                        "Lecturer"
                    )
                );

                setText(
                    "pFaculty2Dept",
                    getValue(
                        "faculty2Dept",
                        "Computer Science & Engineering"
                    )
                );

            } else {

                faculty2Block.hidden = true;

            }
        }

        saveFormData();
    }

    /* =====================================================
       INPUT LISTENERS
       ===================================================== */

    formFields.forEach((id) => {

        const element = $(id);

        if (!element) return;

        element.addEventListener("input", updatePreview);
        element.addEventListener("change", updatePreview);

    });

    /* =====================================================
       TEMPLATE SYSTEM
       ===================================================== */

    const templates = document.querySelectorAll(".template");
    const a4 = $("a4");

    function selectTemplate(templateName) {

        if (!a4) return;

        /* Remove previous template classes */
        a4.classList.remove(
            "classic",
            "border",
            "minimal",
            "lab"
        );

        /* Add selected template */
        a4.classList.add(templateName);

        /* Update buttons */
        templates.forEach((button) => {

            button.classList.toggle(
                "active",
                button.dataset.template === templateName
            );

        });

        localStorage.setItem(
            "tcea-template",
            templateName
        );

        showToast(
            `Template changed to ${
                templateName.charAt(0).toUpperCase() +
                templateName.slice(1)
            }`
        );
    }

    templates.forEach((button) => {

        button.addEventListener("click", () => {

            const templateName =
                button.dataset.template;

            selectTemplate(templateName);

        });

    });

    /* Restore saved template */
    const savedTemplate =
        localStorage.getItem("tcea-template");

    if (savedTemplate) {
        selectTemplate(savedTemplate);
    }

    /* Change Template button */

    const templateBtn = $("templateBtn");

    if (templateBtn) {

        templateBtn.addEventListener("click", () => {

            const strip = $("templateStrip");

            if (strip) {

                strip.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }

            showToast("Choose a template below");

        });

    }

    /* =====================================================
       RESET BUTTON
       ===================================================== */

    const resetBtn = $("resetBtn");

    if (resetBtn) {

        resetBtn.addEventListener("click", () => {

            const confirmed = confirm(
                "Are you sure you want to clear all details?"
            );

            if (!confirmed) return;

            formFields.forEach((id) => {

                const element = $(id);

                if (!element) return;

                if (
                    element.tagName === "SELECT"
                ) {
                    element.selectedIndex = 0;
                } 
                else {
                    element.value = "";
                }

            });

            localStorage.removeItem(
                "tcea-cover-data"
            );

            updatePreview();

            showToast("All details have been reset.");

        });

    }

    /* =====================================================
       NEXT BUTTON
       ===================================================== */

    const nextBtn = $("nextBtn");

    if (nextBtn) {

        nextBtn.addEventListener("click", () => {

            const subject =
                getValue("subject", "");

            const studentName =
                getValue("studentName", "");

            if (!subject) {

                showToast(
                    "Please enter the Subject / Course Title."
                );

                $("subject")?.focus();

                return;

            }

            if (!studentName) {

                showToast(
                    "Please enter the Student Name."
                );

                $("studentName")?.focus();

                return;

            }

            const strip = $("templateStrip");

            if (strip) {

                strip.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }

            showToast(
                "Details saved. Now choose a template."
            );

        });

    }

    /* =====================================================
       PRINT
       ===================================================== */

    const printBtn = $("printBtn");

    if (printBtn) {

        printBtn.addEventListener("click", () => {

            updatePreview();

            setTimeout(() => {
                window.print();
            }, 150);

        });

    }

    /* =====================================================
       DOWNLOAD PDF
       ===================================================== */

    const downloadBtn = $("downloadBtn");

    if (downloadBtn) {

        downloadBtn.addEventListener(
            "click",
            async () => {

                updatePreview();

                if (
                    typeof html2canvas === "undefined" ||
                    typeof window.jspdf === "undefined"
                ) {

                    showToast(
                        "PDF library could not be loaded. Check your internet connection."
                    );

                    return;
                }

                const originalText =
                    downloadBtn.textContent;

                downloadBtn.disabled = true;
                downloadBtn.textContent =
                    "Generating PDF...";

                try {

                    const canvas =
                        await html2canvas(a4, {
                            scale: 2,
                            useCORS: true,
                            backgroundColor: "#ffffff",
                            logging: false
                        });

                    const imgData =
                        canvas.toDataURL(
                            "image/png",
                            1.0
                        );

                    const {
                        jsPDF
                    } = window.jspdf;

                    const pdf =
                        new jsPDF({
                            orientation: "portrait",
                            unit: "mm",
                            format: "a4"
                        });

                    const pageWidth =
                        pdf.internal.pageSize.getWidth();

                    const pageHeight =
                        pdf.internal.pageSize.getHeight();

                    pdf.addImage(
                        imgData,
                        "PNG",
                        0,
                        0,
                        pageWidth,
                        pageHeight,
                        undefined,
                        "FAST"
                    );

                    const studentName =
                        getValue(
                            "studentName",
                            "Student"
                        )
                        .replace(
                            /[^a-zA-Z0-9_-]/g,
                            "_"
                        );

                    const subject =
                        getValue(
                            "subject",
                            "Cover_Page"
                        )
                        .replace(
                            /[^a-zA-Z0-9_-]/g,
                            "_"
                        );

                    const filename =
                        `TCEA_${studentName}_${subject}.pdf`;

                    pdf.save(filename);

                    showToast(
                        "PDF downloaded successfully!"
                    );

                } catch (error) {

                    console.error(
                        "PDF generation error:",
                        error
                    );

                    showToast(
                        "Unable to generate PDF. Please try Print instead."
                    );

                } finally {

                    downloadBtn.disabled = false;
                    downloadBtn.textContent =
                        originalText;

                }

            }
        );

    }

    /* =====================================================
       LOCAL STORAGE
       ===================================================== */

    function saveFormData() {

        const data = {};

        formFields.forEach((id) => {

            const element = $(id);

            if (!element) return;

            data[id] = element.value;

        });

        localStorage.setItem(
            "tcea-cover-data",
            JSON.stringify(data)
        );

    }

    function loadFormData() {

        const saved =
            localStorage.getItem(
                "tcea-cover-data"
            );

        if (!saved) return;

        try {

            const data =
                JSON.parse(saved);

            formFields.forEach((id) => {

                const element = $(id);

                if (
                    element &&
                    data[id] !== undefined
                ) {

                    element.value = data[id];

                }

            });

        } catch (error) {

            console.error(
                "Could not restore saved data:",
                error
            );

        }

    }

    /* =====================================================
       MY DOCUMENTS
       ===================================================== */

    const docsBtn = $("docsBtn");

    if (docsBtn) {

        docsBtn.addEventListener(
            "click",
            () => {

                const saved =
                    localStorage.getItem(
                        "tcea-cover-data"
                    );

                if (!saved) {

                    showToast(
                        "No saved document found."
                    );

                    return;

                }

                try {

                    const data =
                        JSON.parse(saved);

                    let message =
                        "Saved Cover Page\n\n";

                    message +=
                        `Student: ${
                            data.studentName || "—"
                        }\n`;

                    message +=
                        `Subject: ${
                            data.subject || "—"
                        }\n`;

                    message +=
                        `Course Code: ${
                            data.subjectCode || "—"
                        }\n`;

                    message +=
                        `Semester: ${
                            data.semester || "—"
                        }\n`;

                    message +=
                        `Session: ${
                            data.session || "—"
                        }\n\n`;

                    message +=
                        "The details are stored locally in this browser.";

                    alert(message);

                } catch (error) {

                    showToast(
                        "Unable to open saved document."
                    );

                }

            }
        );

    }

    /* =====================================================
       ABOUT LINK
       ===================================================== */

    const aboutLink = $("aboutLink");
    const aboutSection = $("about");
    const generator = $("generator");

    if (aboutLink && aboutSection) {

        aboutLink.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                aboutSection.hidden = false;

                aboutSection.scrollIntoView({
                    behavior: "smooth"
                });

            }
        );

    }

    /* =====================================================
       CONTACT
       ===================================================== */

    const contactLink =
        document.querySelector(
            'a[href="#contact"]'
        );

    const contactSection =
        $("contact");

    if (
        contactLink &&
        contactSection
    ) {

        contactLink.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                contactSection.scrollIntoView({
                    behavior: "smooth"
                });

            }
        );

    }

    /* =====================================================
       HOME
       ===================================================== */

    const homeLink =
        document.querySelector(
            'a[href="#generator"]'
        );

    if (homeLink) {

        homeLink.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                if (aboutSection) {
                    aboutSection.hidden = true;
                }

                if (generator) {

                    generator.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }

    /* =====================================================
       TOAST
       ===================================================== */

    function showToast(message) {

        const toast = $("toast");

        if (!toast) return;

        toast.textContent = message;

        toast.classList.add("show");

        clearTimeout(
            window.tceaToastTimer
        );

        window.tceaToastTimer =
            setTimeout(() => {

                toast.classList.remove("show");

            }, 2500);

    }

    /* =====================================================
       INITIALIZATION
       ===================================================== */

    loadFormData();

    updatePreview();

});
