Router.route('/granulometry_humidities',           { name: 'granulometryHumidities' })
Router.route('/granulometry_humidities/new',       { name: 'granulometryHumidityNew' })
Router.route('/granulometry_humidities/:_id',      { name: 'granulometryHumidity' })
Router.route('/granulometry_humidities/:_id/edit', { name: 'granulometryHumidityEdit', controller: 'GranulometryHumidityController' })
