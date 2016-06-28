Template.mixtureEdit.onCreated(function () {
  setTimeout(function () {
    $('.granulometry-aggregate').each(function (index, element) {
      var $select = $(element)
      var name    = $select.prop('name')

      Session.set('mixtures.' + name, $select.val())

      $('#granulometries\\.' + index + '\\.id').prop('readOnly', !$select.val().trim())
    })
  })
})

Template.mixtureEdit.helpers({
  granulometries: function () {
    return _.map(this.granulometries, function (granulometry, i) {
      return _.extend(granulometry, {
        index:                  i,
        granulometrySearchName: 'granulometries.' + i + '.id',
        percentageName:         'granulometries.' + i + '.percentage'
      })
    })
  },

  selected: function (context) {
    var granulometry = Granulometries.findOne(context.id)

    return granulometry.materialId === this.value && 'selected'
  },

  granulometry: function () {
    return Granulometries.findOne(this.id).name
  }
})
