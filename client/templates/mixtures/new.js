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
  },

  aggregates: function () {
    var material = Materials.first() || {}
    var map      = function (m) { return { label: m.name, value: m._id } }
    var sands    = material && _.map(material.sands, map)
    var gravels  = material && _.map(material.gravels, map)

    return [
      {
        optgroup: TAPi18n.__('material_sands'),
        options:  sands || [{ label: '', value: '' }]
      },

      {
        optgroup: TAPi18n.__('material_gravels'),
        options:  gravels || [{ label: '', value: '' }]
      }
    ]
  }
})

Template.mixtureNew.events({
  'change [name="granulometriesCount"]': function (event, template) {
    var count = +$(event.currentTarget).val()

    template.granulometriesCount.set(count)
  },

  'change .granulometry-aggregate': function (event, template) {
    var $select = $(event.currentTarget)
    var name    = $select.prop('name')
    var index   = +_.first(name.match(/\d+/))

    Session.set('mixtures.' + name, $select.val())

    $('#granulometries\\.' + index + '\\.id').prop('readOnly', !$select.val().trim())
  },

  'change [data-percentage]': function (event, template) {
    setTimeout(function () {
      var $percentages = template.$('[data-percentage]')
      var key          = 'granulometries.' + ($percentages.length - 1) + '.percentage'
      var sum          = 0

      $percentages.each(function (i, element) {
        sum += +$(element).val()
      })

      if (sum === 100)
        AutoForm.removeStickyValidationError('newMixtureForm', key)
      else
        AutoForm.addStickyValidationError('newMixtureForm', key, 'expectedAmount', '100%')
    })
  }
})

AutoForm.addHooks('newMixtureForm', {
  before: {
    method: function (doc) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
