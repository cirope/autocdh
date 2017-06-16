var CustomOptions = new SimpleSchema({
  copyReceiptNumberFromSample: {
    type: Boolean,
    optional: true,
    defaultValue: false
  },

  receiptNumberLabel: {
    type: String,
    optional: true
  },

  showAirGraphic: {
    type: Boolean,
    optional: true,
    defaultValue: false
  },

  showDump: {
    type: Boolean,
    optional: true,
    defaultValue: false
  },

  showPavement: {
    type: Boolean,
    optional: true,
    defaultValue: false
  },

  showCanals3And4: {
    type: Boolean,
    optional: true,
    defaultValue: false
  },

  showStructure: {
    type: Boolean,
    optional: true,
    defaultValue: false
  }
})

var QaPercentage = new SimpleSchema({
  type: {
    type: String,
    allowedValues: ['lower_than_17', '17_to_20', '21_to_25', '30_to_35', 'greater_than_35']
  },

  month: {
    type: Number
  },

  value: {
    type: Number,
    decimal: true,
    min: 0,
    max: 100
  }
})

var QaVolume = new SimpleSchema({
  month: {
    type: Number
  },

  value: {
    type: Number,
    decimal: true,
    min: 0
  }
})

var QaIndicators = new SimpleSchema({
  resistance7DaysMin: {
    type: Number,
    decimal: true,
    optional: true,
    min: 50,
    max: 200,
    custom: function () {
      var max = this.siblingField('resistance7DaysMax').value

      if (this.value && max && this.value >= max) return 'maxNumber'
    }
  },

  resistance7DaysMax: {
    type: Number,
    decimal: true,
    optional: true,
    min: 50,
    max: 200,
    custom: function () {
      var min = this.siblingField('resistance7DaysMin').value

      if (this.value && min && this.value <= min) return 'minNumber'
    }
  },

  deviationMin: {
    type: Number,
    decimal: true,
    optional: true,
    min: 1,
    max: 60,
    custom: function () {
      var max = this.siblingField('deviationMax').value

      if (this.value && max && this.value >= max) return 'maxNumber'
    }
  },

  deviationMax: {
    type: Number,
    decimal: true,
    optional: true,
    min: 1,
    max: 60,
    custom: function () {
      var min = this.siblingField('deviationMin').value

      if (this.value && min && this.value <= min) return 'minNumber'
    }
  },

  deviationCoefficientMin: {
    type: Number,
    decimal: true,
    optional: true,
    min: 5,
    max: 30,
    custom: function () {
      var max = this.siblingField('deviationCoefficientMax').value

      if (this.value && max && this.value >= max) return 'maxNumber'
    }
  },

  deviationCoefficientMax: {
    type: Number,
    decimal: true,
    optional: true,
    min: 5,
    max: 30,
    custom: function () {
      var min = this.siblingField('deviationCoefficientMin').value

      if (this.value && min && this.value <= min) return 'minNumber'
    }
  },

  resistanceRatioMin: {
    type: Number,
    decimal: true,
    optional: true,
    min: 1,
    max: 2,
    custom: function () {
      var max = this.siblingField('resistanceRatioMax').value

      if (this.value && max && this.value >= max) return 'maxNumber'
    }
  },

  resistanceRatioMax: {
    type: Number,
    decimal: true,
    optional: true,
    min: 1,
    max: 2,
    custom: function () {
      var min = this.siblingField('resistanceRatioMin').value

      if (this.value && min && this.value <= min) return 'minNumber'
    }
  },

  efficiencyMin: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0.5,
    max: 2,
    custom: function () {
      var max = this.siblingField('efficiencyMax').value

      if (this.value && max && this.value >= max) return 'maxNumber'
    }
  },

  efficiencyMax: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0.5,
    max: 2,
    custom: function () {
      var min = this.siblingField('efficiencyMin').value

      if (this.value && min && this.value <= min) return 'minNumber'
    }
  },

  volumeMin: {
    type: Number,
    decimal: true,
    optional: true,
    min: 10,
    max: 1000,
    custom: function () {
      var max = this.siblingField('volumeMax').value

      if (this.value && max && this.value >= max) return 'maxNumber'
    }
  },

  volumeMax: {
    type: Number,
    decimal: true,
    optional: true,
    min: 10,
    max: 1000,
    custom: function () {
      var min = this.siblingField('volumeMin').value

      if (this.value && min && this.value <= min) return 'minNumber'
    }
  },

  claimsPercentageMin: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0.01,
    max: 5,
    custom: function () {
      var max = this.siblingField('claimsPercentageMax').value

      if (this.value && max && this.value >= max) return 'maxNumber'
    }
  },

  claimsPercentageMax: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0.01,
    max: 5,
    custom: function () {
      var min = this.siblingField('claimsPercentageMin').value

      if (this.value && min && this.value <= min) return 'minNumber'
    }
  },

  nonconformPercentageMin: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0.01,
    max: 2,
    custom: function () {
      var max = this.siblingField('nonconformPercentageMax').value

      if (this.value && max && this.value >= max) return 'maxNumber'
    }
  },

  nonconformPercentageMax: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0.01,
    max: 2,
    custom: function () {
      var min = this.siblingField('nonconformPercentageMin').value

      if (this.value && min && this.value <= min) return 'minNumber'
    }
  }
})

