Router.route('/maintenances/p/:limit?', { name: 'maintenances' })
Router.route('/maintenances/new',       { name: 'maintenanceNew' })
Router.route('/maintenances/:_id',      { name: 'maintenance' })
Router.route('/maintenances/:_id/edit', { name: 'maintenanceEdit' })
