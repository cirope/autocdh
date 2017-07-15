var message = new ReactiveVar

Template.passwordChange.onCreated(function () {
  message.set()
})

Template.passwordChange.helpers({
  message: function () {
    return message.get()
  }
})

Template.passwordChange.events({
  'submit': function (event) {
    event.preventDefault()

    var oldPassword = $('#old-password').val()
    var newPassword = $('#new-password').val()

    Accounts.changePassword(oldPassword, newPassword, function (error) {
      $('#old-password').val('')
      $('#new-password').val('')

      if (! error)
        message.set({ text: TAPi18n.__('password_change_success'), class: 'alert-success' })
      else
        message.set({ text: TAPi18n.__('password_change_error'),   class: 'alert-danger' })
    })
  }
})
