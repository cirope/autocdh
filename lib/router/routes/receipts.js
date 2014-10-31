Router.route('/samples/:sample_id/receipts/new', { name: 'receiptNew' })
Router.route('/receipts/:_id',                   { name: 'receipt' })
Router.route('/receipts/:_id/edit',              { name: 'receiptEdit', controller: 'ReceiptController' })