var QaOptions = new SimpleSchema({
  dispatchedPercentages: {
    type: [QaPercentage],
    optional: true
  },

  dispatchedVolume: {
    type: [QaVolume],
    optional: true
  },

  claimsVolume: {
    type: [QaVolume],
    optional: true
  },

  nonconformVolume: {
    type: [QaVolume],
    optional: true
  },

  indicators: {
    type: QaIndicators,
    optional: true
  }
})

var ProductionIndicators = new SimpleSchema({
  m3ByMixerMin: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 1000,
    custom: function () {
      var max = this.siblingField('m3ByMixerMax').value

      if (this.value && max && this.value >= max) return 'maxNumber'
    }
  },

  m3ByMixerMax: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 1000,
    custom: function () {
      var min = this.siblingField('m3ByMixerMin').value

      if (this.value && min && this.value <= min) return 'minNumber'
    }
  },

  m3ByHourMin: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 100,
    custom: function () {
      var max = this.siblingField('m3ByHourMax').value

      if (this.value && max && this.value >= max) return 'maxNumber'
    }
  },

  m3ByHourMax: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 100,
    custom: function () {
      var min = this.siblingField('m3ByHourMin').value

      if (this.value && min && this.value <= min) return 'minNumber'
    }
  },

  tripsByMixerMin: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 1000,
    custom: function () {
      var max = this.siblingField('tripsByMixerMax').value

      if (this.value && max && this.value >= max) return 'maxNumber'
    }
  },

  tripsByMixerMax: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 1000,
    custom: function () {
      var min = this.siblingField('tripsByMixerMin').value

      if (this.value && min && this.value <= min) return 'minNumber'
    }
  },

  averageTripMin: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 1000,
    custom: function () {
      var max = this.siblingField('averageTripMax').value

      if (this.value && max && this.value >= max) return 'maxNumber'
    }
  },

  averageTripMax: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 1000,
    custom: function () {
      var min = this.siblingField('averageTripMin').value

      if (this.value && min && this.value <= min) return 'minNumber'
    }
  },

  lostM3Min: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 1000,
    custom: function () {
      var max = this.siblingField('lostM3Max').value

      if (this.value && max && this.value >= max) return 'maxNumber'
    }
  },

  lostM3Max: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 1000,
    custom: function () {
      var min = this.siblingField('lostM3Min').value

      if (this.value && min && this.value <= min) return 'minNumber'
    }
  },

  punctualityMin: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 100,
    custom: function () {
      var max = this.siblingField('punctualityMax').value

      if (this.value && max && this.value >= max) return 'maxNumber'
    }
  },

  punctualityMax: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 100,
    custom: function () {
      var min = this.siblingField('punctualityMin').value

      if (this.value && min && this.value <= min) return 'minNumber'
    }
  },

  unfulfilledOrdersMin: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 100,
    custom: function () {
      var max = this.siblingField('unfulfilledOrdersMax').value

      if (this.value && max && this.value >= max) return 'maxNumber'
    }
  },

  unfulfilledOrdersMax: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 100,
    custom: function () {
      var min = this.siblingField('unfulfilledOrdersMin').value

      if (this.value && min && this.value <= min) return 'minNumber'
    }
  },

  rejectedTrucksMin: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 100,
    custom: function () {
      var max = this.siblingField('rejectedTrucksMax').value

      if (this.value && max && this.value >= max) return 'maxNumber'
    }
  },

  rejectedTrucksMax: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 100,
    custom: function () {
      var min = this.siblingField('rejectedTrucksMin').value

      if (this.value && min && this.value <= min) return 'minNumber'
    }
  },

  complaintsMin: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 100,
    custom: function () {
      var max = this.siblingField('complaintsMax').value

      if (this.value && max && this.value >= max) return 'maxNumber'
    }
  },

  complaintsMax: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 100,
    custom: function () {
      var min = this.siblingField('complaintsMin').value

      if (this.value && min && this.value <= min) return 'minNumber'
    }
  },

  tripAverageMin: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 10000,
    custom: function () {
      var max = this.siblingField('tripAverageMax').value

      if (this.value && max && this.value >= max) return 'maxNumber'
    }
  },

  tripAverageMax: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 10000,
    custom: function () {
      var min = this.siblingField('tripAverageMin').value

      if (this.value && min && this.value <= min) return 'minNumber'
    }
  },

  problematicPumpsMin: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 100,
    custom: function () {
      var max = this.siblingField('problematicPumpsMax').value

      if (this.value && max && this.value >= max) return 'maxNumber'
    }
  },

  problematicPumpsMax: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 100,
    custom: function () {
      var min = this.siblingField('problematicPumpsMin').value

      if (this.value && min && this.value <= min) return 'minNumber'
    }
  },

  truckBreakagesMin: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 100,
    custom: function () {
      var max = this.siblingField('truckBreakagesMax').value

      if (this.value && max && this.value >= max) return 'maxNumber'
    }
  },

  truckBreakagesMax: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 100,
    custom: function () {
      var min = this.siblingField('truckBreakagesMin').value

      if (this.value && min && this.value <= min) return 'minNumber'
    }
  },

  truckAvailabilityMin: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 100,
    custom: function () {
      var max = this.siblingField('truckAvailabilityMax').value

      if (this.value && max && this.value >= max) return 'maxNumber'
    }
  },

  truckAvailabilityMax: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 100,
    custom: function () {
      var min = this.siblingField('truckAvailabilityMin').value

      if (this.value && min && this.value <= min) return 'minNumber'
    }
  },

  productivityFactorMin: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 100,
    custom: function () {
      var max = this.siblingField('productivityFactorMax').value

      if (this.value && max && this.value >= max) return 'maxNumber'
    }
  },

  productivityFactorMax: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 100,
    custom: function () {
      var min = this.siblingField('productivityFactorMin').value

      if (this.value && min && this.value <= min) return 'minNumber'
    }
  },

  maintenanceMin: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 100,
    custom: function () {
      var max = this.siblingField('maintenanceMax').value

      if (this.value && max && this.value >= max) return 'maxNumber'
    }
  },

  maintenanceMax: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 100,
    custom: function () {
      var min = this.siblingField('maintenanceMin').value

      if (this.value && min && this.value <= min) return 'minNumber'
    }
  }
})

