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
  setField(name, !!value && typeof value == 'number' ? value.toFixed(!!decimals || decimals === 0 ? decimals : 1) : 0)
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

  var hw = getAndSetFloat('heavy_weight')
  if(!hw && !!ss){
    hw = ss
    setFloat('heavy_weight', hw)
  }

  var rs76 = getAndSetFloat('retained_sieve_76');
  var rs63 = getAndSetFloat('retained_sieve_63');
  var rs51 = getAndSetFloat('retained_sieve_51');
  var rs38 = getAndSetFloat('retained_sieve_38');
  var rs25 = getAndSetFloat('retained_sieve_25');
  var rs19 = getAndSetFloat('retained_sieve_19');
  var rs12 = getAndSetFloat('retained_sieve_12');
  var rs95 = getAndSetFloat('retained_sieve_95');
  var rs48 = getAndSetFloat('retained_sieve_48');

  var hrs = !!hw ? (1 - Math.abs((rs76 + rs63 + rs51 + rs38 + rs25 + rs19 + rs12 + rs95 + rs48) / hw))*100 : ''
  if(!!hrs){
    setFloat('thin_ver_ret', hrs)
    setField('thin_ver_ret_label', hrs < .5 ? TAPi18n.__('field_granulometry_thin_satisfy') : TAPi18n.__('field_granulometry_thin_no_satisfy'))
  } else {
    setField('thin_ver_ret', '')
    setField('thin_ver_ret_label', '-')
  }

  var tw = getAndSetFloat('thin_weight')
  var tr = getField('thin_reduce')
  if((!tr || tr !== 'yes') && !tw && !!ss){
    tw = ss
    setFloat('thin_weight', tw)
  }

  var sw20 = getAndSetFloat('sieve_weight_20');
  var sw04 = getAndSetFloat('sieve_weight_04');
  var sw01 = getAndSetFloat('sieve_weight_01');
  var swp = getAndSetFloat('sieve_weight_p');

  var rs20 = getAndSetFloat('retained_sieve_20', 2);
  var rs04 = getAndSetFloat('retained_sieve_04', 2);
  var rs01 = getAndSetFloat('retained_sieve_01', 2);
  var rsp = getAndSetFloat('retained_sieve_p', 2);

  var tvp = !!tw ? (1 - Math.abs((rs20 + rs04 + rs01 + rsp) / tw))*100 : ''
  if(!!tvp){
    setFloat('thin_ver_pass', tvp)
    setField('thin_ver_pass_label', tvp < .5 ? TAPi18n.__('field_granulometry_thin_satisfy') : TAPi18n.__('field_granulometry_thin_no_satisfy'))
  } else {
    setField('thin_ver_pass', '')
    setField('thin_ver_pass_label', '-')
  }

  var fct = !!tw && !!st ? st / tw : 0
  setFloat('factor', fct, 2)

  //setFloat('a_1', 0)
  //setFloat('b_1', 0)
  //setFloat('c_1', 0)
  //setFloat('d_1', 0)
  //setFloat('e_1', 0)
  //setFloat('f_1', 0)
  //setFloat('g_1', 0)
  //setFloat('h_1', 0)
  var i1 = 0
  setFloat('i_1', i1)
  var j1 = sw20
  setFloat('j_1', j1)
  var k1 = sw04
  setFloat('k_1', k1)
  var l1 = sw01
  setFloat('l_1', l1)
  var m1 = swp
  setFloat('m_1', m1)

  //setFloat('a_2', 0)
  //setFloat('b_2', 0)
  //setFloat('c_2', 0)
  //setFloat('d_2', 0)
  //setFloat('e_2', 0)
  //setFloat('f_2', 0)
  //setFloat('g_2', 0)
  //setFloat('h_2', 0)
  var i2 = rs48
  setFloat('i_2', i2)
  var j2 = fct*rs20
  setFloat('j_2', j2)
  var k2 = fct*rs04
  setFloat('k_2', k2)
  var l2 = fct*rs01
  setFloat('l_2', l2)
  var m2 = fct*rsp
  setFloat('m_2', m2)

  var a3 = rs76
  setFloat('a_3', a3)
  var b3 = rs63
  setFloat('b_3', b3)
  var c3 = rs51
  setFloat('c_3', c3)
  var d3 = rs38
  setFloat('d_3', d3)
  var e3 = rs25
  setFloat('e_3', e3)
  var f3 = rs19
  setFloat('f_3', f3)
  var g3 = rs12
  setFloat('g_3', g3)
  var h3 = rs95
  setFloat('h_3', h3)
  var i3 = rs48
  setFloat('i_3', i3)
  var j3 = j2-sw20
  setFloat('j_3', j3)
  var k3 = k2-sw04
  setFloat('k_3', k3)
  var l3 = l2-sw01
  setFloat('l_3', l3)
  var m3 = m2-swp
  setFloat('m_3', m3)

  var a4 = a3
  setFloat('a_4', a4)
  var b4 = b3+a4
  setFloat('b_4', b4)
  var c4 = c3+b4
  setFloat('c_4', c4)
  var d4 = d3+c4
  setFloat('d_4', d4)
  var e4 = e3+d4
  setFloat('e_4', e4)
  var f4 = f3+e4
  setFloat('f_4', f4)
  var g4 = g3+f4
  setFloat('g_4', g4)
  var h4 = h3+g4
  setFloat('h_4', h4)
  var i4 = i3+h4
  setFloat('i_4', i4)
  var j4 = j3+i4
  setFloat('j_4', j4)
  var k4 = k3+j4
  setFloat('k_4', k4)
  var l4 = l3+k4
  setFloat('l_4', l4)
  var m4 = m3+l4
  setFloat('m_4', m4)

  var a5 = tb
  setFloat('a_5', a5)
  var b5 = tb-b4
  setFloat('b_5', b5)
  var c5 = tb-c4
  setFloat('c_5', c5)
  var d5 = tb-d4
  setFloat('d_5', d5)
  var e5 = tb-e4
  setFloat('e_5', e5)
  var f5 = tb-f4
  setFloat('f_5', f5)
  var g5 = tb-g4
  setFloat('g_5', g5)
  var h5 = tb-h4
  setFloat('h_5', h5)
  var i5 = tb-i4
  setFloat('i_5', i5)
  var j5 = tb-j4
  setFloat('j_5', j5)
  var k5 = tb-k4
  setFloat('k_5', k5)
  var l5 = tb-l4
  setFloat('l_5', l5)
  var m5 = tb-m4
  setFloat('m_5', m5)

  var a6 = !!tb ? a5/tb*100 : ''
  setFloat('a_6', a6, 0)
  var b6 = !!tb ? b5/tb*100 : ''
  setFloat('b_6', b6, 0)
  var c6 = !!tb ? c5/tb*100 : ''
  setFloat('c_6', c6, 0)
  var d6 = !!tb ? d5/tb*100 : ''
  setFloat('d_6', d6, 0)
  var e6 = !!tb ? e5/tb*100 : ''
  setFloat('e_6', e6, 0)
  var f6 = !!tb ? f5/tb*100 : ''
  setFloat('f_6', f6, 0)
  var g6 = !!tb ? g5/tb*100 : ''
  setFloat('g_6', g6, 0)
  var h6 = !!tb ? h5/tb*100 : ''
  setFloat('h_6', h6, 0)
  var i6 = !!tb ? i5/tb*100 : ''
  setFloat('i_6', i6, 0)
  var j6 = !!tb ? j5/tb*100 : ''
  setFloat('j_6', j6, 0)
  var k6 = !!tb ? k5/tb*100 : ''
  setFloat('k_6', k6, 0)
  var l6 = !!tb ? l5/tb*100 : ''
  setFloat('l_6', l6, 0)
  var m6 = !!tb ? m5/tb*100 : ''
  setFloat('m_6', m6, 0)

  var total = a3+b3+c3+d3+e3+f3+g3+h3+i3+j3+k3+l3+m3+m5
  setFloat('total', total)

};

