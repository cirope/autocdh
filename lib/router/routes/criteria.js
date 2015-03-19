Router.route('/criteria',           { name: 'strengthsCriteria',    controller: 'StrengthsController' })
Router.route('/criteria/:_id',      { name: 'strengthCriteria',     controller: 'StrengthController'  })
Router.route('/criteria/:_id/edit', { name: 'strengthCriteriaEdit', controller: 'StrengthController' })
