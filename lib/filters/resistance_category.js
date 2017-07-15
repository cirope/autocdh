Meteor.methods({
  filterResistanceByCategory: function (doc) {
    doc.start     = doc.start     && moment(doc.start).format('YYYY-MM-DD')
    doc.end       = doc.end       && moment(doc.end).format('YYYY-MM-DD')

    if (doc.concretes && _.compact(_.pluck(doc.concretes, 'id')).length)
      doc.concretes = _.compact(_.pluck(doc.concretes, 'id'))

    if (this.isSimulation)
      Router.go('graphicHardenedConcreteResistanceByCategory', {}, { query: doc })
  }
})
