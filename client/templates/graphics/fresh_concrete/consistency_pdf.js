

var putFilterData = function (filter, doc, yPosition) {
  return PdfHelper.addFilterData(filter, doc, yPosition, true, true, ['plantId', 'strengthId', 'download', 'aggregateId', 'settlementId'])
}

Template.graphicFreshConcreteConsistency.events({
  'click [data-download-pdf]': function (event, template) {
    var yPosition            = 25
    var name                 = TAPi18n.__('graphic_fresh_concrete_consistency')

    PDF.new({}, function (doc) {
      PdfHelper.addGraphImage(doc, 58, 'data-container', 4.75, function () {
        doc
          .setFont('helvetica')
          .setFontSize(14)
          .text(name, 20, yPosition)
          .setFontSize(9)

        doc.setFontSize(9)

        yPosition = putFilterData(template.data.filter, doc, yPosition += 5)

        // adding digital signature
        yPosition = DigitalSignature.addSignatureToEachPage(doc, 'pdfFreshConcrete', function () {
          doc.putTotalPages('___total_pages___')
          doc.save(name+'.pdf')
        })
      }, 4)
    })
  }
})
