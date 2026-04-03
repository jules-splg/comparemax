// ============================================================
// generate-urls.js
// Génère automatiquement les URLs de recherche pour chaque
// produit sur chaque enseigne, et met à jour product-urls.json
// ============================================================
'use strict';

const fs   = require('fs');
const path = require('path');

// ── Correspondance id → terme de recherche ─────────────────
const SEARCH_TERMS = {
  // Télévisions
  'hisense-a6n-43':        'Hisense 43A6N',
  'tcl-p635-43':           'TCL 43P635',
  'philips-pus7608-43':    'Philips 43PUS7608',
  'samsung-cu7105-55':     'Samsung UE55CU7105',
  'hisense-a6n-55':        'Hisense 55A6N',
  'tcl-c635-55':           'TCL 55C635',
  'philips-pus7608-50':    'Philips 50PUS7608',
  'samsung-q80c-50':       'Samsung QE50Q80C',
  'lg-qned81-55':          'LG 55QNED81',
  'sony-x85l-55':          'Sony KD55X85L',
  'hisense-u7nq-55':       'Hisense 55U7NQ',
  'tcl-c845-55':           'TCL 55C845',
  'samsung-q80c-55':       'Samsung QE55Q80C',
  'lg-qned85-55':          'LG 55QNED85',
  'panasonic-mx800-55':    'Panasonic TX55MX800',
  'philips-oled707-48':    'Philips 48OLED707',
  'samsung-qn85c-55':      'Samsung QE55QN85C',
  'tcl-c935-65':           'TCL 65C935',
  'philips-pus8518-65':    'Philips 65PUS8518',
  'lg-oled-c4-55':         'LG OLED55C4',
  'sony-a80l-55':          'Sony XR55A80L',
  'samsung-qn85c-65':      'Samsung QE65QN85C',
  'lg-oled-c4-65':         'LG OLED65C4',
  'panasonic-mz1500-55':   'Panasonic TX55MZ1500',
  'philips-oled908-55':    'Philips 55OLED908',
  'sony-a80l-65':          'Sony XR65A80L',
  'hisense-u8nq-55':       'Hisense 55U8NQ',
  'samsung-frame-55':      'Samsung QE55LS03B Frame',
  'tcl-qm891g-65':         'TCL 65QM891G',
  'lg-oled-c4-77':         'LG OLED77C4',
  'sony-a95l-65':          'Sony XR65A95L',
  'samsung-qn900c-65':     'Samsung QE65QN900C',
  'philips-oled1008-65':   'Philips 65OLED1008',
  'lg-oled-c4-83':         'LG OLED83C4',
  'samsung-qn900c-77':     'Samsung QE77QN900C',
  // Lave-linges
  'beko-wtc8521xw':            'Beko WTC8521XW',
  'hotpoint-nm11946wsafr':     'Hotpoint NM11946WSAFR',
  'aeg-l7fec41s':              'AEG L7FEC41S',
  'haier-hw90-b14939s8u1':     'Haier HW90-B14939S8U1',
  'electrolux-ew7f348sc':      'Electrolux EW7F348SC',
  'samsung-ww90t534daw':       'Samsung WW90T534DAW',
  'lg-f4wv709s1e':             'LG F4WV709S1E',
  'whirlpool-w8i49wbfr':       'Whirlpool W8I49WBFR',
  'bosch-wav28g43ff':          'Bosch WAV28G43FF',
  'lg-f4dv709h2t':             'LG F4DV709H2T',
  'samsung-wd90t654dbh':       'Samsung WD90T654DBH',
  'bosch-wna14490ff':          'Bosch WNA14490FF',
  'aeg-l9wba61bc':             'AEG L9WBA61BC',
  'miele-wci870-wps':          'Miele WCI870 WPS',
  'miele-wt1-wci860':          'Miele WT1 WCI860',
  // Lave-vaisselles
  'candy-cs1c7lfw':            'Candy CS1C7LFW',
  'beko-dvn04321w':            'Beko DVN04321W',
  'samsung-dw60a3010bb':       'Samsung DW60A3010BB',
  'bosch-serie2-sms2iti14e':   'Bosch SMS2ITI14E',
  'whirlpool-wfo3t123p':       'Whirlpool WFO3T123P',
  'siemens-iq300-sn53es14ce':  'Siemens SN53ES14CE',
  'aeg-fse72707p':             'AEG FSE72707P',
  'electrolux-eem43201l':      'Electrolux EEM43201L',
  'siemens-iq500-sn65zx49ce':  'Siemens SN65ZX49CE',
  'bosch-serie8-smv8ycx03e':   'Bosch SMV8YCX03E',
  'aeg-fse76738p':             'AEG FSE76738P',
  'miele-g5222sci':            'Miele G5222SCi',
  'miele-g7310sc':             'Miele G7310SC',
  'miele-g7775scvi':           'Miele G7775SCVi',
  'vzug-adoradish-v6000':      'V-ZUG AdoraDish V6000',
  // Machines à café
  'nespresso-vertuo-pop':                  'Nespresso Vertuo Pop',
  'philips-ep1224':                        'Philips EP1224',
  'delonghi-magnifica-evo-ecam29061':      'DeLonghi ECAM290.61',
  'delonghi-magnifica-evo-ecam29281':      'DeLonghi ECAM292.81',
  'philips-ep3327':                        'Philips EP3327',
  'siemens-eq500-tp503r04':               'Siemens EQ500 TP503R04',
  'nespresso-vertuo-creatista':            'Nespresso Vertuo Creatista',
  'jura-e6':                               'Jura E6',
  'delonghi-eletta-explore-ecam450':       'DeLonghi ECAM450',
  'jura-s8':                               'Jura S8',
  'siemens-eq9-ti923309rw':               'Siemens EQ9 TI923309RW',
  'bosch-verobarista300-ctl636eb6':        'Bosch CTL636EB6',
  'miele-cm7550':                          'Miele CM7550',
  'jura-giga10':                           'Jura GIGA 10',
  // Aspirateurs
  'rowenta-xforce-860-flex':       'Rowenta X-Force 8.60 Flex',
  'samsung-jet-75e':               'Samsung Jet 75E',
  'dyson-v8-origin':               'Dyson V8 Origin',
  'dyson-v11-absolute-extra':      'Dyson V11 Absolute Extra',
  'dyson-v15-detect-absolute':     'Dyson V15 Detect Absolute',
  'irobot-roomba-694':             'iRobot Roomba 694',
  'roborock-q5-plus':              'Roborock Q5+',
  'ecovacs-deebot-n8-pro-plus':    'Ecovacs Deebot N8 Pro+',
  'roborock-s7-maxv-ultra':        'Roborock S7 MaxV Ultra',
  'ecovacs-deebot-t20-omni':       'Ecovacs Deebot T20 OMNI',
  'rowenta-silence-force-ro8371':  'Rowenta Silence Force RO8371',
  'bosch-prosilence-bgs5335a':     'Bosch ProSilence BGS5335A',
  'miele-classic-c1':              'Miele Classic C1',
  'miele-complete-c3-excellence':  'Miele Complete C3 Excellence',
  // Fers à repasser
  'tefal-fv2660-ultraglide':           'Tefal FV2660',
  'philips-dst5030-5000':              'Philips DST5030',
  'rowenta-dw6010-focus':              'Rowenta DW6010',
  'calor-fv6550-maestro':              'Calor FV6550',
  'rowenta-dw9240-pro-master':         'Rowenta DW9240',
  'braun-texstyle9-ts985':             'Braun TS985',
  'rowenta-dw9640-pro-style':          'Rowenta DW9640',
  'tefal-gv8160-express-easy':         'Tefal GV8160',
  'calor-gv7569-express-steam':        'Calor GV7569',
  'rowenta-dg8520-eco':                'Rowenta DG8520',
  'philips-gc8942-perfectcare':        'Philips GC8942',
  'calor-gv9569-fasteo':               'Calor GV9569',
  'philips-gc9682-perfectcare-elite':  'Philips GC9682',
  'polti-vaporella-535-pro':           'Polti Vaporella 535 Pro',
};

