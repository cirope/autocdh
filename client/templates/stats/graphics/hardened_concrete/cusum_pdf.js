
var putFilterData = function (filter, doc, yPosition) {
  return PdfHelper.addFilterData(filter, doc, yPosition, true, true, ['concretes', 'plantId', 'strengthId', 'download', 'aggregateId', 'settlementId',
    {label: 'discardHighErraticValues', checkbox: true}
  ])
}

Template.graphicHardenedConcreteCusum.events({
  'click [download-pdf]': function (event, template) {
    PdfHelper.generateGraphPage(template, 'data-container', 'graphic_hardened_concrete_cusum_title', 'pdfHardenedConcrete', putFilterData, 20, 2, 63)
  }
})
