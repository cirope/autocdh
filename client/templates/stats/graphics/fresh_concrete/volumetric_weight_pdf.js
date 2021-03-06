
var putFilterData = function (filter, doc, yPosition) {
  return PdfHelper.addFilterData(filter, doc, yPosition, true, true, ['plantId', 'strengthId', 'download', 'aggregateId', 'settlementId'])
}

Template.graphicFreshConcreteVolumetricWeight.events({
  'click [data-download-pdf]': function (event, template) {
    PdfHelper.generateGraphPage(template, 'data-container', 'graphic_fresh_concrete_volumetric_weight', 'pdfFreshConcrete', putFilterData)
  }
})
