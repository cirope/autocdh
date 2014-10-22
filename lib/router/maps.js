Router.map(function () {
  this.route('root',         { path: '/' })
  this.route('customers',    { path: '/customers' })
  this.route('customerNew',  { path: '/customers/new' })
  this.route('customer',     { path: '/customers/:_id' })
  this.route('customerEdit', { path: '/customers/:_id/edit', controller: CustomerController })
})