var ProductionOptions = new SimpleSchema({
  businessDays: {
    type: [QaVolume],
    optional: true
  },

  averageWorkedHours: {
    type: [QaVolume],
    optional: true
  },

  extraHours: {
    type: [QaVolume],
    optional: true
  },

  affectedTrucks: {
    type: [QaVolume],
    optional: true
  },

  trips: {
    type: [QaVolume],
    optional: true
  },

  pumps: {
    type: [QaVolume],
    optional: true
  },

  maintenanceHours: {
    type: [QaVolume],
    optional: true
  },

  truckBreaks: {
    type: [QaVolume],
    optional: true
  },

  pumpBreaks: {
    type: [QaVolume],
    optional: true
  },

  trucksNotAvailableForBreakage: {
    type: [QaVolume],
    optional: true
  },

  trucksNotAvailable: {
    type: [QaVolume],
    optional: true
  },

  tripsRejected: {
    type: [QaVolume],
    optional: true
  },

  reportedProblems: {
    type: [QaVolume],
    optional: true
  },

  failedDeliveries: {
    type: [QaVolume],
    optional: true
  },

  tripsOutOfTime: {
    type: [QaVolume],
    optional: true
  },

  averageCycleTrip: {
    type: [QaVolume],
    optional: true
  },

  averageDownload: {
    type: [QaVolume],
    optional: true
  },

  indicators: {
    type: ProductionIndicators,
    optional: true
  }
})

