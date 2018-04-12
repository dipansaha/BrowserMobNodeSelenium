class TestHelper {
    static get HTTPS_SRC(){
        return "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350";
    }

    static get HTTP_SRC(){
        return "http://www.abc.net.au/news/image/9209116-3x2-940x627.jpg";
    }

    static get TEST_PAGE_URL(){
        return "http://localhost:3000";
    }

    static getRequestUrls(requestEntries){
        var urls = [];
        requestEntries.forEach(obj => {
            console.log('request: ', obj.request.url);
            urls.push(obj.request.url);
        });

        return urls;
    }

    static getManualProxy(port){
        return { http: 'localhost:' + port, https: 'localhost:' + port };
    }

    static getCapabilities(browserName){
        return { 'browserName': browserName, acceptSslCerts: true, acceptInsecureCerts: true }
    }
}

module.exports = TestHelper 


