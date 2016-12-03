

Template.fieldDensity.helpers({
    sampleResponsible: function () {
        return this.sampleResponsibleId && Responsible.findOne(this.sampleResponsibleId).name
    },
    assayResponsible: function () {
        return this.assayResponsibleId && Responsible.findOne(this.assayResponsibleId).name
    },
})

Template.fieldDensity.events({
})
