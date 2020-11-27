var ManggaDB = {
    host: "localhost.trans-shop.com",
    username: "jefripunza",
    apiKey: "07f09syfey8rwejp",
    database: "siap"
}

function request(perihal, tabel, query, callback) {
    var host, http = new XMLHttpRequest();
    if (window.location.hostname == "localhost") {
        host = "http://localhost";
    } else { // cek https
        host = "https://" + ManggaDB.host; // standard SSL
    }
    console.log(host);
    http.open("POST", host, true);
    http.setRequestHeader('Access-Control-Allow-Origin', '*');
    http.setRequestHeader("Accept", "application/vnd.github.3.raw");
    http.setRequestHeader('Content-type', 'application/json');

    http.setRequestHeader('username', ManggaDB.username);
    http.setRequestHeader('apiKey', ManggaDB.apiKey);
    http.setRequestHeader('database', ManggaDB.database);

    http.setRequestHeader('perihal', perihal);
    http.setRequestHeader('tabel', tabel);
    http.setRequestHeader('query', query);

    http.onreadystatechange = function() {
        if (http.readyState == 4) {
            if (http.status == 200) {
                try {
                    // pass the response to the callback function
                    callback(null, JSON.parse(http.responseText));
                } catch (error) {
                    // pass the error to the callback function
                    callback(http.responseText);
                }
            } else {
                // pass the error to the callback function
                callback(http.responseText);
            }
        }
    }
    http.send(null);
}

var Mangga = new function() {
    this.tambah = function(tabel, query, callback) {
        return request("tambah", tabel, JSON.stringify(query), callback)
    }
    this.ubah = function(tabel, target, planing, callback) {
        var planing_array = false;
        if (Array.isArray(planing)) {
            planing_array = true;
        }
        var query = {
            target: target,
            planing: planing,
            planing_array: planing_array
        }
        return request("ubah", tabel, JSON.stringify(query), callback)
    }
    this.hapus = function(tabel, query, callback) {
        var query_array = false;
        if (Array.isArray(query)) {
            query_array = true;
        }
        var query = {
            query: query,
            query_array: query_array
        }
        return request("hapus", tabel, JSON.stringify(query), callback)
    }
    this.tampil = function(tabel, query, callback) {
        var query_array = false;
        if (Array.isArray(query)) {
            query_array = true;
        }
        var query = {
            query: query,
            query_array: query_array
        }
        return request("tampil", tabel, JSON.stringify(query), callback)
    }
}

var Query = new function() {
    this.samaDengan = function(start, end) {
        if (start == 'id') {
            start = "_id";
        }
        return `"${start}":"${end}"`
    }
}
