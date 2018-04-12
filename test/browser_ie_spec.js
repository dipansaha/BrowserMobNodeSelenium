
'use strict';

const chai = require('chai');
const expect = chai.expect;

const BrowserMob = require('browsermob-proxy-client');
const webdriver = require('selenium-webdriver');
const selProxy = require('selenium-webdriver/proxy');
const ie = require('selenium-webdriver/ie');
const iedriver = require('iedriver');
const TestHelper = require('../test/module/testHelper')

var defaultProxy;

describe('Browser - IE', function () {

    beforeEach(async () => {
        defaultProxy = BrowserMob.createClient();
        await defaultProxy.start();
    });

    afterEach(async () => {
        await defaultProxy.closeProxies();
        await defaultProxy.end();
    });


    it("Internet Explorer", async () => {
        await defaultProxy.createHar();

        let driver = new webdriver.Builder()
            .forBrowser('internet explorer')
            .setProxy(selProxy.manual(TestHelper.getManualProxy(defaultProxy.proxy.port)))
            .build();


        await driver.get(TestHelper.TEST_PAGE_URL);

        const har = await defaultProxy.getHar();
        var urls = TestHelper.getRequestUrls(har.log.entries);
        
        await driver.close();

        expect(urls.includes(TestHelper.HTTPS_SRC)).to.be.eql(true);
        expect(urls.includes(TestHelper.HTTP_SRC)).to.be.eql(true);
    });
});
