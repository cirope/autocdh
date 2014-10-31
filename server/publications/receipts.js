Meteor.publish('receipts', function () {
  return Receipts.find({ userId: this.userId })
})
