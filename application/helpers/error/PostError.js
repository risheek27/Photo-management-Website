class PostError extends Error {
    constructor(message, redirectURL, status) {
        super(message);
        this.redirectURL = redirectURL;
        this.status = status;
    }

    getMessage() {
        return this.message;

    }

    getRedirectUrl() {
        return this.getRedirectUrl;
    }

    getStatus() {
        return this.status;
    }
}

module.exports = PostError;
