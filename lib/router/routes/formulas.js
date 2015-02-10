Router.route('/formulas',           { name: 'formulas' })
Router.route('/formulas/new',       { name: 'formulaNew' })
Router.route('/formulas/:_id',      { name: 'formula' })
Router.route('/formulas/:_id/edit', { name: 'formulaEdit', controller: 'FormulaController' })

Router.route('/samples/:sample_id/formulas/new', { name: 'concreteFormulaNew', template: 'formulaNew' })
