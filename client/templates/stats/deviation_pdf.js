var putStaticData = function (doc, yPosition) {
  $('[data-filter]').each(function (i, element) {
    var $input = $(element).find('.form-control')
    var label  = $(element).find('.control-label').text()
    var value  = $input.find('option:selected').text() || $input.val()

    doc.text(label + ': ' + value, 20, yPosition += 5)
  })

  var tenPercentCriteria = TAPi18n.__('stats_ten_percent_criteria') + ': ' +
    TAPi18n.__($('[name="tenPercentCriteria"]').is(':checked') ? 'yes' : 'no')

  doc.text(tenPercentCriteria, 20, yPosition += 5)

  yPosition += 5

  $('[data-item]').each(function (i, element) {
    var label = $(element).find('[data-label]').text()
    var value = $(element).find('[data-value]').text()

    doc.text(label + ' ' + value, 20, yPosition += 5)
  })

  return yPosition
}

var table = function () {
  var table   = $('[data-table="cracks"]')
  var headers = []
  var data    = []
  var widths  = [135, 50, 50]

  table.find('thead th').each(function (i, element) {
    var header = $(element).text()

    headers.push({ name: header, prompt: header, width: widths[i] })
  })

  table.find('tbody tr').each(function (i, element) {
    var obj = {}

    $(element).find('td').each(function (j, cell) {
      obj[headers[j].name] = $(cell).text().replace('″', '"')
    })

    data.push(obj)
  })

  return { data: data, headers: headers }
}

Template.statsDeviation.events({
  'click [data-download-pdf]': function (event, template) {
    var title     = TAPi18n.__('deviation') + ' - ' + template.data.strength.name
    var yPosition = 20
    var tableData = table()

    PDF.new({}, function (doc) {
      doc
        .setFont('helvetica')
        .setFontSize(14)
        .text(title, 20, yPosition)
        .setFontSize(9)

      yPosition = putStaticData(doc, yPosition + 7)

      doc
        .setFontSize(7)
        .table(20, yPosition += 5, tableData.data, tableData.headers, {
          printHeaders: true,
          autoSize: false,
          margins: { right: 0, left: 0, top: 35, bottom: 0 },
          fontSize: 7
        })

      // adding digital signature
      yPosition = DigitalSignature.addCenteredSignatureToEachPage(doc, 'pdfStatsDeviation', function () {
        doc.putTotalPages('___total_pages___')
        doc.save(title+'.pdf')
      })
    })
  }
})
