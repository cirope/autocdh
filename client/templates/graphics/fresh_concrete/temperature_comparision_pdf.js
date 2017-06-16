

var putFilterData = function (filter, doc, yPosition) {
  return PdfHelper.addFilterData(filter, doc, yPosition, true, true, ['plantId', 'strengthId', 'download', 'aggregateId', 'settlementId'])
}

Template.graphicFreshConcreteTemperatureComparison.events({
  'click [data-download-pdf]': function (event, template) {
    var yPosition            = 40
    var name                 = TAPi18n.__('graphic_fresh_concrete_temperature_comparison')

    PDF.new({}, function (doc) {
      doc
        .setFont('helvetica')
        .setFontSize(14)
        .text(name, 20, yPosition)
        .setFontSize(9)

      doc.setFontSize(9)

      yPosition = putFilterData(template.data.filter, doc, yPosition += 5)

      PdfHelper.addGraphImage(doc, yPosition += 5, 'data-container', 6.75, function () {
        // adding digital signature
        yPosition = DigitalSignature.addSignatureToEachPage(doc, 'pdfFreshConcrete', function () {
          doc.putTotalPages('___total_pages___')
          doc.save(name+'.pdf')
        })
      })
    })
  }
})
