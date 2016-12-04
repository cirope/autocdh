

Template.fieldDensity.helpers({
    sampleResponsible: function () {
        return this.sampleResponsibleId && Responsible.findOne(this.sampleResponsibleId).name
    },
    assayResponsible: function () {
        return this.assayResponsibleId && Responsible.findOne(this.assayResponsibleId).name
    }
})

Template.fieldDensity.events({
    'click [data-delete]': function (event, template) {
        if (confirm(TAPi18n.__('confirm_delete'))){
            Meteor.call('removeFieldDensity', template.data._id, function (error) {
                if (!error) Router.go('fieldDensities')
            })
        }
    }
})
