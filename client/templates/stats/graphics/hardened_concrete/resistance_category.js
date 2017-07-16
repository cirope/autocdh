
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
    var tableData = table()

    PDF.new({ orientation: 'l' }, function (doc) {
      var title = TAPi18n.__('customer_cracks_title', {
        customer: template.data.customer.name
      })

      doc
        .setFont('helvetica')
        .setFontSize(14)
        .text(title, 20, yPosition)

      doc
        .setFontSize(9)
        .table(20, yPosition += 15, tableData.data, tableData.headers, {
          printHeaders: true,
          autoSize: false,
          margins: { right: 0, left: 0, top: 35, bottom: DigitalSignature.getSignatureHeight(doc, 'pdfCustomerCracks') },
          fontSize: 9
        })

      // adding digital signature
      yPosition = DigitalSignature.addCenteredSignatureToEachPage(doc, 'pdfCustomerCracks', function () {
        doc.putTotalPages('___total_pages___')
        doc.save(title+'.pdf')
      })
    })
  },
})
