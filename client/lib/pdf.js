PDF = {
  logoData: null,

  new: function (options, callback) {
    var self = this
    var doc  = new jsPDF(options)

    doc.options = options

    self._overrideAddPage(doc)

    if (self.logoData)
      self.addLogo(doc, callback)
    else
      self._convertToDataURL(self.logoUrl(), function (imgData) {
        self.logoData = imgData

        self.addLogo(doc, callback)
      })
  },

  _convertToDataURL: function (url, callback) {
    HTTP.get(url, { responseType: 'blob' }, function (error, result) {
      var reader = new FileReader

      reader.onloadend = function () {
        callback(reader.result)
      }

      reader.readAsDataURL(result.content)
    })
  },

  _overrideAddPage: function (doc) {
    var self    = this
    var addPage = doc.addPage

    doc.addPage = function () {
      addPage.call(doc)
      self.addLogo(doc)
    }
  },

  addLogo: function (doc, callback) {
    var logoUrl    = this.logoUrl()
    var dimensions = this.logoDimensions()
    var factor     = dimensions.width > 80 ? 6 : 4
    var width      = dimensions.width / factor
    var height     = dimensions.height / factor
    var x          = doc.options && doc.options.orientation === 'l' ? 280 : 195
    var y          = 15
    var type       = _.last(logoUrl.split('.')).toUpperCase()

    doc.addImage(this.logoData, type, x - width, y, width, height)

    if (typeof callback === 'function') callback(doc)
  },

  $logo: function () {
    return $('img.navbar-brand')
  },

  logoUrl: function () {
    return this.$logo().prop('src')
  },

  logoDimensions: function () {
    var logo = _.first(this.$logo())

    return {
      width:  logo.naturalWidth,
      height: logo.naturalHeight
    }
  }
}

Accounts.onLogin(function () {
  PDF.logoData = null
})
