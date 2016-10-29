var name = function (granulometry) {
  var materialId   = granulometry.materialId
  var materialList = Materials.first()
  var materials    = materialList && materialList[granulometry.type + 's']
  var material     = _.find(materials, function (m) { return m._id === materialId })

  return granulometry.name + (material ? ' (' + material.name + ')' : '')
}

var putStaticData = function (granulometry, doc, yPosition) {
  var responsible = TAPi18n.__('responsible')       + ': ' + Responsible.findOne(granulometry.responsibleId).name
  var date        = TAPi18n.__('granulometry_date') + ': ' + moment(granulometry.date).format('L')

  doc
    .text(responsible, 20, yPosition += 5)
    .text(date, 100, yPosition)

  var plant        = TAPi18n.__('plant')                      + ': ' + Plants.findOne(granulometry.plantId).name
  var sampleWeight = TAPi18n.__('granulometry_sample_weight') + ': ' +
    (granulometry.sampleWeight && (Math.round(granulometry.sampleWeight * 100) / 100 + ' kg'))

  doc
    .text(plant, 20, yPosition += 5)
    .text(sampleWeight, 100, yPosition)

  var origin  = TAPi18n.__('granulometry_origin')  + ': ' + (granulometry.origin  || '')
  var receipt = TAPi18n.__('granulometry_receipt') + ': ' + (granulometry.receipt || '')

  doc
    .text(origin, 20, yPosition += 5)
    .text(receipt, 100, yPosition)

  var provider = TAPi18n.__('provider')  + ': ' + (granulometry.providerId && Providers.findOne(granulometry.providerId).name || '')

  doc
    .text(provider, 20, yPosition += 5)

  if (granulometry.humidity)
    doc.text(TAPi18n.__('granulometry_humidity'), 20, yPosition += 5)

  if (granulometry.thin)
    doc.text(TAPi18n.__('granulometry_thin'), 100, granulometry.humidity ? yPosition : yPosition += 5)

  $('[data-humidity]').find('[data-attribute]').each(function (i, element) {
    var label = $(element).find('[data-label]').text()
    var value = $(element).find('[data-value]').text()

    doc.text("\t" + label + ': ' + value, 20, yPosition += 5)
  })

  var column2yPosition = yPosition - $('[data-humidity]').find('[data-attribute]').length * 5

  $('[data-thin]').find('[data-attribute]').each(function (i, element) {
    var label = $(element).find('[data-label]').text()
    var value = $(element).find('[data-value]').text()

    doc.text("\t" + label + ': ' + value, 100, column2yPosition += 5)
  })

  var weight = TAPi18n.__('granulometry_granulometry_weight') + ': ' + granulometry.granulometryWeight + ' g'
  var dried  = TAPi18n.__('granulometry_dried')               + ': ' + TAPi18n.__(granulometry.dried ? 'yes' : 'no')
  var washed = TAPi18n.__('granulometry_washed')              + ': ' + TAPi18n.__(granulometry.washed ? 'yes' : 'no')

  doc
    .text(weight, 20, yPosition += 5)
    .text(dried + ' ' + washed, 100, yPosition)

  return yPosition
}

var table = function () {
  var table   = $('[data-table="test"]')
  var headers = []
  var data    = []
  var widths  = table.find('thead th').length === 6 ?
    [60, 40, 40, 30, 30, 45] :
    [60, 20, 35, 30, 25, 20, 20, 35]

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

var putBriefData = function (granulometry, doc, yPosition) {
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
    var factor = 6

    doc.addImage(data, 'PNG', 15, yPosition += 5, width / factor, height / factor)

    yPosition += 5 + height / factor
    doc.lastCellPos.y = yPosition

    if (typeof callback === 'function') callback()
  }, function () {
    console.log('error')
  });
}

Template.granulometry.events({
  'click [data-download-pdf]': function (event, template) {
    var granulometry = template.data
    var yPosition    = 20
    var tableData    = table()
    var idealCurves  = granulometry.idealCurves ?
      TAPi18n.__('granulometry_ideal_curves') + ': ' + granulometry.idealCurves + ' mm' : ''

    PDF.new({}, function (doc) {
      doc
        .setFont('helvetica')
        .setFontSize(14)
        .text(TAPi18n.__('granulometry'), 20, yPosition)
        .setFontSize(9)
        .setFontStyle('bold')
        .text(name(granulometry), 20, yPosition += 5)
        .setFontStyle('normal')

      yPosition = putStaticData(granulometry, doc, yPosition)

      doc
        .setFontSize(7)
        .table(20, yPosition += 5, tableData.data, tableData.headers, {
          printHeaders: true,
          autoSize: false,
          margins: { right: 0, left: 0, top: 0, bottom: 0 },
          fontSize: 7
        })

      yPosition += tableData.data.length * 8.6 + 1.5

      doc.setFontSize(9)

      yPosition = putBriefData(granulometry, doc, yPosition)

      if (idealCurves) doc.text(idealCurves, 20, yPosition +=5)

      putGraphImage(doc, yPosition, function () {
        yPosition = doc.lastCellPos.y + 10

        // adding digital signature
        yPosition = DigitalSignature.addSignatureToPdf(doc, 'pdfGranulometries', yPosition)

        doc.putTotalPages('___total_pages___')
        doc.save(granulometry.name + '.pdf')
      })
    })
  }
})