Template.fieldGranulometryNew.onRendered(function () {
  calculateFields()
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

  'change [name="heavy_weight"]': function (event) {
    calculateFields()
  },
  'change [name="retained_sieve_76"], change [name="retained_sieve_63"], change [name="retained_sieve_51"], change [name="retained_sieve_38"], change [name="retained_sieve_25"], change [name="retained_sieve_19"], change [name="retained_sieve_12"], change [name="retained_sieve_95"], change [name="retained_sieve_48"]': function (event) {
    calculateFields()
  },
  'change [name="thin_reduce"] ': function (event) {

    var tr = getField('thin_reduce')
    if(!tr || tr !== 'yes'){
      var tw = getAndSetFloat('thin_weight')
      if(!tw) {
        var ss = getAndSetFloat('separation_sieve')
        if(!!ss) {
          setFloat('thin_weight', ss)
        }
      }
    } else {
      setFloat('thin_weight', 0)
    }

    calculateFields()
  },
  'change [name="thin_weight"] ': function (event) {
    calculateFields()
  },
  'change [name="sieve_weight_20"], change [name="sieve_weight_04"], change [name="sieve_weight_01"], change [name="sieve_weight_p"]': function (event) {
    calculateFields()
  },
  'change [name="retained_sieve_20"], change [name="retained_sieve_04"], change [name="retained_sieve_01"], change [name="retained_sieve_p"]': function (event) {
    calculateFields()
  },
  'change [name="thin_pass_200"]': function (event) {
    calculateFields()
  }
})
