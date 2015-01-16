var sample = new ReactiveVar({})
var save   = function () {
  sample.set(AutoForm.getFormValues('newSampleForm').insertDoc)
}

Template._sampleNew.helpers({
  sample: function () {
    return sample.get()
  }
})

Template._sampleNew.events({
  'change [name="plantId"]': function (event) {
    var plant = $(event.currentTarget)

    if (plant.val() === 'new') {
      plant.val('')
      save()
      AutoForm.resetForm('newSampleForm')
      Router.go('plantNew')
    }
  }
})

AutoForm.addHooks('newSampleForm', {
  before: {
    createSample: function (doc, template) {
      sample.set({})

      return _.extend(doc, { _id: Random.id() })
    }
  }
})
