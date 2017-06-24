var table = function (tableName) {
  var table   = $('[data-table="' + tableName + '"]')
  var headers = []
  var data    = []
  var widths  = [120, 125]

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

var putFilterData = function (filter, doc, yPosition) {
  return PdfHelper.addFilterData(filter, doc, yPosition, true, true, ['concretes', 'plantId', 'strengthId', 'additiveId', 'molding', 'cured', 'additions'])
}

Template.graphicHardenedConcreteResistanceEvolution.events({
  'click [data-download-pdf]': function (event, template) {
    var yPosition            = 40
    var tablePercentagesData = table('percentages')
    var tableEvolutionData   = table('evolution')
    var name                 = TAPi18n.__('graphic_hardened_concrete_resistance_evolution_title')

    PDF.new({}, function (doc) {
      doc
        .setFont('helvetica')
        .setFontSize(14)
        .text(name, 20, yPosition)
        .setFontSize(9)

      doc
        .setFontSize(7)
        .table(20, yPosition += 5, tablePercentagesData.data, tablePercentagesData.headers, {
          printHeaders: true,
          autoSize: false,
          margins: { right: 0, left: 0, top: 0, bottom: 0 },
          fontSize: 7
        })

      doc.addPage()

      doc
        .setFontSize(7)
        .table(20, yPosition = 40, tableEvolutionData.data, tableEvolutionData.headers, {
          printHeaders: true,
          autoSize: false,
          margins: { right: 0, left: 0, top: 0, bottom: 0 },
          fontSize: 7
        })

      doc.setFontSize(9)

      yPosition += tableEvolutionData.data.length * 8.6 + 1.5

      PdfHelper.addGraphImage(doc, yPosition + 40, 'data-container', 5.5, function () {
        yPosition = putFilterData(template.data.filter, doc, yPosition += 5)

        // adding digital signature
        yPosition = DigitalSignature.addSignatureToEachPage(doc, 'pdfHardenedConcrete', function () {
          doc.putTotalPages('___total_pages___')
          doc.save(name+'.pdf')
        })
      }, 2)
    })
  }
})
