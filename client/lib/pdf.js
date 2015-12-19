PDF = {
  new: function (options, callback) {
    var doc        = new jsPDF(options)
    var logoUrl    = this.logoUrl()
    var dimensions = this.logoDimensions()
    var factor     = dimensions.width > 80 ? 6 : 4
    var width      = dimensions.width / factor
    var height     = dimensions.height / factor
    var x          = options && options.orientation === 'l' ? 280 : 195
    var y          = 15
    var type       = _.last(logoUrl.split('.')).toUpperCase()

    this._convertToDataURL(logoUrl, function (imgData) {
      doc.addImage(imgData, type, x - width, y, width, height)

      callback(doc)
    })
  },

  _convertToDataURL: function (url, callback) {
    var xhr = new XMLHttpRequest

    xhr.responseType = 'blob'
    xhr.onload       = function() {
      var reader  = new FileReader

      reader.onloadend = function () {
        callback(reader.result)
      }

      reader.readAsDataURL(xhr.response)
    }

    xhr.open('GET', url)
    xhr.send()
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
