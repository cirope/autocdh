Template.mixtureNew.onCreated(function () {
  var self = this

  self.granulometriesCount = new ReactiveVar

  setTimeout(function () {
    var count = +self.$('[name="granulometriesCount"]').val()

    self.granulometriesCount.set(count)
  })
})

Template.mixtureNew.helpers({
  granulometries: function () {
    var template = Template.instance()
    var count    = template.granulometriesCount.get() || 0

    return _.times(count, function (i) {
      return {
        index:                  i,
        granulometrySearchName: 'granulometries.' + i + '.id',
        percentageName:         'granulometries.' + i + '.percentage'
      }
    })
  }
})

Template.mixtureNew.events({
  'change [name="granulometriesCount"]': function (event, template) {
    var count = +$(event.currentTarget).val()

    template.granulometriesCount.set(count)
  }
})

AutoForm.addHooks('newMixtureForm', {
  before: {
    method: function (doc) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
