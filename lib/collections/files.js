Files = new FS.Collection('files', {
  stores: [
    new FS.Store.GridFS('files', {})
  ],

  onInvalid: function (message) {
    console.log(message)
  }
})

Files.allow({
  insert: function (userId) {
    return !! userId
  },

  update: function (userId) {
    return !! userId
  },

  remove: function (userId) {
    return !! userId
  },

  download: function (userId) {
    return true
  },

  fetch: null
})
