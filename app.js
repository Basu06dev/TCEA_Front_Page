/* =========================================================
   STUDENT COVER PAGE MAKER
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const $ = (id) => document.getElementById(id);

    const courseLevel = $("courseLevel");
    const branch = $("branch");
    const semester = $("semester");
    const subject = $("subject");
    const subjectCode = $("subjectCode");
    const session = $("session");

    const studentName = $("studentName");
    const studentId = $("studentId");
    const tuRoll = $("tuRoll");
    const tuReg = $("tuReg");

    const facultyDept = $("facultyDept");
    const facultyName = $("facultyName");
    const designation = $("designation");

    const faculty2Name = $("faculty2Name");
    const faculty2Dept = $("faculty2Dept");
    const faculty2Designation = $("faculty2Designation");

    const submissionType = $("submissionType");
    const submissionDate = $("submissionDate");

    const a4 = $("a4");

    const pSubject = $("pSubject");
    const pCode = $("pCode");

    const pFaculty = $("pFaculty");
    const pDesignation = $("pDesignation");
    const pDept = $("pDept");

    const pFaculty2Block = $("pFaculty2Block");
    const pFaculty2Name = $("pFaculty2Name");
    const pFaculty2Designation = $("pFaculty2Designation");
    const pFaculty2Dept = $("pFaculty2Dept");

    const pName = $("pName");
    const pId = $("pId");
    const pRoll = $("pRoll");
    const pReg = $("pReg");
    const pBranch = $("pBranch");
    const pSem = $("pSem");

    const pSession = $("pSession");
    const pDate = $("pDate");

    const docType = $("docType");

    const resetBtn = $("resetBtn");
    const nextBtn = $("nextBtn");

    const templateBtn = $("templateBtn");
    const downloadBtn = $("downloadBtn");
    const printBtn = $("printBtn");

    const templateStrip = $("templateStrip");

    const aboutSection = $("about");
    const aboutLink = $("aboutLink");

    const toast = $("toast");

    const docsBtn = $("docsBtn");


    /* =====================================================
       DEFAULT VALUES
       ===================================================== */

    if (submissionDate && !submissionDate.value) {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        submissionDate.value = `${year}-${month}-${day}`;
    }


    /* =====================================================
       TOAST
       ===================================================== */

    function showToast(message) {

        if (!toast) return;

        toast.textContent = message;

        toast.classList.add("show");

        clearTimeout(window.toastTimer);

        window.toastTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, 2200);
    }


    /* =====================================================
       SAFE VALUE
       ===================================================== */

    function valueOf(element, fallback = "") {

        if (!element) {
            return fallback;
        }

        const value = element.value.trim();

        return value || fallback;
    }


    /* =====================================================
       DATE FORMAT
       ===================================================== */

    function formatDate(dateValue) {

        if (!dateValue) {
            return "—";
        }

        const date = new Date(`${dateValue}T00:00:00`);

        if (Number.isNaN(date.getTime())) {
            return "—";
        }

        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    }


    /* =====================================================
       DOCUMENT TYPE
       ===================================================== */

    function getDocumentType() {

        const type = valueOf(
            submissionType,
            "Assignment-I"
        );

        if (type === "Lab Copy") {
            return "LAB COPY";
        }

        if (type === "Practical Report") {
            return "PRACTICAL REPORT";
        }

        if (type === "Assignment-II") {
            return "ASSIGNMENT-II";
        }

        return "ASSIGNMENT-I";
    }


    /* =====================================================
       UPDATE PREVIEW
       ===================================================== */

    function updatePreview() {

        if (!a4) return;

        /* Course */

        if (pSubject) {
            pSubject.textContent = valueOf(
                subject,
                "Your Subject"
            );
        }

        if (pCode) {
            pCode.textContent = valueOf(
                subjectCode,
                "COURSE CODE"
            );
        }


        /* Faculty */

        if (pFaculty) {
            pFaculty.textContent = valueOf(
                facultyName,
                "Faculty Name"
            );
        }

        if (pDesignation) {
            pDesignation.textContent = valueOf(
                designation,
                "Lecturer"
            );
        }

        if (pDept) {
            pDept.textContent = valueOf(
                facultyDept,
                "Department of CSE"
            );
        }


        /* Second Faculty */

        const secondFaculty = valueOf(
            faculty2Name,
            ""
        );

        if (secondFaculty) {

            if (pFaculty2Block) {
                pFaculty2Block.hidden = false;
            }

            if (pFaculty2Name) {
                pFaculty2Name.textContent = secondFaculty;
            }

            if (pFaculty2Designation) {
                pFaculty2Designation.textContent =
                    valueOf(
                        faculty2Designation,
                        "Lecturer"
                    );
            }

            if (pFaculty2Dept) {
                pFaculty2Dept.textContent =
                    valueOf(
                        faculty2Dept,
                        "Department of CSE"
                    );
            }

        } else {

            if (pFaculty2Block) {
                pFaculty2Block.hidden = true;
            }
        }


        /* Student */

        if (pName) {
            pName.textContent = valueOf(
                studentName,
                "Student Name"
            );
        }

        if (pId) {
            pId.textContent =
                "Student ID: " +
                valueOf(studentId, "—");
        }

        if (pRoll) {
            pRoll.textContent =
                "TU Roll No.: " +
                valueOf(tuRoll, "—");
        }

        if (pReg) {
            pReg.textContent =
                "TU Registration No.: " +
                valueOf(tuReg, "—");
        }

        if (pBranch) {
            pBranch.textContent =
                "Branch: " +
                valueOf(branch, "—");
        }

        if (pSem) {
            pSem.textContent =
                "Semester: " +
                valueOf(semester, "—");
        }


        /* Bottom */

        if (pSession) {
            pSession.textContent = valueOf(
                session,
                "2026-27"
            );
        }

        if (pDate) {
            pDate.textContent = formatDate(
                submissionDate?.value
            );
        }


        /* Document */

        if (docType) {
            docType.textContent = getDocumentType();
        }
    }


    /* =====================================================
       FORM INPUT EVENTS
       ===================================================== */

    const formElements = [
        courseLevel,
        branch,
        semester,
        subject,
        subjectCode,
        session,

        studentName,
        studentId,
        tuRoll,
        tuReg,

        facultyDept,
        facultyName,
        designation,

        faculty2Name,
        faculty2Dept,
        faculty2Designation,

        submissionType,
        submissionDate
    ];

    formElements.forEach((element) => {

        if (!element) return;

        element.addEventListener("input", updatePreview);

        element.addEventListener("change", updatePreview);
    });


    /* =====================================================
       TEMPLATE SWITCHING
       ===================================================== */

    function selectTemplate(templateName) {

        if (!a4) return;

        const validTemplates = [
            "classic",
            "border",
            "minimal",
            "lab"
        ];

        if (!validTemplates.includes(templateName)) {
            templateName = "classic";
        }

        a4.classList.remove(
            "classic",
            "border",
            "minimal",
            "lab"
        );

        a4.classList.add(templateName);


        /* Update active button */

        const buttons = document.querySelectorAll(
            ".template[data-template]"
        );

        buttons.forEach((button) => {

            button.classList.toggle(
                "active",
                button.dataset.template === templateName
            );
        });


        /* Save selected template */

        try {
            localStorage.setItem(
                "coverPageTemplate",
                templateName
            );
        } catch (error) {
            console.warn(
                "Template could not be saved."
            );
        }


        showToast(
            `Template selected: ${templateName}`
        );
    }


    document
        .querySelectorAll(".template[data-template]")
        .forEach((button) => {

            button.addEventListener("click", () => {

                selectTemplate(
                    button.dataset.template
                );

            });

        });


    /* =====================================================
       CHANGE TEMPLATE BUTTON
       ===================================================== */

    if (templateBtn) {

        templateBtn.addEventListener("click", () => {

            if (!templateStrip) return;

            templateStrip.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            showToast(
                "Choose a template below the preview."
            );

        });

    }


    /* =====================================================
       NEXT BUTTON
       ===================================================== */

    if (nextBtn) {

        nextBtn.addEventListener("click", () => {

            if (!valueOf(studentName, "")) {

                if (studentName) {
                    studentName.focus();
                }

                showToast(
                    "Please enter the student name."
                );

                return;
            }


            if (!valueOf(subject, "")) {

                if (subject) {
                    subject.focus();
                }

                showToast(
                    "Please enter the subject / course title."
                );

                return;
            }


            if (templateStrip) {

                templateStrip.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }

            showToast(
                "Details updated. Choose your template."
            );

        });

    }


    /* =====================================================
       RESET
       ===================================================== */

    if (resetBtn) {

        resetBtn.addEventListener("click", () => {

            const confirmed = confirm(
                "Reset all entered details?"
            );

            if (!confirmed) return;


            formElements.forEach((element) => {

                if (!element) return;

                if (element.tagName === "SELECT") {

                    element.selectedIndex = 0;

                } else {

                    element.value = "";

                }

            });


            /* Restore date */

            if (submissionDate) {

                const today = new Date();

                const year =
                    today.getFullYear();

                const month =
                    String(
                        today.getMonth() + 1
                    ).padStart(2, "0");

                const day =
                    String(
                        today.getDate()
                    ).padStart(2, "0");

                submissionDate.value =
                    `${year}-${month}-${day}`;
            }


            updatePreview();

            showToast(
                "Form has been reset."
            );

        });

    }


    /* =====================================================
       PRINT
       ===================================================== */

    if (printBtn) {

        printBtn.addEventListener("click", () => {

            updatePreview();

            setTimeout(() => {

                window.print();

            }, 100);

        });

    }


    /* =====================================================
       DOWNLOAD PDF
       ===================================================== */

    if (downloadBtn) {

        downloadBtn.addEventListener(
            "click",
            async () => {

                updatePreview();

                if (
                    typeof html2canvas ===
                    "undefined"
                ) {

                    showToast(
                        "PDF library is not loaded."
                    );

                    return;
                }


                if (
                    typeof window.jspdf ===
                    "undefined"
                ) {

                    showToast(
                        "PDF library is not loaded."
                    );

                    return;
                }


                const originalText =
                    downloadBtn.textContent;

                downloadBtn.disabled = true;

                downloadBtn.textContent =
                    "Generating...";


                try {

                    const canvas =
                        await html2canvas(
                            a4,
                            {
                                scale: 2,

                                useCORS: true,

                                backgroundColor: "#ffffff",

                                logging: false,

                                imageTimeout: 15000
                            }
                        );


                    const {
                        jsPDF
                    } = window.jspdf;


                    const pdf =
                        new jsPDF(
                            {
                                orientation: "portrait",

                                unit: "mm",

                                format: "a4",

                                compress: true
                            }
                        );


                    const imgData =
                        canvas.toDataURL(
                            "image/jpeg",
                            0.95
                        );


                    const pageWidth = 210;

                    const pageHeight = 297;


                    pdf.addImage(
                        imgData,
                        "JPEG",
                        0,
                        0,
                        pageWidth,
                        pageHeight,
                        undefined,
                        "FAST"
                    );


                    const student =
                        valueOf(
                            studentName,
                            "Student"
                        );

                    const subjectValue =
                        valueOf(
                            subject,
                            "Cover-Page"
                        );


                    const safeStudent =
                        student
                            .replace(
                                /[^a-z0-9]+/gi,
                                "_"
                            )
                            .replace(
                                /^_+|_+$/g,
                                ""
                            );


                    const safeSubject =
                        subjectValue
                            .replace(
                                /[^a-z0-9]+/gi,
                                "_"
                            )
                            .replace(
                                /^_+|_+$/g,
                                ""
                            );


                    const filename =
                        `${safeSubject || "Cover-Page"}_${safeStudent || "Student"}.pdf`;


                    pdf.save(filename);


                    showToast(
                        "PDF downloaded successfully."
                    );

                } catch (error) {

                    console.error(
                        "PDF generation error:",
                        error
                    );

                    showToast(
                        "Unable to generate PDF."
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
       ABOUT LINK
       ===================================================== */

    if (aboutLink) {

        aboutLink.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                if (!aboutSection) return;


                aboutSection.hidden =
                    false;


                aboutSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    }


    /* =====================================================
       HOME LINK
       ===================================================== */

    const homeLink =
        document.querySelector(
            '.topbar nav a[href="#generator"]'
        );

    if (homeLink) {

        homeLink.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                const generator =
                    $("generator");

                if (generator) {

                    generator.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    }


    /* =====================================================
       CONTACT LINK
       ===================================================== */

    const contactLink =
        document.querySelector(
            '.topbar nav a[href="#contact"]'
        );

    if (contactLink) {

        contactLink.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                const contact =
                    $("contact");

                if (contact) {

                    contact.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    }


    /* =====================================================
       MY DOCUMENTS
       ===================================================== */

    if (docsBtn) {

        docsBtn.addEventListener(
            "click",
            () => {

                showToast(
                    "Documents are generated locally. No login is required."
                );

            }
        );

    }


    /* =====================================================
       LOAD SAVED TEMPLATE
       ===================================================== */

    try {

        const savedTemplate =
            localStorage.getItem(
                "coverPageTemplate"
            );

        if (savedTemplate) {

            selectTemplate(
                savedTemplate
            );

        }

    } catch (error) {

        console.warn(
            "Saved template unavailable."
        );

    }


    /* =====================================================
       INITIAL PREVIEW
       ===================================================== */

    updatePreview();


    /* =====================================================
       MOBILE SAFETY
       ===================================================== */

    /*
       Prevent accidental zoom behaviour from causing
       layout problems when interacting with form controls.
    */

    document.addEventListener(
        "touchstart",
        () => {},
        {
            passive: true
        }
    );

});
