
var putFilterData = function (filter, doc, yPosition) {
  return PdfHelper.addFilterData(filter, doc, yPosition, true, true, ['concretes', 'plantId', 'strengthId', 'additiveId', 'molding', 'cured', 'additions',
    {label: 'customerId', text: 'customer-search'}, {label: 'workId', text: 'work-search'}
  ], true)
}

Template.graphicHardenedConcreteResistanceByCategory.onRendered(function () {

})

Template.graphicHardenedConcreteResistanceByCategory.helpers({
  sampleCount: function () {
    return this.cracks ? this.cracks.length : '-'
  }
})

Template.graphicHardenedConcreteResistanceByCategory.events({
  'click [data-download-pdf]': function (event, template) {

    PDF.new({}, function (doc) {
      var title = TAPi18n.__('stats_resistance_by_category')
      var yPosition = 30

      doc
        .setFont('helvetica')
        .setFontSize(14)
        .text(title, 20, yPosition)

      yPosition = putFilterData(template.data.filter, doc, yPosition += 5)
      yPosition += 10

      var table = PdfHelper.miniTable('hardened-concrete-cracks', {
        widths: [20, 20, 50, 50, 35, 35, 52, 20, 35, 5],
        sessionHiddenClass: 'text-muted'
      })

      table.headers.pop()
      table.headers.splice(2, 2)

      doc
        .setFontSize(6)
        .table(PdfHelper.COL_1, yPosition, table.data, table.headers, {
          printHeaders: true,
          autoSize: false,
          margins: { right: 0, left: 0, top: 35, bottom: DigitalSignature.getSignatureHeight(doc, 'pdfHardenedConcrete') },
          fontSize: 7
        })

      // adding digital signature
      yPosition = DigitalSignature.addCenteredSignatureToEachPage(doc, 'pdfHardenedConcrete', function () {
        doc.putTotalPages('___total_pages___')
        doc.save(title+'.pdf')
      })
    })
  },
  'click [data-download-complete-pdf]': function (event, template) {

    PDF.new({ orientation: 'l' }, function (doc) {
      var title = TAPi18n.__('stats_resistance_by_category')
      var yPosition = 30

      doc
        .setFont('helvetica')
        .setFontSize(14)
        .text(title, 20, yPosition)

      yPosition = putFilterData(template.data.filter, doc, yPosition += 5)
      yPosition += 10

      var table = PdfHelper.miniTable('hardened-concrete-cracks', {
        widths: [20, 20, 70, 70, 35, 35, 52, 20, 35, 5],
        sessionHiddenClass: 'text-muted'
      })

      table.headers.pop()

      doc
        .setFontSize(6)
        .table(PdfHelper.COL_1, yPosition, table.data, table.headers, {
          printHeaders: true,
          autoSize: false,
          margins: { right: 0, left: 0, top: 35, bottom: DigitalSignature.getSignatureHeight(doc, 'pdfHardenedConcrete') },
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
