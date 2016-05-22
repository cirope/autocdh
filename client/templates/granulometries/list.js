Template.granulometries.helpers({
  showList: function () {
    return this.granulometries.count() || this.hasQuery
  }
})

Template.granulometriesList.helpers({
  plant: function (plantId) {
    return plantId && Plants.findOne(plantId).name
  },

  provider: function (providerId) {
    return providerId && Providers.findOne(providerId).name
  },

  material: function () {
    var materialId    = this.materialId
    var materialList  = Materials.first()
    var materials     = materialList && materialList[this.type + 's']
    var material      = _.findWhere(materials, { _id: materialId })

    return material && material.name
  }
})

Template.granulometriesList.events({
  'click [data-action="search"]': function (event, template) {
    var dateRange = DateRangeHelper.getRange(template.$('#date'))

    var search = {
      name:     template.$('#name').val(),
      material: template.$('#material').val(),
      date:     dateRange && dateRange.join('|'),
      plant:    template.$('#plant').val(),
      provider: template.$('#provider').val()
    }

    Router.go('granulometries', {}, { query: search })
  },

  'click [data-search-clean]': function (event, template) {
    template.$('#search-filter').collapse('hide')
  },

  'shown.bs.collapse': function (event, template) {
    template.$('input:first').focus()

    template.$('#date').
      daterangepicker(DateRangeHelper.filterOptions()).
      daterangepickerFilterEvents()

    template.$('[data-search-clean]').removeClass('hidden')
    template.$('[data-search]').addClass('hidden')
  },

  'hidden.bs.collapse': function (event, template) {
    template.$('[data-search-clean]').addClass('hidden')
    template.$('[data-search]').removeClass('hidden')
    template.$('input').val('')
  }
})
