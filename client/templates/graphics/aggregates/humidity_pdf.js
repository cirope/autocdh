

var putFilterData = function (filter, doc, yPosition) {
  return PdfHelper.addFilterData(filter, doc, yPosition, true, true, ['plantId', 'materialId', {label: 'providerId', text: 'provider-search'}])
}

Template.graphicAggregateHumidity.events({
  'click [download-pdf]': function (event, template) {
    var yPosition            = 40
    var name                 = TAPi18n.__('graphic_aggregate_humidity_title')

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
        yPosition = DigitalSignature.addSignatureToEachPage(doc, 'pdfStatsAggregates', function () {
          doc.putTotalPages('___total_pages___')
          doc.save(name+'.pdf')
        })
      })
    })
  }
})
