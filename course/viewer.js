(function () {
    var C = window.COURSE;
    if (!C) return;

    var params = new URLSearchParams(window.location.search);
    var id = params.get('id');
    var track = params.get('track') === 'inspection' ? 'inspection' : 'cleaning';
    var doc = C.docById(id);

    var titleEl = document.getElementById('v-title');
    var crumbEl = document.getElementById('v-crumb');
    var statusEl = document.getElementById('v-status');
    var wrapEl = document.getElementById('v-wrap');
    var pagesEl = document.getElementById('v-pages');
    var openEl = document.getElementById('v-open');
    var backEl = document.getElementById('v-back');
    var prevBtn = document.getElementById('v-prev');
    var nextBtn = document.getElementById('v-next');
    var pageEl = document.getElementById('v-page');
    var minusBtn = document.getElementById('v-minus');
    var plusBtn = document.getElementById('v-plus');

    backEl.href = 'index.html?track=' + encodeURIComponent(track);

    if (!doc) {
        titleEl.textContent = 'Document not found';
        statusEl.innerHTML = '<p>That file is not in the course library.</p><p><a class="v-btn primary" href="index.html">Back to library</a></p>';
        return;
    }

    var fileHref = C.fileUrl(doc.file);
    var trackMeta = C.tracks[track];
    document.title = doc.title + ' | Tonga Workshop Portal';
    titleEl.textContent = doc.title;
    crumbEl.textContent = trackMeta.title + (doc.shared ? ' · shared with both tracks' : '') + ' · ' + doc.activity;
    openEl.href = fileHref;

    function showFallback(message) {
        wrapEl.hidden = true;
        statusEl.hidden = false;
        statusEl.className = 'viewer-fallback';
        prevBtn.hidden = nextBtn.hidden = pageEl.hidden = minusBtn.hidden = plusBtn.hidden = true;
        statusEl.innerHTML =
            '<p>' + (message || 'This browser needs the native PDF viewer for this file.') + '</p>' +
            '<p><a class="v-btn primary" href="' + fileHref + '" target="_blank" rel="noopener">Open PDF</a></p>' +
            '<iframe class="viewer-embed" title="' + doc.title.replace(/"/g, '') + '" src="' + fileHref + '"></iframe>';
    }

    var pdfjsLib = window['pdfjs-dist/build/pdf'] || window.pdfjsLib;
    var isFile = location.protocol === 'file:';

    if (!pdfjsLib || isFile) {
        showFallback(isFile
            ? 'Open this portal over the workshop Wi-Fi (or GitHub Pages) for page-by-page reading. Meanwhile the PDF is below.'
            : 'Could not load the on-screen reader.');
        return;
    }

    pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    var pdfDoc = null;
    var pageNum = 1;
    var zoom = 1;
    var slots = [];
    var observer = null;
    var ignoreScroll = false;
    var scrollTimer = null;

    function updatePager() {
        var n = pdfDoc ? pdfDoc.numPages : 0;
        pageEl.textContent = n ? ('Page ' + pageNum + ' of ' + n) : '—';
        prevBtn.disabled = pageNum <= 1;
        nextBtn.disabled = !n || pageNum >= n;
        var multi = n > 1;
        prevBtn.hidden = nextBtn.hidden = !multi;
        pageEl.hidden = !n;
    }

    function cssWidth() {
        return wrapEl.clientWidth || Math.min(1180, window.innerWidth * 0.96);
    }

    function outputScale() {
        return Math.max(window.devicePixelRatio || 1, 2);
    }

    function renderSlot(slot) {
        if (!pdfDoc || slot.rendered === zoom || slot.rendering) return;
        slot.rendering = true;
        if (slot.task && slot.task.cancel) {
            try { slot.task.cancel(); } catch (e) { /* already done */ }
        }

        pdfDoc.getPage(slot.num).then(function (page) {
            var unscaled = page.getViewport({ scale: 1 });
            var fit = cssWidth() / unscaled.width;
            var scale = outputScale();
            var viewport = page.getViewport({ scale: fit * zoom * scale });
            var w = Math.floor(viewport.width / scale);
            var h = Math.floor(viewport.height / scale);
            slot.el.style.width = w + 'px';
            slot.el.style.height = h + 'px';

            var canvas = slot.canvas || document.createElement('canvas');
            slot.canvas = canvas;
            canvas.width = Math.floor(viewport.width);
            canvas.height = Math.floor(viewport.height);
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
            if (!canvas.parentNode) slot.el.appendChild(canvas);

            var ctx = canvas.getContext('2d', { alpha: false });
            ctx.imageSmoothingEnabled = true;
            if (ctx.imageSmoothingQuality) ctx.imageSmoothingQuality = 'high';
            slot.task = page.render({ canvasContext: ctx, viewport: viewport });
            return slot.task.promise;
        }).then(function () {
            slot.rendering = false;
            slot.rendered = zoom;
            slot.task = null;
        }).catch(function (err) {
            slot.rendering = false;
            slot.task = null;
            if (err && err.name === 'RenderingCancelledException') return;
        });
    }

    function pageFromScroll() {
        var toolbar = document.querySelector('.viewer-toolbar');
        var topLine = (toolbar ? toolbar.getBoundingClientRect().bottom : 0) + 8;
        var best = 1;
        var bestDist = Infinity;
        for (var i = 0; i < slots.length; i++) {
            var r = slots[i].el.getBoundingClientRect();
            if (r.bottom <= topLine) continue;
            var dist = Math.abs(r.top - topLine);
            if (dist < bestDist) {
                bestDist = dist;
                best = slots[i].num;
            }
        }
        return best;
    }

    function onScroll() {
        if (!pdfDoc || ignoreScroll) return;
        var n = pageFromScroll();
        if (n !== pageNum) {
            pageNum = n;
            updatePager();
        }
    }

    function go(delta) {
        if (!pdfDoc) return;
        var next = pageNum + delta;
        if (next < 1 || next > pdfDoc.numPages) return;
        pageNum = next;
        updatePager();
        ignoreScroll = true;
        slots[next - 1].el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function () { ignoreScroll = false; }, 450);
    }

    function rebuildVisible() {
        slots.forEach(function (slot) { slot.rendered = 0; });
        slots.forEach(function (slot) {
            var r = slot.el.getBoundingClientRect();
            var near = r.bottom > -800 && r.top < window.innerHeight + 800;
            if (near) renderSlot(slot);
        });
    }

    function buildPages() {
        pagesEl.innerHTML = '';
        slots = [];
        if (observer) observer.disconnect();

        observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var num = Number(entry.target.dataset.page);
                renderSlot(slots[num - 1]);
            });
        }, { root: null, rootMargin: '900px 0px', threshold: 0.01 });

        for (var i = 1; i <= pdfDoc.numPages; i++) {
            var el = document.createElement('div');
            el.className = 'pdf-page';
            el.dataset.page = String(i);
            el.setAttribute('aria-label', 'Page ' + i);
            pagesEl.appendChild(el);
            slots.push({
                el: el,
                canvas: null,
                num: i,
                rendered: 0,
                rendering: false,
                task: null
            });
            observer.observe(el);
        }

        statusEl.hidden = true;
        wrapEl.hidden = false;
        pageNum = 1;
        updatePager();
        renderSlot(slots[0]);
        if (slots[1]) renderSlot(slots[1]);
    }

    prevBtn.addEventListener('click', function () { go(-1); });
    nextBtn.addEventListener('click', function () { go(1); });
    minusBtn.addEventListener('click', function () {
        zoom = Math.max(0.75, Math.round((zoom - 0.25) * 100) / 100);
        rebuildVisible();
    });
    plusBtn.addEventListener('click', function () {
        zoom = Math.min(3, Math.round((zoom + 0.25) * 100) / 100);
        rebuildVisible();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
            e.preventDefault();
            go(-1);
        }
        if (e.key === 'ArrowRight' || e.key === 'PageDown') {
            e.preventDefault();
            go(1);
        }
    });

    window.addEventListener('scroll', onScroll, { passive: true });

    var resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () { if (pdfDoc) rebuildVisible(); }, 180);
    });

    pdfjsLib.getDocument({ url: fileHref, withCredentials: false }).promise.then(function (pdf) {
        pdfDoc = pdf;
        buildPages();
    }).catch(function () {
        showFallback('Could not fetch the PDF in this browser. Use Open PDF — your phone will use its built-in reader.');
    });
})();
