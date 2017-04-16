AutoForm.addHooks('newLimitForm', {
  before: {
    method: function (doc) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})

var getField = function (name) {
  return $('[name="' + name + '"]').val()
};

var getFloat = function (name) {
  return parseFloat(getField(name) || 0)
};

var setField = function (name, value) {
  $('[name="'+name+'"]').val(value)
};

var calculateFields = function () {
  // liquid limit
  for(var pos = 1; pos <= 3; pos++) {
    var r = 0;
    var e = getFloat('liquid_empty_mass_p' + pos);
    var w = getFloat('liquid_wet_mass_p' + pos);
    var d = getFloat('liquid_dry_mass_p' + pos);
    if(w > d && d > e){
      r = (w-d)/(d-e)*100
    }
    setField('liquid_humidity_p' + pos, r ? r.toFixed(1) : '')
  }

  // plastic limit
  for(var det = 1; det <= 2; det++) {
    var pr = 0;
    var pe = getFloat('plastic_empty_mass_d' + det);
    var pw = getFloat('plastic_wet_mass_d' + det);
    var pd = getFloat('plastic_dry_mass_d' + det);
    if(pw > pd && pd > pe){
      pr = (pw-pd)/(pd-pe)*100
    }
    setField('plastic_humidity_d' + det, pr ? pr.toFixed(1) : '')
  }
};

Template.limitNew.onRendered(function () {
});

Template.limitNew.helpers({
})

Template.limitNew.events({

  'change [name="liquid_empty_mass_p1"], change [name="liquid_empty_mass_p2"], change [name="liquid_empty_mass_p3"]': function (event) {
    calculateFields()
  },
  'change [name="liquid_wet_mass_p1"], change [name="liquid_wet_mass_p2"], change [name="liquid_wet_mass_p3"]': function (event) {
    calculateFields()
  },
  'change [name="liquid_dry_mass_p1"], change [name="liquid_dry_mass_p2"], change [name="liquid_dry_mass_p3"]': function (event) {
    calculateFields()
  },
  'change [name="plastic_empty_mass_d1"], change [name="plastic_empty_mass_d2"]': function (event) {
    calculateFields()
  },
  'change [name="plastic_wet_mass_d1"], change [name="plastic_wet_mass_d2"]': function (event) {
    calculateFields()
  },
  'change [name="plastic_dry_mass_d1"], change [name="plastic_dry_mass_d2"]': function (event) {
    calculateFields()
  },
})
