(function () {
    var FR = [
        { v: 0,   cls: 'none', name: 'Clean, foul-free',        desc: 'Coating or bare metal, no growth' },
        { v: 10,  cls: 'soft', name: 'Incipient slime',         desc: 'Light red and green shades, coating visible beneath' },
        { v: 20,  cls: 'soft', name: 'Advanced slime',          desc: 'Dark green patches, yellow to brown, coating obscured' },
        { v: 30,  cls: 'soft', name: 'Grass and soft growth',   desc: 'Filaments to 76 mm, or soft non-calcareous growth to 6.4 mm. Not wipeable by hand' },
        { v: 40,  cls: 'hard', name: 'Tubeworms',               desc: 'Calcareous, under 6.4 mm' },
        { v: 50,  cls: 'hard', name: 'Barnacles',               desc: 'Calcareous, under 6.4 mm' },
        { v: 60,  cls: 'hard', name: 'Tubeworms and barnacles', desc: 'Mixed, under 6.4 mm' },
        { v: 70,  cls: 'hard', name: 'Tubeworms and barnacles', desc: 'Mixed, over 6.4 mm' },
        { v: 80,  cls: 'hard', name: 'Packed and stacked',      desc: 'Tubeworms upright, barnacles growing one on another, shells clean or white' },
        { v: 90,  cls: 'hard', name: 'Dense, with molluscs',    desc: 'Over 6.4 mm, brown shells, oysters and mussels, slime or grass overlay' },
        { v: 100, cls: 'hard', name: 'All forms present',       desc: 'Soft over hard, tunicates growing over calcareous growth' }
    ];

    var BANDS = [
        { lo: 0,  hi: 0,   lof: 1, imo: 1, txt: '0%',        cap: 'biofilm',  set: 0 },
        { lo: 1,  hi: 5,   lof: 2, imo: 2, txt: '1–5%',     cap: 'light',    set: 3 },
        { lo: 6,  hi: 15,  lof: 3, imo: 2, txt: '6–15%',    cap: 'light',    set: 10 },
        { lo: 16, hi: 40,  lof: 4, imo: 3, txt: '16–40%',   cap: 'medium',   set: 25 },
        { lo: 41, hi: 100, lof: 5, imo: 4, txt: '41–100%',  cap: 'heavy',    set: 70 }
    ];

    var LOF_NAME = ['No visible fouling', 'Slime only', 'Light fouling', 'Considerable fouling', 'Extensive fouling', 'Very heavy fouling'];
    var IMO_NAME = ['No fouling', 'Microfouling', 'Light macrofouling', 'Medium macrofouling', 'Heavy macrofouling'];

    var state = { fr: 50, cover: 25, taxa: true, coat: 'spc' };

    var ladder = document.getElementById('ladder');
    var coverEl = document.getElementById('cover');
    var taxaEl = document.getElementById('taxa');
    var coatEl = document.getElementById('coat');
    var copyBtn = document.getElementById('copyBtn');

    function bandFor(pct) {
        for (var i = 0; i < BANDS.length; i++) {
            if (pct >= BANDS[i].lo && pct <= BANDS[i].hi) return BANDS[i];
        }
        return BANDS[0];
    }

    function frRec(v) {
        for (var i = 0; i < FR.length; i++) if (FR[i].v === v) return FR[i];
        return FR[0];
    }

    function buildLadder() {
        var html = '';
        for (var i = 0; i < FR.length; i++) {
            var f = FR[i];
            if (f.v === 30) html += '<div class="brk imo"><span>micro / macro — IMO</span><span class="line"></span></div>';
            if (f.v === 40) html += '<div class="brk nstm"><span>soft / hard — NSTM</span><span class="line"></span></div>';
            html += '<label class="rung ' + f.cls + (f.v === state.fr ? ' is-on' : '') + '" data-v="' + f.v + '">'
                + '<input type="radio" name="fr" value="' + f.v + '"' + (f.v === state.fr ? ' checked' : '') + '>'
                + '<span class="code">FR-' + f.v + '</span>'
                + '<span><span class="name">' + f.name + '</span><span class="desc">' + f.desc + '</span></span>'
                + '</label>';
        }
        ladder.innerHTML = html;
    }

    function buildBands() {
        var html = '';
        for (var i = 0; i < BANDS.length; i++) {
            var b = BANDS[i];
            html += '<button type="button" class="band" data-cover="' + b.set + '" data-lo="' + b.lo + '" data-hi="' + b.hi + '">'
                + '<em>' + b.txt + '</em>LoF ' + b.lof + ' · IMO ' + b.imo + '</button>';
        }
        document.getElementById('bands').innerHTML = html;
    }

    function setFr(v) {
        var leavingClean = state.fr === 0 && v !== 0;
        state.fr = v;
        var rungs = ladder.querySelectorAll('.rung');
        for (var i = 0; i < rungs.length; i++) {
            var on = parseInt(rungs[i].dataset.v, 10) === state.fr;
            rungs[i].classList.toggle('is-on', on);
            rungs[i].querySelector('input').checked = on;
        }
        if (leavingClean && state.cover < 1) {
            state.cover = 25;
            coverEl.value = 25;
        }
        render();
    }

    ladder.addEventListener('change', function (e) {
        if (e.target.name !== 'fr') return;
        setFr(parseInt(e.target.value, 10));
    });

    coverEl.addEventListener('input', function () {
        state.cover = parseInt(this.value, 10);
        render();
    });

    taxaEl.addEventListener('change', function () {
        state.taxa = this.checked;
        render();
    });

    coatEl.addEventListener('change', function (e) {
        if (!e.target.value) return;
        state.coat = e.target.value;
        var labels = coatEl.querySelectorAll('label');
        for (var i = 0; i < labels.length; i++) {
            labels[i].classList.toggle('on', labels[i].querySelector('input').checked);
        }
        render();
    });

    document.getElementById('bands').addEventListener('click', function (e) {
        var btn = e.target.closest('.band');
        if (!btn || btn.disabled) return;
        var next = parseInt(btn.dataset.cover, 10);
        if (isNaN(next)) return;
        state.cover = next;
        coverEl.value = next;
        render();
    });

    function dashRange(txt) {
        return txt.replace('–', ' to ');
    }

    function render() {
        var f = frRec(state.fr);
        var macro = state.fr >= 30;
        var micro = state.fr > 0 && !macro;
        var band = bandFor(state.cover);
        var coverPanel = document.getElementById('coverPanel');
        var taxaRow = document.getElementById('taxaRow');

        coverEl.min = macro ? 1 : 0;
        coverEl.disabled = state.fr === 0;
        if (macro && state.cover < 1) {
            state.cover = 1;
            coverEl.value = 1;
            band = bandFor(state.cover);
        }
        if (state.fr === 0) {
            state.cover = 0;
            coverEl.value = 0;
            band = bandFor(0);
        }

        coverPanel.classList.toggle('is-disabled', state.fr === 0);
        taxaRow.classList.toggle('is-off', !macro);

        document.getElementById('coverLabel').textContent =
            state.fr === 0 ? 'Cover (not applicable to a clean surface)'
            : macro ? 'Macrofouling cover of the area'
            : 'Microfouling cover of the area';
        document.getElementById('coverVal').textContent = state.cover + '%';

        var lof, imo;
        if (state.fr === 0) { lof = 0; imo = 0; }
        else if (micro) { lof = 1; imo = 1; }
        else { lof = band.lof; imo = band.imo; }

        var lofAmbiguous = (macro && state.cover <= 5 && state.taxa)
            || (macro && state.cover >= 16 && state.cover <= 40 && !state.taxa);

        var chips = document.querySelectorAll('#bands .band');
        for (var i = 0; i < chips.length; i++) {
            var lo = parseInt(chips[i].dataset.lo, 10);
            var hi = parseInt(chips[i].dataset.hi, 10);
            var on = macro && state.cover >= lo && state.cover <= hi;
            var off = (state.fr === 0 && hi > 0) || (macro && hi === 0);
            chips[i].classList.toggle('on', on);
            chips[i].disabled = off;
        }

        document.getElementById('coverNote').textContent =
            state.fr === 0 ? 'A clean surface is LoF 0 and IMO 0 — cover does not apply.'
            : micro ? 'Biofilm is LoF 1 and IMO 1 at any cover. The percentage rides with the FR but does not change those ratings.'
            : 'LoF and IMO follow the cover band. The FR is read from what is growing, not from how much of it there is.';

        document.getElementById('oFR').textContent = 'FR-' + state.fr;
        document.getElementById('sFR').textContent = state.fr === 0 ? 'Clean'
            : (f.cls === 'hard' ? 'Hard fouling' : 'Soft fouling') + ', over ' + state.cover + '% of area';
        document.getElementById('oLOF').textContent = lof;
        document.getElementById('sLOF').textContent = LOF_NAME[lof] + (lofAmbiguous ? ' — ambiguous' : '');
        document.getElementById('oIMO').textContent = imo;
        document.getElementById('sIMO').textContent = IMO_NAME[imo];
        document.getElementById('lofCard').classList.toggle('is-ambiguous', lofAmbiguous);

        document.getElementById('dockFR').textContent = 'FR-' + state.fr;
        document.getElementById('dockLOF').textContent = lof;
        document.getElementById('dockIMO').textContent = imo;

        var action = imo >= 2 ? ' Reactive cleaning with capture recommended, to a target of rating 1 or below.'
            : imo === 1 ? ' Within the BFMP target of rating 1 or below. Proactive cleaning may be appropriate.'
            : ' Within the BFMP target of rating 1 or below.';
        var line = 'FR-' + state.fr + (state.fr === 0 ? '' : ' over ' + state.cover + '% of area')
            + ' (LoF ' + lof + '; IMO rating ' + imo
            + (macro ? ', ' + dashRange(band.txt) + ' macrofouling cover' : '') + ').' + action;
        document.getElementById('reportLine').textContent = line;

        var flags = [];
        if (state.fr === 30) {
            flags.push('<b>Class mismatch.</b> The NSTM calls FR-30 soft fouling, but the IMO definition of macrofouling covers algal fronds and filaments, bryozoans and sea squirts. This reading is macrofouling under MEPC.378(80) and rates 2 or above, not 1.');
        }
        if (macro && state.cover <= 5 && state.taxa) {
            flags.push('<b>LoF is ambiguous here.</b> Floerl’s rank 2 specifies a single taxon. With several taxa at ' + state.cover + '% cover the reading sits between rank 2 and rank 3. The IMO rating is unaffected.');
        }
        if (macro && state.cover >= 16 && state.cover <= 40 && !state.taxa) {
            flags.push('<b>LoF is ambiguous here.</b> Floerl’s rank 4 specifies more than one taxon. A single-taxon assemblage at ' + state.cover + '% cover sits between rank 3 and rank 4. The IMO rating is unaffected.');
        }
        if (state.fr === 0 && state.cover > 0) {
            flags.push('<b>LoF 0 and IMO 0 require a completely clean surface.</b> Any biofilm at all moves the reading to LoF 1 and IMO 1.');
        }
        var flagsEl = document.getElementById('flags');
        flagsEl.innerHTML = flags.map(function (t) {
            return '<div class="flag"><div>' + t + '</div></div>';
        }).join('');
        flagsEl.hidden = flags.length === 0;

        var t = [];
        if (imo >= 2) {
            t.push(['no', 'IMO', 'Cleaning with capture recommended', 'MEPC.378(80) table 1 and para. 9.9. Shorten the interval to the next inspection. If the AFS is significantly deteriorated, dry-dock for maintenance and reapplication.']);
            t.push(['no', '9.4.1', 'Proactive cleaning without capture not permitted', 'Only allowed at rating 1 or below.']);
            t.push(['no', '10.2', 'BFMP target not met', 'The plan should be maintaining rating 1 or below.']);
        } else if (imo === 1) {
            t.push(['yes', 'IMO', 'No reactive cleaning triggered', 'Proactive cleaning may be recommended under para. 9.4.']);
            t.push(['yes', '9.4.1', 'Proactive cleaning without capture permitted', 'Rating is 1 or below. Must still be done in an area accepted by the relevant authority.']);
            t.push(['yes', '10.2', 'BFMP target met', 'Rating 1 or below.']);
        } else {
            t.push(['yes', 'IMO', 'No action triggered', 'Surface entirely clean.']);
            t.push(['yes', '10.2', 'BFMP target met', 'Rating 1 or below.']);
        }

        var usnFires = state.coat === 'spc'
            ? (state.fr >= 40 && state.cover >= 20)
            : (state.fr >= 50 && state.cover >= 10);
        var usnRule = state.coat === 'spc'
            ? 'Full hull clean at FR-40 or greater over 20% of the hull, excluding docking block areas and appendages.'
            : 'At FR-50 or greater over 10% of the hull, NAVSEA 00C is contacted for cleaning advice.';
        t.push([
            usnFires ? 'no' : 'yes',
            'NSTM',
            usnFires ? 'Cleaning criterion met' : 'Cleaning criterion not met',
            usnRule
        ]);
        t.push([
            'info',
            'Class',
            state.fr >= 40 ? 'Hard (calcareous) fouling' : state.fr === 0 ? 'No fouling' : 'Soft fouling',
            state.fr >= 40
                ? 'Expect higher removal forces and a real risk of coating damage. Check compatibility with the AFC before selecting a method.'
                : 'Low removal forces. Gentler methods will generally clear it without cutting into the coating.'
        ]);

        document.getElementById('triggers').innerHTML = t.map(function (r) {
            return '<div class="trig"><span class="pip ' + r[0] + '">' + r[1] + '</span><div><strong>' + r[2] + '</strong><span>' + r[3] + '</span></div></div>';
        }).join('');

        var w = [];
        w.push('<li><code>FR-' + state.fr + '</code> read directly from the growth description. The cover figure rides alongside it rather than changing it.</li>');
        if (state.fr === 0) {
            w.push('<li><code>LoF 0</code> and <code>IMO 0</code> both mean an entirely clean surface with no biofilm.</li>');
        } else if (micro) {
            w.push('<li><code>LoF 1</code> and <code>IMO 1</code>: biofilm with no macrofouling. Neither scale bands microfouling by cover, so the percentage does not move the rating.</li>');
        } else {
            w.push('<li><code>LoF ' + lof + '</code> from Floerl et al. 2005: ' + dashRange(band.txt) + ' macrofouling cover.</li>');
            w.push('<li><code>IMO ' + imo + '</code> from MEPC.378(80) table 1: ' + dashRange(band.txt) + ' falls in the ' + band.cap + ' macrofouling band.</li>');
            if (imo === 2) w.push('<li>The IMO merges LoF 2 and LoF 3 into a single rating 2 covering 1 to 15%, so LoF converts to IMO but not back again.</li>');
        }
        w.push('<li>Reading back the other way, an <code>IMO ' + imo + '</code> on its own does not pin the FR: '
            + (imo === 0 ? 'only FR-0 qualifies.'
                : imo === 1 ? 'anything from FR-10 to FR-20 qualifies.'
                : 'any of FR-30 through FR-100 can sit at ' + dashRange(band.txt) + ' cover.') + '</li>');
        document.getElementById('why').innerHTML = w.join('');
    }

    copyBtn.addEventListener('click', function () {
        var btn = this;
        var txt = document.getElementById('reportLine').textContent;
        function done() {
            btn.textContent = 'Copied';
            btn.classList.add('is-copied');
            setTimeout(function () {
                btn.textContent = 'Copy';
                btn.classList.remove('is-copied');
            }, 1500);
        }
        function fallback() {
            var ta = document.createElement('textarea');
            ta.value = txt;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            try { document.execCommand('copy'); done(); }
            catch (e) {
                btn.textContent = 'Select and copy';
                setTimeout(function () { btn.textContent = 'Copy'; }, 1800);
            }
            document.body.removeChild(ta);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(txt).then(done, fallback);
        } else fallback();
    });

    buildLadder();
    buildBands();
    render();
})();
