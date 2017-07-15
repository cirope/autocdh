var dateWarning = new ReactiveVar

Template.sampleEdit.onDestroyed(function () {
  dateWarning.set()
})

Template.sampleEdit.helpers({
  receipt: function () {
    return Receipts.findOne({ sampleId: this._id })
  },

  dateWarning: function () {
    return dateWarning.get()
  }
})

Template.sampleEdit.events({
  'dp.change [name="date"]': function (event, template) {
    var warning = ! moment(template.data.sample.date).isSame(event.date, 'day')

    dateWarning.set(warning)
  }
})
