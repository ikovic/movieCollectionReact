class Ajax {

    constructor(url, success, error, useTimestamp = false) {
        if (useTimestamp) {
            this.url = url + ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime();
        } else {
            this.url = url;
        }
        this.error = error;

        this.xhr = new XMLHttpRequest();
        this.xhr.withCredentials = true;
        this.xhr.onreadystatechange = (() => {
            if (this.xhr.readyState === 4 && this.xhr.status >= 200 && this.xhr.status < 400) {
                success(this._getData());
            } else if (this.xhr.readyState === 4 && this.xhr.status > 399) {
                if (this.xhr.status === 401 || this.xhr.status === 403) {

                } else if (this.xhr.status >= 500) {
                    error(this.xhr.status, 'Internal Server Error');
                } else {
                    error(this.xhr.status, this._getData());
                }
            }
        });
    }

    _getData() {
        try {
            return JSON.parse(this.xhr.responseText);
        }
        catch (err) {
            return this.xhr.responseText;
        }
    }

    static createQueryString(baseUrl, params) {
        if (baseUrl.slice(0, -1) === '/') {
            baseUrl = baseUrl.slice(0, -1);
        }
        var query = "?";
        params.forEach((param) => {
            query += param.name;
            query += "=";
            query += encodeURIComponent(param.value).replace(/'/g, "%27").replace(/"/g, "%22");
            query += "&";
        });
        query = query.slice(0, -1);
        return baseUrl + query;
    }


    get() {
        this.xhr.open('GET', this.url, true);
        this._configure();
        this.xhr.send();
    }

    post(data) {
        this.xhr.open('POST', this.url, true);
        this._configure();
        this.xhr.send(JSON.stringify(data));
    }

    put(data) {
        this.xhr.open('PUT', this.url, true);
        this._configure();
        this.xhr.send(JSON.stringify(data));
    }

    delete() {
        this.xhr.open('DELETE', this.url, true);
        this._configure();
        this.xhr.send();
    }

    _configure() {
        // IE11 bug workaround
        this.xhr.timeout = 20000; // 20 sec
        this.xhr.ontimeout = (() => this.error(598, {message: "Server timed out"}));
        this.xhr.setRequestHeader('Accept', 'application/json');
        this.xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    }
}

export default Ajax;