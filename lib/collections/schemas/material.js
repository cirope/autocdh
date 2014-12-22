Schemas.Material = new SimpleSchema([Schemas.Base, {
  name: {
    type: String,
    custom: function () {
      var other = Materials.findOne({
        name: this.value,
        userId: this.userId,
        _id: { $ne: this.docId }
      })

      if (this.isSet && other) return 'notUnique'
    }
  },

  noAbsorption: {
    type: Boolean,
    defaultValue: false
  },

  absorption: {
    type: Number,
    optional: true,
    decimal: true,
    min: -50,
    max: 50,
    custom: function () {
      var checkAbsorption = ! this.field('noAbsorption').value
      var emptyValue      = this.value === null || this.value === ''

      if (checkAbsorption && ! this.isSet && (! this.operator || emptyValue)) {
        return 'required'
      }
    }
  },

  defaultMaterial: {
    type: Boolean,
    defaultValue: false
  }
}])

Schemas.Material.labels({
  name:            function () { return TAPi18n.__('material_name') },
  noAbsorption:    function () { return TAPi18n.__('material_no_absorption') },
  absorption:      function () { return TAPi18n.__('material_absorption') },
  defaultMaterial: function () { return TAPi18n.__('material_default') },
  userId:          function () { return TAPi18n.__('user') },
  createdAt:       function () { return TAPi18n.__('created_at') },
  updatedAt:       function () { return TAPi18n.__('updated_at') }
})
