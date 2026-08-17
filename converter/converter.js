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

    var IMO = [
        { v: 0, cls: 'none',  name: 'No fouling',            desc: 'Completely clean surface, no biofilm' },
        { v: 1, cls: 'soft',  name: 'Microfouling',          desc: 'Biofilm or slime only. Coating may be visible or obscured' },
        { v: 2, cls: 'macro', name: 'Light macrofouling',    desc: '1–15% of the area. Algal filaments, bryozoans, tubeworms, barnacles or similar' },
        { v: 3, cls: 'macro', name: 'Medium macrofouling',   desc: '16–40% of the area' },
        { v: 4, cls: 'macro', name: 'Heavy macrofouling',    desc: '41–100% of the area' }
    ];

    var LOF = [
        { v: 0, cls: 'none',  name: 'No visible fouling',    desc: 'Completely clean' },
        { v: 1, cls: 'soft',  name: 'Slime only',            desc: 'Biofilm. No macrofouling' },
        { v: 2, cls: 'macro', name: 'Light fouling',         desc: '1–5% cover, typically a single taxon' },
        { v: 3, cls: 'macro', name: 'Considerable fouling',  desc: '6–15% cover' },
        { v: 4, cls: 'macro', name: 'Extensive fouling',     desc: '16–40% cover, more than one taxon' },
        { v: 5, cls: 'macro', name: 'Very heavy fouling',    desc: '41–100% cover' }
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

    var STEP = {
        imo: {
            title: 'IMO fouling rating',
            hint: 'Rate the worst square metre in the area, not the average. The IMO assigns an area the highest rating found in it.'
        },
        fr: {
            title: 'What is growing',
            hint: 'Rate the worst square metre in the area, not the average. Both the IMO and NSTM assign an area the highest rating found in it.'
        },
        lof: {
            title: 'Level of fouling',
            hint: 'Floerl’s rank is driven by cover and, at some ranks, whether more than one taxon is present. Rate the worst square metre, not the average.'
        }
    };

    var state = { source: 'imo', fr: 50, lof: 4, imo: 3, cover: 25, taxa: true, coat: 'spc' };

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

    function rungValue() {
        if (state.source === 'fr') return state.fr;
        if (state.source === 'lof') return state.lof;
        return state.imo;
    }

    function coverRange() {
        if (state.source === 'imo') {
            if (state.imo === 0) return { min: 0, max: 0, set: 0, disabled: true };
            if (state.imo === 1) return { min: 0, max: 100, set: state.cover, disabled: false };
            if (state.imo === 2) return { min: 1, max: 15, set: 10, disabled: false };
            if (state.imo === 3) return { min: 16, max: 40, set: 25, disabled: false };
            return { min: 41, max: 100, set: 70, disabled: false };
        }
        if (state.source === 'lof') {
            if (state.lof === 0) return { min: 0, max: 0, set: 0, disabled: true };
            if (state.lof === 1) return { min: 0, max: 100, set: state.cover, disabled: false };
            if (state.lof === 2) return { min: 1, max: 5, set: 3, disabled: false };
            if (state.lof === 3) return { min: 6, max: 15, set: 10, disabled: false };
            if (state.lof === 4) return { min: 16, max: 40, set: 25, disabled: false };
            return { min: 41, max: 100, set: 70, disabled: false };
        }
        if (state.fr === 0) return { min: 0, max: 0, set: 0, disabled: true };
        if (state.fr < 30) return { min: 0, max: 100, set: state.cover, disabled: false };
        return { min: 1, max: 100, set: Math.max(state.cover, 1), disabled: false };
    }

    function applyCoverRange(snapIfOutside) {
        var r = coverRange();
        coverEl.min = r.min;
        coverEl.max = r.max;
        coverEl.disabled = r.disabled;
        if (r.disabled) {
            state.cover = 0;
            coverEl.value = 0;
            return r;
        }
        if (snapIfOutside && (state.cover < r.min || state.cover > r.max)) {
            state.cover = r.set;
        } else if (state.cover < r.min) {
            state.cover = r.min;
        } else if (state.cover > r.max) {
            state.cover = r.max;
        }
        coverEl.value = state.cover;
        return r;
    }

    function convert() {
        var band = bandFor(state.cover);
        var out = {
            fr: state.fr,
            frExact: true,
            frText: 'FR-' + state.fr,
            lof: 0,
            imo: 0,
            macro: false,
            micro: false,
            band: band,
            lofAmbiguous: false
        };

        if (state.source === 'fr') {
            out.macro = state.fr >= 30;
            out.micro = state.fr > 0 && !out.macro;
            if (state.fr === 0) { out.lof = 0; out.imo = 0; }
            else if (out.micro) { out.lof = 1; out.imo = 1; }
            else { out.lof = band.lof; out.imo = band.imo; }
            out.lofAmbiguous = (out.macro && state.cover <= 5 && state.taxa)
                || (out.macro && state.cover >= 16 && state.cover <= 40 && !state.taxa);
            return out;
        }

        if (state.source === 'imo') {
            out.imo = state.imo;
            out.macro = state.imo >= 2;
            out.micro = state.imo === 1;
            if (state.imo === 0) {
                out.fr = 0; out.frExact = true; out.frText = 'FR-0'; out.lof = 0;
            } else if (state.imo === 1) {
                out.fr = 10; out.frExact = false; out.frText = 'FR-10–20'; out.lof = 1;
            } else {
                out.fr = 50; out.frExact = false; out.frText = 'FR-30–100';
                out.lof = band.lof;
                out.lofAmbiguous = (state.imo === 2 && state.cover <= 5 && state.taxa)
                    || (state.imo === 3 && !state.taxa);
            }
            return out;
        }

        out.lof = state.lof;
        out.macro = state.lof >= 2;
        out.micro = state.lof === 1;
        if (state.lof === 0) {
            out.fr = 0; out.frExact = true; out.frText = 'FR-0'; out.imo = 0;
        } else if (state.lof === 1) {
            out.fr = 10; out.frExact = false; out.frText = 'FR-10–20'; out.imo = 1;
        } else {
            out.fr = 50; out.frExact = false; out.frText = 'FR-30–100';
            out.imo = state.lof <= 3 ? 2 : state.lof === 4 ? 3 : 4;
        }
        return out;
    }

    function ladderItems() {
        if (state.source === 'fr') return FR;
        if (state.source === 'lof') return LOF;
        return IMO;
    }

    function ladderCode(item) {
        if (state.source === 'fr') return 'FR-' + item.v;
        if (state.source === 'lof') return 'LoF ' + item.v;
        return 'IMO ' + item.v;
    }

    function buildLadder() {
        var items = ladderItems();
        var selected = rungValue();
        var html = '';
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (state.source === 'fr' && item.v === 30) html += '<div class="brk imo"><span>micro / macro — IMO</span><span class="line"></span></div>';
            if (state.source === 'fr' && item.v === 40) html += '<div class="brk nstm"><span>soft / hard — FR scale</span><span class="line"></span></div>';
            if ((state.source === 'imo' || state.source === 'lof') && item.v === 2) {
                html += '<div class="brk imo"><span>micro / macro</span><span class="line"></span></div>';
            }
            html += '<label class="rung ' + item.cls + (item.v === selected ? ' is-on' : '') + '" data-v="' + item.v + '">'
                + '<input type="radio" name="rung" value="' + item.v + '"' + (item.v === selected ? ' checked' : '') + '>'
                + '<span class="code">' + ladderCode(item) + '</span>'
                + '<span><span class="name">' + item.name + '</span><span class="desc">' + item.desc + '</span></span>'
                + '</label>';
        }
        ladder.innerHTML = html;
        document.getElementById('stepTitle').textContent = STEP[state.source].title;
        document.getElementById('stepHint').textContent = STEP[state.source].hint;
        ladder.setAttribute('aria-label', STEP[state.source].title);
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

    function markRungs() {
        var selected = rungValue();
        var rungs = ladder.querySelectorAll('.rung');
        for (var i = 0; i < rungs.length; i++) {
            var on = parseInt(rungs[i].dataset.v, 10) === selected;
            rungs[i].classList.toggle('is-on', on);
            rungs[i].querySelector('input').checked = on;
        }
    }

    function representativeFr(out) {
        if (out.frExact) return out.fr;
        if (out.imo === 0) return 0;
        if (out.imo === 1) return 10;
        if (state.fr >= 30) return state.fr;
        return 50;
    }

    function setSource(next) {
        if (next === state.source) return;
        var out = convert();
        state.lof = out.lof;
        state.imo = out.imo;
        if (next === 'fr') state.fr = representativeFr(out);
        state.source = next;
        applyCoverRange(true);
        buildLadder();
        render();
    }

    function setRung(v) {
        if (state.source === 'fr') {
            var leavingClean = state.fr === 0 && v !== 0;
            state.fr = v;
            if (leavingClean && state.cover < 1) state.cover = 25;
        } else if (state.source === 'imo') {
            state.imo = v;
        } else {
            state.lof = v;
        }
        applyCoverRange(true);
        markRungs();
        render();
    }

    document.querySelector('.readout').addEventListener('click', function (e) {
        var btn = e.target.closest('[data-source]');
        if (!btn) return;
        setSource(btn.dataset.source);
    });

    document.querySelector('.scale-dock').addEventListener('click', function (e) {
        var btn = e.target.closest('[data-source]');
        if (!btn) return;
        setSource(btn.dataset.source);
        document.querySelector('.scale-stack').scrollIntoView({ block: 'start' });
    });

    ladder.addEventListener('change', function (e) {
        if (e.target.name !== 'rung') return;
        setRung(parseInt(e.target.value, 10));
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
        var lo = parseInt(btn.dataset.lo, 10);
        var b = bandFor(lo === 0 ? 0 : next);
        if (isNaN(next)) return;
        if (state.source === 'imo') {
            state.imo = (lo === 0) ? 1 : b.imo;
            state.cover = next;
            applyCoverRange(false);
            markRungs();
        } else if (state.source === 'lof') {
            state.lof = (lo === 0) ? 1 : b.lof;
            state.cover = next;
            applyCoverRange(false);
            markRungs();
        } else {
            state.cover = next;
            coverEl.value = next;
        }
        render();
    });

    function dashRange(txt) {
        return txt.replace('–', ' to ');
    }

    function render() {
        applyCoverRange(false);
        var out = convert();
        var f = frRec(state.fr);
        var coverPanel = document.getElementById('coverPanel');
        var taxaRow = document.getElementById('taxaRow');
        var range = coverRange();

        coverPanel.classList.toggle('is-disabled', range.disabled);
        var showTaxa = out.macro && state.source !== 'lof';
        taxaRow.classList.toggle('is-off', !showTaxa);

        document.getElementById('coverLabel').textContent =
            range.disabled ? 'Cover (not applicable to a clean surface)'
            : out.macro ? 'Macrofouling cover of the area'
            : 'Microfouling cover of the area';
        document.getElementById('coverVal').textContent = state.cover + '%';

        var chips = document.querySelectorAll('#bands .band');
        for (var i = 0; i < chips.length; i++) {
            var lo = parseInt(chips[i].dataset.lo, 10);
            var hi = parseInt(chips[i].dataset.hi, 10);
            var on = out.macro && state.cover >= lo && state.cover <= hi;
            var off = range.disabled && hi > 0;
            chips[i].classList.toggle('on', on);
            chips[i].disabled = off;
        }

        document.getElementById('coverNote').textContent =
            range.disabled ? 'A clean surface is LoF 0 and IMO 0 — cover does not apply.'
            : out.micro ? 'Biofilm is LoF 1 and IMO 1 at any cover. The percentage rides with the rating but does not change LoF or IMO.'
            : state.source === 'imo' && state.imo === 2 ? 'Cover splits LoF 2 (1 to 5%) from LoF 3 (6 to 15%). The IMO rating stays 2 either way. The FR stays a range.'
            : state.source === 'imo' ? 'Cover sits inside this IMO band. LoF follows the band. The FR is not pinned — open the FR scale to say what is growing.'
            : state.source === 'lof' ? 'Cover sits inside this LoF rank. IMO follows, except that LoF 2 and 3 both become IMO 2.'
            : 'LoF and IMO follow the cover band. The FR is read from what is growing, not from how much of it there is.';

        document.getElementById('oFR').textContent = out.frText;
        document.getElementById('sFR').textContent = !out.frExact
            ? (out.imo === 1 ? 'Incipient or advanced slime' : 'Any macrofouling growth') + ', over ' + state.cover + '% of area'
            : state.fr === 0 ? 'Clean'
            : (f.cls === 'hard' ? 'Hard fouling' : 'Soft fouling') + ', over ' + state.cover + '% of area';
        document.getElementById('oLOF').textContent = out.lof;
        document.getElementById('sLOF').textContent = LOF_NAME[out.lof] + (out.lofAmbiguous ? ' — ambiguous' : '');
        document.getElementById('oIMO').textContent = out.imo;
        document.getElementById('sIMO').textContent = IMO_NAME[out.imo];
        document.getElementById('lofCard').classList.toggle('is-ambiguous', out.lofAmbiguous);

        document.getElementById('dockFR').textContent = out.frText;
        document.getElementById('dockLOF').textContent = out.lof;
        document.getElementById('dockIMO').textContent = out.imo;

        var sources = ['fr', 'lof', 'imo'];
        for (var s = 0; s < sources.length; s++) {
            var id = sources[s];
            var on = state.source === id;
            var card = document.getElementById(id + 'Card');
            card.classList.toggle('is-source', on);
            card.setAttribute('aria-pressed', on ? 'true' : 'false');
        }
        var dockBtns = document.querySelectorAll('.scale-dock [data-source]');
        for (var d = 0; d < dockBtns.length; d++) {
            var isOn = dockBtns[d].dataset.source === state.source;
            dockBtns[d].classList.toggle('is-source', isOn);
            dockBtns[d].setAttribute('aria-pressed', isOn ? 'true' : 'false');
        }

        var action = out.imo >= 2 ? ' Reactive cleaning with capture recommended, to a target of rating 1 or below.'
            : out.imo === 1 ? ' Within the BFMP target of rating 1 or below. Proactive cleaning may be appropriate.'
            : ' Within the BFMP target of rating 1 or below.';
        var coverBit = (out.imo === 0 && out.frExact && state.fr === 0) ? '' : ' over ' + state.cover + '% of area';
        var line;
        if (state.source === 'imo') {
            line = 'IMO rating ' + out.imo
                + (out.macro ? ', ' + dashRange(out.band.txt) + ' macrofouling cover' : coverBit)
                + ' (LoF ' + out.lof + '; ' + out.frText + ').' + action;
        } else if (state.source === 'lof') {
            line = 'LoF ' + out.lof + coverBit
                + ' (IMO rating ' + out.imo + '; ' + out.frText + ').' + action;
        } else {
            line = 'FR-' + state.fr + (state.fr === 0 ? '' : ' over ' + state.cover + '% of area')
                + ' (LoF ' + out.lof + '; IMO rating ' + out.imo
                + (out.macro ? ', ' + dashRange(out.band.txt) + ' macrofouling cover' : '') + ').' + action;
        }
        document.getElementById('reportLine').textContent = line;

        var flags = [];
        if (state.source === 'fr' && state.fr === 30) {
            flags.push('<b>Class mismatch.</b> The NSTM calls FR-30 soft fouling, but the IMO definition of macrofouling covers algal fronds and filaments, bryozoans and sea squirts. This reading is macrofouling under MEPC.378(80) and rates 2 or above, not 1.');
        }
        if (out.lofAmbiguous && state.cover <= 5) {
            flags.push('<b>LoF is ambiguous here.</b> Floerl’s rank 2 specifies a single taxon. With several taxa at ' + state.cover + '% cover the reading sits between rank 2 and rank 3. The IMO rating is unaffected.');
        }
        if (out.lofAmbiguous && state.cover >= 16) {
            flags.push('<b>LoF is ambiguous here.</b> Floerl’s rank 4 specifies more than one taxon. A single-taxon assemblage at ' + state.cover + '% cover sits between rank 3 and rank 4. The IMO rating is unaffected.');
        }
        if (!out.frExact && out.macro) {
            flags.push('<b>The FR is not pinned.</b> ' + (state.source === 'imo' ? 'An IMO rating' : 'A LoF rank') + ' on its own does not say what is growing. Open the FR scale to name the growth if you need an NSTM fouling rating or cleaning criterion.');
        }
        var flagsEl = document.getElementById('flags');
        flagsEl.innerHTML = flags.map(function (t) {
            return '<div class="flag"><div>' + t + '</div></div>';
        }).join('');
        flagsEl.hidden = flags.length === 0;

        var t = [];
        if (out.imo >= 2) {
            t.push(['no', 'IMO', 'Cleaning with capture recommended', 'MEPC.378(80) table 1 and para. 9.9. Shorten the interval to the next inspection. If the AFS is significantly deteriorated, dry-dock for maintenance and reapplication.']);
            t.push(['no', '9.4.1', 'Proactive cleaning without capture not permitted', 'Only allowed at rating 1 or below.']);
            t.push(['no', '10.2', 'BFMP target not met', 'The plan should be maintaining rating 1 or below.']);
        } else if (out.imo === 1) {
            t.push(['yes', 'IMO', 'No reactive cleaning triggered', 'Proactive cleaning may be recommended under para. 9.4.']);
            t.push(['yes', '9.4.1', 'Proactive cleaning without capture permitted', 'Rating is 1 or below. Must still be done in an area accepted by the relevant authority.']);
            t.push(['yes', '10.2', 'BFMP target met', 'Rating 1 or below.']);
        } else {
            t.push(['yes', 'IMO', 'No action triggered', 'Surface entirely clean.']);
            t.push(['yes', '10.2', 'BFMP target met', 'Rating 1 or below.']);
        }

        if (out.frExact) {
            var usnFires = state.coat === 'spc'
                ? (state.fr >= 40 && state.cover >= 20)
                : (state.fr >= 50 && state.cover >= 10);
            var usnRule = state.coat === 'spc'
                ? 'Full hull clean at FR-40 or greater over 20% of the hull, excluding docking block areas and appendages.'
                : 'At FR-50 or greater over 10% of the hull, NAVSEA 00C is contacted for cleaning advice.';
            t.push([
                usnFires ? 'no' : 'yes',
                'FR scale',
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
        } else if (out.imo < 2) {
            t.push(['yes', 'FR scale', 'Cleaning criterion not met', 'Slime and clean surfaces sit below the NSTM hull-clean thresholds.']);
            t.push(['info', 'Class', out.imo === 0 ? 'No fouling' : 'Soft fouling', 'Low removal forces. Gentler methods will generally clear it without cutting into the coating.']);
        } else {
            t.push(['info', 'FR scale', 'Growth type not specified', 'Open the FR scale to say what is growing. NSTM cleaning criteria need an FR and a cover figure.']);
            t.push(['info', 'Class', 'Soft or hard', 'Macrofouling on the IMO / LoF scales may be grass (FR-30) or calcareous growth (FR-40 and above). Open the FR scale to say which.']);
        }

        document.getElementById('triggers').innerHTML = t.map(function (row) {
            return '<div class="trig"><span class="pip ' + row[0] + '">' + row[1] + '</span><div><strong>' + row[2] + '</strong><span>' + row[3] + '</span></div></div>';
        }).join('');

        var w = [];
        if (state.source === 'fr') {
            w.push('<li><code>FR-' + state.fr + '</code> read directly from the growth description. The cover figure rides alongside it rather than changing it.</li>');
            if (state.fr === 0) {
                w.push('<li><code>LoF 0</code> and <code>IMO 0</code> both mean an entirely clean surface with no biofilm.</li>');
            } else if (out.micro) {
                w.push('<li><code>LoF 1</code> and <code>IMO 1</code>: biofilm with no macrofouling. Neither scale bands microfouling by cover, so the percentage does not move the rating.</li>');
            } else {
                w.push('<li><code>LoF ' + out.lof + '</code> from Floerl et al. 2005: ' + dashRange(out.band.txt) + ' macrofouling cover.</li>');
                w.push('<li><code>IMO ' + out.imo + '</code> from MEPC.378(80) table 1: ' + dashRange(out.band.txt) + ' falls in the ' + out.band.cap + ' macrofouling band.</li>');
                if (out.imo === 2) w.push('<li>The IMO merges LoF 2 and LoF 3 into a single rating 2 covering 1 to 15%, so LoF converts to IMO but not back again.</li>');
            }
        } else if (state.source === 'imo') {
            w.push('<li><code>IMO ' + out.imo + '</code> read from MEPC.378(80) table 1.</li>');
            if (out.imo === 0) {
                w.push('<li><code>LoF 0</code> and <code>FR-0</code> are the only matches for a completely clean surface.</li>');
            } else if (out.micro) {
                w.push('<li><code>LoF 1</code> and <code>FR-10</code> to <code>FR-20</code>: biofilm with no macrofouling.</li>');
            } else {
                w.push('<li><code>LoF ' + out.lof + '</code> from the cover band (' + dashRange(out.band.txt) + '). IMO 2 is the one rating that still splits on cover into LoF 2 and LoF 3.</li>');
                w.push('<li><code>' + out.frText + '</code>: any macrofouling growth can sit at this cover. The FR is a type scale, not a cover scale.</li>');
            }
        } else {
            w.push('<li><code>LoF ' + out.lof + '</code> read from Floerl et al. 2005.</li>');
            if (out.lof === 0) {
                w.push('<li><code>IMO 0</code> and <code>FR-0</code> are the only matches for a completely clean surface.</li>');
            } else if (out.micro) {
                w.push('<li><code>IMO 1</code> and <code>FR-10</code> to <code>FR-20</code>: slime only.</li>');
            } else {
                w.push('<li><code>IMO ' + out.imo + '</code>' + (out.lof === 2 || out.lof === 3 ? ': LoF 2 and LoF 3 both fall in IMO 2 (1 to 15%).' : ' from the matching cover band.') + '</li>');
                w.push('<li><code>' + out.frText + '</code>: LoF does not name the growth, so the FR stays a range.</li>');
            }
        }
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
