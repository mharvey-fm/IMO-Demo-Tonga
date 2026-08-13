/**
 * Participant course library — two tracks matching the printed pack.
 * Activity 6 is the same PDF in both folders; the quiz replaces the Word worksheet.
 */
(function (global) {
    var ROOT = '../courseMaterial/';
    var CLEANING = ROOT + 'In-water cleaning course/';
    var INSPECTION = ROOT + 'Inspection/';

    var tracks = {
        cleaning: {
            id: 'cleaning',
            kicker: 'Track 1',
            title: 'In-water cleaning',
            short: 'Cleaning course',
            icon: '🧽',
            lede: 'Activities, worked scenarios and policy for deciding when and how a hull may be cleaned — including capture of defouled material.',
            hint: 'Use these during the group tables. Start with Activity 1, then the scenarios.'
        },
        inspection: {
            id: 'inspection',
            kicker: 'Track 2',
            title: 'In-water inspections',
            short: 'Inspections',
            icon: '🔍',
            lede: 'The participants manual for conducting and interpreting in-water inspections, plus the shared fouling-rating slide.',
            hint: 'The manual is the reading pack for this track. The rating guide is the same slide used in the cleaning course.'
        }
    };

    var docs = [
        {
            id: 'activity-2',
            tracks: ['cleaning'],
            order: 2,
            kind: 'activity',
            activity: 'Activity 2',
            title: 'Australia and New Zealand biofouling management requirements',
            blurb: 'Side-by-side requirements used to compare how two neighbouring administrations manage arriving vessels — the worksheet for Activity 2.',
            meta: 'PDF · 5 pages',
            file: CLEANING + 'Aus and NZ Biofouling Management Requirements for Activity 2.pdf'
        },
        {
            id: 'activity-6',
            tracks: ['cleaning', 'inspection'],
            order: 1,
            kind: 'guide',
            activity: 'Activity 6',
            title: 'Biofouling and percentage cover guides',
            blurb: 'One-page visual reference for fouling ratings and percentage cover. The same slide is in both the cleaning course and the inspection pack — open it beside a scenario or the live demo.',
            meta: 'PDF · 1 page · used in both tracks',
            shared: true,
            file: CLEANING + 'Activity 6 - Biofouling and Percentage Cover Guides_compressed.pdf'
        },
        {
            id: 'scenario-1',
            tracks: ['cleaning'],
            order: 4,
            kind: 'scenario',
            activity: 'Scenario 1',
            title: 'Inspection report — MV Example',
            blurb: 'Worked inspection report for the first table-top scenario. Use it with the ports-of-call register and the rating guide.',
            meta: 'PDF · inspection report',
            file: CLEANING + 'Scenario 1 Inspection Report.pdf'
        },
        {
            id: 'scenario-2',
            tracks: ['cleaning'],
            order: 6,
            kind: 'scenario',
            activity: 'Scenario 2',
            title: 'Biofouling inspection of the MV Example — November 2018',
            blurb: 'Second scenario: a later inspection of the same example vessel. Compare change over time with the September record.',
            meta: 'PDF · case study',
            file: CLEANING + 'Scenario 2 Biofouling Inspection of the MV Example_November 2018_V1.0_compressed.pdf'
        },
        {
            id: 'mv-example-sep',
            tracks: ['cleaning'],
            order: 5,
            kind: 'scenario',
            activity: 'Case study',
            title: 'Biofouling inspection of the MV Example — September 2018',
            blurb: 'Baseline inspection record for MV Example. Pair with Scenario 2 (November) and the ports-of-call register.',
            meta: 'PDF · case study',
            file: CLEANING + 'Biofouling Inspection of the MV Example_September 2018_V1.0_compressed.pdf'
        },
        {
            id: 'ports-of-call',
            tracks: ['cleaning'],
            order: 3,
            kind: 'worksheet',
            activity: 'Supporting record',
            title: 'Ports of call register — MV Example',
            blurb: 'Where the example vessel has been. Essential for the “same waters” discussion in Activity 1 and for biosecurity risk in the scenarios.',
            meta: 'PDF · 1 page',
            file: CLEANING + 'Ports of Call Register MV Example.pdf'
        },
        {
            id: 'cleaning-policy',
            tracks: ['cleaning'],
            order: 7,
            kind: 'policy',
            activity: 'Policy example',
            title: 'In-water biofouling cleaning policy — interstate or overseas arrivals',
            blurb: 'Example administration policy (Tasmania NRE template) for vessels arriving from interstate or overseas. Use it when discussing capture of defouled material.',
            meta: 'PDF · policy',
            file: CLEANING + 'In-water Biofouling Cleaning Policy for Vessels arriving from Interstate or Overseas (1).pdf'
        },
        {
            id: 'participants-manual',
            tracks: ['inspection'],
            order: 0,
            kind: 'manual',
            activity: 'BFS1906 · V2.0',
            title: 'Participants manual — in-water inspections',
            blurb: 'Core reading for the inspection track: methods, rating practice and how to document what the ROV (or diver) actually saw.',
            meta: 'PDF · ~150 pages · ~8 MB',
            file: INSPECTION + 'BFS1906 IMO Participants Manual_In-Water Inspections_V2.0 (1)_compressed (1).pdf'
        }
    ];

    var quiz = {
        id: 'activity-1',
        tracks: ['cleaning'],
        module: 'Module 2 — Understanding fundamentals',
        title: 'Let’s test your knowledge',
        activity: 'Activity 1',
        intro: 'Split into groups of 5–6. Discuss each question, then record your group’s answers here. When you are done, choose a spokesperson — we will discuss the answers together.',
        storageKey: 'tonga-course-quiz-v1'
    };

    function docById(id) {
        for (var i = 0; i < docs.length; i++) {
            if (docs[i].id === id) return docs[i];
        }
        return null;
    }

    function docsForTrack(trackId) {
        var list = [];
        for (var i = 0; i < docs.length; i++) {
            if (docs[i].tracks.indexOf(trackId) !== -1) list.push(docs[i]);
        }
        return list;
    }

    function viewerUrl(docId, trackId) {
        return 'viewer.html?id=' + encodeURIComponent(docId) + '&track=' + encodeURIComponent(trackId || 'cleaning');
    }

    function fileUrl(file) {
        return encodeURI(file);
    }

    global.COURSE = {
        tracks: tracks,
        docs: docs,
        quiz: quiz,
        docById: docById,
        docsForTrack: docsForTrack,
        viewerUrl: viewerUrl,
        fileUrl: fileUrl
    };
})(window);
