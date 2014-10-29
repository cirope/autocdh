mustBeSignedIn = function (pause) {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render('loading')
    else
      this.render('login')
  } else {
    this.next()
  }
}

Router.onBeforeAction('loading')
Router.onBeforeAction(mustBeSignedIn)
