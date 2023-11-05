class ErrorHandler{
		constructor(){
				window.onerror = function (message, url, line, column, error) {
						console.log(message, url, line, column, error);
						return true;
				};
		}

		public static handleError(error: Error): void {
			if(error instanceof AuthenticationError){
				// handle authentication error
				// If the error is an authentication error, then we can handle it here.
				// For example, we can redirect the user to the login page.
			} else {
				throw error;
			}
		}
}
