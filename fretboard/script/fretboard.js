/*
 * JavaScript for Barkhausen Fretboard
 * Copyright 2015-2023 Murray Altheim. All Rights Reserved.
 */

  var defaultColor = '#3a5f94',
    rootColor = '#2772de', 
    hilightColor = '#223c55', 
    grey = '#aaaaaa',
    transparent  = 'transparent',
    intervalColor = [ rootColor, "#37b4bf", "#2cc988", "#2fc63a", "#c6a631", "#de9527", "#de7f27", "#de3627", "#de2773", "#de27cf", "#8c27de", "#7627de", ];

  var intervalSet = [
    "C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B", "C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B", "C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"
  ];

  var intervalicSet = [
    "1", "♭2", "2", "♭3", "3", "4", "♭5", "5", "♭6", "6", "♭7", "7", "1", "♭2", "2", "♭3", "3", "4", "♭5", "5", "♭6", "6", "♭7", "7", "1", "♭2", "2", "♭3", "3", "4", "♭5", "5", "♭6", "6", "♭7", "7"
  ];

  var scaleSet = {
    "C-ionian": "♮", "D♭-ionian": "♭", "D-ionian": "♯", "E♭-ionian": "♭", "E-ionian": "♯", "F-ionian": "♭", "F♯-ionian": "♯", "G-ionian": "♯", "A♭-ionian": "♭", "A-ionian": "♯", "B♭-ionian": "♭", "B-ionian": "♯",
    "D-dorian": "♮", "E♭-dorian": "♭", "E-dorian": "♯", "F-dorian": "♭", "F♯-dorian": "♯", "G-dorian": "♭", "G♯-dorian": "♯", "A-dorian": "♯", "B♭-dorian": "♭", "B-dorian": "♯", "C-dorian": "♭", "C♯-dorian": "♯",
    "E-phrygian": "♮", "F-phrygian": "♭", "F♯-phrygian": "♯", "G-phrygian": "♭", "G♯-phrygian": "♯", "A-phrygian": "♭", "A♯-phrygian": "♯", "B-phrygian": "♯", "C-phrygian": "♭", "C♯-phrygian": "♯", "D-phrygian": "♭", "D♯-phrygian": "♯",
    "E-phrygian-dominant": "♮", "F-phrygian-dominant": "♭", "F♯-phrygian-dominant": "♯", "G-phrygian-dominant": "♭", "G♯-phrygian-dominant": "♯", "A-phrygian-dominant": "♭", "A♯-phrygian-dominant": "♯", "B-phrygian-dominant": "♯", "C-phrygian-dominant": "♭", "C♯-phrygian-dominant": "♯", "D-phrygian-dominant": "♭", "D♯-phrygian-dominant": "♯",
    "F-lydian": "♮", "G♭-lydian": "♭", "G-lydian": "♯", "A♭-lydian": "♭", "A-lydian": "♯", "B♭-lydian": "♭", "B-lydian": "♯", "C-lydian": "♯", "D♭-lydian": "♭", "D-lydian": "♯", "E♭-lydian": "♭", "E-lydian": "♯",
    "G-mixolydian": "♮", "A♭-mixolydian": "♭", "A-mixolydian": "♯", "B♭-mixolydian": "♭", "B-mixolydian": "♯", "C-mixolydian": "♭", "C♯-mixolydian": "♯", "D-mixolydian": "♯", "E♭-mixolydian": "♭", "E-mixolydian": "♯", "F-mixolydian": "♭", "F♯-mixolydian": "♯",
    "G-mixolydian-6♭": "♮", "A♭-mixolydian-6♭": "♭", "A-mixolydian-6♭": "♯", "B♭-mixolydian-6♭": "♭", "B-mixolydian-6♭": "♯", "C-mixolydian-6♭": "♭", "C♯-mixolydian-6♭": "♯", "D-mixolydian-6♭": "♯", "E♭-mixolydian-6♭": "♭", "E-mixolydian-6♭": "♯", "F-mixolydian-6♭": "♭", "F♯-mixolydian-6♭": "♯",
    "A-aeolian": "♮", "B♭-aeolian": "♭", "B-aeolian": "♯", "C-aeolian": "♭", "C♯-aeolian": "♯", "D-aeolian": "♭", "D♯-aeolian": "♯", "E-aeolian": "♯", "F-aeolian": "♭", "F♯-aeolian": "♯", "G-aeolian": "♭", "G♯-aeolian": "♯",
    "B-locrian": "♮", "C-locrian": "♭", "C♯-locrian": "♯", "D-locrian": "♭", "D♯-locrian": "♯", "E-locrian": "♭", "F-locrian": "♯", "F♯-locrian": "♯", "G-locrian": "♭", "G♯-locrian": "♯", "A-locrian": "♭", "A♯-locrian": "♯",

    "C-major-pentatonic": "♮", "D♭-major-pentatonic": "♭", "D-major-pentatonic": "♯", "E♭-major-pentatonic": "♭", "E-major-pentatonic": "♯", "F-major-pentatonic": "♮", "F♯-major-pentatonic": "♯", "G-major-pentatonic": "♮", "A♭-major-pentatonic": "♭", "A-major-pentatonic": "♯", "B♭-major-pentatonic": "♭", "B-major-pentatonic": "♯",
    "A-minor-pentatonic": "♮", "B♭-minor-pentatonic": "♭", "B-minor-pentatonic": "♯", "C-minor-pentatonic": "♭", "C♯-minor-pentatonic": "♯", "D-minor-pentatonic": "♮", "D♯-minor-pentatonic": "♯", "E-minor-pentatonic": "♮", "F-minor-pentatonic": "♭", "F♯-minor-pentatonic": "♯", "G-minor-pentatonic": "♭", "G♯-minor-pentatonic": "♯",

    "A-minor-blues": "♯", "B♭-minor-blues": "♭", "B-minor-blues": "♯", "C-minor-blues": "♭", "C♯-minor-blues": "♯", "D-minor-blues": "♯", "D♯-minor-blues": "♯", "E-minor-blues": "♯", "F-minor-blues": "♯", "F♯-minor-blues": "♯", "G-minor-blues": "♭", "G♯-minor-blues": "♯",
    "A-major-blues": "♯", "B♭-major-blues": "♭", "B-major-blues": "♯", "C-major-blues": "♭", "C♯-major-blues": "♯", "D-major-blues": "♯", "D♯-major-blues": "♯", "E-major-blues": "♯", "F-major-blues": "♯", "F♯-major-blues": "♯", "G-major-blues": "♭", "G♯-major-blues": "♯",

    "A-harmonic-minor": "♯", "B♭-harmonic-minor": "♭", "B-harmonic-minor": "♯", "C-harmonic-minor": "♭", "C♯-harmonic-minor": "♯", "D-harmonic-minor": "♯", "E♭-harmonic-minor": "♭", "E-harmonic-minor": "♯", "F-harmonic-minor": "♭", "F♯-harmonic-minor": "♯", "G-harmonic-minor": "♭", "G♯-harmonic-minor": "♯",
    "A-melodic-minor-asc": "♯", "B♭-melodic-minor-asc": "♭", "B-melodic-minor-asc": "♯", "C-melodic-minor-asc": "♭", "C♯-melodic-minor-asc": "♯", "D-melodic-minor-asc": "♯", "E♭-melodic-minor-asc": "♭", "E-melodic-minor-asc": "♯", "F-melodic-minor-asc": "♭", "F♯-melodic-minor-asc": "♯", "G-melodic-minor-asc": "♯", "G♯-melodic-minor-asc": "♯",
    "A-melodic-minor-des": "♮", "B♭-melodic-minor-des": "♭", "B-melodic-minor-des": "♯", "C-melodic-minor-des": "♭", "C♯-melodic-minor-des": "♯", "D-melodic-minor-des": "♭", "D♯-melodic-minor-des": "♯", "E-melodic-minor-des": "♯", "F-melodic-minor-des": "♭", "F♯-melodic-minor-des": "♯", "G-melodic-minor-des": "♭", "G♯-melodic-minor-des": "♯",
    "A-enigmatic": "♯", "B♭-enigmatic": "♭", "B-enigmatic": "♯", "C-enigmatic": "♯", "D♭-enigmatic": "♭", "D-enigmatic": "♯", "E♭-enigmatic": "♭", "E-enigmatic": "♯", "F-enigmatic": "♯", "G♭-enigmatic": "♭", "G-enigmatic": "♯", "A♭-enigmatic": "♭",

    "A-algerian": "♯", "B♭-algerian": "♭", "B-algerian": "♯", "C-algerian": "♯", "D♭-algerian": "♭", "D-algerian": "♯", "E♭-algerian": "♭", "E-algerian": "♯", "F-algerian": "♭", "F♯-algerian": "♯", "G-algerian": "♯", "A♭-algerian": "♭",
    "A-arabian": "♭", "B♭-arabian": "♭", "B-arabian": "♯", "C-arabian": "♭", "C♯-arabian": "♯", "D-arabian": "♭", "D♯-arabian": "♯", "E-arabian": "♯", "F-arabian": "♭", "F♯-arabian": "♯", "G-arabian": "♭", "G♯-arabian": "♯",
    "A-byzantine": "♭", "B♭-byzantine": "♭", "B-byzantine": "♯", "C-byzantine": "♭", "C♯-byzantine": "♯", "D-byzantine": "♯", "D♯-byzantine": "♯", "E-byzantine": "♯", "F-byzantine": "♭", "F♯-byzantine": "♯", "G-byzantine": "♯", "G♯-byzantine": "♯",
    "A-egyptian": "♮", "B♭-egyptian": "♭", "B-egyptian": "♯", "C-egyptian": "♯", "D♭-egyptian": "♭", "D-egyptian": "♯", "E♭-egyptian": "♭", "E-egyptian": "♯", "F-egyptian": "♯", "G♭-egyptian": "♭", "G-egyptian": "♯", "A♭-egyptian": "♭",
    "A-persian": "♮", "B♭-persian": "♭", "B-persian": "♯", "C-persian": "♯", "D♭-persian": "♭", "D-persian": "♯", "E♭-persian": "♭", "E-persian": "♯", "F-persian": "♯", "G♭-persian": "♭", "G-persian": "♯", "A♭-persian": "♭",
    "A-hindu": "♮", "B♭-hindu": "♭", "B-hindu": "♯", "C-hindu": "♭", "D♭-hindu": "♭", "D-hindu": "♯", "E♭-hindu": "♭", "E-hindu": "♯", "F-hindu": "♯", "G♭-hindu": "♭", "G-hindu": "♯", "A♭-hindu": "♭",
    "A-asavari-asc": "♭", "B♭-asavari-asc": "♭", "B-asavari-asc": "♭", "C-asavari-asc": "♭", "D♭-asavari-asc": "♭", "D-asavari-asc": "♭", "E♭-asavari-asc": "♭", "E-asavari-asc": "♭", "F-asavari-asc": "♭", "G♭-asavari-asc": "♭", "G-asavari-asc": "♭", "A♭-asavari-asc": "♭",
    "A-asavari-des": "♭", "B♭-asavari-asc": "♭", "B-asavari-asc": "♭", "C-asavari-asc": "♭", "D♭-asavari-asc": "♭", "D-asavari-asc": "♭", "E♭-asavari-asc": "♭", "E-asavari-asc": "♭", "F-asavari-asc": "♭", "G♭-asavari-asc": "♭", "G-asavari-asc": "♭", "A♭-asavari-asc": "♭",

    "C-hirajoshi": "♮", "D♭-hirajoshi": "♭", "D-hirajoshi": "♯", "E♭-hirajoshi": "♭", "E-hirajoshi": "♯", "F-hirajoshi": "♮", "F♯-hirajoshi": "♯", "G-hirajoshi": "♮", "A♭-hirajoshi": "♭", "A-hirajoshi": "♯", "B♭-hirajoshi": "♭", "B-hirajoshi": "♯",
    "C-yo": "♮", "D♭-yo": "♭", "D-yo": "♯", "E♭-yo": "♭", "E-yo": "♯", "F-yo": "♮", "F♯-yo": "♯", "G-yo": "♮", "A♭-yo": "♭", "A-yo": "♯", "B♭-yo": "♭", "B-yo": "♯",
    "C-in": "♮", "D♭-in": "♭", "D-in": "♭", "E♭-in": "♭", "E-in": "♭", "F-in": "♮", "F♯-in": "♯", "G-in": "♮", "A♭-in": "♭", "A-in": "♭", "B♭-in": "♭", "B-in": "♯",
    "C-insen": "♮", "D♭-insen": "♭", "D-insen": "♭", "E♭-insen": "♭", "E-insen": "♭", "F-insen": "♮", "F♯-insen": "♯", "G-insen": "♮", "A♭-insen": "♭", "A-insen": "♭", "B♭-insen": "♭", "B-insen": "♯",

    "A-neopolitan-major": "♭", "B♭-neopolitan-major": "♭", "B-neopolitan-major": "♭", "C-neopolitan-major": "♭", "D♭-neopolitan-major": "♭", "D-neopolitan-major": "♭", "E♭-neopolitan-major": "♭", "E-neopolitan-major": "♭", "F-neopolitan-major": "♭", "F♯-neopolitan-major": "♭", "G-neopolitan-major": "♭", "A♭-neopolitan-major": "♭",
    "A-neopolitan-minor": "♭", "B♭-neopolitan-minor": "♭", "B-neopolitan-minor": "♭", "C-neopolitan-minor": "♭", "D♭-neopolitan-minor": "♭", "D-neopolitan-minor": "♭", "E♭-neopolitan-minor": "♭", "E-neopolitan-minor": "♭", "F-neopolitan-minor": "♭", "F♯-neopolitan-minor": "♭", "G-neopolitan-minor": "♭", "A♭-neopolitan-minor": "♭",
    "A-hungarian-gypsy": "♮", "B♭-hungarian-gypsy": "♭", "B-hungarian-gypsy": "♮", "C-hungarian-gypsy": "♭", "C♯-hungarian-gypsy": "♯", "D-hungarian-gypsy": "♮", "E♭-hungarian-gypsy": "♭", "E-hungarian-gypsy": "♮", "F-hungarian-gypsy": "♮", "F♯-hungarian-gypsy": "♯", "G-hungarian-gypsy": "♮", "G♯-hungarian-gypsy": "♯",
    "A-spanish-gypsy": "♯", "B♭-spanish-gypsy": "♭", "B-spanish-gypsy": "♯", "C-spanish-gypsy": "♯", "C♯-spanish-gypsy": "♯", "D-spanish-gypsy": "♯", "E♭-spanish-gypsy": "♭", "E-spanish-gypsy": "♯", "F-spanish-gypsy": "♭", "F♯-spanish-gypsy": "♯", "G-spanish-gypsy": "♯", "G♯-spanish-gypsy": "♯",
    "A-ukrainian-dorian": "♯", "B♭-ukrainian-dorian": "♭", "B-ukrainian-dorian": "♯", "C-ukrainian-dorian": "♯", "D♭-ukrainian-dorian": "♭", "D-ukrainian-dorian": "♯", "E♭-ukrainian-dorian": "♭", "E-ukrainian-dorian": "♯", "F-ukrainian-dorian": "♭", "F♯-ukrainian-dorian": "♯", "G-ukrainian-dorian": "♯", "A♭-ukrainian-dorian": "♭",
    "A-moorish-phrygian": "♯", "B♭-moorish-phrygian": "♭", "B-moorish-phrygian": "♯", "C-moorish-phrygian": "♯", "D♭-moorish-phrygian": "♭", "D-moorish-phrygian": "♯", "E♭-moorish-phrygian": "♭", "E-moorish-phrygian": "♯", "F-moorish-phrygian": "♭", "F♯-moorish-phrygian": "♯", "G-moorish-phrygian": "♯", "A♭-moorish-phrygian": "♭",
    "A-mixo-dorian-blues": "♭", "B♭-mixo-dorian-blues": "♭", "B-mixo-dorian-blues": "♭", "C-mixo-dorian-blues": "♭", "D♭-mixo-dorian-blues": "♭", "D-mixo-dorian-blues": "♭", "E♭-mixo-dorian-blues": "♭", "E-mixo-dorian-blues": "♭", "F-mixo-dorian-blues": "♭", "F♯-mixo-dorian-blues": "♭", "G-mixo-dorian-blues": "♭", "A♭-mixo-dorian-blues": "♭",
    "A-half-whole-dim": "♭", "B♭-half-whole-dim": "♭", "B-half-whole-dim": "♭", "C-half-whole-dim": "♭", "D♭-half-whole-dim": "♭", "D-half-whole-dim": "♭", "E♭-half-whole-dim": "♭", "E-half-whole-dim": "♭", "F-half-whole-dim": "♭", "F♯-half-whole-dim": "♭", "G-half-whole-dim": "♭", "A♭-half-whole-dim": "♭",
    "A-whole-tone": "♯", "A♯-whole-tone": "♯", "B-whole-tone": "♯", "C-whole-tone": "♯", "C♯-whole-tone": "♯", "D-whole-tone": "♯", "D♯-whole-tone": "♯", "E-whole-tone": "♯", "F-whole-tone": "♯", "F♯-whole-tone": "♯", "G-whole-tone": "♯", "G♯-whole-tone": "♯",

    "A-mess-2": "♭", "B♭-mess-2": "♭", "B-mess-2": "♭", "C-mess-2": "♭", "D♭-mess-2": "♭", "D-mess-2": "♭", "E♭-mess-2": "♭", "E-mess-2": "♭", "F-mess-2": "♭", "G♭-mess-2": "♭", "G-mess-2": "♭", "A♭-mess-2": "♭",
    "A-mess-3": "♭", "B♭-mess-3": "♭", "B-mess-3": "♭", "C-mess-3": "♭", "D♭-mess-3": "♭", "D-mess-3": "♭", "E♭-mess-3": "♭", "E-mess-3": "♭", "F-mess-3": "♭", "G♭-mess-3": "♭", "G-mess-3": "♭", "A♭-mess-3": "♭",
    "A-mess-4": "♭", "B♭-mess-4": "♭", "B-mess-4": "♭", "C-mess-4": "♭", "D♭-mess-4": "♭", "D-mess-4": "♭", "E♭-mess-4": "♭", "E-mess-4": "♭", "F-mess-4": "♭", "F♭-mess-4": "♭", "G-mess-4": "♭", "A♭-mess-4": "♭",
    "A-mess-5": "♭", "B♭-mess-5": "♭", "B-mess-5": "♭", "C-mess-5": "♭", "D♭-mess-5": "♭", "D-mess-5": "♭", "E♭-mess-5": "♭", "E-mess-5": "♭", "F-mess-5": "♭", "F♭-mess-5": "♭", "G-mess-5": "♭", "A♭-mess-5": "♭",
    "A-mess-6": "♯", "A♯-mess-6": "♯", "B-mess-6": "♯", "C-mess-6": "♯", "C♯-mess-6": "♯", "D-mess-6": "♯", "D♯-mess-6": "♯", "E-mess-6": "♯", "F-mess-6": "♯", "F♯-mess-6": "♯", "G-mess-6": "♯", "G♯-mess-6": "♯",
    "A-mess-7": "♭", "B♭-mess-7": "♭", "B-mess-7": "♭", "C-mess-7": "♭", "D♭-mess-7": "♭", "D-mess-7": "♭", "E♭-mess-7": "♭", "E-mess-7": "♭", "F-mess-7": "♭", "F♭-mess-7": "♭", "G-mess-7": "♭", "A♭-mess-7": "♭"
  },
  flatScale = ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B", "C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"
  ],
  sharpScale = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B", "C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"
  ],
  scales = [
    [0, 2, 4, 5, 7, 9, 11, 12],
    [0, 2, 3, 5, 7, 9, 10, 12],
    [0, 1, 3, 5, 7, 8, 10, 12],
    [0, 1, 4, 5, 7, 8, 10, 12],
    [0, 2, 4, 6, 7, 9, 11, 12],
    [0, 2, 4, 5, 7, 9, 10, 12],
    [0, 2, 4, 5, 7, 8, 10, 12],
    [0, 2, 3, 5, 7, 8, 10, 12],
    [0, 1, 3, 5, 6, 8, 10, 12],

    [0, 2, 4, 7, 7, 9, 9],
    [0, 3, 3, 5, 7, 10, 10],

    [0, 2, 3, 4, 7, 9, 12],
    [0, 3, 5, 6, 7, 10, 12],

    [0, 2, 3, 5, 7, 8, 11, 12],
    [0, 2, 3, 5, 7, 9, 11, 12],
    [0, 2, 3, 5, 7, 9, 11, 12],
    [0, 1, 4, 6, 8, 10, 11, 12],

    [0, 2, 3, 6, 7, 8, 11, 11],
    [0, 2, 3, 5, 6, 8, 9, 11, 12],
    [0, 1, 4, 5, 7, 8, 11, 12],
    [0, 2, 5, 7, 7, 10, 10],
    [0, 1, 4, 5, 6, 8, 11, 12],
    [0, 2, 4, 5, 7, 8, 10],
    [0, 1, 5, 5, 7, 8, 8],
    [0, 1, 3, 5, 7, 8, 10],

    [0, 2, 3, 3, 7, 8, 8],
    [0, 2, 5, 5, 7, 9, 9],
    [0, 1, 3, 5, 7, 8, 10],
    [0, 1, 5, 5, 7, 10, 10],

    [0, 1, 3, 5, 7, 9, 11, 12],
    [0, 1, 3, 5, 7, 8, 11, 12],
    [0, 2, 3, 6, 7, 8, 11, 12],
    [0, 1, 4, 5, 7, 8, 10, 12],
    [0, 2, 3, 6, 7, 9, 10, 12],
    [0, 1, 3, 4, 5, 7, 8, 10, 12],
    [0, 2, 3, 4, 5, 6, 7, 9, 10, 11],
    [0, 1, 2, 4, 5, 7, 9, 10, 11],
    [0, 2, 4, 6, 8, 10, 12],

    [0, 1, 3, 4, 6, 7, 9, 10, 11],
    [0, 2, 3, 4, 6, 7, 8, 10, 11, 12],
    [0, 1, 2, 5, 6, 7, 8, 11, 12],
    [0, 1, 5, 6, 7, 11, 12],
    [0, 2, 4, 5, 6, 8, 10, 11, 12],
    [0, 1, 2, 3, 5, 6, 7, 8, 9, 11, 12]
  ],
  sharpNotes = [
    ["E", "B", "G", "D", "A", "E", "B"],
    ["F", "C", "G♯", "D♯", "A♯", "F", "C"],
    ["F♯", "C♯", "A", "E", "B", "F♯", "C♯"],
    ["G", "D", "A♯", "F", "C", "G", "D"],
    ["G♯", "D♯", "B", "F♯", "C♯", "G♯", "D♯"],
    ["A", "E", "C", "G", "D", "A", "E"],
    ["A♯", "F", "C♯", "G♯", "D♯", "A♯", "F"],
    ["B", "F♯", "D", "A", "E", "B", "F♯"],
    ["C", "G", "D♯", "A♯", "F", "C", "G"],
    ["C♯", "G♯", "E", "B", "F♯", "C♯", "G♯"],
    ["D", "A", "F", "C", "G", "D", "A"],
    ["D♯", "A♯", "F♯", "C♯", "G♯", "D♯", "A♯"],
    ["E", "B", "G", "D", "A", "E", "B"],
    ["F", "C", "G♯", "D♯", "A♯", "F", "C"],
    ["F♯", "C♯", "A", "E", "B", "F♯", "C♯"],
    ["G", "D", "A♯", "F", "C", "G", "D"],
    ["G♯", "D♯", "B", "F♯", "C♯", "G♯", "D♯"],
    ["A", "E", "C", "G", "D", "A", "E"],
    ["A♯", "F", "C♯", "G♯", "D♯", "A♯", "F"],
    ["B", "F♯", "D", "A", "E", "B", "F♯"],
    ["C", "G", "D♯", "A♯", "F", "C", "G"],
    ["C♯", "G♯", "E", "B", "F♯", "C♯", "G♯"],
    ["D", "A", "F", "C", "G", "D", "A"],
    ["D♯", "A♯", "F♯", "C♯", "G♯", "D♯", "A♯"],
    ["E", "B", "G", "D", "A", "E", "B"]
  ],
  flatNotes = [
    ["E", "B", "G", "D", "A", "E", "B"],
    ["F", "C", "A♭", "E♭", "B♭", "F", "C"],
    ["G♭", "D♭", "A", "E", "B", "G♭", "D♭"],
    ["G", "D", "B♭", "F", "C", "G", "D"],
    ["A♭", "E♭", "B", "G♭", "D♭", "A♭", "E♭"],
    ["A", "E", "C", "G", "D", "A", "E"],
    ["B♭", "F", "D♭", "A♭", "E♭", "B♭", "F"],
    ["B", "G♭", "D", "A", "E", "B", "G♭"],
    ["C", "G", "E♭", "B♭", "F", "C", "G"],
    ["D♭", "A♭", "E", "B", "G♭", "D♭", "A♭"],
    ["D", "A", "F", "C", "G", "D", "A"],
    ["E♭", "B♭", "G♭", "D♭", "A♭", "E♭", "B♭"],
    ["E", "B", "G", "D", "A", "E", "B"],
    ["F", "C", "A♭", "E♭", "B♭", "F", "C"],
    ["G♭", "D♭", "A", "E", "B", "G♭", "D♭"],
    ["G", "D", "B♭", "F", "C", "G", "D"],
    ["A♭", "E♭", "B", "G♭", "D♭", "A♭", "E♭"],
    ["A", "E", "C", "G", "D", "A", "E"],
    ["B♭", "F", "D♭", "A♭", "E♭", "B♭", "F"],
    ["B", "G♭", "D", "A", "E", "B", "G♭"],
    ["C", "G", "E♭", "B♭", "F", "C", "G"],
    ["D♭", "A♭", "E", "B", "G♭", "D♭", "A♭"],
    ["D", "A", "F", "C", "G", "D", "A"],
    ["E♭", "B♭", "G♭", "D♭", "A♭", "E♭", "B♭"],
    ["E", "B", "G", "D", "A", "E", "B"]
  ];

  $(document).ready(function() {

    $('#keyselect').bind('click', function() { setFretboard(); });
    $('#scaleselect').bind('click', function() { setFretboard(); });
    $('#setchord').bind('click', function() { setFretboard(); });
    $('#hilightInterval').bind('click', function() { hilightInterval(); });
    $('#hilightNote').bind('click', function() { hilightNote(); });
    $('#all').bind('click', function() { allNotes(); });
    $('#reset').bind('click', function() { reset(grey); });

    var scaleNotes = [];
    var accidental;

    function setFretboard() {
      var selectedScale = $('#scaleselect option:selected');
      var scaleIndex  = selectedScale.index();
      var nameOfScale = selectedScale.text();
      var scaleValue = selectedScale.val();
      var selectedKey = $('#keyselect option:selected');
      var keyIndex = selectedKey.index();
      var nameOfKey = selectedKey.text();
      if ( nameOfKey.indexOf('/') != -1 ) {
        var fields = nameOfKey.split('/');
        nameOfKey = fields[0];
      }
      var scaleId = nameOfKey + "-" + scaleValue;

      var chosen = scaleSet[scaleId];
      if ( !chosen ) { 
        nameOfKey = fields[1]; 
        scaleId = nameOfKey + "-" + scaleValue;
        chosen = scaleSet[scaleId];
        if ( !chosen ) { 
          alert("no scale identified by: "+scaleId);
          return;
        }
      } 
      accidental = chosen[0];
      var notes = setNoteSet(accidental);
      chosen = chosen.slice(1);

      var keynotes = ( accidental == '♭' ) ? flatScale.slice(keyIndex) : sharpScale.slice(keyIndex);
      var scaleOffsets = scales[scaleIndex];
      for ( var i = 0; i < scaleOffsets.length; i++ ) {
        scaleNotes[i] = keynotes[scaleOffsets[i]];
      }
      reset();
      setChord(scaleNotes);
      $('#scaledesc').text( nameOfKey + ' ' + nameOfScale );
      setIntervals(keyIndex, scaleOffsets);
    };

    function setIntervals(keyIndex, scaleOffsets) {
      for ( var i = 0; i < scaleOffsets.length; i++ ) {
        $('#s' + i).text(intervalSet[keyIndex + scaleOffsets[i]]);
        $('#i' + i).text(intervalicSet[scaleOffsets[i]]);
      }
    }

    function setNoteSet(accidental) {
      var notes = ( accidental == '♭' ) ? flatNotes : sharpNotes ;
      for ( var f = 0; f <= 24; f++ ) {
        for ( var s = 1; s <= 7; s++ ) {
          var g = d3.select('#fret' + f + ' g.s' + s);
          g.select('text tspan').text( notes[f][s-1] );
        }
      }
    };

    function setChord(chord) {
      setColorOfNote(rootColor,chord[0]);
      for ( var i = 1; i < chord.length-1; i++ ) {
        setColorOfNote(defaultColor,chord[i]);
      }
      hideUnselectedNotes();
    };

    function hideUnselectedNotes() {
      for ( var f = 0; f <= 24; f++ ) {
        for ( var s = 1; s <= 7; s++ ) {
          var g = d3.select('#fret' + f + ' g.s' + s);
          var desc = g.attr('desc');
          var viz = ( desc == 'true' ) ? 'visible' : 'hidden' ;
          g.select('path').style('visibility',viz);
          g.select('text tspan').style('visibility',viz);
        }
      }
    };

    function setColorOfNote(color,name) {
      for ( var f = 0; f <= 24; f++ ) {
        for ( var s = 1; s <= 7; s++ ) {
          var g = d3.select('#fret' + f + ' g.s' + s);
          var text  = g.select('text');
          var tspan = text.select('tspan');
          var path  = g.select('path');
          if ( tspan.text() == name ) {
            path.transition().style("fill",color).duration(1000);
            g.attr('desc','true');
            var viz = g.attr('desc');
          }
        }
      }
    };

    function hilightInterval() {

      if ( !accidental ) {
          alert("First select a key and scale.");
          return;
      }
      var selectedKey = $('#keyselect option:selected');
      var keyIndex = selectedKey.index();
      var nameOfKey = selectedKey.text();
      if ( nameOfKey.indexOf('/') != -1 ) {
        var fields = nameOfKey.split('/');
        nameOfKey = fields[ (( accidental == '♭' ) ? 1 : 0 ) ];
      }
      var keynotes = ( accidental == '♭' ) ? flatScale.slice(keyIndex) : sharpScale.slice(keyIndex);
      var selectedInterval = $('#intervalselect option:selected');
      var intervalIndex  = selectedInterval.index();
      var nameOfInterval = selectedInterval.text();
      var intervalValue = selectedInterval.val();
      setColorOfNote(intervalColor[intervalIndex],keynotes[intervalIndex]);
    };

    function hilightNote() {
      var selectedNote = $('#noteselect option:selected');
      var nameOfNote = selectedNote.text();
      if ( nameOfNote.indexOf('/') != -1 ) {
        var fields = nameOfNote.split('/');
        setColorOfNote(hilightColor,fields[0]);
        setColorOfNote(hilightColor,fields[1]);
      } else {
        setColorOfNote(hilightColor,nameOfNote);
      }
    };

    function allNotes( color ) {
        reset(defaultColor);
    };

    function reset( color ) {
      for ( var f = 0; f <= 24; f++ ) {
        for ( var s = 1; s <= 7; s++ ) {
          var g = d3.select('#fret' + f + ' g.s' + s );
          g.attr('desc','false');
          var path  = g.select('path');
          path.transition().style("fill",color).duration(1000);
          var tspan = g.select('text tspan');
          tspan.style("fill",'white');
          path.style('visibility','visible');
          tspan.style('visibility','visible');
        }
      }
    };

  });
