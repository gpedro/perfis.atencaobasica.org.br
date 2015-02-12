App.HomeRoute.reopen({
  beforeModel: function (transition){
    this._super();
    if ( !App.get('currentUser.id') )
      return this.transitionTo('authLogin');
    this.transitionTo('profile.edit', App.get('currentUser.id'));
  }
})