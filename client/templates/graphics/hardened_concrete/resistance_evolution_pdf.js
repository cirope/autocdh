var table = function (tableName) {
  var table   = $('[data-table="' + tableName + '"]')
  var headers = []
  var data    = []
  var widths  = [120, 125]

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

var putFilterData = function (filter, doc, yPosition) {
  doc
    .setFontSize(12)
    .text(TAPi18n.__('graphic_filter'), 20, yPosition += 7)
    .setFontSize(9)

  doc.text(Schemas.Filter.label('start') + ': ' + moment(filter.start).format('L'), 25, yPosition += 5)
  doc.text(Schemas.Filter.label('end')   + ': ' + moment(filter.end).format('L'),   25, yPosition += 5)

  var concretes = $('select[name^="concretes"]').map(function () {
    return $(this).find('option:selected').text()
  }).get()

  doc.text(Schemas.Filter.label('concretes')   + ': ' + concretes.join('; '), 25, yPosition += 5)

  _.each(['plantId', 'strengthId', 'additiveId', 'molding', 'cured', 'additions'], function (name) {
    var label = Schemas.Filter.label(name)
    var text  = $('select[name="' + name + '"] option:selected').text()

    doc.text(label + ': ' + text, 25, yPosition += 5)
  })

  return yPosition
}

var putGraphImage = function (doc, yPosition, callback) {
  $('body').addClass('pdf-export')

  var canvas = document.createElement('canvas')
  var html   = _.first($('html')).innerHTML
  var width  = $('[data-container]').outerWidth()  * 1.2
  var height = $('[data-container]').outerHeight() * 1.2
  var ctx    = canvas.getContext('2d')

  canvas.width  = width
  canvas.height = height

  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  $('body').removeClass('pdf-export')

  rasterizeHTML.drawHTML(html, canvas).then(function (result) {
    var data   = canvas.toDataURL('image/png')
    var factor = 6.75

    doc.addImage(data, 'PNG', 15, yPosition += 5, width / factor, height / factor)

    yPosition += 5 + height / factor
    doc.lastCellPos.y = yPosition

    if (typeof callback === 'function') callback()
  }, function () {
    console.log('error')
  });
}

Template.graphicHardenedConcreteResistanceEvolution.events({
  'click [data-download-pdf]': function (event, template) {
    var yPosition            = 40
    var tablePercentagesData = table('percentages')
    var tableEvolutionData   = table('evolution')
    var name                 = TAPi18n.__('graphic_hardened_concrete_resistance_evolution_title')

    PDF.new({}, function (doc) {
      doc
        .setFont('helvetica')
        .setFontSize(14)
        .text(name, 20, yPosition)
        .setFontSize(9)

      doc
        .setFontSize(7)
        .table(20, yPosition += 5, tablePercentagesData.data, tablePercentagesData.headers, {
          printHeaders: true,
          autoSize: false,
          margins: { right: 0, left: 0, top: 0, bottom: 0 },
          fontSize: 7
        })

      doc.addPage()

      doc
        .setFontSize(7)
        .table(20, yPosition = 40, tableEvolutionData.data, tableEvolutionData.headers, {
          printHeaders: true,
          autoSize: false,
          margins: { right: 0, left: 0, top: 0, bottom: 0 },
          fontSize: 7
        })

      doc.setFontSize(9)

      yPosition += tableEvolutionData.data.length * 8.6 + 1.5

      yPosition = putFilterData(template.data.filter, doc, yPosition += 5)

      putGraphImage(doc, yPosition += 5, function () {
        // adding digital signature
        yPosition = DigitalSignature.addSignatureToEachPage(doc, 'pdfHardenedConcrete', function () {
          doc.putTotalPages('___total_pages___')
          doc.save(name+'.pdf')
        })
      })
    })
  }
})
