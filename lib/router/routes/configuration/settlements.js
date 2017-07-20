Router.route('/settlements/new',       { name: 'formulaSettlementNew', template: 'settlementNew' })
Router.route('/settlements/:_id',      { name: 'settlement' })
Router.route('/settlements/:_id/edit', { name: 'settlementEdit', controller: 'SettlementController' })

Router.route('/samples/:sample_id/settlements/new', { name: 'settlementNew' })
