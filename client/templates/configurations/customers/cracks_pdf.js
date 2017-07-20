var table = function () {
  var table   = $('[data-table="cracks"]')
  var headers = []
  var data    = []
  var widths  = [40, 80, 50, 50, 45, 30, 50]

  table.find('thead th[data-header]').each(function (i, element) {
    var header = $(element).text()

    headers.push({ name: header, prompt: header, width: widths[i] })
  })

  table.find('tbody tr[data-row]:not(.text-muted)').each(function (i, element) {
    var obj = {}

    $(element).find('td[data-value]').each(function (j, cell) {
      obj[headers[j].name] = $(cell).text().replace('″', '"')
    })

    data.push(obj)
  })

  return { data: data, headers: headers }
}

Template.customerCracks.onDestroyed(function () {
  Session.set('hideOnPdf')
})

Template.customerCracks.helpers({
  trClass: function () {
    var omited = _.contains(Session.get('hideOnPdf'), this._id)

    return omited && 'text-muted'
  },

  isHidden: function () {
    return _.contains(Session.get('hideOnPdf'), this._id)
  }
})

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

  'click [data-hide-on-pdf]': function (event, template) {
    event.preventDefault()

    var hidden = Session.get('hideOnPdf') || []

    hidden.push(this._id)

    Session.set('hideOnPdf', hidden)
  },

  'click [data-show-on-pdf]': function (event, template) {
    event.preventDefault()

    var hidden = Session.get('hideOnPdf') || []

    hidden = _.without(hidden, this._id)

    Session.set('hideOnPdf', hidden)
  }
})
