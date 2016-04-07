var table = function () {
  var data    = []
  var headers = []
  var headers  = [
    { name: 'type',            prompt: TAPi18n.__('maintenance_type'),            width: 35 },
    { name: 'code',            prompt: TAPi18n.__('maintenance_code'),            width: 35 },
    { name: 'instrument',      prompt: TAPi18n.__('maintenance_instrument'),      width: 55 },
    { name: 'brand',           prompt: TAPi18n.__('maintenance_brand'),           width: 20 },
    { name: 'characteristics', prompt: TAPi18n.__('maintenance_characteristics'), width: 30 },
    { name: 'quantity',        prompt: TAPi18n.__('maintenance_quantity'),        width: 20 },
    { name: 'period',          prompt: TAPi18n.__('maintenance_period'),          width: 40 }
  ]

  _.times(40, function () {
  data = data.concat(Maintenances.find().map(function (maintenance) {
    maintenance.type            = TAPi18n.__('maintenance_' + maintenance.type)
    maintenance.code            = maintenance.code || ''
    maintenance.instrument      = Instruments.findOne(maintenance.instrumentId).name
    maintenance.brand           = maintenance.brand || ''
    maintenance.characteristics = maintenance.characteristics || ''
    maintenance.period          = maintenance.period ?
      maintenance.period + ' ' + TAPi18n.__('maintenance_period_unit', { count: maintenance.period }) : ''

    return maintenance
  }))
  })

  return { data: data, headers: headers }
}

Template.maintenanceReports.events({
  'click [data-pdf="master-list"]': function () {
    var yPosition    = 20
    var tableData    = table()

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
          margins: { right: 0, left: 0, top: 30, bottom: 0 },
          fontSize: 7
        })

      doc.save(TAPi18n.__('maintenance_master_list') + '.pdf')
    })
  }
})
