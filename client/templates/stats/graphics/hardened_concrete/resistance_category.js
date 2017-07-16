
Template.graphicHardenedConcreteResistanceByCategory.onRendered(function () {

})

Template.graphicHardenedConcreteResistanceByCategory.helpers({
  sampleCount: function () {
    return this.cracks ? this.cracks.length : '-'
  }
})

Template.graphicHardenedConcreteResistanceByCategory.events({
  'click [data-download-pdf]': function (event, template) {
    var yPosition = 20

    PDF.new({ orientation: 'l' }, function (doc) {
      var title = TAPi18n.__('customer_cracks_title', {
        customer: template.data.customer.name
      })

      doc
        .setFont('helvetica')
        .setFontSize(14)
        .text(title, 20, yPosition)

      var table = PdfHelper.miniTable('hardened-concrete-cracks', {
        widths: [25, 40, 40, 40, 20, 20, 20, 20, 20]
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
