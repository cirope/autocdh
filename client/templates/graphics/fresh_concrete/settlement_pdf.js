
var putFilterData = function (filter, doc, yPosition) {
  return PdfHelper.addFilterData(filter, doc, yPosition, true, true,
    [{label: 'truckId', text: 'truck-number-search'}, {label: 'truckDriver', text: 'truck-driver-search'}, 'plantId', 'settlementId']
  )
}

Template.graphicFreshConcreteSettlement.events({
  'click [data-download-pdf]': function (event, template) {
    PdfHelper.generateGraphPage(template, 'data-container', 'graphic_fresh_concrete_settlement_title', 'pdfFreshConcrete', putFilterData)
  }
})
