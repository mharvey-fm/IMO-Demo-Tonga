/**
 * Course library: Inspection and In-water cleaning folders.
 * Activity 6 is the same PDF in both.
 */
(function (global) {
    var ROOT = '../courseMaterial/';
    var CLEANING = ROOT + 'In-water cleaning course/';
    var INSPECTION = ROOT + 'Inspection/';

    var tracks = {
        cleaning: {
            id: 'cleaning',
            kicker: '',
            title: 'In-water cleaning',
            short: 'Cleaning course',
            icon: '🧽',
            lede: 'Activities, MV Example inspection records, ports-of-call register, and in-water cleaning policy.',
            hint: ''
        },
        inspection: {
            id: 'inspection',
            kicker: '',
            title: 'In-water inspections',
            short: 'Inspections',
            icon: '🔍',
            lede: 'BFS1906 participants manual and Activity 6 fouling rating / percentage cover guide.',
            hint: ''
        }
    };

    var docs = [
        {
            id: 'activity-2',
            tracks: ['cleaning'],
            order: 2,
            kind: 'activity',
            activity: 'Activity 2',
            title: 'Aus and NZ Biofouling Management Requirements for Activity 2',
            blurb: '',
            meta: 'PDF · 5 pages',
            file: CLEANING + 'Aus and NZ Biofouling Management Requirements for Activity 2.pdf'
        },
        {
            id: 'activity-6',
            tracks: ['cleaning', 'inspection'],
            order: 1,
            kind: 'guide',
            activity: 'Activity 6',
            title: 'Activity 6 - Biofouling and Percentage Cover Guides',
            blurb: '',
            meta: 'PDF · 1 page',
            shared: true,
            file: CLEANING + 'Activity 6 - Biofouling and Percentage Cover Guides_compressed.pdf'
        },
        {
            id: 'scenario-1',
            tracks: ['cleaning'],
            order: 4,
            kind: 'scenario',
            activity: 'Scenario 1',
            title: 'Scenario 1 Inspection Report',
            blurb: '',
            meta: 'PDF',
            file: CLEANING + 'Scenario 1 Inspection Report.pdf'
        },
        {
            id: 'scenario-2',
            tracks: ['cleaning'],
            order: 6,
            kind: 'scenario',
            activity: 'Scenario 2',
            title: 'Scenario 2 Biofouling Inspection of the MV Example — November 2018',
            blurb: '',
            meta: 'PDF',
            file: CLEANING + 'Scenario 2 Biofouling Inspection of the MV Example_November 2018_V1.0_compressed.pdf'
        },
        {
            id: 'mv-example-sep',
            tracks: ['cleaning'],
            order: 5,
            kind: 'scenario',
            activity: 'Case study',
            title: 'Biofouling Inspection of the MV Example — September 2018',
            blurb: '',
            meta: 'PDF',
            file: CLEANING + 'Biofouling Inspection of the MV Example_September 2018_V1.0_compressed.pdf'
        },
        {
            id: 'ports-of-call',
            tracks: ['cleaning'],
            order: 3,
            kind: 'worksheet',
            activity: 'Supporting record',
            title: 'Ports of Call Register MV Example',
            blurb: '',
            meta: 'PDF · 1 page',
            file: CLEANING + 'Ports of Call Register MV Example.pdf'
        },
        {
            id: 'cleaning-policy',
            tracks: ['cleaning'],
            order: 7,
            kind: 'policy',
            activity: 'Policy example',
            title: 'In-water Biofouling Cleaning Policy for Vessels arriving from Interstate or Overseas',
            blurb: '',
            meta: 'PDF',
            file: CLEANING + 'In-water Biofouling Cleaning Policy for Vessels arriving from Interstate or Overseas (1).pdf'
        },
        {
            id: 'participants-manual',
            tracks: ['inspection'],
            order: 0,
            kind: 'manual',
            activity: 'BFS1906 · V2.0',
            title: 'BFS1906 IMO Participants Manual — In-Water Inspections V2.0',
            blurb: '',
            meta: 'PDF · ~150 pages · ~8 MB',
            file: INSPECTION + 'BFS1906 IMO Participants Manual_In-Water Inspections_V2.0 (1)_compressed (1).pdf'
        }
    ];

    var quiz = {
        id: 'activity-1',
        tracks: ['cleaning'],
        module: 'Module 2 – Understanding Fundamentals',
        title: 'Let’s Test Your Knowledge',
        activity: 'Activity 1',
        intro: 'Split into groups of 5-6, discuss and answer the following questions. When completed, select a spokesperson for your group and we will discuss the answers together.',
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
