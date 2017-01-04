var helpers = {
  aggregates: function () {
    var material = Materials.first() || {}
    var map      = function (m) { return { label: m.name, value: m._id } }
    var sands    = material && _.map(_.compact(material.sands), map)
    var gravels  = material && _.map(_.compact(material.gravels), map)

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
}

var events = {
  'change .granulometry-aggregate': function (event, template) {
    var $select = $(event.currentTarget)
    var name    = $select.prop('name')
    var index   = +_.first(name.match(/\d+/))

    Session.set('mixtures.' + name, $select.val())

    $('#granulometries\\.' + index + '\\.id').prop('readOnly', !$select.val().trim())
  },

  'change [data-percentage]': function (event, template) {
    setTimeout(function () {
      var formId       = template.$('form').attr('id')
      var $percentages = template.$('[data-percentage]')
      var key          = 'granulometries.' + ($percentages.length - 1) + '.percentage'
      var sum          = 0

      $percentages.each(function (i, element) {
        sum += +$(element).val()
      })

      if (sum === 100)
        AutoForm.removeStickyValidationError(formId, key)
      else
        AutoForm.addStickyValidationError(formId, key, 'expectedAmount', '100%')
    })
  }
}

Template.mixtureNew.helpers(helpers)
Template.mixtureEdit.helpers(helpers)

Template.mixtureNew.events(events)
Template.mixtureEdit.events(events)
