var createThumb = function (fileObject, readStream, writeStream) {
  gm(readStream, fileObject.name()).resize(null, '60').stream().pipe(writeStream)
}

Images = new FS.Collection('images', {
  stores: [
    new FS.Store.GridFS('thumbs', { transformWrite: createThumb }),
    new FS.Store.GridFS('images', {})
  ],

  filter: {
    allow: { contentTypes: ['image/*'] }
  },

  onInvalid: function (message) {
    console.log(message)
  }
})

Images.allow({
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
