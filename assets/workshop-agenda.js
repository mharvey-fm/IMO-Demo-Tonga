/**
 * Workshop programme from the 17 August 2026 draft.
 * Day 2 date corrected to 19 August (draft still said 24 June).
 * Group exercise location corrected to Tonga (draft still said Sri Lanka).
 */
(function (global) {
    var META = {
        kicker: 'Draft programme · 17 August 2026',
        project: 'IMO–Norad TEST Biofouling Project',
        title: 'Tonga National Technology Demonstration & Training Workshop',
        dates: '18–21 August 2026',
        city: 'Nukuʻalofa',
        venue: 'Main venue TBC',
        demoSite: 'Faua Wharf',
        language: 'English'
    };

    var DAYS = [
        {
            id: 'day-1',
            date: '2026-08-18',
            label: 'Day 1',
            weekday: 'Tuesday',
            dayNum: '18',
            month: 'August',
            theme: 'Opening, National Context & Technical Foundations',
            venue: 'Main venue TBC',
            start: '08:30',
            end: '16:20',
            highlight: 'Opening remarks, Tonga’s national strategy, and Modules 1–3.',
            sessions: [
                { start: '08:30', end: '09:00', title: 'Arrival & Registration', kind: 'logistics' },
                {
                    start: '09:00', end: '09:15', title: 'Opening & Welcome Remarks', kind: 'session',
                    speakers: [
                        'TBC — Tonga',
                        'Will Griffiths — Technical Project Analyst, IMO',
                        'Faranisese Kinivuwai — Maritime Transport Team Leader (SPC), Project Coordinator (MTCC Pacific)'
                    ]
                },
                { start: '09:15', end: '09:40', title: 'Tea Break; Group Photo and Press Briefing', kind: 'break' },
                {
                    start: '09:40', end: '10:00',
                    title: 'Presentation: Tonga’s National Biofouling Strategy & Action Plan',
                    kind: 'session', speakers: ['TBC — Tonga']
                },
                {
                    start: '10:00', end: '10:10',
                    title: 'Presentation: Advancing Biofouling Management under TEST Biofouling through MTCC Pacific',
                    kind: 'session', speakers: ['Faranisese Kinivuwai — MTCC Pacific Secretariat / SPC']
                },
                {
                    start: '10:10', end: '10:40',
                    title: 'Introduction to Workshop & Objectives & Pre-Workshop Knowledge Check',
                    kind: 'session', speakers: ['Will Griffiths (IMO)']
                },
                {
                    start: '10:40', end: '12:10',
                    title: 'Module 1: Introduction to Biofouling and Invasive Aquatic Species',
                    detail: 'Biofouling fundamentals & marine invasive species',
                    kind: 'module'
                },
                { start: '12:10', end: '13:20', title: 'Lunch', kind: 'break' },
                {
                    start: '13:20', end: '14:50',
                    title: 'Module 2: Factors Influencing the Accumulation of Biofouling and IAS',
                    kind: 'module'
                },
                { start: '14:50', end: '15:05', title: 'Tea Break', kind: 'break' },
                { start: '15:05', end: '16:20', title: 'Module 3: Biofouling Management Standards', kind: 'module' },
                { start: '16:20', end: '', title: 'End of Day', kind: 'close' }
            ]
        },
        {
            id: 'day-2',
            date: '2026-08-19',
            label: 'Day 2',
            weekday: 'Wednesday',
            dayNum: '19',
            month: 'August',
            theme: 'Inspection Standards & Technology Demonstration',
            venue: 'Main venue TBC · demonstration at Faua Wharf',
            start: '08:30',
            end: '16:30',
            highlight: 'Live ROV inspection at Faua Wharf with Franmarine.',
            feature: 'Live demo',
            sessions: [
                { start: '08:30', end: '09:00', title: 'Arrival & Registration', kind: 'logistics' },
                { start: '09:00', end: '09:15', title: 'Recap of Day 1', kind: 'session' },
                { start: '09:15', end: '10:30', title: 'Module 4: Introduction to In-Water Inspections', kind: 'module' },
                { start: '10:30', end: '10:45', title: 'Safety Briefing', kind: 'session' },
                { start: '10:45', end: '11:15', title: 'Tea Break', kind: 'break' },
                { start: '11:15', end: '12:00', title: 'Discussion: Biofouling Risk in Tonga', kind: 'session' },
                { start: '12:00', end: '13:00', title: 'Lunch', kind: 'break' },
                { start: '13:00', end: '13:20', title: 'Transfer to Demonstration Site', kind: 'logistics' },
                {
                    start: '13:20', end: '15:30',
                    title: 'Live ROV-Based Underwater Inspection Demonstration with Q&A',
                    kind: 'demo', speakers: ['Franmarine — Technology Provider']
                },
                { start: '15:30', end: '15:45', title: 'Transfer Back to Venue', kind: 'logistics' },
                {
                    start: '15:45', end: '16:15',
                    title: 'Demonstration Debrief: Observations & Technical Reflections',
                    detail: 'National discussion: operational implications for Tonga',
                    kind: 'session'
                },
                { start: '16:15', end: '16:30', title: 'Wrap-Up', kind: 'session' },
                { start: '16:30', end: '', title: 'End of Day', kind: 'close' }
            ]
        },
        {
            id: 'day-3',
            date: '2026-08-20',
            label: 'Day 3',
            weekday: 'Thursday',
            dayNum: '20',
            month: 'August',
            theme: 'Technical Consolidation',
            venue: 'Main venue TBC',
            start: '08:30',
            end: '16:00',
            highlight: 'In-water inspection practice and reporting, then cleaning fundamentals.',
            sessions: [
                { start: '08:30', end: '09:00', title: 'Arrival & Registration', kind: 'logistics' },
                { start: '09:00', end: '10:15', title: 'Module 5: Conducting In-Water Inspections', kind: 'module' },
                { start: '10:15', end: '10:35', title: 'Tea Break', kind: 'break' },
                { start: '10:35', end: '11:30', title: 'Module 6: In-Water Inspection Reporting', kind: 'module' },
                {
                    start: '11:30', end: '12:00',
                    title: 'Discussion: Linking Inspection Findings to Regulatory Decision-Making',
                    kind: 'session'
                },
                { start: '12:00', end: '13:15', title: 'Lunch', kind: 'break' },
                { start: '13:15', end: '13:45', title: 'Module 7: General Introduction to In-Water Cleaning', kind: 'module' },
                { start: '13:45', end: '14:45', title: 'Module 8: Fundamentals of In-Water Cleaning', kind: 'module' },
                { start: '14:45', end: '15:00', title: 'Tea Break', kind: 'break' },
                { start: '15:00', end: '16:00', title: 'Module 9: Precleaning Considerations', kind: 'module' },
                { start: '16:00', end: '', title: 'Close of Day 3', kind: 'close' }
            ]
        },
        {
            id: 'day-4',
            date: '2026-08-21',
            label: 'Day 4',
            weekday: 'Friday',
            dayNum: '21',
            month: 'August',
            theme: 'National Application, Next Steps & Closing',
            venue: 'Main venue TBC',
            start: '08:30',
            end: '17:00',
            highlight: 'Oversight pathway exercise, certificates, and closing remarks.',
            sessions: [
                { start: '08:30', end: '09:00', title: 'Arrival & Registration', kind: 'logistics' },
                { start: '09:00', end: '09:05', title: 'Brief Recap', kind: 'session' },
                { start: '09:05', end: '10:15', title: 'Module 10: Conducting In-Water Inspections', kind: 'module' },
                { start: '10:15', end: '10:45', title: 'Tea Break', kind: 'break' },
                { start: '10:45', end: '12:00', title: 'Module 11: Post-Cleaning Activities and Reporting', kind: 'module' },
                { start: '12:00', end: '13:00', title: 'Lunch', kind: 'break' },
                {
                    start: '13:00', end: '14:30',
                    title: 'Module 12: Evaluation and Approval of In-Water Cleaning Systems — Part 1',
                    kind: 'module'
                },
                {
                    start: '14:30', end: '15:15',
                    title: 'National Discussion: Operational Implications for Tonga',
                    kind: 'session'
                },
                { start: '15:15', end: '15:25', title: 'Tea Break', kind: 'break' },
                {
                    start: '15:40', end: '16:40',
                    title: 'Group Exercise: Developing an IWC Oversight Pathway for Tonga',
                    kind: 'session'
                },
                { start: '16:40', end: '16:55', title: 'Certificate Ceremony & Photo Session', kind: 'ceremony' },
                {
                    start: '16:55', end: '17:00', title: 'Closing Remarks', kind: 'session',
                    speakers: ['TBC — Tonga', 'Will Griffiths, IMO']
                },
                { start: '17:00', end: '', title: 'End of Workshop', kind: 'close' }
            ]
        }
    ];

    var KIND_LABEL = {
        logistics: 'Logistics',
        break: 'Break',
        session: 'Session',
        module: 'Module',
        demo: 'Demonstration',
        ceremony: 'Ceremony',
        close: 'Close'
    };

    function pad(n) { return n < 10 ? '0' + n : String(n); }

    function localISO(d) {
        return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
    }

    function parseMinutes(t) {
        if (!t) return null;
        var parts = t.split(':');
        return (parseInt(parts[0], 10) * 60) + parseInt(parts[1], 10);
    }

    function escapeHtml(s) {
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function todayIndex(now) {
        var iso = localISO(now || new Date());
        for (var i = 0; i < DAYS.length; i++) {
            if (DAYS[i].date === iso) return i;
        }
        if (iso < DAYS[0].date) return 0;
        return DAYS.length - 1;
    }

    function sessionState(day, session, now) {
        now = now || new Date();
        var iso = localISO(now);
        if (iso < day.date) return 'upcoming';
        if (iso > day.date) return 'past';
        var mins = now.getHours() * 60 + now.getMinutes();
        var start = parseMinutes(session.start);
        var end = parseMinutes(session.end);
        if (start == null) return 'upcoming';
        if (end == null) return mins >= start ? 'past' : 'upcoming';
        if (mins < start) return 'upcoming';
        if (mins >= end) return 'past';
        return 'now';
    }

    function timeRange(session) {
        if (!session.end) return escapeHtml(session.start);
        return escapeHtml(session.start) + '–' + escapeHtml(session.end);
    }

    function speakersHtml(session) {
        if (!session.speakers || !session.speakers.length) return '';
        var items = [];
        for (var i = 0; i < session.speakers.length; i++) {
            items.push('<li>' + escapeHtml(session.speakers[i]) + '</li>');
        }
        return '<ul class="agenda-speakers">' + items.join('') + '</ul>';
    }

    function timelineHtml(day, now) {
        var items = [];
        for (var i = 0; i < day.sessions.length; i++) {
            var s = day.sessions[i];
            var state = sessionState(day, s, now);
            var kind = s.kind || 'session';
            var detail = s.detail ? '<p class="agenda-detail">' + escapeHtml(s.detail) + '</p>' : '';
            var live = state === 'now' ? '<span class="agenda-live">Now</span>' : '';
            items.push(
                '<li class="agenda-item kind-' + kind + ' is-' + state + '">' +
                    '<div class="agenda-time">' +
                        '<span class="agenda-range">' + timeRange(s) + '</span>' +
                        live +
                    '</div>' +
                    '<div class="agenda-body">' +
                        '<span class="agenda-kind">' + escapeHtml(KIND_LABEL[kind] || 'Session') + '</span>' +
                        '<h3>' + escapeHtml(s.title) + '</h3>' +
                        detail +
                        speakersHtml(s) +
                    '</div>' +
                '</li>'
            );
        }
        return '<ol class="agenda-timeline">' + items.join('') + '</ol>';
    }

    function dayStatusLabel(day, now) {
        var iso = localISO(now);
        if (iso === day.date) return 'Today';
        if (iso < day.date) return '';
        return 'Completed';
    }

    function renderFull(root) {
        var now = new Date();
        var initial = todayIndex(now);
        var hash = (location.hash || '').replace('#', '');
        for (var h = 0; h < DAYS.length; h++) {
            if (DAYS[h].id === hash) initial = h;
        }

        var tabs = [];
        var panels = [];
        for (var i = 0; i < DAYS.length; i++) {
            var day = DAYS[i];
            var selected = i === initial;
            var status = dayStatusLabel(day, now);
            var badge = status ? '<span class="day-status">' + escapeHtml(status) + '</span>' : '';
            var feature = day.feature ? '<span class="day-feature">' + escapeHtml(day.feature) + '</span>' : '';
            tabs.push(
                '<button type="button" class="agenda-day-tab' + (selected ? ' active' : '') + '"' +
                    ' role="tab" id="tab-' + day.id + '" data-day="' + day.id + '"' +
                    ' aria-selected="' + (selected ? 'true' : 'false') + '"' +
                    ' aria-controls="' + day.id + '">' +
                    '<span class="dt-label">' + escapeHtml(day.label) + '</span>' +
                    '<span class="dt-date">' + escapeHtml(day.weekday) + ' ' + escapeHtml(day.dayNum) + '</span>' +
                    feature + badge +
                '</button>'
            );
            panels.push(
                '<article class="agenda-day-panel" id="' + day.id + '" role="tabpanel"' +
                    ' aria-labelledby="tab-' + day.id + '"' +
                    (selected ? '' : ' hidden') + '>' +
                    '<header class="agenda-day-head">' +
                        '<p class="agenda-day-kicker">' + escapeHtml(day.label) + ' · ' +
                            escapeHtml(day.weekday) + ' ' + escapeHtml(day.dayNum) + ' ' +
                            escapeHtml(day.month) + ' 2026</p>' +
                        '<h2>' + escapeHtml(day.theme) + '</h2>' +
                        '<p class="agenda-day-meta">' + escapeHtml(day.venue) + ' · ' +
                            escapeHtml(day.start) + '–' + escapeHtml(day.end) + '</p>' +
                    '</header>' +
                    timelineHtml(day, now) +
                '</article>'
            );
        }

        root.innerHTML =
            '<div class="agenda-day-tabs" role="tablist" aria-label="Workshop days">' + tabs.join('') + '</div>' +
            '<div class="agenda-day-panels">' + panels.join('') + '</div>';

        var buttons = root.querySelectorAll('.agenda-day-tab');
        function selectDay(id, pushHash) {
            for (var i = 0; i < buttons.length; i++) {
                var on = buttons[i].getAttribute('data-day') === id;
                buttons[i].classList.toggle('active', on);
                buttons[i].setAttribute('aria-selected', on ? 'true' : 'false');
            }
            var articles = root.querySelectorAll('.agenda-day-panel');
            for (var j = 0; j < articles.length; j++) {
                if (articles[j].id === id) articles[j].removeAttribute('hidden');
                else articles[j].setAttribute('hidden', '');
            }
            if (pushHash) {
                if (history.replaceState) history.replaceState(null, '', '#' + id);
                else location.hash = id;
            }
        }

        for (var b = 0; b < buttons.length; b++) {
            buttons[b].addEventListener('click', function () {
                selectDay(this.getAttribute('data-day'), true);
            });
        }

        window.addEventListener('hashchange', function () {
            var id = (location.hash || '').replace('#', '');
            if (id) selectDay(id, false);
        });
    }

    function renderPreview(root) {
        var now = new Date();
        var todayIso = localISO(now);
        var base = root.getAttribute('data-base') || '';
        var cards = [];
        for (var i = 0; i < DAYS.length; i++) {
            var day = DAYS[i];
            var isToday = day.date === todayIso;
            var href = base + 'agenda/index.html#' + day.id;
            var feature = day.feature ? '<span class="ag-feature">' + escapeHtml(day.feature) + '</span>' : '';
            var today = isToday ? '<span class="ag-today">Today</span>' : '';
            cards.push(
                '<a class="agenda-card' + (isToday ? ' is-today' : '') + (day.feature ? ' has-feature' : '') + '" href="' + href + '">' +
                    '<div class="ag-date">' +
                        '<span class="ag-day">' + escapeHtml(day.label) + '</span>' +
                        '<span class="ag-wd">' + escapeHtml(day.weekday) + ' ' + escapeHtml(day.dayNum) + ' Aug</span>' +
                        feature + today +
                    '</div>' +
                    '<h3>' + escapeHtml(day.theme) + '</h3>' +
                    '<p>' + escapeHtml(day.highlight) + '</p>' +
                    '<span class="ag-hours">' + escapeHtml(day.start) + '–' + escapeHtml(day.end) + '</span>' +
                '</a>'
            );
        }
        root.innerHTML = '<div class="agenda-cards">' + cards.join('') + '</div>';
    }

    function init() {
        var full = document.getElementById('agenda-app');
        if (full) renderFull(full);
        var preview = document.getElementById('agenda-preview');
        if (preview) renderPreview(preview);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    global.WorkshopAgenda = { meta: META, days: DAYS };
})(window);
