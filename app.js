const $ = (id) => document.getElementById(id);

const ids = [
    'courseLevel',
    'branch',
    'semester',
    'subject',
    'subjectCode',
    'session',
    'studentName',
    'studentId',
    'tuRoll',
    'tuReg',
    'facultyDept',
    'facultyName',
    'designation',
    'faculty2Name',
    'faculty2Dept',
    'faculty2Designation',
    'submissionType',
    'submissionDate'
];

const fields = Object.fromEntries(
    ids.map(id => [id, $(id)])
);

const preview = {
    subject: $('pSubject'),
    code: $('pCode'),

    faculty: $('pFaculty'),
    designation: $('pDesignation'),
    dept: $('pDept'),

    faculty2Block: $('pFaculty2Block'),
    faculty2Name: $('pFaculty2Name'),
    faculty2Designation: $('pFaculty2Designation'),
    faculty2Dept: $('pFaculty2Dept'),

    name: $('pName'),
    id: $('pId'),
    roll: $('pRoll'),
    reg: $('pReg'),
    branch: $('pBranch'),
    sem: $('pSem'),
    session: $('pSession'),
    date: $('pDate'),

    type: $('docType')
};


function val(k, fallback = '—') {
    return fields[k].value.trim() || fallback;
}


function formatDate(v) {

    if (!v) {
        return '—';
    }

    const [y, m, d] = v.split('-');

    return `${d}/${m}/${y}`;
}


function render() {

    preview.subject.textContent =
        val('subject', 'Your Subject');

    preview.code.textContent =
        val('subjectCode', 'COURSE CODE');


    preview.faculty.textContent =
        val('facultyName', 'Faculty Name');

    preview.designation.textContent =
        val('designation', 'Lecturer');

    preview.dept.textContent =
        'Department of ' +
        val('facultyDept', 'CSE');


    const f2 = val('faculty2Name', '');

    if (f2) {

        preview.faculty2Block.hidden = false;

        preview.faculty2Name.textContent = f2;

        preview.faculty2Designation.textContent =
            val('faculty2Designation', 'Lecturer');

        preview.faculty2Dept.textContent =
            'Department of ' +
            val('faculty2Dept', 'CSE');

    } else {

        preview.faculty2Block.hidden = true;
    }


    preview.name.textContent =
        val('studentName', 'Student Name');

    preview.id.textContent =
        'Student ID: ' +
        val('studentId', '—');

    preview.roll.textContent =
        'TU Roll No.: ' +
        val('tuRoll', '—');

    preview.reg.textContent =
        'TU Registration No.: ' +
        val('tuReg', '—');

    preview.branch.textContent =
        'Branch: ' +
        val('branch', '—');

    preview.sem.textContent =
        'Semester: ' +
        val('semester', '—');

    preview.session.textContent =
        val('session', '2026-27');

    preview.date.textContent =
        formatDate(fields.submissionDate.value);

    preview.type.textContent =
        val('submissionType', 'Assignment-I').toUpperCase();


    localStorage.setItem(
        'tcea-cover-v2',
        JSON.stringify(
            Object.fromEntries(
                ids.map(id => [
                    id,
                    fields[id].value
                ])
            )
        )
    );
}


ids.forEach(id => {

    fields[id].addEventListener(
        'input',
        render
    );

    fields[id].addEventListener(
        'change',
        render
    );
});


const aboutLink = $('aboutLink');

if (aboutLink) {

    aboutLink.addEventListener(
        'click',
        e => {

            e.preventDefault();

            const about = $('about');

            about.hidden = false;

            about.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            history.replaceState(
                null,
                '',
                '#about'
            );
        }
    );
}


window.addEventListener(
    'hashchange',
    () => {

        if (location.hash === '#about') {

            const about = $('about');

            about.hidden = false;
        }
    }
);


if (location.hash === '#about') {

    $('about').hidden = false;
}


const a4 = $('a4');


document
    .querySelectorAll('.template')
    .forEach(btn => {

        btn.addEventListener(
            'click',
            () => {

                document
                    .querySelectorAll('.template')
                    .forEach(x => {
                        x.classList.remove('active');
                    });


                btn.classList.add('active');


                a4.classList.remove(
                    'classic',
                    'border',
                    'minimal',
                    'lab'
                );


                a4.classList.add(
                    btn.dataset.template
                );


                localStorage.setItem(
                    'tcea-template',
                    btn.dataset.template
                );
            }
        );
    });


$('templateBtn').onclick = () => {

    document
        .getElementById('templateStrip')
        .scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
};


$('resetBtn').onclick = () => {

    ids.forEach(id => {
        fields[id].value = '';
    });


    fields.session.value = '2026-27';

    fields.courseLevel.value = 'B.Tech';

    fields.semester.value = '1st Semester';

    fields.branch.selectedIndex = 0;

    fields.facultyDept.selectedIndex = 0;

    fields.faculty2Dept.selectedIndex = 0;

    fields.faculty2Designation.value =
        'Lecturer';

    fields.designation.value =
        'Lecturer';

    fields.submissionType.value =
        'Assignment-I';


    render();

    toast('Form reset');
};


$('nextBtn').onclick = () => {

    document
        .querySelector(
            '.step:nth-of-type(1)'
        )
        ?.classList.remove('active');


    document
        .querySelectorAll('.step')[1]
        .classList.add('active');


    document
        .getElementById('templateStrip')
        .scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });


    toast('Choose a template below');
};


$('printBtn').onclick = () => {

    window.print();
};


$('downloadBtn').onclick = async () => {

    if (
        !window.html2canvas ||
        !window.jspdf
    ) {

        toast(
            'PDF libraries are loading. Try again.'
        );

        return;
    }


    const btn = $('downloadBtn');

    btn.disabled = true;

    btn.textContent = 'Generating…';


    try {

        const canvas =
            await html2canvas(
                a4,
                {
                    scale: 2.2,
                    useCORS: true,
                    backgroundColor: '#fff'
                }
            );


        const { jsPDF } =
            window.jspdf;


        const pdf =
            new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });


        pdf.addImage(
            canvas.toDataURL(
                'image/jpeg',
                0.96
            ),
            'JPEG',
            0,
            0,
            210,
            297
        );


        pdf.save(
            'TCEA_Assignment_Cover_Page.pdf'
        );


        toast('PDF downloaded');

    } finally {

        btn.disabled = false;

        btn.textContent =
            '⇩ Download PDF';
    }
};


$('docsBtn').onclick = () => {

    const data =
        localStorage.getItem(
            'tcea-cover-v2'
        );


    toast(
        data
            ? 'Your latest draft is saved in this browser.'
            : 'No saved document yet.'
    );
};


function toast(t) {

    const el = $('toast');

    el.textContent = t;

    el.classList.add('show');


    setTimeout(
        () => {
            el.classList.remove('show');
        },
        2200
    );
}


try {

    const saved =
        JSON.parse(
            localStorage.getItem(
                'tcea-cover-v2'
            ) || '{}'
        );


    ids.forEach(id => {

        if (
            saved[id] !== undefined
        ) {

            fields[id].value =
                saved[id];
        }
    });


    const tpl =
        localStorage.getItem(
            'tcea-template'
        ) || 'classic';


    const safeTpl =
        [
            'classic',
            'border',
            'minimal',
            'lab'
        ].includes(tpl)
            ? tpl
            : 'classic';


    const b =
        document.querySelector(
            `[data-template="${safeTpl}"]`
        );


    if (b) {
        b.click();
    }

} catch (e) {}


render();