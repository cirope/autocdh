Router.route('/instruments',           { name: 'instruments' })
Router.route('/instruments/new',       { name: 'instrumentNew' })
Router.route('/instruments/:_id',      { name: 'instrument' })
Router.route('/instruments/:_id/edit', { name: 'instrumentEdit', controller: 'InstrumentController' })