var DigitalSignatureOptions = new SimpleSchema({
  enabled: {
    type: Boolean,
    optional: true,
    defaultValue: false
  },

  pdfSample: {
    type: Boolean,
    optional: true,
    defaultValue: false
  },

  pdfProvidedCracks: {
    type: Boolean,
    optional: true,
    defaultValue: false
  },

  pdfStatsDeviation: {
    type: Boolean,
    optional: true,
    defaultValue: false
  },

  pdfMixtures: {
    type: Boolean,
    optional: true,
    defaultValue: false
  },

  pdfCustomerCracks: {
    type: Boolean,
    optional: true,
    defaultValue: false
  },

  pdfGranulometries: {
    type: Boolean,
    optional: true,
    defaultValue: false
  },

  pdfHardenedConcreteEvolution: {
    type: Boolean,
    optional: true,
    defaultValue: false
  },

  pdfMaintenance: {
    type: Boolean,
    optional: true,
    defaultValue: false
  },

  pdfMaintenanceCheckList: {
    type: Boolean,
    optional: true,
    defaultValue: false
  },

  pdfManagementDocuments: {
    type: Boolean,
    optional: true,
    defaultValue: false
  },

  signatureImageId: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Images',
        previewTemplate: 'digitalSignatureImagePreview',
        selectFileBtnTemplate: 'digitalSignatureSelectBtn',
        removeFileBtnTemplate: 'digitalSignatureRemoveBtn'
      }
    }
  },

  signatureImageWidth: {
    type: Number,
    min: 10,
    decimal: false,
    defaultValue: 20,
    autoform: {
      template: 'measure',
      step: 1,
      unit: 'mm'
    }
  },

  signatureImageHeight: {
    type: Number,
    min: 10,
    decimal: false,
    defaultValue: 20,
    autoform: {
      template: 'measure',
      step: 1,
      unit: 'mm'
    }
  },

  signatureImageMargin: {
    type: Number,
    min: 1,
    max: 10,
    decimal: false,
    defaultValue: 6
  },

  title1: {
    type: String,
    optional: true
  },

  title2: {
    type: String,
    optional: true
  },

  title3: {
    type: String,
    optional: true
  },

  title4: {
    type: String,
    optional: true
  },

  title5: {
    type: String,
    optional: true
  },

  subtitle1: {
    type: String,
    optional: true
  },

  subtitle2: {
    type: String,
    optional: true
  },

  subtitle3: {
    type: String,
    optional: true
  },

  subtitle4: {
    type: String,
    optional: true
  },

  subtitle5: {
    type: String,
    optional: true
  },

  fontTitle: {
    type: Number,
    min: 4,
    max: 36,
    decimal: false,
    defaultValue: 11
  },

  fontSubtitle: {
    type: Number,
    min: 4,
    max: 36,
    decimal: false,
    defaultValue: 9
  },

  spaceBetweenTitles: {
    type: Number,
    min: 1,
    max: 10,
    decimal: false,
    defaultValue: 4
  }
})

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
    type: CustomOptions,
    optional: true
  },

  qa: {
    type: QaOptions,
    optional: true
  },

  production: {
    type: ProductionOptions,
    optional: true
  },

  digitalSignature: {
    type: DigitalSignatureOptions,
    optional: true
  }
}])

