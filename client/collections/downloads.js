loadDownloads = function () {
  if (Meteor.user() && ! Downloads.find().count()) {
    Downloads.insert({ name: 'Canaleta' })
    Downloads.insert({ name: 'Bomba' })
  }
}
