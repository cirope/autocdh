var tubeWarning = new ReactiveVar

Template.assayEdit.onDestroyed(function () {
  tubeWarning.set()
})

Template.assayEdit.helpers({
  sample: function () {
    return Samples.findOne(this.sampleId)
  },

  tubeWarning: function () {
    return tubeWarning.get()
  }
})

Template.assayEdit.events({
  'change [name="tubes"]': function (event, template) {
    var warning = template.data.tubes !== +$(event.currentTarget).val()

    tubeWarning.set(warning)
  }
})
