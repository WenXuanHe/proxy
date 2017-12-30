const request = require('request');

module.exports = (url, params) => {

	return new Promise((resolve, reject) => {
        request({
            url,
            method: "POST",
            body: JSON.stringify(params),
            headers: {
                "content-type": "application/json"
            }
        }, function (error, response, body) {
            try{
                body = JSON.parse(body);
                resolve(body);
            }catch(e){
                reject(e);
            }
        });
       
    });
}