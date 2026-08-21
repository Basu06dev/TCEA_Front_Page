/* =========================================================
   TCEA STUDENT COVER PAGE MAKER
   ========================================================= */


/* =========================================================
   HELPER
========================================================= */

function $(id) {

    return document.getElementById(id);

}


/* =========================================================
   FORM ELEMENTS
========================================================= */

const fields = {

    courseLevel: $("courseLevel"),

    branch: $("branch"),

    semester: $("semester"),

    subject: $("subject"),

    subjectCode: $("subjectCode"),

    session: $("session"),

    studentName: $("studentName"),

    studentId: $("studentId"),

    tuRoll: $("tuRoll"),

    tuReg: $("tuReg"),

    facultyName: $("facultyName"),

    designation: $("designation"),

    facultyDept: $("facultyDept"),

    faculty2Name: $("faculty2Name"),

    faculty2Designation: $("faculty2Designation"),

    faculty2Dept: $("faculty2Dept"),

    submissionType: $("submissionType"),

    submissionDate: $("submissionDate")

};


/* =========================================================
   PREVIEW ELEMENTS
========================================================= */

const preview = {

    a4: $("a4"),

    subject: $("pSubject"),

    code: $("pCode"),

    faculty: $("pFaculty"),

    designation: $("pDesignation"),

    department: $("pDept"),

    faculty2Block: $("pFaculty2Block"),

    faculty2Name: $("pFaculty2Name"),

    faculty2Designation:
        $("pFaculty2Designation"),

    faculty2Dept:
        $("pFaculty2Dept"),

    studentName:
        $("pName"),

    studentId:
        $("pId"),

    roll:
        $("pRoll"),

    registration:
        $("pReg"),

    branch:
        $("pBranch"),

    semester:
        $("pSem"),

    session:
        $("pSession"),

    sessionBottom:
        $("pSessionBottom"),

    date:
        $("pDate"),

    documentType:
        $("docType"),

    recordHeading:
        $("pRecordHeading"),

    recordCenterLogo:
        $("recordCenterLogo")

};


/* =========================================================
   CURRENT TEMPLATE
========================================================= */

let currentTemplate = "classic";


/* =========================================================
   SAFE TEXT
========================================================= */

function valueOrDash(value) {

    if (
        value === undefined ||
        value === null ||
        value.trim() === ""
    ) {

        return "—";

    }

    return value.trim();

}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(dateValue) {

    if (!dateValue) {

        return "—";

    }

    const date = new Date(
        dateValue + "T00:00:00"
    );

    if (Number.isNaN(date.getTime())) {

        return "—";

    }

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );

}


/* =========================================================
   UPDATE PREVIEW
========================================================= */

function updatePreview() {


    /* COURSE */

    preview.subject.textContent =
        valueOrDash(fields.subject.value);


    preview.code.textContent =
        valueOrDash(fields.subjectCode.value);


    /* FACULTY */

    preview.faculty.textContent =
        valueOrDash(fields.facultyName.value);


    preview.designation.textContent =
        valueOrDash(fields.designation.value);


    preview.department.textContent =
        valueOrDash(fields.facultyDept.value);


    /* SECOND FACULTY */

    const faculty2 =
        fields.faculty2Name.value.trim();


    if (faculty2 !== "") {

        preview.faculty2Block.hidden = false;

        preview.faculty2Name.textContent =
            faculty2;

        preview.faculty2Designation.textContent =
            valueOrDash(
                fields.faculty2Designation.value
            );

        preview.faculty2Dept.textContent =
            valueOrDash(
                fields.faculty2Dept.value
            );

    } else {

        preview.faculty2Block.hidden = true;

    }


    /* STUDENT */

    preview.studentName.textContent =
        valueOrDash(
            fields.studentName.value
        );


    preview.studentId.textContent =
        "Student ID: " +
        valueOrDash(
            fields.studentId.value
        );


    preview.roll.textContent =
        "TU Roll No.: " +
        valueOrDash(
            fields.tuRoll.value
        );


    preview.registration.textContent =
        "TU Registration No.: " +
        valueOrDash(
            fields.tuReg.value
        );


    /* PROGRAM */

    const level =
        valueOrDash(
            fields.courseLevel.value
        );


    const branch =
        valueOrDash(
            fields.branch.value
        );


    preview.branch.textContent =
        "Program Level & Department: " +
        level +
        " (" +
        branch +
        ")";


    /* SEMESTER */

    preview.semester.textContent =
        "Semester: " +
        valueOrDash(
            fields.semester.value
        );


    /* SESSION */

    preview.session.textContent =
        valueOrDash(
            fields.session.value
        );


    preview.sessionBottom.textContent =
        valueOrDash(
            fields.session.value
        );


    /* DATE */

    preview.date.textContent =
        formatDate(
            fields.submissionDate.value
        );


    /* DOCUMENT TYPE */

    const submission =
        fields.submissionType.value;


    if (
        submission ===
        "Laboratory Record Book"
    ) {

        preview.documentType.textContent =
            "LABORATORY RECORD BOOK";

    } else if (
        submission === "Lab Copy"
    ) {

        preview.documentType.textContent =
            "LABORATORY RECORD";

    } else if (
        submission === "Practical Report"
    ) {

        preview.documentType.textContent =
            "PRACTICAL REPORT";

    } else {

        preview.documentType.textContent =
            submission.toUpperCase();

    }


    updateTemplateContent();

    saveDraft();

}


