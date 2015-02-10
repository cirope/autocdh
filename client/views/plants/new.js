Template.plantNew.helpers({
  namePlaceholder: function () {
    return TAPi18n.__('plant_name_placeholder')
  },

  backPath: function () {
    var params = Router.current() && Router.current().params

    return params && params.sample_id ?
      Router.path('sampleNew') : Router.path('plants')
  }
})

AutoForm.addHooks('newPlantForm', {
  before: {
    createPlant: function (doc, template) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
