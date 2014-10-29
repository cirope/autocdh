var selectedCustomer = new ReactiveVar

Template.requestNew.helpers({
  namePlaceholder: function () {
    return TAPi18n.__('request_name_placeholder')
  },

  moldingOptions: function () {
    return [
      { value: 'plant', label: TAPi18n.__('request_molding_plant') }
    ]
  },

  customerOptions: function () {
    return Customers.find().map(function (customer) {
      return { value: customer._id, label: customer.name }
    })
  },

  workOptions: function () {
    var works = Works.find({ customerId: selectedCustomer.get() })

    return works.map(function (work) {
      return { value: work._id, label: work.name }
    })
  },

  plantOptions: function () {
    return Plants.find().map(function (plant) {
      return { value: plant._id, label: plant.name }
    })
  }
})

Template.requestNew.events({
  'change #customer-id': function (event) {
    selectedCustomer.set(event.currentTarget.value)
  }
})

AutoForm.addHooks('newRequestForm', {
  before: {
    createRequest: function (doc, template) {
      doc._id = Random.id()

      return doc
    }
  }
})
