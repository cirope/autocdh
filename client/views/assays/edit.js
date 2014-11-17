Template.assayEdit.helpers({
  agesOptions: function () {
    return [
      { value: '7-28',   label: TAPi18n.__('assay_ages_7-28') },
      { value: '28',     label: TAPi18n.__('assay_ages_28') },
      { value: 'full',   label: TAPi18n.__('assay_ages_full') },
      { value: '3-7-28', label: TAPi18n.__('assay_ages_3-7-28') }
    ]
  },

  curedOptions: function () {
    return [
      { value: 'normalized',  label: TAPi18n.__('assay_cured_normalized') },
      { value: 'real',        label: TAPi18n.__('assay_cured_real') },
      { value: 'accelerated', label: TAPi18n.__('assay_cured_accelerated') },
      { value: 'alongside',   label: TAPi18n.__('assay_cured_alongside') }
    ]
  },

  otherAssayOptions: function () {
    return [
      { value: '',                     label: TAPi18n.__('no') },
      { value: 'density',              label: TAPi18n.__('assay_other_assay_density') },
      { value: 'water_penetration',    label: TAPi18n.__('assay_other_assay_water_penetration') },
      { value: 'capillary_absorption', label: TAPi18n.__('assay_other_assay_capillary_absorption') }
    ]
  }
})
