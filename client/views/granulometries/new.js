var testByType = {
  sand: [
    { sieve: '9.5' },
    { sieve: '4.8' },
    { sieve: '2.4' },
    { sieve: '1.2' },
    { sieve: '0.59' },
    { sieve: '0.297' },
    { sieve: '0.149' },
    { sieve: '< 0.149' }
  ],

  gravel: [
    { sieve: '76' },
    { sieve: '63' },
    { sieve: '51' },
    { sieve: '38' },
    { sieve: '25' },
    { sieve: '19' },
    { sieve: '13' },
    { sieve: '9.5' },
    { sieve: '4.8' },
    { sieve: '2.4' },
    { sieve: '< 2.4' }
  ]
}

var granulometry = new ReactiveVar

Template.granulometryNew.created = function () {
  Granulometries.setType('sand')
}
Template.granulometryNew.destroyed = function () {
  Granulometries.setType('sand')
}

Template.granulometryNew.helpers({
  granulometry: function () {
    if (! granulometry.get())
      granulometry.set({ type: 'sand', test: testByType['sand'] })

    return granulometry.get()
  }
})

Template.granulometryNew.events({
  'change [name="type"]': function (event) {
    var type = $(event.currentTarget).val()

    Granulometries.setType(type)

    if (granulometry.get() && granulometry.get().type !== type) {
      var _granulometry = AutoForm.getFormValues('newGranulometryForm')

      granulometry.set(_.extend(_granulometry, { test: testByType[type] }))
    }
  }
})

AutoForm.addHooks('newGranulometryForm', {
  before: {
    method: function (doc) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
