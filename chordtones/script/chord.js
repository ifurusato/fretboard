/*
 * JavaScript for Barkhausen Fretboard: Chord Tones
 * Copyright 2015-2026 Murray Altheim. All Rights Reserved.
 */

  var rootColor = '#2772de',
    defaultColor = '#3a5f94',
    openStrings = [4, 11, 7, 2, 9, 4],
    fretCount = 24,
    windowSize = 4,
    markers = [3, 5, 7, 9, 15, 17, 19, 21],
    rootNames = ["C", "C♯/D♭", "D", "D♯/E♭", "E", "F", "F♯/G♭", "G", "G♯/A♭", "A", "A♯/B♭", "B"],
    qualityGroups = ["Triads", "Sixths", "Sevenths"],
    qualities = [
      { group: "Triads", id: "maj", name: "Major", tones: [[0, "R"], [4, "3"], [7, "5"]] },
      { group: "Triads", id: "min", name: "Minor", tones: [[0, "R"], [3, "♭3"], [7, "5"]] },
      { group: "Triads", id: "dim", name: "Diminished", tones: [[0, "R"], [3, "♭3"], [6, "♭5"]] },
      { group: "Triads", id: "aug", name: "Augmented", tones: [[0, "R"], [4, "3"], [8, "♯5"]] },
      { group: "Triads", id: "sus2", name: "Sus2", tones: [[0, "R"], [2, "2"], [7, "5"]] },
      { group: "Triads", id: "sus4", name: "Sus4", tones: [[0, "R"], [5, "4"], [7, "5"]] },
      { group: "Sixths", id: "6", name: "6", tones: [[0, "R"], [4, "3"], [7, "5"], [9, "6"]] },
      { group: "Sixths", id: "m6", name: "Minor 6", tones: [[0, "R"], [3, "♭3"], [7, "5"], [9, "6"]] },
      { group: "Sevenths", id: "maj7", name: "Major 7", tones: [[0, "R"], [4, "3"], [7, "5"], [11, "7"]] },
      { group: "Sevenths", id: "dom7", name: "Dominant 7", tones: [[0, "R"], [4, "3"], [7, "5"], [10, "♭7"]] },
      { group: "Sevenths", id: "dom7sus4", name: "Dominant 7 sus4", tones: [[0, "R"], [5, "4"], [7, "5"], [10, "♭7"]] },
      { group: "Sevenths", id: "aug7", name: "Augmented 7 (7♯5)", tones: [[0, "R"], [4, "3"], [8, "♯5"], [10, "♭7"]] },
      { group: "Sevenths", id: "min7", name: "Minor 7", tones: [[0, "R"], [3, "♭3"], [7, "5"], [10, "♭7"]] },
      { group: "Sevenths", id: "minmaj7", name: "Minor-major 7", tones: [[0, "R"], [3, "♭3"], [7, "5"], [11, "7"]] },
      { group: "Sevenths", id: "m7b5", name: "Half-diminished (m7♭5)", tones: [[0, "R"], [3, "♭3"], [6, "♭5"], [10, "♭7"]] },
      { group: "Sevenths", id: "dim7", name: "Diminished 7", tones: [[0, "R"], [3, "♭3"], [6, "♭5"], [9, "6"]] }
    ],
    extensions = [
      { semi: 2, label: "9" },
      { semi: 1, label: "♭9" },
      { semi: 3, label: "♯9" },
      { semi: 6, label: "♭5" },
      { semi: 8, label: "♯5" },
      { semi: 5, label: "11" },
      { semi: 6, label: "♯11" },
      { semi: 9, label: "13" },
      { semi: 8, label: "♭13" }
    ],
    positions = [],
    displayBase = 0,
    pendingBase = null,
    storageKey = 'chordTones.settings',
    currentTones = [],
    currentRoot = 0;

  function svgNode(name, attrs, text) {
    var node = document.createElementNS('http://www.w3.org/2000/svg', name);
    Object.keys(attrs).forEach(function(key) { node.setAttribute(key, attrs[key]); });
    if (text !== undefined) { node.textContent = text; }
    return node;
  }

  function fretX(fret) {
    return fret === 0 ? 14 : 60 * fret + 10;
  }

  function stringY(s) {
    return 30 + 40 * s;
  }

  function circlePath(cx, cy, r) {
    return 'M ' + (cx - r) + ',' + cy + ' A ' + r + ',' + r + ' 0 1 1 ' + (cx + r) + ',' + cy +
      ' A ' + r + ',' + r + ' 0 1 1 ' + (cx - r) + ',' + cy + ' Z';
  }

  function buildBoard() {
    var board = $('#svg2')[0],
      boardG = svgNode('g', { id: 'g4513' }),
      fretboard = svgNode('g', { id: 'fretboard' }),
      dots = svgNode('g', { id: 'dots' }),
      strings = svgNode('g', { id: 'strings' }),
      fretlines = svgNode('g', { id: 'fretlines' }),
      frets = svgNode('g', { id: 'frets' });

    fretboard.appendChild(svgNode('path', { d: 'm 40,230 0,-200 1450,-1e-6 c 20,50 20,150 0,200 z' }));
    fretboard.appendChild(svgNode('rect', { width: 10, height: 200, x: 30, y: 30 }));

    markers.forEach(function(f) {
      dots.appendChild(svgNode('path', { d: circlePath(fretX(f), 130, 7.88) }));
    });
    dots.appendChild(svgNode('path', { id: 'twelve1', d: circlePath(fretX(12), 90, 7.88) }));
    dots.appendChild(svgNode('path', { id: 'twelve2', d: circlePath(fretX(12), 170, 7.88) }));

    for (var s = 0; s < openStrings.length; s++) {
      strings.appendChild(svgNode('path', { d: 'm 40,' + stringY(s) + ' 1450,0' }));
    }
    for (var k = 1; k <= fretCount; k++) {
      var x = 60 * k + 40;
      fretlines.appendChild(svgNode('path', { d: 'M ' + x + ',30 ' + x + ',230' }));
    }

    for (var f = 0; f <= fretCount; f++) {
      var fret = svgNode('g', { 'class': 'fret', id: 'fret' + f });
      for (var n = 1; n <= openStrings.length; n++) {
        var cx = fretX(f),
          cy = stringY(n - 1),
          r = (f === 0) ? 12.5 : 13.5,
          g = svgNode('g', { id: 'f' + f + 's' + n, 'class': 's' + n }),
          text = svgNode('text', { x: cx, y: cy + 5.2, 'text-anchor': 'middle' });
        text.appendChild(svgNode('tspan', { x: cx, y: cy + 5.2 }, ''));
        g.appendChild(svgNode('path', { d: circlePath(cx, cy, r) }));
        g.appendChild(text);
        fret.appendChild(g);
      }
      frets.appendChild(fret);
    }

    boardG.appendChild(fretboard);
    boardG.appendChild(dots);
    boardG.appendChild(strings);
    boardG.appendChild(fretlines);
    boardG.appendChild(frets);
    board.appendChild(boardG);
  }

  function selectedQuality() {
    var id = $('#qualityselect').val();
    return $.grep(qualities, function(q) { return q.id === id; })[0];
  }

  function box(i) {
    return $('#extlist input[value="' + i + '"]');
  }

  function checkedExtensions() {
    var checked = [];
    $('#extlist input:checked').each(function() {
      checked.push(extensions[Number($(this).val())]);
    });
    return checked;
  }

  function refreshExtensions() {
    var fixed = selectedQuality().tones.map(function(t) { return t[0]; });
    extensions.forEach(function(e, i) {
      if (fixed.indexOf(e.semi) !== -1) { box(i).prop('checked', false); }
    });
    var checkedSemis = checkedExtensions().map(function(e) { return e.semi; });
    extensions.forEach(function(e, i) {
      var taken = fixed.indexOf(e.semi) !== -1 || (!box(i).is(':checked') && checkedSemis.indexOf(e.semi) !== -1);
      box(i).prop('disabled', taken);
    });
  }

  function chordTones() {
    var tones = selectedQuality().tones.slice();
    checkedExtensions().forEach(function(e) { tones.push([e.semi, e.label]); });
    return tones.sort(function(a, b) { return a[0] - b[0]; });
  }
  
  function windowCells(tones, rootPc, base) {
    var labels = {},
      cells = [];
    tones.forEach(function(t) { labels[t[0]] = t[1]; });
    for (var s = 0; s < openStrings.length; s++) {
      for (var f = base; f < base + windowSize; f++) {
        var semi = (openStrings[s] + f - rootPc + 12) % 12;
        if (labels[semi] !== undefined) {
          cells.push({ string: s, fret: f, label: labels[semi], semi: semi });
        }
      }
    }
    return cells;
  }

  function computePositions(tones, rootPc) {
    var windows = [],
      best = 0;
    for (var base = 0; base <= fretCount - windowSize + 1; base++) {
      var cells = windowCells(tones, rootPc, base),
        covered = {};
      cells.forEach(function(c) { covered[c.semi] = true; });
      var count = Object.keys(covered).length;
      windows.push({ base: base, cells: cells, count: count });
      if (count > best) { best = count; }
    }
    var result = [],
      seen = [];
    windows.forEach(function(w) {
      if (w.count !== best) { return; }
      var key = JSON.stringify(w.cells);
      if (seen.indexOf(key) !== -1) { return; }
      seen.push(key);
      result.push(w);
    });
    return result;
  }

  function indexOfBase(base) {
    var index = -1;
    positions.forEach(function(p, i) { if (p.base === base) { index = i; } });
    return index;
  }

  function neighbour(delta) {
    var found = null;
    positions.forEach(function(p) {
      if (delta > 0 && p.base > displayBase && found === null) { found = p.base; }
      if (delta < 0 && p.base < displayBase) { found = p.base; }
    });
    return found;
  }

  function saveSettings() {
    localStorage.setItem(storageKey, JSON.stringify({
      root: $('#rootselect').val(),
      quality: $('#qualityselect').val(),
      extensions: $('#extlist input:checked').map(function() { return Number($(this).val()); }).get(),
      base: displayBase
    }));
  }

  function restoreSettings() {
    var saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved === null) { return; }
    $('#rootselect').val(saved.root);
    $('#qualityselect').val(saved.quality);
    saved.extensions.forEach(function(i) { box(i).prop('checked', true); });
    pendingBase = saved.base;
  }

  function renderPosition() {
    var cells = windowCells(currentTones, currentRoot, displayBase),
      last = displayBase + windowSize - 1,
      index = indexOfBase(displayBase),
      range = 'frets ' + displayBase + ' to ' + last;
    $('#frets > g > g').css('visibility', 'hidden');
    cells.forEach(function(c) {
      var g = $('#f' + c.fret + 's' + (c.string + 1));
      g.css('visibility', 'visible');
      g.children('path').css('fill', c.label === 'R' ? rootColor : defaultColor);
      g.find('tspan').text(c.label);
    });
    $('#positionlabel').text(index === -1 ? range : 'Position ' + (index + 1) + ' of ' + positions.length + ' (' + range + ')');
    $('#prev').prop('disabled', neighbour(-1) === null);
    $('#next').prop('disabled', neighbour(1) === null);
  }

  function step(delta) {
    var next = neighbour(delta);
    if (next === null) { return; }
    displayBase = next;
    renderPosition();
    saveSettings();
  }

  function update(keepBase) {
    refreshExtensions();
    currentTones = chordTones();
    currentRoot = Number($('#rootselect').val());
    $('#chordtitle').text(rootNames[currentRoot] + ' ' + selectedQuality().name);
    $('#chordformula').text(currentTones.map(function(t) { return t[1]; }).join(' + '));
    positions = computePositions(currentTones, currentRoot);
    if (!keepBase) {
      displayBase = pendingBase !== null ? pendingBase : positions[0].base;
      pendingBase = null;
    }
    renderPosition();
    saveSettings();
  }

  $(document).ready(function() {

    rootNames.forEach(function(name, i) {
      $('#rootselect').append($('<option>').attr('value', i).text(name));
    });
    qualityGroups.forEach(function(group) {
      var optgroup = $('<optgroup>').attr('label', group);
      qualities.forEach(function(q) {
        if (q.group === group) { optgroup.append($('<option>').attr('value', q.id).text(q.name)); }
      });
      $('#qualityselect').append(optgroup);
    });
    $('#qualityselect').val('dom7');
    extensions.forEach(function(e, i) {
      $('#extlist').append($('<label>').append($('<input type="checkbox">').attr('value', i)).append(' ' + e.label + ' '));
    });

    buildBoard();

    $('#rootselect, #qualityselect').bind('change', function() { update(false); });
    $('#extlist').on('change', 'input', function() { update(true); });
    $('#prev').bind('click', function() { step(-1); });
    $('#next').bind('click', function() { step(1); });
    $(document).bind('keydown', function(e) {
      if (e.key === 'ArrowLeft') { step(-1); }
      if (e.key === 'ArrowRight') { step(1); }
    });

    restoreSettings();
    update(false);
  });
