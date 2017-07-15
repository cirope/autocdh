var onDestroyed = function () {
  Session.set('document.validity.start')
}

var helpers = {
  isProtocol: function () {
    return this.type === 'protocols'
  },

  file: function () {
    return Files.findOne(this.fileId)
  },

  category: function () {
    return TAPi18n.__('document_category_' + this.category)
  },

  validity: function () {
    var start = this.validity && moment(this.validity.start).format('L')
    var end   = this.validity && moment(this.validity.end).format('L')

    return this.validity &&
      (start + ' - ' + end) || TAPi18n.__('document_validity_none')
  },

  canModify: function () {
    var isMonitor = Roles.userIsInRole(Meteor.userId(), 'monitor')

    return this.type === 'protocols' || isMonitor
  }
}

var events = {
  'dp.change [name="validity.start"]': function (event, template) {
    var start = $(event.currentTarget).val()

    Session.set('document.validity.start', moment(start, 'L').toDate())
  }
}

Template.documentNew.onDestroyed(onDestroyed)
Template.documentEdit.onDestroyed(onDestroyed)

Template.document.helpers(helpers)
Template.documentNew.helpers(helpers)
Template.documentEdit.helpers(helpers)
Template.documentsList.helpers(helpers)
Template.documentsEmpty.helpers(helpers)

Template.documentNew.events(events)
Template.documentEdit.events(events)
