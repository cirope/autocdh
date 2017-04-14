Meteor.publish('managementDocuments', function () {
  return publish.call(this, ManagementDocuments)
})
