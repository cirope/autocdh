Template.mixturesList.helpers({
  mixture: function () {
    return _.map(this.granulometries, function (granulometry) {
      return Granulometries.findOne(granulometry.id).name
    }).join(', ')
  }
})
