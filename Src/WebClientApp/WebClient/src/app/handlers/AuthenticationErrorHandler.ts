class AuthenticationErrorHandler {
  handle(error: Error): void {
    if (error instanceof AuthenticationError) {
      // handle authentication error
    } else {
      throw error;
    }
  }
}
