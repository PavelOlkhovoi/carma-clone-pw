import { test, expect } from "@playwright/test";
import { setupAllMocks, mockOMTMapHosting } from "@carma-commons/e2e";

const responseWithTwoOffices = {
  data: {
    extended_alkis_flurstueck: [
      {
        alkis_id: "053001-003-00039",
        geometrie: {
          type: "MultiPolygon",
          crs: {
            type: "name",
            properties: {
              name: "urn:ogc:def:crs:EPSG::25832",
            },
          },
          coordinates: [
            [
              [
                [373313.9269999025, 5683510.4689995395],
                [373273.2169999016, 5683466.960999538],
                [373249.3199999016, 5683469.098999539],
                [373250.305999903, 5683474.083999539],
                [373250.4939999004, 5683475.056999539],
                [373250.2179999035, 5683476.226999538],
                [373247.5979999024, 5683487.518999538],
                [373225.5499999019, 5683496.066999538],
                [373224.02199990116, 5683496.65999954],
                [373223.27999990236, 5683496.489999539],
                [373216.6489999014, 5683494.969999541],
                [373212.919999903, 5683499.693999538],
                [373200.4329998994, 5683515.512999538],
                [373187.52099989884, 5683531.870999537],
                [373206.23499990057, 5683547.885999538],
                [373217.40199990006, 5683557.444999539],
                [373243.6649999004, 5683576.762999538],
                [373257.7749998998, 5683588.812999538],
                [373319.08299990214, 5683519.35599954],
                [373311.94299990154, 5683514.087999539],
                [373313.9269999025, 5683510.4689995395],
              ],
            ],
          ],
        },
        area: 8556.947562081303,
      },
    ],
    flurstueck: [
      {
        id: 2197,
        flurstueck_schluessel: {
          gemarkung: {
            bezeichnung: "Barmen",
          },
          flur: 3,
          flurstueck_zaehler: 39,
          flurstueck_nenner: 0,
          bemerkung_sperre: "Teilung an 102.1 ",
          datum_entstehung: null,
          datum_letzter_stadtbesitz: "2017-04-28T09:18:04.066",
          war_staedtisch: true,
          letzter_bearbeiter: "SteiniD102@Lagerbuch",
          letzte_bearbeitung: "2017-04-28T09:18:04.066",
          gueltig_bis: null,
          ist_gesperrt: true,
        },
        ar_baeumeArray: [],
        ar_vertraegeArray: [],
        bemerkung: "L 891-16",
        in_stadtbesitz: null,
        kassenzeichenArrayRelationShip: [
          {
            id: 301,
            kassenzeichennummer: 60534617,
            zugeordnet_am: "2017-04-28T09:17:42.994",
            zugeordnet_von: "SteiniD102",
          },
        ],
        nutzungArrayRelationShip: [
          {
            id: 2840,
            nutzung_buchungArrayRelationShip: [
              {
                quadratmeterpreis: null,
                ist_buchwert: true,
                gueltig_von: "2007-12-05T00:00:00",
                gueltig_bis: null,
                flaeche: 8563,
                bemerkung: null,
                nutzungsart: {
                  bezeichnung: "Siedlung-GF Öffentliche Zwecke",
                  id: 267,
                  schluessel: "41007-11",
                },
                anlageklasse: {
                  bezeichnung: "keine",
                  id: 1,
                  schluessel: "k0000000",
                },
                ar_bebauungenArray: [],
                ar_flaechennutzungenArray: [
                  {
                    flaechennutzung: {
                      bezeichnung: "Wald",
                      id: 16,
                    },
                  },
                  {
                    flaechennutzung: {
                      bezeichnung: "Fläche für den Gemeinbedarf",
                      id: 3,
                    },
                  },
                  {
                    flaechennutzung: {
                      bezeichnung: "Grünfläche",
                      id: 10,
                    },
                  },
                ],
              },
            ],
          },
        ],
        spielplatz: null,
        strassenfrontArrayRelationShip: [],
        verwaltungsbereiche_eintragArrayRelationShip: [
          {
            id: 2197,
            geaendert_von: "SteinbacherD102@Lagerbuch",
            geaendert_am: "2010-11-10T06:31:36.394",
            verwaltungsbereichArrayRelationShip: [
              {
                extended_geom: {
                  area: 7719.355573272187,
                  geo_field: {
                    type: "Polygon",
                    crs: {
                      type: "name",
                      properties: {
                        name: "urn:ogc:def:crs:EPSG::25832",
                      },
                    },
                    coordinates: [
                      [
                        [373206.234913131, 5683547.88579305],
                        [373187.520501116, 5683531.87135507],
                        [373200.433392821, 5683515.51348935],
                        [373201.592056261, 5683514.04531983],
                        [373203.98358074, 5683511.0148972],
                        [373210.210789503, 5683503.12702389],
                        [373212.409205383, 5683500.34165003],
                        [373216.649075689, 5683494.97046613],
                        [373224.022085832, 5683496.66025442],
                        [373247.59827088, 5683487.5193608],
                        [373250.493627405, 5683475.05731238],
                        [373250.212359855, 5683473.66430288],
                        [373263.447009815, 5683480.97661608],
                        [373268.567953604, 5683483.93409757],
                        [373290.342324423, 5683498.79464478],
                        [373294.055764115, 5683501.97629472],
                        [373302.365617095, 5683509.55352994],
                        [373308.077580145, 5683514.73687705],
                        [373312.429372264, 5683517.22576055],
                        [373316.334576974, 5683518.98288062],
                        [373318.427539302, 5683520.1091864],
                        [373319.083440354, 5683519.35628243],
                        [373257.774782235, 5683588.81295352],
                        [373243.66493986, 5683576.76276262],
                        [373217.401504395, 5683557.44496093],
                        [373206.234913131, 5683547.88579305],
                      ],
                    ],
                  },
                },
                verwaltende_dienststelle: {
                  abkuerzung_abteilung: "",
                  bezeichnung_abteilung: "",
                  email_adresse: null,
                  farbeArrayRelationShip: [
                    {
                      rgb_farbwert: 16755200,
                      stil: {
                        bezeichnung: "gefüllt",
                      },
                    },
                  ],
                  ressort: {
                    abkuerzung: "GMW",
                    bezeichnung: "Eigenbetrieb Gebäudemanagemant Wuppertal",
                    id: 27,
                  },
                },
                verwaltungsgebrauch: {
                  abkuerzung: "0",
                  bezeichnung: "NICHTS",
                  unterabschnitt: "0",
                  kategorie: {
                    abkuerzung: "",
                    bezeichnung: "NICHTS",
                    oberkategorie: {
                      abkuerzung: "0",
                      bezeichnung: "NICHTS",
                      id: 6,
                    },
                  },
                },
                flaeche: 0,
              },
              {
                extended_geom: {
                  area: 837.561374001355,
                  geo_field: {
                    type: "Polygon",
                    crs: {
                      type: "name",
                      properties: {
                        name: "urn:ogc:def:crs:EPSG::25832",
                      },
                    },
                    coordinates: [
                      [
                        [373250.493627405, 5683475.05731238],
                        [373249.319545018, 5683469.0990065],
                        [373273.216911411, 5683466.96098021],
                        [373313.92652083, 5683510.46907488],
                        [373311.943339965, 5683514.08802834],
                        [373319.083440354, 5683519.35628243],
                        [373318.427539302, 5683520.1091864],
                        [373316.334576974, 5683518.98288062],
                        [373312.429372264, 5683517.22576055],
                        [373308.077580145, 5683514.73687705],
                        [373302.365617095, 5683509.55352994],
                        [373294.055764115, 5683501.97629472],
                        [373290.342324423, 5683498.79464478],
                        [373268.567953604, 5683483.93409757],
                        [373263.447009815, 5683480.97661608],
                        [373250.212359855, 5683473.66430288],
                        [373250.493627405, 5683475.05731238],
                      ],
                    ],
                  },
                },
                verwaltende_dienststelle: {
                  abkuerzung_abteilung: "3",
                  bezeichnung_abteilung: "Betrieb Grün- und Freiflächen",
                  email_adresse: null,
                  farbeArrayRelationShip: [
                    {
                      rgb_farbwert: 872403,
                      stil: {
                        bezeichnung: "gefüllt",
                      },
                    },
                  ],
                  ressort: {
                    abkuerzung: "103",
                    bezeichnung: "Ressort Grünflächen und Forsten",
                    id: 3,
                  },
                },
                verwaltungsgebrauch: {
                  abkuerzung: "0",
                  bezeichnung: "NICHTS",
                  unterabschnitt: "0",
                  kategorie: {
                    abkuerzung: "",
                    bezeichnung: "NICHTS",
                    oberkategorie: {
                      abkuerzung: "0",
                      bezeichnung: "NICHTS",
                      id: 6,
                    },
                  },
                },
                flaeche: 1,
              },
            ],
          },
          {
            id: 23299,
            geaendert_von: "PienischB102@Lagerbuch",
            geaendert_am: "2016-01-19T10:24:36.432",
            verwaltungsbereichArrayRelationShip: [
              {
                extended_geom: {
                  area: 7719.355573272187,
                  geo_field: {
                    type: "Polygon",
                    crs: {
                      type: "name",
                      properties: {
                        name: "urn:ogc:def:crs:EPSG::25832",
                      },
                    },
                    coordinates: [
                      [
                        [373206.234913131, 5683547.88579305],
                        [373187.520501116, 5683531.87135507],
                        [373200.433392821, 5683515.51348935],
                        [373201.592056261, 5683514.04531983],
                        [373203.98358074, 5683511.0148972],
                        [373210.210789503, 5683503.12702389],
                        [373212.409205383, 5683500.34165003],
                        [373216.649075689, 5683494.97046613],
                        [373224.022085832, 5683496.66025442],
                        [373247.59827088, 5683487.5193608],
                        [373250.493627405, 5683475.05731238],
                        [373250.212359855, 5683473.66430288],
                        [373263.447009815, 5683480.97661608],
                        [373268.567953604, 5683483.93409757],
                        [373290.342324423, 5683498.79464478],
                        [373294.055764115, 5683501.97629472],
                        [373302.365617095, 5683509.55352994],
                        [373308.077580145, 5683514.73687705],
                        [373312.429372264, 5683517.22576055],
                        [373316.334576974, 5683518.98288062],
                        [373318.427539302, 5683520.1091864],
                        [373319.083440354, 5683519.35628243],
                        [373257.774782235, 5683588.81295352],
                        [373243.66493986, 5683576.76276262],
                        [373217.401504395, 5683557.44496093],
                        [373206.234913131, 5683547.88579305],
                      ],
                    ],
                  },
                },
                verwaltende_dienststelle: {
                  abkuerzung_abteilung: "",
                  bezeichnung_abteilung: "",
                  email_adresse: null,
                  farbeArrayRelationShip: [
                    {
                      rgb_farbwert: 16755200,
                      stil: {
                        bezeichnung: "gefüllt",
                      },
                    },
                  ],
                  ressort: {
                    abkuerzung: "GMW",
                    bezeichnung: "Eigenbetrieb Gebäudemanagemant Wuppertal",
                    id: 27,
                  },
                },
                verwaltungsgebrauch: {
                  abkuerzung: "0",
                  bezeichnung: "NICHTS",
                  unterabschnitt: "0",
                  kategorie: {
                    abkuerzung: "",
                    bezeichnung: "NICHTS",
                    oberkategorie: {
                      abkuerzung: "0",
                      bezeichnung: "NICHTS",
                      id: 6,
                    },
                  },
                },
                flaeche: 7719,
              },
              {
                extended_geom: {
                  area: 837.561374001355,
                  geo_field: {
                    type: "Polygon",
                    crs: {
                      type: "name",
                      properties: {
                        name: "urn:ogc:def:crs:EPSG::25832",
                      },
                    },
                    coordinates: [
                      [
                        [373250.493627405, 5683475.05731238],
                        [373249.319545018, 5683469.0990065],
                        [373273.216911411, 5683466.96098021],
                        [373313.92652083, 5683510.46907488],
                        [373311.943339965, 5683514.08802834],
                        [373319.083440354, 5683519.35628243],
                        [373318.427539302, 5683520.1091864],
                        [373316.334576974, 5683518.98288062],
                        [373312.429372264, 5683517.22576055],
                        [373308.077580145, 5683514.73687705],
                        [373302.365617095, 5683509.55352994],
                        [373294.055764115, 5683501.97629472],
                        [373290.342324423, 5683498.79464478],
                        [373268.567953604, 5683483.93409757],
                        [373263.447009815, 5683480.97661608],
                        [373250.212359855, 5683473.66430288],
                        [373250.493627405, 5683475.05731238],
                      ],
                    ],
                  },
                },
                verwaltende_dienststelle: {
                  abkuerzung_abteilung: "3",
                  bezeichnung_abteilung: "Betrieb Grün- und Freiflächen",
                  email_adresse: null,
                  farbeArrayRelationShip: [
                    {
                      rgb_farbwert: 872403,
                      stil: {
                        bezeichnung: "gefüllt",
                      },
                    },
                  ],
                  ressort: {
                    abkuerzung: "103",
                    bezeichnung: "Ressort Grünflächen und Forsten",
                    id: 3,
                  },
                },
                verwaltungsgebrauch: {
                  abkuerzung: "0",
                  bezeichnung: "NICHTS",
                  unterabschnitt: "0",
                  kategorie: {
                    abkuerzung: "",
                    bezeichnung: "NICHTS",
                    oberkategorie: {
                      abkuerzung: "0",
                      bezeichnung: "NICHTS",
                      id: 6,
                    },
                  },
                },
                flaeche: 838,
              },
            ],
          },
          {
            id: 23562,
            geaendert_von: "PienischB102@Lagerbuch",
            geaendert_am: "2016-02-29T08:23:50.311",
            verwaltungsbereichArrayRelationShip: [
              {
                extended_geom: {
                  area: 7719.355573272187,
                  geo_field: {
                    type: "Polygon",
                    crs: {
                      type: "name",
                      properties: {
                        name: "urn:ogc:def:crs:EPSG::25832",
                      },
                    },
                    coordinates: [
                      [
                        [373206.234913131, 5683547.88579305],
                        [373187.520501116, 5683531.87135507],
                        [373200.433392821, 5683515.51348935],
                        [373201.592056261, 5683514.04531983],
                        [373203.98358074, 5683511.0148972],
                        [373210.210789503, 5683503.12702389],
                        [373212.409205383, 5683500.34165003],
                        [373216.649075689, 5683494.97046613],
                        [373224.022085832, 5683496.66025442],
                        [373247.59827088, 5683487.5193608],
                        [373250.493627405, 5683475.05731238],
                        [373250.212359855, 5683473.66430288],
                        [373263.447009815, 5683480.97661608],
                        [373268.567953604, 5683483.93409757],
                        [373290.342324423, 5683498.79464478],
                        [373294.055764115, 5683501.97629472],
                        [373302.365617095, 5683509.55352994],
                        [373308.077580145, 5683514.73687705],
                        [373312.429372264, 5683517.22576055],
                        [373316.334576974, 5683518.98288062],
                        [373318.427539302, 5683520.1091864],
                        [373319.083440354, 5683519.35628243],
                        [373257.774782235, 5683588.81295352],
                        [373243.66493986, 5683576.76276262],
                        [373217.401504395, 5683557.44496093],
                        [373206.234913131, 5683547.88579305],
                      ],
                    ],
                  },
                },
                verwaltende_dienststelle: {
                  abkuerzung_abteilung: "",
                  bezeichnung_abteilung: "",
                  email_adresse: null,
                  farbeArrayRelationShip: [
                    {
                      rgb_farbwert: 16755200,
                      stil: {
                        bezeichnung: "gefüllt",
                      },
                    },
                  ],
                  ressort: {
                    abkuerzung: "GMW",
                    bezeichnung: "Eigenbetrieb Gebäudemanagemant Wuppertal",
                    id: 27,
                  },
                },
                verwaltungsgebrauch: {
                  abkuerzung: "0",
                  bezeichnung: "NICHTS",
                  unterabschnitt: "0",
                  kategorie: {
                    abkuerzung: "",
                    bezeichnung: "NICHTS",
                    oberkategorie: {
                      abkuerzung: "0",
                      bezeichnung: "NICHTS",
                      id: 6,
                    },
                  },
                },
                flaeche: 7719,
              },
              {
                extended_geom: {
                  area: 837.561374001355,
                  geo_field: {
                    type: "Polygon",
                    crs: {
                      type: "name",
                      properties: {
                        name: "urn:ogc:def:crs:EPSG::25832",
                      },
                    },
                    coordinates: [
                      [
                        [373250.493627405, 5683475.05731238],
                        [373249.319545018, 5683469.0990065],
                        [373273.216911411, 5683466.96098021],
                        [373313.92652083, 5683510.46907488],
                        [373311.943339965, 5683514.08802834],
                        [373319.083440354, 5683519.35628243],
                        [373318.427539302, 5683520.1091864],
                        [373316.334576974, 5683518.98288062],
                        [373312.429372264, 5683517.22576055],
                        [373308.077580145, 5683514.73687705],
                        [373302.365617095, 5683509.55352994],
                        [373294.055764115, 5683501.97629472],
                        [373290.342324423, 5683498.79464478],
                        [373268.567953604, 5683483.93409757],
                        [373263.447009815, 5683480.97661608],
                        [373250.212359855, 5683473.66430288],
                        [373250.493627405, 5683475.05731238],
                      ],
                    ],
                  },
                },
                verwaltende_dienststelle: {
                  abkuerzung_abteilung: "3",
                  bezeichnung_abteilung: "Betrieb Grün- und Freiflächen",
                  email_adresse: null,
                  farbeArrayRelationShip: [
                    {
                      rgb_farbwert: 872403,
                      stil: {
                        bezeichnung: "gefüllt",
                      },
                    },
                  ],
                  ressort: {
                    abkuerzung: "103",
                    bezeichnung: "Ressort Grünflächen und Forsten",
                    id: 3,
                  },
                },
                verwaltungsgebrauch: {
                  abkuerzung: "0",
                  bezeichnung: "NICHTS",
                  unterabschnitt: "0",
                  kategorie: {
                    abkuerzung: "",
                    bezeichnung: "NICHTS",
                    oberkategorie: {
                      abkuerzung: "0",
                      bezeichnung: "NICHTS",
                      id: 6,
                    },
                  },
                },
                flaeche: 838,
              },
            ],
          },
          {
            id: 23971,
            geaendert_von: "SteiniD102@Lagerbuch",
            geaendert_am: "2017-04-28T09:18:03.934",
            verwaltungsbereichArrayRelationShip: [
              {
                extended_geom: {
                  area: 7719.355573272187,
                  geo_field: {
                    type: "Polygon",
                    crs: {
                      type: "name",
                      properties: {
                        name: "urn:ogc:def:crs:EPSG::25832",
                      },
                    },
                    coordinates: [
                      [
                        [373206.234913131, 5683547.88579305],
                        [373187.520501116, 5683531.87135507],
                        [373200.433392821, 5683515.51348935],
                        [373201.592056261, 5683514.04531983],
                        [373203.98358074, 5683511.0148972],
                        [373210.210789503, 5683503.12702389],
                        [373212.409205383, 5683500.34165003],
                        [373216.649075689, 5683494.97046613],
                        [373224.022085832, 5683496.66025442],
                        [373247.59827088, 5683487.5193608],
                        [373250.493627405, 5683475.05731238],
                        [373250.212359855, 5683473.66430288],
                        [373263.447009815, 5683480.97661608],
                        [373268.567953604, 5683483.93409757],
                        [373290.342324423, 5683498.79464478],
                        [373294.055764115, 5683501.97629472],
                        [373302.365617095, 5683509.55352994],
                        [373308.077580145, 5683514.73687705],
                        [373312.429372264, 5683517.22576055],
                        [373316.334576974, 5683518.98288062],
                        [373318.427539302, 5683520.1091864],
                        [373319.083440354, 5683519.35628243],
                        [373257.774782235, 5683588.81295352],
                        [373243.66493986, 5683576.76276262],
                        [373217.401504395, 5683557.44496093],
                        [373206.234913131, 5683547.88579305],
                      ],
                    ],
                  },
                },
                verwaltende_dienststelle: {
                  abkuerzung_abteilung: "",
                  bezeichnung_abteilung: "",
                  email_adresse: null,
                  farbeArrayRelationShip: [
                    {
                      rgb_farbwert: 16755200,
                      stil: {
                        bezeichnung: "gefüllt",
                      },
                    },
                  ],
                  ressort: {
                    abkuerzung: "GMW",
                    bezeichnung: "Eigenbetrieb Gebäudemanagemant Wuppertal",
                    id: 27,
                  },
                },
                verwaltungsgebrauch: {
                  abkuerzung: "0",
                  bezeichnung: "NICHTS",
                  unterabschnitt: "0",
                  kategorie: {
                    abkuerzung: "",
                    bezeichnung: "NICHTS",
                    oberkategorie: {
                      abkuerzung: "0",
                      bezeichnung: "NICHTS",
                      id: 6,
                    },
                  },
                },
                flaeche: 7719,
              },
              {
                extended_geom: {
                  area: 837.561374001355,
                  geo_field: {
                    type: "Polygon",
                    crs: {
                      type: "name",
                      properties: {
                        name: "urn:ogc:def:crs:EPSG::25832",
                      },
                    },
                    coordinates: [
                      [
                        [373250.493627405, 5683475.05731238],
                        [373249.319545018, 5683469.0990065],
                        [373273.216911411, 5683466.96098021],
                        [373313.92652083, 5683510.46907488],
                        [373311.943339965, 5683514.08802834],
                        [373319.083440354, 5683519.35628243],
                        [373318.427539302, 5683520.1091864],
                        [373316.334576974, 5683518.98288062],
                        [373312.429372264, 5683517.22576055],
                        [373308.077580145, 5683514.73687705],
                        [373302.365617095, 5683509.55352994],
                        [373294.055764115, 5683501.97629472],
                        [373290.342324423, 5683498.79464478],
                        [373268.567953604, 5683483.93409757],
                        [373263.447009815, 5683480.97661608],
                        [373250.212359855, 5683473.66430288],
                        [373250.493627405, 5683475.05731238],
                      ],
                    ],
                  },
                },
                verwaltende_dienststelle: {
                  abkuerzung_abteilung: "3",
                  bezeichnung_abteilung: "Betrieb Grün- und Freiflächen",
                  email_adresse: null,
                  farbeArrayRelationShip: [
                    {
                      rgb_farbwert: 872403,
                      stil: {
                        bezeichnung: "gefüllt",
                      },
                    },
                  ],
                  ressort: {
                    abkuerzung: "103",
                    bezeichnung: "Ressort Grünflächen und Forsten",
                    id: 3,
                  },
                },
                verwaltungsgebrauch: {
                  abkuerzung: "0",
                  bezeichnung: "NICHTS",
                  unterabschnitt: "0",
                  kategorie: {
                    abkuerzung: "",
                    bezeichnung: "NICHTS",
                    oberkategorie: {
                      abkuerzung: "0",
                      bezeichnung: "NICHTS",
                      id: 6,
                    },
                  },
                },
                flaeche: 838,
              },
            ],
          },
        ],
        zusatz_rolleArrayRelationShip: [],
        dms_urlArrayRelationShip: [
          {
            name: "IV",
            typ: 1,
            url: {
              object_name: "003.TIF",
              url_base: {
                path: "\\Lagerbuch\\Inhaltsverzeichnis_LB\\Barmen\\",
                prot_prefix: "\\\\",
                server: "sw0040",
                id: 11405,
              },
              id: 11766,
            },
            beschreibung: "",
            id: 11830,
          },
        ],
      },
    ],
  },
};

