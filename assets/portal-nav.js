(function () {
    var mount = document.getElementById('portal-chrome') || document.getElementById('portal-nav');
    if (!mount) return;

    document.body.classList.add('has-portal-chrome');

    var active = mount.dataset.active || 'portal';
    var base = mount.dataset.base || '';
    var qrSrc = base + 'assets/qrCodeTongaApp.png';

    var tabs = [
        { id: 'portal', href: base + 'index.html', icon: '🏠', label: 'Portal' },
        { id: 'calculator', href: base + 'calculator/index.html', icon: '📊', label: 'Calculator' },
        { id: 'report', href: base + 'report/index.html', icon: '📋', label: 'Inspection Report' },
        { id: 'bfmp', href: base + 'bfmp/index.html', icon: '📄', label: 'BFMP Generator' }
    ];

    var chrome = document.createElement('div');
    chrome.className = 'portal-chrome';

    var topbar = document.createElement('div');
    topbar.className = 'portal-topbar';
    topbar.innerHTML =
        '<div class="container">' +
            '<span><strong>IMO–Norad TEST Biofouling Project</strong> · National Demonstration &amp; Training</span>' +
            '<span class="topbar-actions">' +
                '<button type="button" class="qr-toggle" aria-pressed="false" aria-controls="portal-qr-panel">Show QR Code</button>' +
                '<span class="tag">Participant Portal — no login required</span>' +
            '</span>' +
        '</div>';

    var nav = document.createElement('nav');
    nav.className = 'portal-tabs';
    nav.setAttribute('aria-label', 'Workshop resources');

    var inner = document.createElement('div');
    inner.className = 'container';

    tabs.forEach(function (tab) {
        var link = document.createElement('a');
        link.className = 'portal-tab' + (tab.id === active ? ' active' : '');
        link.href = tab.href;
        if (tab.id === active) link.setAttribute('aria-current', 'page');
        link.innerHTML = '<span class="ic">' + tab.icon + '</span> ' + tab.label;
        inner.appendChild(link);
    });

    nav.appendChild(inner);
    chrome.appendChild(topbar);
    chrome.appendChild(nav);
    mount.replaceWith(chrome);

    var hero = document.querySelector('header.portal-page-hero');
    var toggle = chrome.querySelector('.qr-toggle');
    if (!hero || !toggle) return;

    var heroChildren = Array.prototype.slice.call(hero.childNodes);
    var qrPanel = null;
    var showing = false;

    function buildQrPanel() {
        var panel = document.createElement('div');
        panel.id = 'portal-qr-panel';
        panel.className = 'portal-qr-panel container';
        panel.setAttribute('role', 'region');
        panel.setAttribute('aria-label', 'App QR code');
        panel.innerHTML =
            '<p class="portal-qr-kicker">Scan to open the participant portal</p>' +
            '<img class="portal-qr-img" src="' + qrSrc + '" alt="QR code linking to the Tonga participant portal" width="480" height="480">' +
            '<p class="portal-qr-hint">Point your phone camera at the code</p>';
        return panel;
    }

    function showQr() {
        if (showing) return;
        showing = true;
        heroChildren.forEach(function (node) { hero.removeChild(node); });
        qrPanel = buildQrPanel();
        hero.appendChild(qrPanel);
        hero.classList.add('portal-page-hero--qr');
        toggle.textContent = 'Hide QR Code';
        toggle.setAttribute('aria-pressed', 'true');
        document.body.classList.add('qr-mode');
    }

    function hideQr() {
        if (!showing) return;
        showing = false;
        if (qrPanel && qrPanel.parentNode === hero) hero.removeChild(qrPanel);
        qrPanel = null;
        heroChildren.forEach(function (node) { hero.appendChild(node); });
        hero.classList.remove('portal-page-hero--qr');
        toggle.textContent = 'Show QR Code';
        toggle.setAttribute('aria-pressed', 'false');
        document.body.classList.remove('qr-mode');
    }

    toggle.addEventListener('click', function () {
        if (showing) hideQr();
        else showQr();
    });
})();
