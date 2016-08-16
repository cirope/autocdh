var download = function (csvString) {
  var blob   = new Blob([csvString])
  var a      = window.document.createElement('a')

  a.href     = window.URL.createObjectURL(blob, { type: 'text/plain' })
  a.download = TAPi18n.__('samples') + '.csv'

  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

Template.samplesList.events({
  'click [data-download-csv]': function (event, template) {
    var data = Samples.find({}, { sort: { date: 1 } }).map(function (sample) {
      var row = {}

      row[TAPi18n.__('plant')]              = Plants.findOne(sample.plantId).name,
      row[TAPi18n.__('responsible')]        = Responsible.findOne(sample.responsibleId).name,
      row[TAPi18n.__('sample_molding')]     = TAPi18n.__('sample_molding_' + sample.molding),
      row[TAPi18n.__('sample_date')]        = moment(sample.date).format('L'),
      row[TAPi18n.__('sample_temperature')] = (sample.temperature ? sample.temperature + ' °C' : ''),
      row[TAPi18n.__('sample_humidity')]    = (sample.humidity ? sample.humidity + '%' : '')

      return row
    })

    download(Papa.unparse(data, { quotes: true, delimiter: "\t" }))
  }
})
