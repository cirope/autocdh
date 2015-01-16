Template.plantNew.helpers({
  namePlaceholder: function () {
    return TAPi18n.__('plant_name_placeholder')
  }
})

Template.plantNew.events({
  'click [data-cancel]': function (event) {
    event.stopPropagation()

    setTimeout(function () {
      Router.go('sampleNew')
    })
  }
})

AutoForm.addHooks('newPlantForm', {
  before: {
    createPlant: function (doc, template) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
