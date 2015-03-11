Template.afFormGroup_measure.helpers({
  bsFieldLabelAtts: function () {
    var atts = _.clone(this.afFieldLabelAtts)

    return AutoForm.Utility.addClass(atts, 'control-label')
  },

  bsFieldInputAtts: function () {
    var atts = _.clone(this.afFieldInputAtts)

    return _.extend(atts, { template: 'bootstrap3' })
  }
})
