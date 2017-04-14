

Template.limit.helpers({
    sampleResponsible: function () {
        return this.sampleResponsibleId && Responsible.findOne(this.sampleResponsibleId).name
    }
})

Template.limit.events({
    'click [data-delete]': function (event, template) {
        if (confirm(TAPi18n.__('confirm_delete'))){
            Meteor.call('removeLimit', template.data._id, function (error) {
                if (!error) Router.go('limits')
            })
        }
    }
})
