Meteor.publish('receipts', function () {
  return publish.call(this, Receipts)
})
