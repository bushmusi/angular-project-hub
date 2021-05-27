// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  rootPath: window["rootPath"],
  formPath: window["formPath"],
  rootPath2: window["rootPath2"],
  rootLookupApiPath: window["rootLookupApiPath"],

  rootApiPath: window["rootApiPath"],
  // formPath: '',
  // username: 'BL_desk_mgr',
  username: "Finance user",
  // username: 'BL_Data_Encoder',
  // username: 'BL_Tech_leader',
  // username: 'berukbb',
  // username: 'fruit',
  // username: 'Boss',
  phisicalPath: "./assets/i18n/",
  Lang: "10D04E8B-3361-E111-95D5-00E04C05559B",
  certReportPath: window["certReportPath"],
  LetterReportPath: window["LetterReportPath"],
  PaymentReportPath: window["PaymentReportPath"],
  ValidateReportPath: window["ValidateReportPath"],
  GISURL: window["GISURL"],
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
