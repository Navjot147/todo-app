class Storage {
    getItem(key, shouldParse) {
        if (shouldParse) {
            return JSON.parse(localStorage.getItem(key));
        }

        return localStorage.getItem(key);
    }

    setItem(key, value, shouldStringfy) {
        if (shouldStringfy) {
            return localStorage.setItem(key, JSON.stringify(value));
        }

        return localStorage.setItem(key, value);
    }

    remoteItem(key) {
        localStorage.removeItem(key);
    }
}

export default Storage;