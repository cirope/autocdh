Schemas.Setting = new SimpleSchema([Schemas.Base, {
  efficiencyDesirable: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0.01,
    max: 50,
    autoform: {
      autofocus: true
    }
  },

  efficiencyDesirableLow: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0.01,
    max: 50
  },

  resistance3Days: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 200
  },

  resistance7Days: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 200
  },

  customOptions: {
    type: Object
  },

  'customOptions.showAirGraphic': {
    type: Boolean,
    optional: true,
    defaultValue: false
  },

  'customOptions.showPavement': {
    type: Boolean,
    optional: true,
    defaultValue: false
  },

  'customOptions.showDump': {
    type: Boolean,
    optional: true,
    defaultValue: false
  },

  'customOptions.showStructure': {
    type: Boolean,
    optional: true,
    defaultValue: false
  },

  'customOptions.receiptNumberLabel': {
    type: String,
    optional: true
  },

  'customOptions.copyReceiptNumberFromSample': {
    type: Boolean,
    optional: true,
    defaultValue: false
  },

  digitalSignature: {
    type: Object
  },

  'digitalSignature.enabled': {
    type: Boolean,
    optional: true,
    defaultValue: false
  },

  'digitalSignature.pdfSample': {
    type: Boolean,
    optional: true,
    defaultValue: false
  },

  'digitalSignature.pdfProvidedCracks': {
    type: Boolean,
    optional: true,
    defaultValue: false
  },

  'digitalSignature.pdfStatsDeviation': {
    type: Boolean,
    optional: true,
    defaultValue: false
  },

  'digitalSignature.pdfMixtures': {
    type: Boolean,
    optional: true,
    defaultValue: false
  },

  'digitalSignature.pdfCustomerCracks': {
    type: Boolean,
    optional: true,
    defaultValue: false
  },

  'digitalSignature.pdfGranulometries': {
    type: Boolean,
    optional: true,
    defaultValue: false
  },

  'digitalSignature.pdfHardenedConcreteEvolution': {
    type: Boolean,
    optional: true,
    defaultValue: false
  },

  'digitalSignature.pdfMaintenance': {
    type: Boolean,
    optional: true,
    defaultValue: false
  },

  'digitalSignature.pdfMaintenanceCheckList': {
    type: Boolean,
    optional: true,
    defaultValue: false
  },

  'digitalSignature.signatureImageId': {
    type: String
  },

  'digitalSignature.title1': {
    type: String,
    optional: true
  },

  'digitalSignature.title2': {
    type: String,
    optional: true
  },

  'digitalSignature.title3': {
    type: String,
    optional: true
  },

  'digitalSignature.title4': {
    type: String,
    optional: true
  },

  'digitalSignature.title5': {
    type: String,
    optional: true
  },

  'digitalSignature.subtitle1': {
    type: String,
    optional: true
  },

  'digitalSignature.subtitle2': {
    type: String,
    optional: true
  },

  'digitalSignature.subtitle3': {
    type: String,
    optional: true
  },

  'digitalSignature.subtitle4': {
    type: String,
    optional: true
  },

  'digitalSignature.subtitle5': {
    type: String,
    optional: true
  }

}])

if (Meteor.isClient) {
  Schemas.Setting.labels({
    efficiencyDesirable:                  function () { return TAPi18n.__('setting_efficiency_desirable') },
    efficiencyDesirableLow:               function () { return TAPi18n.__('setting_efficiency_desirable_low') },
    resistance3Days:                      function () { return TAPi18n.__('setting_resistance_3_days') },
    resistance7Days:                      function () { return TAPi18n.__('setting_resistance_7_days') },
    'digitalSignature.enabled':           function () { return TAPi18n.__('setting_pdf_digital_signature') },
    'digitalSignature.pdfSample':         function () { return TAPi18n.__('setting_pdf_sample') },
    'digitalSignature.pdfProvidedCracks': function () { return TAPi18n.__('setting_pdf_provided_cracks') },
    'digitalSignature.pdfStatsDeviation': function () { return TAPi18n.__('setting_pdf_deviation') },
    'digitalSignature.pdfMixtures':       function () { return TAPi18n.__('setting_pdf_mixtures') },
    'digitalSignature.pdfCustomerCracks': function () { return TAPi18n.__('setting_pdf_customer_cracks') },
    'digitalSignature.pdfGranulometries': function () { return TAPi18n.__('setting_pdf_granulometries') },
    'digitalSignature.pdfHardenedConcreteEvolution': function () { return TAPi18n.__('setting_pdf_hardened_concrete_evolution') },
    'digitalSignature.pdfMaintenance':    function () { return TAPi18n.__('setting_pdf_maintenance') },
    'digitalSignature.pdfMaintenanceCheckList': function () { return TAPi18n.__('setting_pdf_maintenance_check_list') }
  })
}
