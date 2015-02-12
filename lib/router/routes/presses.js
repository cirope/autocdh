Router.route('/presses',           { name: 'presses' })
Router.route('/presses/new',       { name: 'pressNew' })
Router.route('/presses/:_id',      { name: 'press' })
Router.route('/presses/:_id/edit', { name: 'pressEdit', controller: 'PressController' })
