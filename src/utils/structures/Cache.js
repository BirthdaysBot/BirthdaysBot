const EventEmitter = require("events");

class Cache extends EventEmitter {
    constructor() {
        super({ captureRejections: true });
    }

    data = new Map();

    /**
     * Adds data to the cache.
     * @param {String} key 
     * @param {any} value 
     * @param {Number} ttl 
     * @returns The cache.
     */
    addData(key, value, ttl) {
        if (typeof key != "string") {
            key = toString(key);
        }

        this.emit("dataAdded", key, value);

        return this.data.set(key, value);
    }

    /**
     * Deletes data from the cache.
     * @param {String} key 
     * @returns Boolean
     */
    deleteData(key) {
        if (typeof key != "string") {
            key = toString(key);
        }

        const get = this.data.get(key);

        this.emit("dataDeleted", key, get);

        return this.data.delete(key);
    }

    /**
     * Fetches data from the cache.
     * @param {String} key 
     * @returns Data from the cache.
     */
    fetchData(key) {
        if (typeof key != "string") {
            key = toString(key);
        }

        const fetched = this.data.get(key);

        this.emit("dataFetched", key, fetched);

        return fetched;
    }

    fetchAllData() {
        const fetched = this.data.entries();

        this.emit("dataFetched", null, fetched);

        return fetched;
    }

    /**
     * Clears all the data in the cache.
     * @returns Boolean
     */
    flushData() {
        this.data.clear();

        return true;
    }
}

module.exports = Cache;