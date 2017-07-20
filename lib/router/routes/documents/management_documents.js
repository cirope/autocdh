Router.route('/management_documents/list',       { name: 'managementDocuments' })
Router.route('/management_documents/new',        { name: 'managementDocumentNew' })
Router.route('/management_documents/:_id',       { name: 'managementDocument' })
Router.route('/management_documents/:_id/edit',  { name: 'managementDocumentEdit', controller: 'ManagementDocumentController' })

// other '/documents/:type...' routes on documents.js