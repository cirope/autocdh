Router.route('/criteria', { name: 'criteria' })

Router.route('/criteria/strengths',           { name: 'strengthsCriteria',    controller: 'StrengthsController' })
Router.route('/criteria/strengths/:_id',      { name: 'strengthCriteria',     controller: 'StrengthController'  })
Router.route('/criteria/strengths/:_id/edit', { name: 'strengthCriteriaEdit', controller: 'StrengthController' })

Router.route('/criteria/settlements',           { name: 'settlementsCriteria',    controller: 'SettlementsController' })
Router.route('/criteria/settlements/:_id',      { name: 'settlementCriteria',     controller: 'SettlementController'  })
Router.route('/criteria/settlements/:_id/edit', { name: 'settlementCriteriaEdit', controller: 'SettlementController' })
