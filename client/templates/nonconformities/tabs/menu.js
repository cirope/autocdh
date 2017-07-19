Template.nonconformitiesMenu.helpers({

});

Template.nonconformitiesMenuItem.helpers({
  attributes: function() {
    return {
      class: this.link == this.tab ? 'active' : ''
    }
  }
});