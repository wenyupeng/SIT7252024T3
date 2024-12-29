class ReturnResult {
    constructor(success, message, data = null) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    static success(data = null, message = 'success') {
        return new ReturnResult(true, message, data);
    }

    static fail(message = 'fail', data = null) {
        return new ReturnResult(false, message, data)
    }

}

// module.exports = ReturnResult;
globalThis.ReturnResult = ReturnResult;