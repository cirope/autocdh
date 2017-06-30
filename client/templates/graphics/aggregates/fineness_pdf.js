
var putFilterData = function (filter, doc, yPosition) {
  return PdfHelper.addFilterData(filter, doc, yPosition, true, true, ['plantId', 'materialId', {label: 'providerId', text: 'provider-search'}])
}

Template.graphicAggregateFineness.events({
  'click [download-pdf]': function (event, template) {
    PdfHelper.generateGraphPage(template, 'data-container', 'graphic_aggregate_fineness_title', 'pdfStatsAggregates', putFilterData)
  }
})
