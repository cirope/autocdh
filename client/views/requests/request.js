Template.request.helpers({
  molding: function () {
    var moldings = {
      'plant': TAPi18n.__('request_molding_plant')
    }

    return moldings[this.molding]
  },

  customer: function () {
    var work = Works.findOne(this.workId)

    return Customers.findOne(work.customerId).name
  },

  work: function () {
    return Works.findOne(this.workId).name
  },

  plant: function () {
    return Plants.findOne(this.plantId).name
  }
})