const gemarkung = {
  data: {
    gemarkung: [
      {
        schluessel: 3271,
        bezeichnung: "Haan",
      },
      {
        schluessel: 3001,
        bezeichnung: "Barmen",
      },
      {
        schluessel: 3485,
        bezeichnung: "Beyenburg",
      },
      {
        schluessel: 3279,
        bezeichnung: "Cronenberg",
      },
      {
        schluessel: 3278,
        bezeichnung: "Dönberg",
      },
      {
        schluessel: 3135,
        bezeichnung: "Elberfeld",
      },
      {
        schluessel: 3486,
        bezeichnung: "Langerfeld",
      },
      {
        schluessel: 3487,
        bezeichnung: "Nächstebreck",
      },
      {
        schluessel: 3267,
        bezeichnung: "Ronsdorf",
      },
      {
        schluessel: 3276,
        bezeichnung: "Schöller",
      },
      {
        schluessel: 3277,
        bezeichnung: "Vohwinkel",
      },
      {
        schluessel: 3422,
        bezeichnung: "Oberdüssel",
      },
      {
        schluessel: 1339,
        bezeichnung: "Schwelm",
      },
      {
        schluessel: 3430,
        bezeichnung: "Wald",
      },
      {
        schluessel: 3266,
        bezeichnung: "Remscheid",
      },
      {
        schluessel: 4139,
        bezeichnung: "Neukirchen",
      },
      {
        schluessel: 1329,
        bezeichnung: "Gennebreck",
      },
      {
        schluessel: 4241,
        bezeichnung: "Radevormwald",
      },
      {
        schluessel: 1314,
        bezeichnung: "Ennepetal",
      },
      {
        schluessel: 3257,
        bezeichnung: "Burg",
      },
    ],
  },
};

