var subs = new SubsManager

MaintenancesController = RouteController.extend({
  increment: 30,

  maintenancesLimit: function () {
     return +this.params.limit || this.increment
  },

  findOptions: function () {
    return { sort: { date: -1 }, limit: this.maintenancesLimit() }
  },

  subscriptions: function () {
    this.maintenancesSub = subs.subscribe('maintenancesLimited', this.findOptions())
  },

  maintenances: function () {
    return Maintenances.find({}, this.findOptions())
  },

  data: function () {
    var hasMore  = this.maintenances().count() === this.maintenancesLimit()
    var nextPath = this.route.path({ limit: this.maintenancesLimit() + this.increment })

    return {
      maintenances: this.maintenances(),
      ready:        this.maintenancesSub.ready,
      nextPath:     hasMore ? nextPath : null
    }
  }
})

MaintenanceController = RouteController.extend({
  data: function () {
    return Maintenances.findOne(this.params._id)
  }
})

MaintenanceStatusController = RouteController.extend({
  data: function () {
    return {
      maintenances: Maintenances.find({ active: true, type: 'calibratable' })
    }
  }
})
