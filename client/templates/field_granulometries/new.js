AutoForm.addHooks('newFieldGranulometryForm', {
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

var setFloat = function (name, value, decimals) {
  setField(name, value || typeof value == 'number' ? value.toFixed(!!decimals ? decimals : 1) : 0)
};

var getAndSetFloat = function (name, decimals) {
  var value = getFloat(name)
  setFloat(name, value, decimals)
  return value
};

var setField = function (name, value) {
  $('[name="'+name+'"]').val(value)
};

var calculateFields = function () {

  var he = getAndSetFloat('humidity_empty_mass')
  var hw = getAndSetFloat('humidity_wet')
  var hd = getAndSetFloat('humidity_dry')

  var hp = 0;
  if(hw > hd && hd > he){
    hp = (hw-hd)/(hd-he)*100
  }
  setFloat('humidity_percentage', hp)

  var te = getAndSetFloat('thin_empty_mass')
  var tb = getAndSetFloat('thin_before')
  var ta = getAndSetFloat('thin_after')

  var tp = 0;
  if(tb > ta && tb > te){
    tp = (tb-ta)/(tb-te)*100
  }
  setFloat('thin_percentage', tp)

  var sw = getAndSetFloat('weight')
  if(!sw && !!ta){
    sw = ta
    setFloat('weight', sw)
  }
  var ss = getAndSetFloat('separation_sieve')
  var st = getAndSetFloat('separation_thin')
  if(!st && !!sw && !!ss){
    st = sw-ss
    setFloat('separation_thin', st)
  }



  // -------------------------------------------------------------------------




  var p76 = getFloat('retained_partial_76');
  var t76 = p76;
  setField('retained_total_76', t76 ? t76.toFixed(0) : '');

  var p63 = getFloat('retained_partial_63');
  var t63 = p63 + t76;
  setField('retained_total_63', t63 ? t63.toFixed(0) : '');

  var p51 = getFloat('retained_partial_51');
  var t51 = p51 + t63;
  setField('retained_total_51', t51 ? t51.toFixed(0) : '');

  var p38 = getFloat('retained_partial_38');
  var t38 = p38 + t51;
  setField('retained_total_38', t38 ? t38.toFixed(0) : '');

  var p25 = getFloat('retained_partial_25');
  var t25 = p25 + t38;
  setField('retained_total_25', t25 ? t25.toFixed(0) : '');

  var p19 = getFloat('retained_partial_19');
  var t19 = p19 + t25;
  setField('retained_total_19', t19 ? t19.toFixed(0) : '');

  var p95 = getFloat('retained_partial_95');
  var t95 = p95 + t19;
  setField('retained_total_95', t95 ? t95.toFixed(0) : '');

  var w48 = getFloat('sieve_weight_48');
  var s48 = getFloat('retained_sieve_48');
  var p48 = s48 > w48 ? s48 - w48 : 0;
  setField('retained_partial_48', p48 ? p48.toFixed(0) : '');
  var t48 = p48 + t95;
  setField('retained_total_48', t48 ? t48.toFixed(0) : '');

  var w20 = getFloat('sieve_weight_20');
  var s20 = getFloat('retained_sieve_20');
  var p20 = s20 > w20 ? s20 - w20 : 0;
  setField('retained_partial_20', p20 ? p20.toFixed(0) : '');
  var t20 = p20 + t48;
  setField('retained_total_20', t20 ? t20.toFixed(0) : '');

  var w04 = getFloat('sieve_weight_04');
  var s04 = getFloat('retained_sieve_04');
  var p04 = s04 > w04 ? s04 - w04 : 0;
  setField('retained_partial_04', p04 ? p04.toFixed(0) : '');
  var t04 = p04 + t20;
  setField('retained_total_04', t04 ? t04.toFixed(0) : '');

  var w02 = getFloat('sieve_weight_02');
  var s02 = getFloat('retained_sieve_02');
  var p02 = s02 > w02 ? s02 - w02 : 0;
  setField('retained_partial_02', p02 ? p02.toFixed(0) : '');
  var t02 = p02 + t04;
  setField('retained_total_02', t02 ? t02.toFixed(0) : '');

  var w01 = getFloat('sieve_weight_01');
  var s01 = getFloat('retained_sieve_01');
  var p01 = s01 > w01 ? s01 - w01 : 0;
  setField('retained_partial_01', p01 ? p01.toFixed(0) : '');
  var t01 = p01 + t02;
  setField('retained_total_01', t01 ? t01.toFixed(0) : '');

  var w00 = getFloat('sieve_weight_00');
  var s00 = getFloat('retained_sieve_00');
  var p00 = s00 > w00 ? s00 - w00 : 0;
  setField('retained_partial_00', p00 ? p00.toFixed(0) : '');
  var t00 = p00 + t01;
  setField('retained_total_00', t00 ? t00.toFixed(0) : '');

  var wbb = getFloat('sieve_weight_b');
  var sbb = getFloat('retained_sieve_b');
  var pbb = sbb > wbb ? sbb - wbb : 0;
  setField('retained_partial_b', pbb ? pbb.toFixed(0) : '');
  var tbb = pbb + t00;
  setField('retained_total_b', tbb ? tbb.toFixed(0) : '');

  var total = p76 + p63 + p51 + p38 + p25 + p19 + p95 + p48 + p20 + p04 + p02 + p01 + p00 + pbb
  setField('total', total ? total.toFixed(0) : '');

  var ps76 = total - t76
  setField('passed_76', ps76 ? ps76.toFixed(0) : '');
  var po76 = ps76/total*100
  setField('passed_percentage_76', po76 ? po76.toFixed(0) : '');

  var ps63 = total - t63
  setField('passed_63', ps63 ? ps63.toFixed(0) : '');
  var po63 = ps63/total*100
  setField('passed_percentage_63', po63 ? po63.toFixed(0) : '');

  var ps51 = total - t51
  setField('passed_51', ps51 ? ps51.toFixed(0) : '');
  var po51 = ps51/total*100
  setField('passed_percentage_51', po51 ? po51.toFixed(0) : '');

  var ps38 = total - t38
  setField('passed_38', ps38 ? ps38.toFixed(0) : '');
  var po38 = ps38/total*100
  setField('passed_percentage_38', po38 ? po38.toFixed(0) : '');

  var ps25 = total - t25
  setField('passed_25', ps25 ? ps25.toFixed(0) : '');
  var po25 = ps25/total*100
  setField('passed_percentage_25', po25 ? po25.toFixed(0) : '');

  var ps19 = total - t19
  setField('passed_19', ps19 ? ps19.toFixed(0) : '');
  var po19 = ps19/total*100
  setField('passed_percentage_19', po19 ? po19.toFixed(0) : '');

  var ps95 = total - t95
  setField('passed_95', ps95 ? ps95.toFixed(0) : '');
  var po95 = ps95/total*100
  setField('passed_percentage_95', po95 ? po95.toFixed(0) : '');

  var ps48 = total - t48
  setField('passed_48', ps48 ? ps48.toFixed(0) : '');
  var po48 = ps48/total*100
  setField('passed_percentage_48', po48 ? po48.toFixed(0) : '');

  var ps20 = total - t20
  setField('passed_20', ps20 ? ps20.toFixed(0) : '');
  var po20 = ps20/total*100
  setField('passed_percentage_20', po20 ? po20.toFixed(0) : '');

  var ps04 = total - t04
  setField('passed_04', ps04 ? ps04.toFixed(0) : '');
  var po04 = ps04/total*100
  setField('passed_percentage_04', po04 ? po04.toFixed(0) : '');

  var ps02 = total - t02
  setField('passed_02', ps02 ? ps02.toFixed(0) : '');
  var po02 = ps02/total*100
  setField('passed_percentage_02', po02 ? po02.toFixed(0) : '');

  var ps01 = total - t01
  setField('passed_01', ps01 ? ps01.toFixed(0) : '');
  var po01 = ps01/total*100
  setField('passed_percentage_01', po01 ? po01.toFixed(0) : '');

  var ps00 = total - t00
  setField('passed_00', ps00 ? ps00.toFixed(0) : '');
  var po00 = ps00/total*100
  setField('passed_percentage_00', po00 ? po00.toFixed(0) : '');

  var psbb = total - tbb
  setField('passed_b', psbb ? psbb.toFixed(0) : '');
  var pobb = psbb/total*100
  setField('passed_percentage_b', pobb ? pobb.toFixed(0) : '');

};

Template.fieldGranulometryNew.onRendered(function () {
});

Template.fieldGranulometryNew.helpers({
})

Template.fieldGranulometryNew.events({

  'change [name="humidity_empty_mass"], change [name="humidity_wet"], change [name="humidity_dry"]': function (event) {
    calculateFields()
  },
  'change [name="thin_empty_mass"], change [name="thin_before"], change [name="thin_after"]': function (event) {
    calculateFields()
  },

  'change [name="weight"], change [name="separation_sieve"], change [name="separation_thin"]': function (event) {
    calculateFields()
  },



  // ---------------------------------------------


  'change [name="retained_partial_76"]': function (event) {
    calculateFields()
  },
  'change [name="retained_partial_63"]': function (event) {
    calculateFields()
  },
  'change [name="retained_partial_51"]': function (event) {
    calculateFields()
  },
  'change [name="retained_partial_38"]': function (event) {
    calculateFields()
  },
  'change [name="retained_partial_25"]': function (event) {
    calculateFields()
  },
  'change [name="retained_partial_19"]': function (event) {
    calculateFields()
  },
  'change [name="retained_partial_95"]': function (event) {
    calculateFields()
  },
  'change [name="sieve_weight_48"], change [name="retained_sieve_48"]': function (event) {
    calculateFields()
  },
  'change [name="sieve_weight_20"], change [name="retained_sieve_20"]': function (event) {
    calculateFields()
  },
  'change [name="sieve_weight_04"], change [name="retained_sieve_04"]': function (event) {
    calculateFields()
  },
  'change [name="sieve_weight_02"], change [name="retained_sieve_02"]': function (event) {
    calculateFields()
  },
  'change [name="sieve_weight_01"], change [name="retained_sieve_01"]': function (event) {
    calculateFields()
  },
  'change [name="sieve_weight_00"], change [name="retained_sieve_00"]': function (event) {
    calculateFields()
  },
  'change [name="sieve_weight_b"], change [name="retained_sieve_b"]': function (event) {
    calculateFields()
  },
})
