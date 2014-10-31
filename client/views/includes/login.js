var loginErrors = new ReactiveVar(false)

Template.login.helpers({
  error: function() {
    return loginErrors.get()
  }
})

Template.login.events({
  'submit': function (event, template) {
    event.preventDefault()

    var email    = $('#email').val().trim()
    var password = $('#password').val().trim()

    Meteor.loginWithPassword(email, password, function (error) {
      loginErrors.set(!!error)

      if (! error) {
        // Default value
        loadAdditives()
        loadAggregates()
        loadDownloads()
        loadSettlements()
        loadStrengths()
        loadTypes()

        Router.go('root')
      }
    })

    return false
  }
})
