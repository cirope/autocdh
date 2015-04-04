var testByType = {
  sand: [
    { sieve: '9.5 mm | 3/8″' },
    { sieve: '4.8 mm | # 4' },
    { sieve: '2.4 mm | # 8' },
    { sieve: '1.2 mm | # 16' },
    { sieve: '0.59 mm | # 30' },
    { sieve: '0.297 mm | # 50' },
    { sieve: '0.149 mm | # 100' },
    { sieve: 'Fondo | Pasa # 100' }
  ],

  gravel: [
    { sieve: '76 mm | 3″' },
    { sieve: '63 mm | 2 ½″' },
    { sieve: '51 mm | 2″' },
    { sieve: '38 mm | 1 ½″' },
    { sieve: '25 mm | 1' },
    { sieve: '19 mm | 3/4″' },
    { sieve: '13 mm | 1/2″' },
    { sieve: '9.5 mm | 3/8″' },
    { sieve: '4.8 mm | # 4' },
    { sieve: '2.4 mm | # 8' },
    { sieve: 'Fondo | Pasa # 8' }
  ]
}

var granulometry = new ReactiveVar

Template.granulometryNew.onCreated(function () {
  Granulometries.setType('sand')
})

Template.granulometryNew.onDestroyed(function () {
  Granulometries.setType('sand')
})

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
      var _granulometry = AutoForm.getFormValues('newGranulometryForm').insertDoc

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
