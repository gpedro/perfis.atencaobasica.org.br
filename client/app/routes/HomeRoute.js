App.HomeRoute.reopen({
  beforeModel: function (transition){
    this._super();
    if ( !App.get('currentUser.id') )
      return this.transitionTo('authLogin');
    this.transitionTo('user.edit', App.get('currentUser.id'));
  }
})