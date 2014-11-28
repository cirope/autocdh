Schemas = {}

Schemas.Base = new SimpleSchema({
  _id: {
    type: String,
    index: true,
    unique: true,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: function () {
      if (this.isInsert)
        return this.isSet ? this.value : Random.id()
      else
        this.unset()
    }
  },

  userId: {
    type: String,
    index: true,
    autoValue: function () {
      return this.isFromTrustedCode ? this.value : this.userId
    }
  },

  createdAt: {
    type: Date,
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
    autoValue: function () {
      if (this.isUpdate) return new Date
    },
    denyInsert: true,
    optional: true
  }
})
