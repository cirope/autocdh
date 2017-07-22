Meteor.publish('presses', function () {
  return publish.call(this, Presses)
})
