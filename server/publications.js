Meteor.publish('customers', function () {
  var sub = this
  var worksHandles = []

  var publishWorks = function (customerId) {
    var worksCursor = Works.find({ userId: sub.userId, customerId: customerId })

    worksHandles[customerId] = Mongo.Collection._publishCursor(worksCursor, sub, 'works')
  }

  var customersHandle = Customers.find({ userId: sub.userId }).observeChanges({
    added: function (id, customer) {
      publishWorks(id)
      sub.added('customers', id, customer)
    },

    changed: function (id, fields) {
      sub.changed('customers', id, fields)
    },

    removed: function (id) {
      worksHandles[id] && worksHandles[id].stop()
      sub.removed('customers', id)
    }
  })

  sub.ready()

  sub.onStop(function () { customersHandle.stop() })
})
