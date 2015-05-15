Router.route('/deviations/new',       { name: 'deviationNew' })
Router.route('/deviations/:_id',      { name: 'deviation' })
Router.route('/deviations/:_id/edit', { name: 'deviationEdit', controller: 'DeviationController' })
