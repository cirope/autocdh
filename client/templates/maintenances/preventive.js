var tableData = function (table) {
  var headers = []
  var data    = []
  var widths  = table.find('thead th').length === 6 ?
    [35, 30, 80, 50, 80, 70] :
    [35, 25, 70, 70, 40, 60, 45]

  table.find('thead th').each(function (i, element) {
    var header = $(element).text()

    headers.push({ name: header, prompt: header, width: widths[i] })
  })

  table.find('tbody tr').each(function (i, element) {
    var obj = {}

    $(element).find('td').each(function (j, cell) {
      obj[headers[j].name] = $(cell).text() && $(cell).text() || "\n\n\n\n"
    })

    data.push(obj)
  })

  return { data: data, headers: headers }
}

Template.maintenancePreventive.helpers({
  preventiveTemplate: function () {
    var instrument = Instruments.findOne(this.instrumentId)

    return instrument.checklist && ('maintenanceChecklist' + instrument.checklist)
  },

  data: function () {
    return _.extend(this, { hideDownload: true })
  }
})

Template.maintenancePreventive.events({
  'click [data-download-pdf]': function (event, template) {
    var yPosition = 30
    var $tables   = $('[data-table="checklist"]')

    PDF.new({ orientation: 'l' }, function (doc) {
      doc
        .setFont('helvetica')
        .setFontSize(14)
        .text(TAPi18n.__('maintenance_preventive_title'), 20, yPosition)

        $tables.each(function (i, element) {
          var title      = $(element).closest('.panel').find('.panel-title').text()
          var _tableData = tableData($(element))

          if (i === 0) {
            yPosition += 10
          } else {
            yPosition = 30

            doc.addPage()
          }

          doc
            .setFontSize(12)
            .text(title, 20, yPosition)
            .setFontSize(9)

          doc
            .text(TAPi18n.__('maintenance_checklist_date')    + ':', 20, yPosition += 10)
            .text(TAPi18n.__('maintenance_checklist_made_by') + ':', 20, yPosition += 5)

          doc
            .setFontSize(7)
            .table(20, yPosition += 5, _tableData.data, _tableData.headers, {
              printHeaders: true,
              autoSize: false,
              margins: { right: 0, left: 0, top: 0, bottom: 5 },
              fontSize: 7
            })
        })

      yPosition = doc.lastCellPos.y + 50

      // adding digital signature
      yPosition = DigitalSignature.addSignatureToPdf(doc, 'pdfMaintenanceCheckList', yPosition, function () {
        doc.putTotalPages('___total_pages___')
        doc.save(TAPi18n.__('maintenance_preventive_title') + '.pdf')
      })
    })
  }
})
