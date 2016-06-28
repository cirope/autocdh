Template.mixturesList.helpers({
  mixture: function () {
    return _.map(this.granulometries, function (granulometry) {
      var _granulometry = Granulometries.findOne(granulometry.id)

      return _granulometry.name + ' (' + granulometry.percentage + '%)'
    }).join(', ')
  }
})
