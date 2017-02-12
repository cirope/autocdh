Template.granulometriesMenu.helpers({

});

Template.granulometriesMenuItem.helpers({
  attributes: function() {
    return {
      class: this.link == this.tab ? 'active' : ''
    }
  }
});