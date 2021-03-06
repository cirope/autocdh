var table = function () {
  var data    = null
  var headers = [
    { name: 'type',            prompt: TAPi18n.__('maintenance_type'),            width: 35 },
    { name: 'code',            prompt: TAPi18n.__('maintenance_code_short'),      width: 20 },
    { name: 'instrument',      prompt: TAPi18n.__('maintenance_instrument'),      width: 70 },
    { name: 'brand',           prompt: TAPi18n.__('maintenance_brand'),           width: 20 },
    { name: 'characteristics', prompt: TAPi18n.__('maintenance_characteristics'), width: 30 },
    { name: 'quantity',        prompt: TAPi18n.__('maintenance_quantity'),        width: 20 },
    { name: 'period',          prompt: TAPi18n.__('maintenance_period'),          width: 40 }
  ]

  data = Maintenances.find({ active: true }).map(function (maintenance) {
    maintenance.type            = TAPi18n.__('maintenance_' + maintenance.type)
    maintenance.code            = maintenance.code || ''
    maintenance.instrument      = Instruments.findOne(maintenance.instrumentId).name
    maintenance.brand           = maintenance.brand || ''
    maintenance.characteristics = maintenance.characteristics || ''
    maintenance.period          = maintenance.period ?
      maintenance.period + ' ' + TAPi18n.__('maintenance_period_unit', { count: maintenance.period }) : ''

    return maintenance
  })

  return { data: data, headers: headers }
}

Template.maintenanceMasterList.helpers({
  instrument: function () {
    return Instruments.findOne(this.instrumentId).name
  },

  type: function () {
    return TAPi18n.__('maintenance_' + this.type)
  }
})

Template.maintenanceMasterList.events({
  'click [data-download-pdf]': function () {
    var yPosition = 20
    var tableData = table()

    PDF.new({}, function (doc) {
      doc
        .setFont('helvetica')
        .setFontSize(14)
        .text(TAPi18n.__('maintenance_master_list'), 20, yPosition)
        .setFontSize(9)

      doc
        .setFontSize(7)
        .table(20, yPosition += 10, tableData.data, tableData.headers, {
          printHeaders: true,
          autoSize: false,
          margins: { right: 0, left: 0, top: 30, bottom: DigitalSignature.getSignatureHeight(doc, 'pdfMaintenance') },
          fontSize: 7
        })

      // adding digital signature
      yPosition = DigitalSignature.addCenteredSignatureToEachPage(doc, 'pdfMaintenance', function () {
        doc.putTotalPages('___total_pages___')
        doc.save(TAPi18n.__('maintenance_master_list') + '.pdf')
      })
    })
  }
})
