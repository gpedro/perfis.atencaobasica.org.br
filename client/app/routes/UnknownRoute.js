App.UnknownRoute.reopen({
	beforeModel: function () {
		this.transitionTo('home');
	}
});