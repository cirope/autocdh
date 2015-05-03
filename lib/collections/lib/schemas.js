Schemas = {}

Schemas.Base = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: function () {
      if (this.isInsert)
        return this.isSet ? this.value : Random.id()
      else
        this.unset()
    }
  },

  organizationId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: function () {
      return this.isFromTrustedCode ? this.value : organizationIdFor(this.userId)
    }
  },

  createdAt: {
    type: Date,
    index: true,
    autoValue: function () {
      if (this.isInsert)
        return new Date
      else if (this.isUpsert)
        return { $setOnInsert: new Date }
      else
        this.unset()
    },
    denyUpdate: true
  },

  updatedAt: {
    type: Date,
    index: true,
    autoValue: function () {
      if (this.isUpdate) return new Date
    },
    denyInsert: true,
    optional: true
  }
})
