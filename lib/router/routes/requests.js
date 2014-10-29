Router.route('/requests',           { name: 'requests' })
Router.route('/requests/new',       { name: 'requestNew' })
Router.route('/requests/:_id',      { name: 'request' })
Router.route('/requests/:_id/edit', { name: 'requestEdit', controller: 'RequestController' })
