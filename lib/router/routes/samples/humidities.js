Router.route('/samples/:sample_id/humidities/new', { name: 'humidityNew' })
Router.route('/humidities/:_id',                   { name: 'humidity' })
Router.route('/humidities/:_id/edit',              { name: 'humidityEdit', controller: 'HumidityController' })
