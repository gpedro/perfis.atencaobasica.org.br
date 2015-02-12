App.UnAuthenticatedRouteMixin = Ember.Mixin.create({
  beforeModel: function(transition, queryParams) {
    this._super();
    if ( App.get('currentUser.id') ) {
      transition.abort();
      this.transitionTo( this.get('authenticatedRouteMixin'), App.get('currentUser.id'));
    }
  },
  authenticatedRouteMixin: 'profile.edit'
});
