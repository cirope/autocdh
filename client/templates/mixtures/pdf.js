var table = function () {
  var table   = $('[data-table="test"]')
  var headers = []
  var data    = []
  var widths  = {
    5: [49, 49, 49, 49, 49],
    6: [40, 40, 40, 40, 40, 40],
    7: [35, 35, 35, 35, 35, 35, 35]
  }[table.find('thead th').length]

  table.find('thead th').each(function (i, element) {
    var header = $(element).text()

    headers.push({ name: header, prompt: header, width: widths[i] })
  })

  table.find('tbody tr').each(function (i, element) {
    var obj = {}

    $(element).find('td').each(function (j, cell) {
      obj[headers[j].name] = $(cell).text().replace('″', '"')
    })

    data.push(obj)
  })

  return { data: data, headers: headers }
}

var putBriefData = function (doc, yPosition) {
  var xPosition = 20

  $('[data-brief]').find('[data-attribute]').each(function (i, element) {
    var label = $(element).find('[data-label]').text()
    var value = $(element).find('[data-value]').text()

    yPosition += xPosition === 20 ? 5 : 0

    doc.text(label + ': ' + value, xPosition, yPosition)

    xPosition  = xPosition === 20 ? 100 : 20
  })

  return yPosition
}

var putGraphImage = function (doc, yPosition, callback) {
  $('body').addClass('pdf-export')

  var canvas = document.createElement('canvas')
  var html   = _.first($('html')).innerHTML
  var width  = $('[data-graph-container]').outerWidth()  * 1.2
  var height = $('[data-graph-container]').outerHeight() * 1.2
  var ctx    = canvas.getContext('2d')

  canvas.width  = width
  canvas.height = height

  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  $('body').removeClass('pdf-export')

  rasterizeHTML.drawHTML(html, canvas).then(function (result) {
    var data   = canvas.toDataURL('image/png')
    var factor = 5.5

    doc.addImage(data, 'PNG', 15, yPosition += 5, width / factor, height / factor)

    if (typeof callback === 'function') callback()
  }, function () {
    console.log('error')
  });
}

Template.mixture.events({
  'click [data-download-pdf]': function (event, template) {
    var yPosition = 20
    var tableData = table()

    PDF.new({}, function (doc) {
      doc
        .setFont('helvetica')
        .setFontSize(14)
        .text(TAPi18n.__('mixture'), 20, yPosition)
        .setFontSize(9)
        .setFontStyle('bold')
        .text(template.data.name, 20, yPosition += 5)
        .setFontStyle('normal')

      doc
        .setFontSize(7)
        .table(20, yPosition += 15, tableData.data, tableData.headers, {
          printHeaders: true,
          autoSize: false,
          margins: { right: 0, left: 0, top: 0, bottom: 0 },
          fontSize: 7
        })

      yPosition += tableData.data.length * 8.6 + 1.5

      doc.setFontSize(9)

      yPosition = putBriefData(doc, yPosition)

      putGraphImage(doc, yPosition, function () {
        doc.save(template.data.name + '.pdf')
      })
    })
  }
})
