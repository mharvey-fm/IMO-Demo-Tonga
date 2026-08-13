(function () {
    var STORAGE = (window.COURSE && window.COURSE.quiz.storageKey) || 'tonga-course-quiz-v1';

    var QUESTIONS = [
        {
            id: 'q1',
            title: 'What are some of the main reasons for ships wanting to in-water clean?',
            type: 'text',
            placeholder: 'List the reasons your table agrees on…'
        },
        {
            id: 'q2',
            title: 'What are the two main categories of in-water cleaning?',
            type: 'list',
            count: 2
        },
        {
            id: 'q3',
            title: 'What are the three main aims of the In-Water Cleaning Guidance?',
            type: 'list',
            count: 3
        },
        {
            id: 'q4',
            title: 'What are the three main types of ship hull coatings?',
            type: 'list',
            count: 3
        },
        {
            id: 'q5',
            title: 'What fouling rating (0–4) do the 2023 Biofouling Guidelines suggest ship hulls and internal seawater systems should maintain?',
            type: 'rating',
            hint: 'Tap one — the original worksheet asked you to circle it.',
            helpers: [
                { href: 'viewer.html?id=activity-6&track=cleaning', label: 'Activity 6 rating slide' }
            ],
            options: [
                { value: '0', label: 'None' },
                { value: '1', label: 'Micro' },
                { value: '2', label: 'Light' },
                { value: '3', label: 'Medium' },
                { value: '4', label: 'Heavy' }
            ]
        },
        {
            id: 'q6',
            title: 'Why do the 2023 Biofouling Guidelines suggest ship hulls and internal seawater systems maintain that fouling rating?',
            type: 'text',
            placeholder: 'Your table’s reasoning…'
        },
        {
            id: 'q7',
            title: 'What are other benefits of proactively cleaning ship hulls?',
            type: 'text',
            placeholder: 'Beyond the rating itself…'
        },
        {
            id: 'q8',
            title: 'What is the difference between uniform and niche areas on ship hulls?',
            type: 'text',
            placeholder: 'How do they differ in flow, fouling and cleaning?'
        },
        {
            id: 'q9',
            title: 'If a ship operates exclusively within the “same waters”, would you allow the submerged hull to be cleaned without collecting the defouled material?',
            type: 'yesno-text',
            placeholder: 'State why or why not. Use the ports-of-call register and the example cleaning policy if you need them.',
            helpers: [
                { href: 'viewer.html?id=ports-of-call&track=cleaning', label: 'Ports of call register' },
                { href: 'viewer.html?id=cleaning-policy&track=cleaning', label: 'Cleaning policy example' }
            ]
        }
    ];

    var NOTES = [
        {
            q: 'Q1 — Reasons to in-water clean',
            points: [
                'Restore hull and propeller efficiency (less drag, less fuel, lower GHG).',
                'Meet biosecurity / port-entry conditions before arrival.',
                'Protect coating performance and avoid or defer dry-dock.',
                'Reduce the risk of transferring invasive aquatic species.'
            ]
        },
        {
            q: 'Q2 — Two categories',
            points: [
                'Proactive cleaning (usually microfouling / slime, often scheduled).',
                'Reactive cleaning (macrofouling already present; generally higher biosecurity and capture expectations).'
            ]
        },
        {
            q: 'Q3 — Three aims of the guidance',
            points: [
                'Minimise transfer of invasive aquatic species.',
                'Minimise release of harmful substances (biocides, coating particles / microplastics).',
                'Give industry and administrations a practical, consistent way to clean without damaging the coating or the receiving environment.'
            ]
        },
        {
            q: 'Q4 — Three coating types',
            points: [
                'Biocidal antifouling coatings (e.g. self-polishing copolymers).',
                'Foul-release coatings (typically silicone).',
                'Biocide-free hard / inert coatings.'
            ]
        },
        {
            q: 'Q5 — Fouling rating',
            points: [
                'The 2023 Guidelines (MEPC.378(80)) point to fouling rating 1 — microfouling only — as the level to maintain on hulls and internal seawater systems (rating 0 is cleaner still). Macrofouling (2–4) is what the guidance is trying to avoid.'
            ]
        },
        {
            q: 'Q6 — Why that rating',
            points: [
                'Microfouling is a slime layer; it is much less likely to carry adult invasive species than macrofouling.',
                'Keeping to FR 1 (or 0) is the practical biosecurity target, and it also keeps drag and coating stress down.'
            ]
        },
        {
            q: 'Q7 — Other benefits of proactive cleaning',
            points: [
                'Fuel and emissions savings, speed maintenance, longer coating life, easier inspections, and fewer last-minute reactive cleans before a sensitive port.'
            ]
        },
        {
            q: 'Q8 — Uniform vs niche areas',
            points: [
                'Uniform (general) hull: large plating with relatively even flow — the area a crawler or systematic survey covers well.',
                'Niche areas: complex, sheltered, low-flow features (sea chests, gratings, thrusters, rudder, propeller, intakes, dry-docking support strips, anodes). They foul faster and need a flying ROV or diver, not just a hull crawler.'
            ]
        },
        {
            q: 'Q9 — Same waters, no capture?',
            points: [
                'If the ship has truly only operated in those waters, the fouling is likely of local origin, so translocation risk is lower — some administrations then allow cleaning without capture.',
                'You still need evidence (ports-of-call register). The example policy in this pack is written for interstate or overseas arrivals — a different risk case.',
                'Caveats: a recent docking elsewhere, niche areas, or uncertainty in the voyage history usually push you back toward capture or a “no clean” decision.'
            ]
        }
    ];

    var root = document.getElementById('quiz-root');
    var state = load();

    function blank() {
        return { group: '', step: 'start', answers: {}, yesno: {} };
    }

    function load() {
        try {
            var raw = localStorage.getItem(STORAGE);
            if (!raw) return blank();
            var parsed = JSON.parse(raw);
            return {
                group: parsed.group || '',
                step: parsed.step || 'start',
                answers: parsed.answers || {},
                yesno: parsed.yesno || {}
            };
        } catch (e) {
            return blank();
        }
    }

    function save() {
        try { localStorage.setItem(STORAGE, JSON.stringify(state)); } catch (e) { /* private mode */ }
    }

    function esc(s) {
        return String(s || '').replace(/[&<>"]/g, function (c) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c];
        });
    }

    function qIndex() {
        if (typeof state.step === 'number') return state.step;
        return 0;
    }

    function render() {
        if (state.step === 'start') return renderStart();
        if (state.step === 'review') return renderReview();
        renderQuestion(qIndex());
    }

    function renderStart() {
        root.innerHTML =
            '<div class="quiz-card">' +
                '<div class="q-kicker">Group exercise</div>' +
                '<h2>Split into tables of 5–6</h2>' +
                '<p class="lede">Discuss each question, then type the answer your table agrees on. When you have finished, pick a spokesperson — we will go through them together. You can use one phone for the table or each person can follow along.</p>' +
                '<div class="quiz-start-meta">' +
                    '<span class="chip">9 questions</span>' +
                    '<span class="chip">Saved on this device</span>' +
                    '<span class="chip"><a href="index.html?track=cleaning" style="color:inherit;text-decoration:none;">Cleaning course library</a></span>' +
                '</div>' +
                '<label class="q-label" for="group-name">Table or group name <span style="font-weight:500;color:var(--muted)">(optional)</span></label>' +
                '<input class="q-input" id="group-name" type="text" maxlength="80" placeholder="e.g. Table 3 — Marine &amp; Ports" value="' + esc(state.group) + '">' +
                '<div class="quiz-nav">' +
                    '<a class="v-btn" href="index.html?track=cleaning">← Materials</a>' +
                    '<button type="button" class="v-btn primary" id="begin">Begin →</button>' +
                '</div>' +
            '</div>';
        document.getElementById('begin').addEventListener('click', function () {
            state.group = document.getElementById('group-name').value.trim();
            state.step = 0;
            save();
            render();
        });
    }

    function progressHtml(i, total) {
        var pct = Math.round(((i + 1) / total) * 100);
        return '<div class="quiz-progress">' +
            '<div class="quiz-bar" aria-hidden="true"><span style="width:' + pct + '%"></span></div>' +
            '<div class="quiz-step-label">Question ' + (i + 1) + ' of ' + total + '</div>' +
            '</div>';
    }

    function renderQuestion(i) {
        var q = QUESTIONS[i];
        var body = '';
        if (q.type === 'text') {
            body =
                '<label class="q-label" for="ans">Your answer</label>' +
                '<textarea class="q-area" id="ans" placeholder="' + esc(q.placeholder) + '">' + esc(state.answers[q.id] || '') + '</textarea>';
        } else if (q.type === 'list') {
            var rows = '';
            for (var n = 1; n <= q.count; n++) {
                var key = q.id + '_' + n;
                rows += '<div class="q-list-row"><span class="q-num">' + n + '.</span>' +
                    '<input class="q-input" data-list="' + n + '" type="text" value="' + esc(state.answers[key] || '') + '"></div>';
            }
            body = '<div class="q-list">' + rows + '</div>';
        } else if (q.type === 'rating') {
            var opts = q.options.map(function (o) {
                var on = state.answers[q.id] === o.value ? ' is-on' : '';
                return '<button type="button" class="fr-opt' + on + '" data-fr="' + o.value + '" aria-pressed="' + (on ? 'true' : 'false') + '">' +
                    '<span class="fr-n">' + o.value + '</span><span class="fr-l">' + o.label + '</span></button>';
            }).join('');
            body = '<p class="lede" style="margin-bottom:12px">' + esc(q.hint) + '</p><div class="fr-scale" role="group" aria-label="Fouling rating">' + opts + '</div>';
        } else if (q.type === 'yesno-text') {
            var y = state.yesno[q.id] === 'yes' ? ' is-on' : '';
            var nOn = state.yesno[q.id] === 'no' ? ' is-on' : '';
            body =
                '<div class="yn-row">' +
                    '<button type="button" class="yn-btn' + y + '" data-yn="yes">Yes — allow it</button>' +
                    '<button type="button" class="yn-btn' + nOn + '" data-yn="no">No — do not allow it</button>' +
                '</div>' +
                '<label class="q-label" for="ans">Why or why not?</label>' +
                '<textarea class="q-area" id="ans" placeholder="' + esc(q.placeholder) + '">' + esc(state.answers[q.id] || '') + '</textarea>';
        }

        var helpers = '';
        if (q.helpers && q.helpers.length) {
            helpers = '<p class="lede" style="margin:14px 0 0">Need the source material? ' +
                q.helpers.map(function (h) {
                    return '<a href="' + h.href + '" style="color:var(--teal);font-weight:700">' + esc(h.label) + '</a>';
                }).join(' · ') + '</p>';
        }

        root.innerHTML =
            progressHtml(i, QUESTIONS.length) +
            '<div class="quiz-card">' +
                '<div class="q-kicker">Question ' + (i + 1) + '</div>' +
                '<h2>' + esc(q.title) + '</h2>' +
                body +
                helpers +
                '<div class="quiz-nav">' +
                    '<button type="button" class="v-btn" id="back">' + (i === 0 ? '← Intro' : '← Back') + '</button>' +
                    '<button type="button" class="v-btn primary" id="next">' + (i === QUESTIONS.length - 1 ? 'Review answers →' : 'Next →') + '</button>' +
                '</div>' +
            '</div>';

        bindFields(q);
        liveSave(q);

        document.getElementById('back').addEventListener('click', function () {
            harvest(q);
            state.step = i === 0 ? 'start' : i - 1;
            save();
            render();
        });
        document.getElementById('next').addEventListener('click', function () {
            harvest(q);
            state.step = i === QUESTIONS.length - 1 ? 'review' : i + 1;
            save();
            render();
        });
    }

    function liveSave(q) {
        root.querySelectorAll('#ans, [data-list]').forEach(function (el) {
            el.addEventListener('input', function () { harvest(q); });
        });
    }

    function bindFields(q) {
        if (q.type === 'rating') {
            root.querySelectorAll('.fr-opt').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    state.answers[q.id] = btn.dataset.fr;
                    save();
                    root.querySelectorAll('.fr-opt').forEach(function (b) {
                        var on = b === btn;
                        b.classList.toggle('is-on', on);
                        b.setAttribute('aria-pressed', on ? 'true' : 'false');
                    });
                });
            });
        }
        if (q.type === 'yesno-text') {
            root.querySelectorAll('.yn-btn').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    state.yesno[q.id] = btn.dataset.yn;
                    save();
                    root.querySelectorAll('.yn-btn').forEach(function (b) {
                        b.classList.toggle('is-on', b === btn);
                    });
                });
            });
        }
    }

    function harvest(q) {
        if (q.type === 'text' || q.type === 'yesno-text') {
            var area = document.getElementById('ans');
            if (area) state.answers[q.id] = area.value;
        }
        if (q.type === 'list') {
            root.querySelectorAll('[data-list]').forEach(function (input) {
                state.answers[q.id + '_' + input.dataset.list] = input.value;
            });
        }
        save();
    }

    function formatAnswer(q) {
        if (q.type === 'list') {
            var lines = [];
            for (var n = 1; n <= q.count; n++) {
                var v = (state.answers[q.id + '_' + n] || '').trim();
                lines.push(n + '. ' + (v || '—'));
            }
            return { text: lines.join('\n'), empty: lines.every(function (l) { return /—$/.test(l); }) };
        }
        if (q.type === 'rating') {
            var v = state.answers[q.id];
            return { text: v ? ('Fouling rating ' + v) : '', empty: !v };
        }
        if (q.type === 'yesno-text') {
            var yn = state.yesno[q.id];
            var why = (state.answers[q.id] || '').trim();
            var head = yn === 'yes' ? 'Yes — allow cleaning without collecting material.' :
                yn === 'no' ? 'No — do not allow it without collecting material.' : '';
            var text = [head, why].filter(Boolean).join('\n\n');
            return { text: text, empty: !text };
        }
        var t = (state.answers[q.id] || '').trim();
        return { text: t, empty: !t };
    }

    function renderReview() {
        var items = QUESTIONS.map(function (q, i) {
            var a = formatAnswer(q);
            return '<div class="review-item">' +
                '<h3>Q' + (i + 1) + '. ' + esc(q.title) + '</h3>' +
                '<div class="ans' + (a.empty ? ' empty' : '') + '">' + (a.empty ? 'Not answered yet' : esc(a.text)) + '</div>' +
                '<p style="margin:8px 0 0"><button type="button" class="v-btn" data-edit="' + i + '">Edit</button></p>' +
                '</div>';
        }).join('');

        var notes = NOTES.map(function (n) {
            return '<h3>' + esc(n.q) + '</h3><ul>' +
                n.points.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') +
                '</ul>';
        }).join('');

        var group = state.group ? '<p class="lede">Spokesperson pack for <strong>' + esc(state.group) + '</strong>.</p>' : '';

        root.innerHTML =
            '<div class="quiz-card">' +
                '<div class="q-kicker">Ready for discussion</div>' +
                '<h2>Your table’s answers</h2>' +
                group +
                '<p class="lede">Hand this screen to your spokesperson. Download a PDF for your records, then use the discussion notes if you want talking points — they are not a marked score sheet.</p>' +
                '<div class="quiz-nav" style="margin-top:0;margin-bottom:8px">' +
                    '<button type="button" class="v-btn primary quiz-download" id="download-pdf">Download answers as PDF</button>' +
                    '<p class="quiz-download-hint">The PDF saves to your Downloads folder.</p>' +
                '</div>' +
                items +
                '<details class="notes">' +
                    '<summary>Show discussion notes</summary>' +
                    notes +
                '</details>' +
                '<div class="quiz-nav">' +
                    '<button type="button" class="v-btn" id="back-q">← Last question</button>' +
                    '<button type="button" class="v-btn" id="reset">Clear answers</button>' +
                    '<button type="button" class="v-btn primary quiz-download" id="download-pdf-bottom">Download answers as PDF</button>' +
                '</div>' +
            '</div>';

        root.querySelectorAll('[data-edit]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                state.step = Number(btn.dataset.edit);
                save();
                render();
            });
        });
        document.getElementById('back-q').addEventListener('click', function () {
            state.step = QUESTIONS.length - 1;
            save();
            render();
        });
        document.getElementById('reset').addEventListener('click', function () {
            if (!confirm('Clear this device’s quiz answers?')) return;
            state = blank();
            save();
            render();
        });
        document.getElementById('download-pdf').addEventListener('click', downloadAnswersPdf);
        document.getElementById('download-pdf-bottom').addEventListener('click', downloadAnswersPdf);
    }

    function pdfSafe(s) {
        return String(s || '')
            .replace(/[\u2018\u2019\u02BB\u02BC]/g, "'")
            .replace(/[\u201C\u201D]/g, '"')
            .replace(/[\u2013\u2014]/g, '-')
            .replace(/\u2026/g, '...')
            .replace(/\u00A0/g, ' ');
    }

    function answersFilename() {
        var stub = (state.group || 'group')
            .replace(/[^a-zA-Z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .slice(0, 40);
        return 'Activity-1-answers-' + (stub || 'group') + '.pdf';
    }

    function loadJsPdf() {
        return new Promise(function (resolve, reject) {
            if (window.jspdf && window.jspdf.jsPDF) return resolve(window.jspdf.jsPDF);
            var existing = document.querySelector('script[data-jspdf]');
            if (existing) {
                existing.addEventListener('load', function () { resolve(window.jspdf.jsPDF); });
                existing.addEventListener('error', reject);
                return;
            }
            var s = document.createElement('script');
            s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            s.setAttribute('data-jspdf', 'true');
            s.onload = function () { resolve(window.jspdf.jsPDF); };
            s.onerror = reject;
            document.head.appendChild(s);
        });
    }

    function offerPdfFile(blob, filename) {
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.rel = 'noopener';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
        return Promise.resolve();
    }

    function printAnswersFallback() {
        var win = window.open('', '_blank');
        if (!win) {
            alert('Allow pop-ups, or try the Download button again.');
            return;
        }
        var blocks = QUESTIONS.map(function (q, i) {
            var a = formatAnswer(q);
            return '<section><h2>Q' + (i + 1) + '. ' + esc(q.title) + '</h2><p>' +
                (a.empty ? '<em>Not answered</em>' : esc(a.text).replace(/\n/g, '<br>')) +
                '</p></section>';
        }).join('');
        win.document.write(
            '<!DOCTYPE html><html><head><meta charset="utf-8"><title>' + esc(answersFilename()) + '</title>' +
            '<style>@page{size:A4;margin:16mm}body{font-family:Calibri,Arial,sans-serif;color:#14202b;line-height:1.45}' +
            'header{background:#0b2e4f;color:#fff;padding:16px 18px;margin:-16mm -16mm 16px}' +
            'header strong{display:block;font-size:1.05rem}header span{color:#f2a900;font-size:.85rem}' +
            'h1{font-size:1.35rem;color:#0b2e4f}h2{font-size:1rem;margin:18px 0 6px;color:#0b2e4f}' +
            'p{white-space:pre-wrap;background:#f5f8fb;padding:10px 12px;border-radius:8px}' +
            '.meta{color:#5a6b78;font-size:.9rem}</style></head><body>' +
            '<header><strong>Tonga National Technology Demonstration &amp; Training Workshop</strong>' +
            '<span>Activity 1 · Module 2 — Understanding fundamentals</span></header>' +
            '<h1>Group answers</h1>' +
            '<p class="meta" style="background:none;padding:0">' +
            (state.group ? 'Group: <strong>' + esc(state.group) + '</strong><br>' : '') +
            'Faua Wharf, Nukuʻalofa · 18–21 August 2026</p>' +
            blocks +
            '</body></html>'
        );
        win.document.close();
        win.focus();
        setTimeout(function () { win.print(); }, 250);
    }

    function downloadAnswersPdf() {
        var buttons = [document.getElementById('download-pdf'), document.getElementById('download-pdf-bottom')];
        buttons.forEach(function (b) {
            if (!b) return;
            b.disabled = true;
            b.textContent = 'Preparing PDF…';
        });

        function restore() {
            buttons.forEach(function (b) {
                if (!b) return;
                b.disabled = false;
                b.textContent = 'Download answers as PDF';
            });
        }

        loadJsPdf().then(function (JsPDF) {
            var doc = new JsPDF({ unit: 'mm', format: 'a4' });
            var left = 18;
            var width = 174;
            var y = 38;
            var pageH = 297;
            var bottom = 24;

            function ensure(h) {
                if (y + h > pageH - bottom) {
                    doc.addPage();
                    y = 20;
                }
            }

            function writeLines(lines, lineH) {
                lines.forEach(function (line) {
                    ensure(lineH);
                    doc.text(line, left, y);
                    y += lineH;
                });
            }

            doc.setFillColor(11, 46, 79);
            doc.rect(0, 0, 210, 28, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.text('Tonga National Technology Demonstration & Training Workshop', left, 12);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(242, 169, 0);
            doc.text('Activity 1  |  Module 2 - Understanding fundamentals', left, 20);

            doc.setTextColor(11, 46, 79);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(16);
            doc.text("Let's test your knowledge - group answers", left, y);
            y += 8;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.setTextColor(90, 107, 120);
            var meta = [];
            if (state.group) meta.push('Group: ' + pdfSafe(state.group));
            meta.push('Exported ' + new Date().toLocaleString('en-GB', {
                day: 'numeric', month: 'long', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
            }));
            meta.push("Faua Wharf, Nuku'alofa  ·  18-21 August 2026");
            writeLines(meta, 5);
            y += 4;

            QUESTIONS.forEach(function (q, i) {
                var a = formatAnswer(q);
                var qLines = doc.splitTextToSize('Q' + (i + 1) + '. ' + pdfSafe(q.title), width);
                var aLines = doc.splitTextToSize(a.empty ? 'Not answered' : pdfSafe(a.text), width);
                ensure(qLines.length * 5.2 + 8);
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(11);
                doc.setTextColor(11, 46, 79);
                writeLines(qLines, 5.2);
                y += 1.5;
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(10);
                doc.setTextColor(a.empty ? 154 : 51, a.empty ? 168 : 68, a.empty ? 179 : 79);
                writeLines(aLines, 5);
                y += 6;
            });

            var pages = doc.getNumberOfPages();
            for (var p = 1; p <= pages; p++) {
                doc.setPage(p);
                doc.setDrawColor(228, 235, 241);
                doc.line(left, 285, 192, 285);
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(8);
                doc.setTextColor(122, 139, 153);
                doc.text('IMO-Norad TEST Biofouling Project  ·  MTCC Pacific course', left, 290);
                doc.text('Page ' + p + ' of ' + pages, 192, 290, { align: 'right' });
            }

            var filename = answersFilename();
            var blob = doc.output('blob');
            return offerPdfFile(blob, filename);
        }).catch(function () {
            printAnswersFallback();
        }).then(restore, restore);
    }

    render();
})();
