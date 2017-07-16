
Template.graphicHardenedConcreteResistanceByCategory.onRendered(function () {

})

Template.graphicHardenedConcreteResistanceByCategory.helpers({
  sampleCount: function () {
    return this.cracks ? this.cracks.length : '-'
  }
})

Template.graphicHardenedConcreteResistanceByCategory.events({
  'click [data-download-pdf]': function (event, template) {

    PDF.new({ orientation: 'l' }, function (doc) {
      var title = TAPi18n.__('stats_resistance_by_category')
      var yPosition = 30

      doc
        .setFont('helvetica')
        .setFontSize(14)
        .text(title, 20, yPosition)

      var table = PdfHelper.miniTable('hardened-concrete-cracks', {
        widths: [30, 30, 70, 70, 40, 40, 40, 30, 40]
      })

      doc
        .setFontSize(6)
        .table(PdfHelper.COL_1, yPosition, table.data, table.headers, {
          printHeaders: true,
          autoSize: false,
          margins: { right: 0, left: 0, top: 10, bottom: DigitalSignature.getSignatureHeight(doc, 'pdfHardenedConcrete') },
          fontSize: 7
        })

      // adding digital signature
      yPosition = DigitalSignature.addCenteredSignatureToEachPage(doc, 'pdfHardenedConcrete', function () {
        doc.putTotalPages('___total_pages___')
        doc.save(title+'.pdf')
      })
    })
  },
})
