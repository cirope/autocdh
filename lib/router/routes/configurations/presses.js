Router.route('/presses',           { name: 'presses' })
Router.route('/presses/new',       { name: 'pressNew' })
Router.route('/presses/:_id',      { name: 'press' })
Router.route('/presses/:_id/edit', { name: 'pressEdit', controller: 'PressController' })

Router.route('/cracks/:crack_id/presses/new', { name: 'crackPressNew', template: 'pressNew' })
