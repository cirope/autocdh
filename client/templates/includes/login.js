var loginErrors = new ReactiveVar

Template.login.helpers({
  error: function() {
    return loginErrors.get()
  }
})

Template.login.events({
  'submit': function (event, template) {
    event.preventDefault()

    var email    = template.$('#email').val().trim()
    var password = template.$('#password').val().trim()

    Meteor.loginWithPassword(email, password, function (error) {
      loginErrors.set(!!error)

      if (! error) {
        // Default values
        loadAdditives()
        loadSettlements()

        Router.go('root')
      }
    })

    return false
  }
})