/* =========================================================
   TEMPLATE CONTENT
========================================================= */

function updateTemplateContent() {


    if (currentTemplate === "record") {

        preview.recordHeading.textContent =
            "Laboratory Record Book";

    } else {

        preview.recordHeading.textContent =
            "";

    }


    /*
       Automatically switch to laboratory
       record style if user selects it.
    */

    if (
        fields.submissionType.value ===
        "Laboratory Record Book"
    ) {

        if (currentTemplate === "classic") {

            setTemplate("record", false);

        }

    }

}


/* =========================================================
   TEMPLATE SWITCH
========================================================= */

function setTemplate(
    templateName,
    save = true
) {


    currentTemplate =
        templateName;


    preview.a4.classList.remove(

        "classic",

        "border",

        "minimal",

        "lab",

        "record"

    );


    preview.a4.classList.add(
        templateName
    );


    document
        .querySelectorAll(".template")
        .forEach(button => {

            button.classList.toggle(

                "active",

                button.dataset.template ===
                templateName

            );

        });


    if (save) {

        localStorage.setItem(
            "tcea-template",
            templateName
        );

    }


    resizeA4();

}


/* =========================================================
   TEMPLATE BUTTONS
========================================================= */

document
    .querySelectorAll(".template")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                setTemplate(
                    button.dataset.template
                );

            }
        );

    });


/* =========================================================
   LIVE FORM UPDATE
========================================================= */

Object.values(fields)
    .forEach(field => {

        field.addEventListener(
            "input",
            updatePreview
        );

        field.addEventListener(
            "change",
            updatePreview
        );

    });


/* =========================================================
   MOBILE A4 SCALING
========================================================= */

function resizeA4() {


    const viewer =
        document.querySelector(
            ".a4-viewer"
        );


    const scaleBox =
        document.querySelector(
            ".a4-scale-box"
        );


    if (!viewer || !scaleBox) {

        return;

    }


    const availableWidth =
        viewer.clientWidth -
        12;


    const baseWidth = 794;


    let scale =
        availableWidth / baseWidth;


    /*
       Desktop should not become too large.
    */

    if (window.innerWidth > 1000) {

        scale =
            Math.min(scale, 1);

    }


    /*
       Prevent extremely tiny preview.
    */

    scale =
        Math.max(scale, 0.30);


    preview.a4.style.setProperty(
        "--a4-scale",
        scale
    );


    scaleBox.style.height =
        `${1123 * scale}px`;

}


/* =========================================================
   RESIZE LISTENER
========================================================= */

window.addEventListener(
    "resize",
    resizeA4
);


/* =========================================================
   RESET
========================================================= */

$("resetBtn")
    .addEventListener(
        "click",
        () => {

            if (
                !confirm(
                    "Reset all information?"
                )
            ) {

                return;

            }


            Object.values(fields)
                .forEach(field => {

                    if (
                        field.tagName ===
                        "SELECT"
                    ) {

                        field.selectedIndex = 0;

                    } else {

                        field.value = "";

                    }

                });


            localStorage.removeItem(
                "tcea-draft"
            );


            setTemplate(
                "classic"
            );


            updatePreview();


            showToast(
                "Form has been reset."
            );

        }
    );


/* =========================================================
   NEXT BUTTON
========================================================= */

$("nextBtn")
    .addEventListener(
        "click",
        () => {

            document
                .querySelector(
                    ".template-strip"
                )
                .scrollIntoView({

                    behavior: "smooth",

                    block: "center"

                });


            showToast(
                "Choose your preferred template."
            );

        }
    );


/* =========================================================
   TEMPLATE BUTTON
========================================================= */

$("templateBtn")
    .addEventListener(
        "click",
        () => {

            document
                .querySelector(
                    ".template-strip"
                )
                .scrollIntoView({

                    behavior: "smooth",

                    block: "center"

                });

        }
    );


