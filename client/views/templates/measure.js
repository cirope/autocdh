Template.afFormGroup_measure.helpers({
  bsFieldLabelAtts: function () {
    var atts = _.clone(this.afFieldLabelAtts)

    return AutoForm.Utility.addClass(atts, 'control-label')
  }
})
