Router.route('/trucks',           { name: 'trucks' })
Router.route('/trucks/new',       { name: 'truckNew' })
Router.route('/trucks/:_id',      { name: 'truck' })
Router.route('/trucks/:_id/edit', { name: 'truckEdit', controller: 'TruckController' })