/* =========================================================
   PRINT
========================================================= */

$("printBtn")
    .addEventListener(
        "click",
        () => {

            window.print();

        }
    );


/* =========================================================
   DOWNLOAD PDF
========================================================= */

$("downloadBtn")
    .addEventListener(
        "click",
        async () => {


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


            showToast(
                "Generating PDF..."
            );


            try {


                const element =
                    preview.a4;


                /*
                   Temporarily remove
                   preview scaling.
                */

                const oldTransform =
                    element.style.transform;


                element.style.transform =
                    "none";


                const canvas =
                    await html2canvas(
                        element,
                        {

                            scale: 2,

                            useCORS: true,

                            backgroundColor:
                                "#ffffff",

                            width: 794,

                            height: 1123

                        }
                    );


                element.style.transform =
                    oldTransform;


                const imgData =
                    canvas.toDataURL(
                        "image/jpeg",
                        0.95
                    );


                const {
                    jsPDF
                } = window.jspdf;


                const pdf =
                    new jsPDF(
                        {

                            orientation:
                                "portrait",

                            unit: "mm",

                            format: "a4"

                        }
                    );


                pdf.addImage(

                    imgData,

                    "JPEG",

                    0,

                    0,

                    210,

                    297,

                    undefined,

                    "FAST"

                );


                const name =
                    fields.studentName.value
                        .trim()
                        .replace(
                            /[^a-z0-9]+/gi,
                            "_"
                        ) ||
                    "Student";


                const subject =
                    fields.subject.value
                        .trim()
                        .replace(
                            /[^a-z0-9]+/gi,
                            "_"
                        ) ||
                    "Cover_Page";


                pdf.save(
                    `TCEA_${subject}_${name}.pdf`
                );


                showToast(
                    "PDF downloaded successfully."
                );


            } catch (error) {

                console.error(error);

                showToast(
                    "Could not generate PDF."
                );

            }

            resizeA4();

        }
    );


/* =========================================================
   ABOUT
========================================================= */

$("aboutLink")
    .addEventListener(
        "click",
        event => {

            event.preventDefault();


            const about =
                $("about");


            about.hidden =
                !about.hidden;


            if (!about.hidden) {

                about.scrollIntoView({

                    behavior: "smooth"

                });

            }

        }
    );


/* =========================================================
   MY DOCUMENTS
========================================================= */

$("docsBtn")
    .addEventListener(
        "click",
        () => {

            const draft =
                localStorage.getItem(
                    "tcea-draft"
                );


            if (draft) {

                showToast(
                    "Your latest form data is saved in this browser."
                );

            } else {

                showToast(
                    "No saved document found."
                );

            }

        }
    );


/* =========================================================
   SAVE DRAFT
========================================================= */

function saveDraft() {


    const data = {};


    Object.keys(fields)
        .forEach(key => {

            data[key] =
                fields[key].value;

        });


    localStorage.setItem(
        "tcea-draft",
        JSON.stringify(data)
    );

}


/* =========================================================
   LOAD DRAFT
========================================================= */

function loadDraft() {


    const saved =
        localStorage.getItem(
            "tcea-draft"
        );


    if (!saved) {

        return;

    }


    try {

        const data =
            JSON.parse(saved);


        Object.keys(fields)
            .forEach(key => {

                if (
                    data[key] !== undefined
                ) {

                    fields[key].value =
                        data[key];

                }

            });


    } catch (error) {

        console.error(
            "Could not load draft.",
            error
        );

    }

}


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function showToast(message) {


    const toast =
        $("toast");


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =========================================================
   LOAD SAVED TEMPLATE
========================================================= */

function loadTemplate() {


    const saved =
        localStorage.getItem(
            "tcea-template"
        );


    if (
        saved &&
        [
            "classic",
            "border",
            "minimal",
            "lab",
            "record"
        ].includes(saved)
    ) {

        setTemplate(
            saved,
            false
        );

    } else {

        setTemplate(
            "classic",
            false
        );

    }

}


/* =========================================================
   SUBMISSION TYPE AUTOMATIC TEMPLATE
========================================================= */

fields.submissionType
    .addEventListener(
        "change",
        () => {

            if (
                fields.submissionType.value ===
                "Laboratory Record Book"
            ) {

                setTemplate(
                    "record"
                );

                showToast(
                    "Laboratory Record Book template selected."
                );

            }

            updatePreview();

        }
    );


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadDraft();

        loadTemplate();

        updatePreview();

        resizeA4();

    }
);


/*
   Also execute immediately because
   this script is loaded at the bottom
   of the HTML document.
*/

loadDraft();

loadTemplate();

updatePreview();

resizeA4();
