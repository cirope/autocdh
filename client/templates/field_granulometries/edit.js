

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
	var hp = 0;
	var he = getFloat('humidity_empty_mass');
	var hw = getFloat('humidity_wet');
	var hd = getFloat('humidity_dry');
	if(hw > hd && hd > he){
		hp = (hw-hd)/(hd-he)*100
	}
	setField('humidity_percentage', hp ? hp.toFixed(1) : '')

	var tp = 0;
	var te = getFloat('thin_empty_mass');
	var tb = getFloat('thin_before');
	var ta = getFloat('thin_after');
	if(tb > ta && tb > te){
		tp = (tb-ta)/(tb-te)*100
	}
	setField('thin_percentage', tp ? tp.toFixed(1) : '');

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

	var total = t76 + t63 + t51 + t38 + t25 + t19 + t95 + t48 + t20 + t04 + t02 + t01 + t00 + tb
	setField('total', total ? total.toFixed(0) : '');

};

Template.fieldGranulometryEdit.onRendered(function () {
});

Template.fieldGranulometryEdit.helpers({
})

Template.fieldGranulometryEdit.events({

	'change [name="humidity_empty_mass"], change [name="humidity_wet"], change [name="humidity_dry"]': function (event) {
		calculateFields()
	},
	'change [name="thin_empty_mass"], change [name="thin_before"], change [name="thin_after"]': function (event) {
		calculateFields()
	},
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
