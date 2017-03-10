Router.route('/documents/:type/list', { name: 'documents' })
Router.route('/documents/:type/new',  { name: 'documentNew' })
Router.route('/documents/:_id',       { name: 'document' })
Router.route('/documents/:_id/edit',  { name: 'documentEdit', controller: 'DocumentController' })

// other '/documents/management/...' routes on management_documents.js