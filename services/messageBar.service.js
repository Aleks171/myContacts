angular.module('services')
.service('messageBar', [ function() {
	var currentMessageBar = null;
	this.addMessageBar = function(newMessageBar) {
		//Check if current message bar exist
		if (currentMessageBar === null) {
			this.setCurrentMessageBar(newMessageBar);
			this.showMessageBar();
		}
		//If current message bar already exist 
		else {
			//Check if a newly clicked message bar is the same
			if (this.compareNewClickedMesBarWithCurrent(newMessageBar)) {
				var isOpen = this.getMessageBarStatus();
				currentMessageBar.isOpen = !isOpen;
			}
			//If not hide current message and add a new one as current
			else {
				this.hideMessageBar();
				this.setCurrentMessageBar(newMessageBar);
				this.showMessageBar();
			}
		}
	};
	this.showMessageBar = function() {
		currentMessageBar.isOpen = true;
	};
	this.hideMessageBar = function() {
		currentMessageBar.isOpen = false;
	}
	this.compareNewClickedMesBarWithCurrent = function(newMessageBar) {
		var equality;
		(newMessageBar === currentMessageBar) ? equality = true : equality = false;
		return equality;
	}
	this.getMessageBarStatus = function() {
		return currentMessageBar.isOpen;
	}
	this.setCurrentMessageBar = function(newMessageBar) {
		return currentMessageBar = newMessageBar;
	}
 }]);