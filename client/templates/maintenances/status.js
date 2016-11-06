var table = function () {
  var data    = null
  var headers = [
    { name: 'instrument', prompt: TAPi18n.__('maintenance_instrument'),        width: 45 },
    { name: 'quantity',   prompt: TAPi18n.__('maintenance_quantity'),          width: 20 },
    { name: 'code',       prompt: TAPi18n.__('maintenance_code_short'),        width: 20 },
    { name: 'report',     prompt: TAPi18n.__('maintenance_report'),            width: 40 },
    { name: 'date',       prompt: TAPi18n.__('maintenance_date_short'),        width: 35 },
    { name: 'validUntil', prompt: TAPi18n.__('maintenance_valid_until_short'), width: 35 },
    { name: 'period',     prompt: TAPi18n.__('maintenance_period'),            width: 40 }
  ]

  data = Maintenances.find({ active: true, type: 'calibratable' }).map(function (maintenance) {
    maintenance.instrument = Instruments.findOne(maintenance.instrumentId).name
    maintenance.code       = maintenance.code || ''
    maintenance.type       = TAPi18n.__('maintenance_' + maintenance.type)
    maintenance.date       = moment(maintenance.date).format('L')
    maintenance.validUntil = moment(maintenance.validUntil).format('L')
    maintenance.period     = maintenance.period ?
      maintenance.period + ' ' + TAPi18n.__('maintenance_period_unit', { count: maintenance.period }) : ''

    return maintenance
  })

  return { data: data, headers: headers }
}

Template.maintenanceStatus.helpers({
  instrument: function () {
    return Instruments.findOne(this.instrumentId).name
  }
})

Template.maintenanceStatus.events({
  'click [data-download-pdf]': function () {
    var yPosition = 20
    var tableData = table()

    PDF.new({}, function (doc) {
      doc
        .setFont('helvetica')
        .setFontSize(14)
        .text(TAPi18n.__('maintenance_status'), 20, yPosition)
        .setFontSize(9)

      doc
        .setFontSize(7)
        .table(20, yPosition += 10, tableData.data, tableData.headers, {
          printHeaders: true,
          autoSize: false,
          margins: { right: 0, left: 0, top: 30, bottom: 0 },
          fontSize: 7
        })

      yPosition = doc.lastCellPos.y + 40

      // adding digital signature
      yPosition = DigitalSignature.addSignatureToPdf(doc, 'pdfMaintenance', yPosition, function () {
        doc.putTotalPages('___total_pages___')
        doc.save(TAPi18n.__('maintenance_status') + '.pdf')
      })
    })
  }
})
