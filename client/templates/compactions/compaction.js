

Template.compaction.helpers({
    sampleResponsible: function () {
        return this.sampleResponsibleId && Responsible.findOne(this.sampleResponsibleId).name
    },

    typeName: function () {
        return TAPi18n.__('compaction_type_' + this.type)
    },

    sieveName: function () {
        return TAPi18n.__('compaction_sieve_' + this.sierve)
    },
})

Template.compaction.events({
    'click [data-delete]': function (event, template) {
        if (confirm(TAPi18n.__('confirm_delete'))){
            Meteor.call('removeCompaction', template.data._id, function (error) {
                if (!error) Router.go('compactions')
            })
        }
    }
})
