Router.route('/customers',           { name: 'customers' })
Router.route('/customers/new',       { name: 'customerNew' })
Router.route('/customers/:_id',      { name: 'customer' })
Router.route('/customers/:_id/edit', { name: 'customerEdit', controller: 'CustomerController' })

Router.route('/samples/:sample_id/customets/new', { name: 'receiptCustomerNew', template: 'customerNew' })
