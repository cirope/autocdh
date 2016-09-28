var materialFor = function (granulometry) {
  var materialId   = granulometry.materialId
  var materialList = Materials.first()
  var materials    = materialList && materialList[granulometry.type + 's']
  var material     = _.findWhere(materials, { _id: materialId })

  return material && material.name
}

var putGranulometry = function (row, granulometry) {
  row[TAPi18n.__('granulometry_name')]          = granulometry.name
  row[TAPi18n.__('material')]                   = materialFor(granulometry)
  row[TAPi18n.__('responsible')]                = Responsible.findOne(granulometry.responsibleId).name
  row[TAPi18n.__('granulometry_date')]          = granulometry.date
  row[TAPi18n.__('plant')]                      = Plants.findOne(granulometry.plantId).name
  row[TAPi18n.__('granulometry_sample_weight')] = granulometry.sampleWeight ? granulometry.sampleWeight + ' g' : ''
}

Template.granulometriesList.events({
  'click [data-download-csv]': function (event, template) {
    Tracker.nonreactive(function () {
      var data = Granulometries.find({}, { sort: { date: 1 } }).map(function (granulometry) {
        row = {}

        putGranulometry(row, granulometry)

        return row
      })

      CSV.save(TAPi18n.__('granulometries'), data)
    })
  }
})