test.describe("lagis smoke test", () => {
  test("main page show map, menu, cards, combo boxes after authorisation", async ({
    page,
    context,
  }) => {
    await setupAllMocks(context);
    await mockOMTMapHosting(context);
    // await context.route(
    //   "https://lagis-api.cismet.de/graphql/LAGIS/execute",
    //   (route) =>
    //     route.fulfill({
    //       status: 200,
    //       contentType: "application/json",
    //       body: JSON.stringify(gemarkung),
    //     })
    // );

    await context.route("https://lagis-api.cismet.de/users", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          user: "cismet",
          domain: "LAGIS",
          jwt: "0000000",
          passHash: "0000000",
          userGroups: ["Lagerbuch", "NKF"],
        }),
      })
    );
    // Add this mock for flurstuecke data
    await context.route(
      "https://lagis-api.cismet.de/graphql/LAGIS/execute",
      (route) => {
        const requestBody = route.request().postDataJSON();

        // Check if it's a flurstuecke query FIRST (since it also contains "gemarkung")
        if (requestBody.query.includes("view_flurstueck_schluessel")) {
          console.log('🎯 Handling flurstuecke query with multiple parcels');
          return route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
              data: {
                view_flurstueck_schluessel: [
                  {
                    alkis_id: "053001-003-00039",
                    schluessel_id: 2197,
                    flurstueckart: "städtisch",
                    historisch: false
                  },
                  {
                    alkis_id: "053001-003-00040",
                    schluessel_id: 2198,
                    flurstueckart: "städtisch",
                    historisch: false
                  },
                  {
                    alkis_id: "053001-003-00041",
                    schluessel_id: 2199,
                    flurstueckart: "städtisch",
                    historisch: false
                  }
                ],
                gemarkung: [
                  {
                    schluessel: 3001,
                    bezeichnung: "Barmen"
                  },
                  {
                    schluessel: 3271,
                    bezeichnung: "Haan"
                  }
                ]
              },
            }),
          });
        }

        // Check if it's a gemarkung-only query
        if (requestBody.query.includes("gemarkung")) {
          console.log('🎯 Handling gemarkung-only query');
          return route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify(gemarkung),
          });
        }

        // Default fallback
        return route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(responseWithTwoOffices),
        });
      }
    );

    // Navigate to the application
    await page.goto("/");
    // Check initial page load
    // await expect(page.locator('text=LagIS')).toBeVisible();

    // Perform authentication
    await page.fill('input[type="email"]', "cismet");
    await page.fill('input[type="password"]', "cismet");
    await page.click(".ant-btn");

    // Wait for authentication and page load
    await page.waitForTimeout(5000);

    // Verify authenticated state - check for fuzzy search component
    await expect(page.locator("[data-test-id=fuzzy-search]")).toBeVisible();

    // Check for menu items
    const menuItems = page.locator(".ant-menu-item");
    await expect(menuItems).toHaveCount(9);

    // Check for "Karte" text
    await expect(page.locator("text=Karte")).toBeVisible();

    // Debug: Check if LandParcelChooser is now visible
    console.log('🔍 Checking for LandParcelChooser after authentication...');
    
    // Wait a bit more for data to load
    await page.waitForTimeout(2000);
    
    const selectElements = page.locator('.ant-select');
    const selectCount = await selectElements.count();
    console.log('🔍 Found .ant-select elements:', selectCount);
    
    if (selectCount > 0) {
      for (let i = 0; i < selectCount; i++) {
        const element = selectElements.nth(i);
        const isVisible = await element.isVisible();
        const boundingBox = await element.boundingBox();
        const innerHTML = await element.innerHTML().catch(() => 'Error getting innerHTML');
        console.log(`   Select ${i}: visible=${isVisible}, boundingBox=${JSON.stringify(boundingBox)}`);
        console.log(`   Content: ${innerHTML.substring(0, 100)}...`);
      }
    }
    
    // Check specifically for LandParcelChooser in the header
    const headerArea = page.locator('.h-\\[32px\\]');
    const headerExists = await headerArea.count() > 0;
    console.log('🔍 Header area exists:', headerExists);
    
    if (headerExists) {
      const headerHTML = await headerArea.innerHTML().catch(() => 'Error getting innerHTML');
      const hasSelect = headerHTML.includes('ant-select');
      console.log('🔍 Header contains ant-select:', hasSelect);
      if (hasSelect) {
        console.log('✅ LandParcelChooser should be visible in header!');
      }
    }

    // Test: Click Barmen in first dropdown and check second dropdown
    console.log('🎯 Testing first dropdown interaction...');
    
    // Wait for LandParcelChooser to be ready
    await page.waitForTimeout(1000);
    
    // Find the first select element (should be Gemarkung)
    const firstSelect = page.locator('.ant-select').first();
    await expect(firstSelect).toBeVisible();
    console.log('✅ First select element is visible');
    
    // Click to open the first dropdown
    await firstSelect.click();
    console.log('🔍 Clicked first dropdown');
    
    // Wait for dropdown options to appear
    await page.waitForTimeout(500);
    
    // Look for "Barmen" option in the dropdown
    const barmenOption = page.locator('.ant-select-dropdown .ant-select-item').filter({ hasText: 'Barmen' });
    const barmenExists = await barmenOption.count() > 0;
    console.log('🔍 Barmen option exists:', barmenExists);
    
    if (barmenExists) {
      // Click on Barmen
      await barmenOption.click();
      console.log('✅ Clicked Barmen option');
      
      // Wait for the selection to process
      await page.waitForTimeout(1000);
      
      // Now check what's in the second dropdown
      const secondSelect = page.locator('.ant-select').nth(1);
      const secondSelectExists = await secondSelect.count() > 0;
      console.log('🔍 Second select exists:', secondSelectExists);
      
      if (secondSelectExists) {
        // Click the second dropdown to see its options
        await secondSelect.click();
        console.log('🔍 Clicked second dropdown');
        
        // Wait for options to appear
        await page.waitForTimeout(500);
        
        // Get all options in the second dropdown
        const secondDropdownItems = page.locator('.ant-select-dropdown .ant-select-item');
        const itemCount = await secondDropdownItems.count();
        console.log(`🔍 Second dropdown has ${itemCount} options:`);
        
        // Log each option
        for (let i = 0; i < Math.min(itemCount, 10); i++) {
          const item = secondDropdownItems.nth(i);
          const text = await item.textContent();
          console.log(`   Option ${i}: "${text}"`);
        }
        
        // Look for "3" option in the second dropdown
        const option3 = page.locator('.ant-select-dropdown .ant-select-item').filter({ hasText: '3' });
        const option3Exists = await option3.count() > 0;
        console.log('🔍 Option "3" exists in second dropdown:', option3Exists);
        
        if (option3Exists) {
          // Click on "3"
          await option3.click();
          console.log('✅ Clicked "3" option in second dropdown');
          
          // Wait for the selection to process
          await page.waitForTimeout(1000);
          
          // Now check what's in the third dropdown
          const thirdSelect = page.locator('.ant-select').nth(2);
          const thirdSelectExists = await thirdSelect.count() > 0;
          console.log('🔍 Third select exists:', thirdSelectExists);
          
          if (thirdSelectExists) {
            // Click the third dropdown to see its options
            await thirdSelect.click();
            console.log('🔍 Clicked third dropdown');
            
            // Wait for options to appear
            await page.waitForTimeout(500);
            
            // Get all options in the third dropdown
            const thirdDropdownItems = page.locator('.ant-select-dropdown .ant-select-item');
            const thirdItemCount = await thirdDropdownItems.count();
            console.log(`🔍 Third dropdown has ${thirdItemCount} options:`);
            
            // Log each option in the third dropdown
            for (let i = 0; i < Math.min(thirdItemCount, 10); i++) {
              const item = thirdDropdownItems.nth(i);
              const text = await item.textContent();
              console.log(`   Option ${i}: "${text}"`);
            }
            
            // Look for "39-0" or similar option in the third dropdown
            let option39 = page.locator('.ant-select-dropdown .ant-select-item').filter({ hasText: '39-0' });
            let option39Exists = await option39.count() > 0;
            console.log('🔍 Option "39-0" exists in third dropdown:', option39Exists);
            
            // If "39-0" not found, try "39/0" format
            if (!option39Exists) {
              option39 = page.locator('.ant-select-dropdown .ant-select-item').filter({ hasText: '39/0' });
              option39Exists = await option39.count() > 0;
              console.log('🔍 Option "39/0" exists in third dropdown:', option39Exists);
            }
            
            // If still not found, try just "39"
            if (!option39Exists) {
              option39 = page.locator('.ant-select-dropdown .ant-select-item').filter({ hasText: '39' });
              option39Exists = await option39.count() > 0;
              console.log('🔍 Option "39" exists in third dropdown:', option39Exists);
            }
            
            // If still not found, try the first option
            if (!option39Exists) {
              option39 = page.locator('.ant-select-dropdown .ant-select-item').first();
              option39Exists = await option39.count() > 0;
              console.log('🔍 Using first available option in third dropdown:', option39Exists);
            }
            
            if (option39Exists) {
              const optionText = await option39.textContent();
              console.log('🔍 About to click option:', optionText);
              // Click on the found option
              await option39.click();
              console.log(`✅ Clicked "${optionText}" option in third dropdown`);
              
              // Wait for the selection to process and URL to update
              await page.waitForTimeout(1000);
              
              // Check the current URL and its parameters
              const currentUrl = page.url();
              console.log('🔍 Current URL:', currentUrl);
              
              // Check if URL contains the expected parameters
              const hasGemBarmen = currentUrl.includes('gem=Barmen');
              const hasFlur3 = currentUrl.includes('flur=3');
              const hasFstck39 = currentUrl.includes('fstck=39-0');
              
              console.log('🔍 URL parameter checks:');
              console.log(`   gem=Barmen: ${hasGemBarmen}`);
              console.log(`   flur=3: ${hasFlur3}`);
              console.log(`   fstck=39-0: ${hasFstck39}`);
              
              if (hasGemBarmen && hasFlur3 && hasFstck39) {
                console.log('✅ All URL parameters are correct: ?gem=Barmen&flur=3&fstck=39-0');
              } else {
                console.log('❌ URL parameters are not as expected');
              }
              
              // Extract just the query parameters for cleaner display
              const urlObj = new URL(currentUrl);
              const searchParams = urlObj.search;
              console.log('🔍 Query parameters:', searchParams);
              
            } else {
              console.log('❌ Option "39-0" not found in third dropdown');
              console.log('🔍 Available options were listed above');
            }
          } else {
            console.log('❌ Third select element not found');
          }
        } else {
          console.log('❌ Option "3" not found in second dropdown');
        }
      } else {
        console.log('❌ Second select element not found');
      }
    } else {
      console.log('❌ Barmen option not found in first dropdown');
      
      // Debug: Show what options are actually available
      const allOptions = page.locator('.ant-select-dropdown .ant-select-item');
      const optionCount = await allOptions.count();
      console.log(`🔍 First dropdown has ${optionCount} options:`);
      
      for (let i = 0; i < Math.min(optionCount, 5); i++) {
        const item = allOptions.nth(i);
        const text = await item.textContent();
        console.log(`   Option ${i}: "${text}"`);
      }
    }

    // Logout
    // await page.click(".logout");

    // Verify logout - should see LagIS Desktop
    // await expect(page.locator('text=LagIS Desktop')).toBeVisible();
  });
});
