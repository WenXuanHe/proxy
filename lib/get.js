const request = require('request');
var qs = require('qs');

module.exports = function({url, params}) {
    url = url + "?" + qs.stringify(params);
    return new Promise(function(resolve, reject) {
        request.get(url, function(err, response, body) {
            let res = {
                code: err ? 0 : 1,
                err
            }
            if (!err) {
                try {
                    res.result = JSON.parse(body);
                } catch (e) {
                    reject(e);
                }
            }
            resolve(res);
        })

    });

}