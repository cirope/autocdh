
Template.strengthEdit.events({
    'keyup [name="name"]': function (event) {
        var name  = $('[name="name"]').val()
        $('[name="resistant"]').val(name.match(/\d+/))
    }
})