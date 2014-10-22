mustBeSignedIn = function (pause) {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render('loading')
    else
      this.render('login')

    pause()
  }
}

Router.onBeforeAction('loading')
Router.onBeforeAction(mustBeSignedIn)
