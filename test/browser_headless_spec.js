
'use strict';

const chai = require('chai');
const expect = chai.expect;

const BrowserMob = require('browsermob-proxy-client');
const webdriver = require('selenium-webdriver');
const selProxy = require('selenium-webdriver/proxy');
const firefox = require('selenium-webdriver/firefox');
const chrome = require('selenium-webdriver/chrome');
const TestHelper = require('../test/module/testHelper')

var defaultProxy;

const screen = {
    width: 640,
    height: 480
  };

describe('Browser - Headless', function () {

    beforeEach(async () => {
        defaultProxy = BrowserMob.createClient();
        await defaultProxy.start();
    });

    afterEach(async () => {
        await defaultProxy.closeProxies();
        await defaultProxy.end();
    });


    it("Headless - Chrome", async () => {
        var urls = await SetupHeadlessTest('chrome');

        expect(urls.includes(TestHelper.HTTPS_SRC)).to.be.eql(true);
        expect(urls.includes(TestHelper.HTTP_SRC)).to.be.eql(true);
    });

    it("Headless - Firefox", async () => {
        var urls = await SetupHeadlessTest('firefox');

        expect(urls.includes(TestHelper.HTTPS_SRC)).to.be.eql(true);
        expect(urls.includes(TestHelper.HTTP_SRC)).to.be.eql(true);

    });

    async function SetupHeadlessTest(browserName) {
        await defaultProxy.createHar();

        let driver = new webdriver.Builder()
            .withCapabilities(TestHelper.getCapabilities(browserName))
            .setChromeOptions(new chrome.Options().headless().windowSize(screen))
            .setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
            .setProxy(selProxy.manual(TestHelper.getManualProxy(defaultProxy.proxy.port)))
            .build();


        await driver.get(TestHelper.TEST_PAGE_URL);

        const har = await defaultProxy.getHar();

        var urls = TestHelper.getRequestUrls(har.log.entries);

        await driver.close();

        return urls;
    };
    
});
