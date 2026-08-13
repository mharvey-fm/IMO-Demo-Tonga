(function () {
    var C = window.COURSE;
    if (!C) return;

    var params = new URLSearchParams(window.location.search);
    var track = params.get('track') === 'inspection' ? 'inspection' : 'cleaning';

    var intro = document.getElementById('track-intro');
    var grid = document.getElementById('material-grid');
    var tabs = document.querySelectorAll('.track-btn');

    document.getElementById('count-cleaning').textContent =
        (C.docsForTrack('cleaning').length + 1) + ' items · includes the group quiz';
    document.getElementById('count-inspection').textContent =
        C.docsForTrack('inspection').length + ' items · shared rating slide';

    function setTrack(next, push) {
        track = next;
        tabs.forEach(function (btn) {
            var on = btn.dataset.track === track;
            btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        render();
        if (push) {
            var url = new URL(window.location.href);
            url.searchParams.set('track', track);
            history.replaceState(null, '', url);
        }
    }

    function quizCard() {
        var a = document.createElement('a');
        a.className = 'mat-card quiz';
        a.href = 'quiz.html';
        a.id = 'activity-1';
        a.innerHTML =
            '<div class="mat-body">' +
                '<div class="mat-quiz-mark" aria-hidden="true">✍️</div>' +
                '<div class="mat-copy">' +
                    '<div class="mat-kind">' + C.quiz.activity + ' · Group exercise</div>' +
                    '<h3>' + C.quiz.title + '</h3>' +
                    '<p class="mat-blurb">Nine questions from Module 2. Answer in the app with your table — no Word document needed. Answers stay on this device so you can pass the phone to your spokesperson.</p>' +
                '</div>' +
                '<span class="mat-cta">Start the quiz →</span>' +
            '</div>';
        return a;
    }

    function docCard(doc) {
        var a = document.createElement('a');
        a.className = 'mat-card';
        a.dataset.kind = doc.kind;
        a.href = C.viewerUrl(doc.id, track);
        var shared = doc.shared
            ? '<span class="shared-pill">Same slide in both tracks</span>'
            : '';
        a.innerHTML =
            '<div class="mat-banner"></div>' +
            '<div class="mat-body">' +
                '<div class="mat-kind">' + doc.activity + shared + '</div>' +
                '<h3>' + doc.title + '</h3>' +
                '<p class="mat-blurb">' + doc.blurb + '</p>' +
                '<div class="mat-meta">' + doc.meta + '</div>' +
                '<span class="mat-cta">Open in viewer →</span>' +
            '</div>';
        return a;
    }

    function render() {
        var t = C.tracks[track];
        intro.innerHTML =
            '<h2>' + t.icon + ' ' + t.title + '</h2>' +
            '<p>' + t.lede + ' ' + t.hint + '</p>';

        grid.innerHTML = '';
        if (track === 'cleaning') grid.appendChild(quizCard());

        var list = C.docsForTrack(track).slice().sort(function (a, b) {
            return (a.order || 0) - (b.order || 0);
        });
        list.forEach(function (doc) { grid.appendChild(docCard(doc)); });
    }

    tabs.forEach(function (btn) {
        btn.addEventListener('click', function () { setTrack(btn.dataset.track, true); });
    });

    setTrack(track, false);
})();
