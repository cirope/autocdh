var putStaticData = function (granulometry, doc, yPosition) {
  var responsible = TAPi18n.__('responsible')       + ': ' + Responsible.findOne(granulometry.responsibleId).name
  var date        = TAPi18n.__('granulometry_date') + ': ' + moment(granulometry.date).format('L')

  doc
    .text(responsible, 20, yPosition += 5)
    .text(date, 145, yPosition)

  var plant        = TAPi18n.__('plant')                      + ': ' + Plants.findOne(granulometry.plantId).name
  var sampleWeight = TAPi18n.__('granulometry_sample_weight') + ': ' + granulometry.sampleWeight + ' kg'

  doc
    .text(plant, 20, yPosition += 5)
    .text(sampleWeight, 145, yPosition)

  var humidity = TAPi18n.__('granulometry_humidity')
  var thin     = TAPi18n.__('granulometry_thin')

  doc
    .text(humidity, 20, yPosition += 5)
    .text(thin, 145, yPosition)

  $('[data-humidity]').find('[data-attribute]').each(function (i, element) {
    var label = $(element).find('[data-label]').text()
    var value = $(element).find('[data-value]').text()

    doc.text("\t" + label + ': ' + value, 20, yPosition += 5)
  })

  yPosition -= $('[data-humidity]').find('[data-attribute]').length * 5

  $('[data-thin]').find('[data-attribute]').each(function (i, element) {
    var label = $(element).find('[data-label]').text()
    var value = $(element).find('[data-value]').text()

    doc.text("\t" + label + ': ' + value, 145, yPosition += 5)
  })

  var weight = TAPi18n.__('granulometry_granulometry_weight') + ': ' + granulometry.granulometryWeight + ' g'
  var dried  = TAPi18n.__('granulometry_dried')               + ': ' + TAPi18n.__(granulometry.dried ? 'yes' : 'no')
  var washed = TAPi18n.__('granulometry_washed')              + ': ' + TAPi18n.__(granulometry.washed ? 'yes' : 'no')

  doc
    .text(weight, 20, yPosition += 5)
    .text(dried, 145, yPosition)
    .text(washed, 205, yPosition)

  return yPosition
}

var table = function () {
  var table   = $('[data-table="test"]')
  var headers = []
  var data    = []
  var widths  = table.find('thead th').length === 6 ?
    [90, 50, 50, 40, 40, 65] :
    [90, 30, 40, 40, 35, 30, 30, 50]

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
  $('[data-brief]').find('[data-attribute]').each(function (i, element) {
    var label = $(element).find('[data-label]').text()
    var value = $(element).find('[data-value]').text()

    doc.text(label + ': ' + value, 20, yPosition += 5)
  })

  return yPosition
}

Template.granulometry.events({
  'click [data-download-pdf]': function (event, template) {
    var granulometry = template.data
    var doc          = new jsPDF('l')
    var yPosition    = 20
    var tableData    = table()
    var idealCurves  = granulometry.idealCurves ?
      TAPi18n.__('granulometry_ideal_curves') + ': ' + granulometry.idealCurves + ' mm' : ''

    doc
      .setFont('helvetica')
      .setFontSize(14)
      .text(TAPi18n.__('granulometry') + ': ' + granulometry.name, 20, yPosition)
      .setFontSize(9)

    yPosition = putStaticData(granulometry, doc, yPosition)

    doc
      .setFontSize(7)
      .table(20, yPosition += 5, tableData.data, tableData.headers, {
        printHeaders: true,
        autoSize: false,
        margins: { right: 0, left: 0, top: 0, bottom: 0 },
        fontSize: 7
      })

    yPosition += tableData.data.length * 9

    doc.setFontSize(9)

    yPosition = putBriefData(granulometry, doc, yPosition)

    if (idealCurves) doc.text(idealCurves, 20, yPosition +=5)

    doc.save(granulometry.name + '.pdf')
  }
})
