var table = function () {
  var table   = $('[data-table="cracks"]')
  var headers = []
  var data    = []
  var widths  = [40, 80, 50, 50, 45, 30, 50]

  table.find('thead th[data-header]').each(function (i, element) {
    var header = $(element).text()

    headers.push({ name: header, prompt: header, width: widths[i] })
  })

  table.find('tbody tr[data-row]').each(function (i, element) {
    var obj = {}

    $(element).find('td[data-value]').each(function (j, cell) {
      obj[headers[j].name] = $(cell).text().replace('″', '"')
    })

    data.push(obj)
  })

  return { data: data, headers: headers }
}

Template.customerCracks.events({
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
          margins: { right: 0, left: 0, top: 35, bottom: 0 },
          fontSize: 9
        })

      doc.save(title + '.pdf')
    })
  }
})
