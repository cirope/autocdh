Template.requestEdit.helpers({
  namePlaceholder: function () {
    return TAPi18n.__('request_name_placeholder')
  },

  customer: function () {
    var work  = Works.findOne(this.workId)

    return Customers.findOne(work.customerId).name
  },

  moldingOptions: function () {
    return [
      { value: 'plant', label: TAPi18n.__('request_molding_plant') }
    ]
  },

  workOptions: function () {
    var work  = Works.findOne(this.workId)
    var works = Works.find({ customerId: work.customerId })

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
