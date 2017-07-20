Router.route('/providers',             { name: 'providers' })
Router.route('/providers/new',         { name: 'providerNew' })
Router.route('/providers/:_id',        { name: 'provider' })
Router.route('/providers/:_id/edit',   { name: 'providerEdit', controller: 'ProviderController' })
