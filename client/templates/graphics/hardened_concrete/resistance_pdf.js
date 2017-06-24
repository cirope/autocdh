
var putFilterData = function (filter, doc, yPosition) {
  return PdfHelper.addFilterData(filter, doc, yPosition, true, true, ['concretes', 'plantId', 'strengthId', 'download', 'aggregateId', 'settlementId',
    {label: 'customerId', text: 'customer-search'}, {label: 'workId', text: 'work-search'}, {label: 'discardHighErraticValues', checkbox: true}
  ])
}

Template.graphicHardenedConcreteResistance.events({
  'click [graph-download-pdf]': function (event, template) {
    PdfHelper.generateGraphPage(template, 'data-container', 'graphic_hardened_concrete_resistance_title', 'pdfHardenedConcrete', putFilterData, 16, 2, 63)
  },
  'click [values-download-pdf]': function (event, template) {
    var yPosition            = 40
    var name                 = TAPi18n.__('graphic_hardened_concrete_resistance_title')

    PDF.new({}, function (doc) {
      doc
        .setFont('helvetica')
        .setFontSize(14)
        .text(name, 20, yPosition)
        .setFontSize(9)

      doc.setFontSize(9)

      yPosition = putFilterData(template.data.filter, doc, yPosition += 5)
      yPosition += 10

      var table = PdfHelper.miniTable('hardened-concrete-cracks', {
        widths: [25, 40, 40, 40]
      })
      doc
        .setFontSize(6)
        .table(PdfHelper.COL_1, yPosition, table.data, table.headers, {
          printHeaders: true,
          autoSize: false,
          margins: { right: 0, left: 0, top: 10, bottom: 0 },
          fontSize: 7
        })

      // adding digital signature
      yPosition = DigitalSignature.addSignatureToEachPage(doc, 'pdfHardenedConcrete', function () {
        doc.putTotalPages('___total_pages___')
        doc.save(name+'.pdf')
      })
    })
  }
})