// ── Générateur d'URLs de recherche par enseigne ────────────
function buildUrls(term) {
  const q = encodeURIComponent(term);
  return {
    amazon:       { asin: 'TODO_ASIN', url: `https://www.amazon.fr/s?k=${q}&tag=comparemax21-21` },
    fnac:         `https://www.fnac.com/SearchResult/ResultSet.aspx?Search=${q}`,
    boulanger:    `https://www.boulanger.com/recherche/${q}`,
    darty:        `https://www.darty.com/nav/extra/search?text=${q}`,
    cdiscount:    `https://www.cdiscount.com/search/10/${q}.html`,
    leclerc:      `https://www.e.leclerc/recherche?q=${q}`,
    but:          `https://www.but.fr/recherche?q=${q}`,
    electrodepot: `https://www.electrodepot.fr/recherche?s=${q}`,
    ubaldi:       `https://www.ubaldi.com/recherche/${q}/`
  };
}

// ── Génération du fichier ──────────────────────────────────
const output = {};
for (const [id, term] of Object.entries(SEARCH_TERMS)) {
  output[id] = buildUrls(term);
}

const outPath = path.join(__dirname, 'config', 'product-urls.json');
fs.writeFileSync(outPath, JSON.stringify(output, null, 2) + '\n', 'utf8');
console.log(`✅  ${Object.keys(output).length} produits configurés dans product-urls.json`);
