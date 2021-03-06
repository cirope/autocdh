Router.route('/customers',             { name: 'customers' })
Router.route('/customers/new',         { name: 'customerNew' })
Router.route('/customers/:_id',        { name: 'customer' })
Router.route('/customers/:_id/edit',   { name: 'customerEdit', controller: 'CustomerController' })
Router.route('/customers/:_id/cracks', { name: 'customerCracks' })

Router.route('/samples/:sample_id/customers/new', { name: 'receiptCustomerNew', template: 'customerNew' })
