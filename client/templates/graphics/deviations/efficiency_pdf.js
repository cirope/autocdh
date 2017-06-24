
var putFilterData = function (filter, doc, yPosition) {
  return PdfHelper.addFilterData(filter, doc, yPosition, true, true, ['concretes', 'plantId', 'strengthId', 'download', 'aggregateId', 'settlementId'])
}

Template.graphicConcreteEfficiency.events({
  'click [download-pdf]': function (event, template) {
    PdfHelper.generateGraphPage(template, 'data-container', 'graphic_deviation_efficiency_title', 'pdfStatsIndicators', putFilterData)
  }
})
