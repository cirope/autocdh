var name = function (providedCrack) {
  var materialId   = providedCrack.materialId
  var materialList = Materials.first()
  var materials    = materialList && materialList[providedCrack.type + 's']
  var material     = _.find(materials, function (m) { return m._id === materialId })

  return providedCrack.name + (material ? ' (' + material.name + ')' : '')
}

var putStaticData = function (providedCrack, doc, yPosition) {
  var work        = TAPi18n.__('work')                      + ': ' + Works.findOne(providedCrack.workId).name
  var customer    = TAPi18n.__('customer')                  + ': ' + Customers.findOne(providedCrack.customerId).name
  var press       = TAPi18n.__('press')                     + ': ' + Presses.findOne(providedCrack.pressId).name
  var responsible = TAPi18n.__('responsible')               + ': ' + Responsible.findOne(providedCrack.responsibleId).name
  var date        = TAPi18n.__('provided_crack_date')       + ': ' + providedCrack.date && moment(providedCrack.date).format('L')
  var crackDate   = TAPi18n.__('provided_crack_crack_date') + ': ' + moment(providedCrack.crackDate).format('L')

  var tubeType    = providedCrack.tubeType === 'other' ? TAPi18n.__('provided_crack_tube_type_other') : providedCrack.tubeType
  var headerType  = TAPi18n.__('provided_crack_header_type_' + providedCrack.headerType)

  doc
    .text(work, 20, yPosition += 5)
    .text(press, 100, yPosition)
    .text(customer, 20, yPosition += 5)
    .text(responsible, 100, yPosition)

  doc
    .text(TAPi18n.__('provided_crack_quantity') + ': ' + providedCrack.quantity, 20, yPosition += 5)
    .text(date, 100, yPosition)

  doc
    .text(TAPi18n.__('provided_crack_tube_type') + ': ' + tubeType, 20, yPosition += 5)
    .text(crackDate, 100, yPosition)

  doc
    .text(TAPi18n.__('provided_crack_header_type') + ': ' + headerType, 20, yPosition += 5)
    .text(TAPi18n.__('provided_crack_defects') + ': ' + (providedCrack.defects || ''), 20, yPosition += 5)
    .text(TAPi18n.__('provided_crack_observations') + ': ' + (providedCrack.observations || ''), 20, yPosition += 5)

  return yPosition
}

var table = function () {
  var table   = $('[data-table="tubes"]')
  var headers = []
  var data    = []
  var widths  = [24, 35, 33, 25, 25, 21, 35, 39]

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

Template.providedCrack.events({
  'click [data-download-pdf]': function (event, template) {
    var providedCrack = template.data
    var yPosition     = 20
    var tableData     = table()
    var customerName  = Customers.findOne(providedCrack.customerId).name
    var fileName      = TAPi18n.__('provided_crack') + ' - ' +
      customerName + ' - ' +
      moment(providedCrack.date).format('DD-MM-YYYY')

    PDF.new({}, function (doc) {
      doc
        .setFont('helvetica')
        .setFontSize(14)
        .text(TAPi18n.__('provided_crack'), 20, yPosition)
        .setFontSize(9)

      yPosition = putStaticData(providedCrack, doc, yPosition += 10)

      doc
        .setFontSize(7)
        .table(20, yPosition += 5, tableData.data, tableData.headers, {
          printHeaders: true,
          autoSize: false,
          margins: { right: 0, left: 0, top: 0, bottom: 0 },
          fontSize: 7
        })

      doc.save(fileName + '.pdf')
    })
  }
})
