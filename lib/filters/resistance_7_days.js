Meteor.methods({
  filter7DaysResistance: function (doc) {
    doc.start = doc.start && moment(doc.start).format('YYYY-MM-DD')
    doc.end   = doc.end   && moment(doc.end).format('YYYY-MM-DD')

    if (this.isSimulation)
      Router.go('graphicHardenedConcrete7DaysResistance', {}, { query: doc })
  }
})
