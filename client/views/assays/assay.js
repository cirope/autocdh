Template.assay.helpers({
  ages: function () {
    var ages = {
      '7':      TAPi18n.__('assay_ages_7'),
      '7-28':   TAPi18n.__('assay_ages_7-28'),
      '28':     TAPi18n.__('assay_ages_28'),
      'full':   TAPi18n.__('assay_ages_full'),
      '3-7-28': TAPi18n.__('assay_ages_3-7-28')
    }

    return ages[this.ages]
  },

  cured: function () {
    var cured = {
      'normalized':  TAPi18n.__('assay_cured_normalized'),
      'real':        TAPi18n.__('assay_cured_real'),
      'accelerated': TAPi18n.__('assay_cured_accelerated'),
      'alongside':   TAPi18n.__('assay_cured_alongside')
    }

    return cured[this.cured]
  },

  otherAssay: function () {
    var otherAssay = {
      '':                     TAPi18n.__('no'),
      'density':              TAPi18n.__('assay_other_assay_density'),
      'water_penetration':    TAPi18n.__('assay_other_assay_water_penetration'),
      'capillary_absorption': TAPi18n.__('assay_other_assay_capillary_absorption')
    }

    return otherAssay[this.otherAssay || '']
  },

  extended: function () {
    return TAPi18n.__(this.extended ? 'yes' : 'no')
  },

  molding: function () {
    return TAPi18n.__(this.molding ? 'yes' : 'no')
  }
})