if (Meteor.isClient) {
  Schemas.Setting.labels({
    efficiencyDesirable:                             function () { return TAPi18n.__('setting_efficiency_desirable') },
    efficiencyDesirableLow:                          function () { return TAPi18n.__('setting_efficiency_desirable_low') },
    resistance3Days:                                 function () { return TAPi18n.__('setting_resistance_3_days') },
    resistance7Days:                                 function () { return TAPi18n.__('setting_resistance_7_days') },
    'digitalSignature.enabled':                      function () { return TAPi18n.__('setting_pdf_digital_signature') },
    'digitalSignature.pdfSample':                    function () { return TAPi18n.__('setting_pdf_sample') },
    'digitalSignature.pdfProvidedCracks':            function () { return TAPi18n.__('setting_pdf_provided_cracks') },
    'digitalSignature.pdfStatsDeviation':            function () { return TAPi18n.__('setting_pdf_deviation') },
    'digitalSignature.pdfMixtures':                  function () { return TAPi18n.__('setting_pdf_mixtures') },
    'digitalSignature.pdfCustomerCracks':            function () { return TAPi18n.__('setting_pdf_customer_cracks') },
    'digitalSignature.pdfGranulometries':            function () { return TAPi18n.__('setting_pdf_granulometries') },
    'digitalSignature.pdfHardenedConcreteEvolution': function () { return TAPi18n.__('setting_pdf_hardened_concrete_evolution') },
    'digitalSignature.pdfMaintenance':               function () { return TAPi18n.__('setting_pdf_maintenance') },
    'digitalSignature.pdfMaintenanceCheckList':      function () { return TAPi18n.__('setting_pdf_maintenance_check_list') },
    'digitalSignature.pdfManagementDocuments':       function () { return TAPi18n.__('setting_pdf_management_documents') },
    'digitalSignature.signatureImageId':             function () { return TAPi18n.__('setting_pdf_image') },
    'digitalSignature.signatureImageWidth':          function () { return TAPi18n.__('setting_pdf_image_width') },
    'digitalSignature.signatureImageHeight':         function () { return TAPi18n.__('setting_pdf_image_height') },
    'digitalSignature.signatureImageMargin':         function () { return TAPi18n.__('setting_pdf_image_margin') },
    'digitalSignature.spaceBetweenTitles':           function () { return TAPi18n.__('setting_pdf_space_between_titles') },
    'digitalSignature.fontTitle':                    function () { return TAPi18n.__('setting_pdf_titles_font') },
    'digitalSignature.fontSubtitle':                 function () { return TAPi18n.__('setting_pdf_subtitles_font') },
    'digitalSignature.title1':                       function () { return TAPi18n.__('setting_pdf_title') },
    'digitalSignature.title2':                       function () { return TAPi18n.__('setting_pdf_title') },
    'digitalSignature.title3':                       function () { return TAPi18n.__('setting_pdf_title') },
    'digitalSignature.title4':                       function () { return TAPi18n.__('setting_pdf_title') },
    'digitalSignature.title5':                       function () { return TAPi18n.__('setting_pdf_title') },
    'digitalSignature.subtitle1':                    function () { return TAPi18n.__('setting_pdf_subtitle') },
    'digitalSignature.subtitle2':                    function () { return TAPi18n.__('setting_pdf_subtitle') },
    'digitalSignature.subtitle3':                    function () { return TAPi18n.__('setting_pdf_subtitle') },
    'digitalSignature.subtitle4':                    function () { return TAPi18n.__('setting_pdf_subtitle') },
    'digitalSignature.subtitle5':                    function () { return TAPi18n.__('setting_pdf_subtitle') },
    'customOptions.receiptNumberLabel':              function () { return TAPi18n.__('setting_custom_options_receipt_number_label') },
    'customOptions.copyReceiptNumberFromSample':     function () { return TAPi18n.__('setting_custom_options_copy_receipt_number_from_sample') },
    'customOptions.showStructure':                   function () { return TAPi18n.__('setting_custom_options_show_structure') },
    'customOptions.showAirGraphic':                  function () { return TAPi18n.__('setting_custom_options_show_air_graphic') },
    'customOptions.showDump':                        function () { return TAPi18n.__('setting_custom_options_show_dump') },
    'customOptions.showPavement':                    function () { return TAPi18n.__('setting_custom_options_show_pavement') },
    'customOptions.showCanals3And4':                 function () { return TAPi18n.__('setting_custom_options_show_canals_3_and_4') }
  })
}
