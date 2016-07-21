Template.documentEdit.onCreated(function () {
  var start = this.data.validity && this.data.validity.start

  Session.set('document.validity.start', start)
})
