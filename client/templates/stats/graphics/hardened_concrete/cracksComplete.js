Template.hardenedConcreteCracksComplete.helpers({
  sample: function () {
    return Samples.findOne(this.sampleId).name
  },

  receipt: function () {
    return Receipts.findOne({ sampleId: this.sampleId })
  },

  work: function () {
    return this.workId && Works.findOne(this.workId).name
  },

  strength: function () {
    var concrete = Concretes.findOne({ sampleId: this.sampleId })
    var strength = concrete && Strengths.findOne(concrete.strengthId)

    return strength && strength.name
  },

  age: function () {
    var moldingIn = moment(this.moldingIn).endOf('day')
    var crackedIn = moment(this.crackedIn).endOf('day')
    var days      = crackedIn.diff(moldingIn, 'days')

    return moment.localeData().relativeTime(days, false, days === 1 ? 'd' : 'dd')
  },

  trClass: function () {
    var omited = _.contains(Session.get('hideOnPdf'), this._id)

    return omited && 'text-muted'
  },

  isHidden: function () {
    return _.contains(Session.get('hideOnPdf'), this._id)
  }
})

Template.hardenedConcreteCracksComplete.onDestroyed(function () {
  Session.set('hideOnPdf')
})

Template.hardenedConcreteCracksComplete.events({

  'click [data-hide-on-pdf]': function (event, template) {
    event.preventDefault()

    var hidden = Session.get('hideOnPdf') || []

    hidden.push(this._id)

    Session.set('hideOnPdf', hidden)
  },

  'click [data-show-on-pdf]': function (event, template) {
    event.preventDefault()

    var hidden = Session.get('hideOnPdf') || []

    hidden = _.without(hidden, this._id)

    Session.set('hideOnPdf', hidden)
  }
})
