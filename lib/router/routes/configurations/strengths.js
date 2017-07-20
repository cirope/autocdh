Router.route('/strengths/new',       { name: 'formulaStrengthNew', template: 'strengthNew' })
Router.route('/strengths/:_id',      { name: 'strength' })
Router.route('/strengths/:_id/edit', { name: 'strengthEdit', controller: 'StrengthController' })

Router.route('/samples/:sample_id/strengths/new', { name: 'strengthNew' })
