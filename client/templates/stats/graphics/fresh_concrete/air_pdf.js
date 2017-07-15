
var putFilterData = function (filter, doc, yPosition) {
  return PdfHelper.addFilterData(filter, doc, yPosition, true, true, ['plantId', 'strengthId', 'download', 'aggregateId', 'settlementId'])
}

Template.graphicFreshConcreteAir.events({
  'click [data-download-pdf]': function (event, template) {
    PdfHelper.generateGraphPage(template, 'data-container', 'graphic_fresh_concrete_air_title', 'pdfFreshConcrete', putFilterData)
  }
})
