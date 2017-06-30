
var putFilterData = function (filter, doc, yPosition) {
  return PdfHelper.addFilterData(filter, doc, yPosition, true, true, ['plantId', 'materialId', {label: 'providerId', text: 'provider-search'}])
}

Template.graphicAggregateHumidity.events({
  'click [download-pdf]': function (event, template) {
    PdfHelper.generateGraphPage(template, 'data-container', 'graphic_aggregate_humidity_title', 'pdfStatsAggregates', putFilterData)
  }
})
