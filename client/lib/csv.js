CSV = {
  save: function (name, data) {
    var csvString = Papa.unparse(_.compact(data), {
      quotes:    true,
      delimiter: ';'
    })

    this.download(name, csvString)
  },

  download: function (name, csvString) {
    var blob   = new Blob(["\ufeff", csvString])
    var a      = window.document.createElement('a')

    a.href     = window.URL.createObjectURL(blob, { type: 'text/plain' })
    a.download = name + '.csv'

    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
}
