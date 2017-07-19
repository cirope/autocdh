Complaints = new Mongo.Collection('complaints')

Complaints.attachSchema(Schemas.Complaint)

Complaints.allow({
    update: ownsDocument,
    remove: ownsDocument
})

var addExtraAttributes = function (object) {
    return object
}

var extraModifierAttributes = function (object) {
    var modifier = {}
    return { $set: modifier }
}

Meteor.methods({
    createComplaint: function (doc) {
        doc.organizationId = organizationIdFor(this.userId)

        Complaints.insert(addExtraAttributes(doc))

        if (this.isSimulation)
            setTimeout(function () {
                Router.go('complaint', doc)
            }, 100)
    },

    updateComplaint: function (modifier, documentId) {
        Complaints.update(documentId, modifier, function (error) {
            var object = Complaints.findOne(documentId)

            if (! error) {
                var extraModifier = extraModifierAttributes(object)

                Complaints.update(documentId, extraModifier)
            }
        })

        if (this.isSimulation) {
            setTimeout(function () {
                Router.go('complaint', {_id: documentId})
            }, 100)
        }
    },

    removeComplaint: function (documentId) {
        Complaints.remove(documentId)
    }
})
