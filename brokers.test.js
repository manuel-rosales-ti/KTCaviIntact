
// Description: Regression testing for Intact CAVI application - Broker Management Options

const { Builder, By, Key, WebDriver } = require('selenium-webdriver');
const _http = require('selenium-webdriver/http');
const testdata = require('./testdata.json');
const assert = require("assert")

// Steps before run test:
// Run cmd in the root folder (project) the next command: chromedriver.exe command.
// Run cmd in the root folder (project) the next command: curl -XPOST http://localhost:9515/session -d "{\"desiredCapabilities\":{\"browserName\":\"chrome\"}}"
// Open existing instance (copy and paste the sessionid obtained form curl command in the testdata.json file)

// describe
describe("Regression Testing for Intact CAVI Application, Broker Management Options.", function () {

    // it block Test Case 1 Add Broker Test / TC3 Broker
    it("Add Broker Test / TC3 Broker", async function () {

        // Initialize webdriver in already opened browser
        let sessionId = testdata.sessionIdqa;
        let url = 'http://localhost:9515/';
        let browser = 'chrome';
        let startUrl = 'http://portal-dev.tc3.telus.com/CaviPortal';

        // Connect to existing session
        let driver = await new WebDriver(
            sessionId,
            new _http.Executor(Promise.resolve(url)
                .then(
                    url => new _http.HttpClient(url, null, null))
            )
        );

        // Trying to open URL. If does not work - we need to re-create a session
        await driver.get(startUrl).catch(async r => {
            console.log('Session "' + sessionId + '" not found. Creating new session.');
            driver = await new Builder()
                .usingServer(url)
                .forBrowser(browser)
                .build();
            driver.getSession().then(function (e) {
                console.log('Session: ' + JSON.stringify(e, null, 2));
            });
            driver.get(startUrl);
        });

        // Select Broker Option
        await driver.findElement(By.css(".RRT__tabs > div:nth-of-type(2)")).click()

        // Steps for Test Case 1 Add Broker Test / TC3 Broker

        // Press button Add
        await driver.sleep(500)
        await driver.findElement(By.css("button:nth-of-type(2) > span")).click()

        // Enter and select broker information
        // BrokerName
        await driver.findElement(By.css("input[name='brokerName']")).sendKeys(testdata.brokerName1)

        // FrenchWeight
        await driver.findElement(By.css("input[name='frenchWt']")).sendKeys(testdata.frenchWeight1)

        // EnglishWeight
        await driver.findElement(By.css("input[name='engWt']")).sendKeys(testdata.englishWeight1)

        // Status
        await driver.findElement(By.css(".fields:nth-of-type(3) > .field:nth-of-type(1) .selection")).click()
        await driver.findElement(By.css(".fields:nth-of-type(3) > .field:nth-of-type(1) .selection")).sendKeys(Key.TAB)

        // Connect
        await driver.findElement(By.css("div:nth-of-type(2) > .field > div[role='listbox']")).click()
        await driver.findElement(By.css("div:nth-of-type(2) > .field > div[role='listbox']")).sendKeys(Key.TAB)

        // Type of broker
        await driver.findElement(By.id("virage")).click()

        // Queue ID
        await driver.findElement(By.css("input[name='PqID']")).sendKeys(testdata.queueId)

        // Prses button Save
        await driver.findElement(By.css(".addButton.button.ui > span")).click()

        // Verification
        await driver.sleep(3000)
        let confirmMessage = await driver.findElement(By.css(".Toastify__toast-container.Toastify__toast-container--top-right  div[role='alert']")).getText()
        assert.strictEqual(confirmMessage, "Added Successfully")
    })

    // it block Test Case 2 Add Broker Test / External Broker
    it("Add Broker Test / External Broker", async function () {

        // Initialize webdriver in already opened browser
        let sessionId = testdata.sessionIdqa;
        let url = 'http://localhost:9515/';
        let browser = 'chrome';
        let startUrl = 'http://portal-dev.tc3.telus.com/CaviPortal';

        // Connect to existing session
        let driver = await new WebDriver(
            sessionId,
            new _http.Executor(Promise.resolve(url)
                .then(
                    url => new _http.HttpClient(url, null, null))
            )
        );

        // Trying to open URL. If does not work - we need to re-create a session
        await driver.get(startUrl).catch(async r => {
            console.log('Session "' + sessionId + '" not found. Creating new session.');
            driver = await new Builder()
                .usingServer(url)
                .forBrowser(browser)
                .build();
            driver.getSession().then(function (e) {
                console.log('Session: ' + JSON.stringify(e, null, 2));
            });
            driver.get(startUrl);
        });

        // Select Broker Option
        await driver.findElement(By.css(".RRT__tabs > div:nth-of-type(2)")).click()

        // Steps for Test Case 2 Add Broker Test / TC3 Broker

        // Press button Add
        await driver.findElement(By.css("button:nth-of-type(2) > span")).click()

        // Enter and select broker information
        // BrokerName
        await driver.findElement(By.css("input[name='brokerName']")).sendKeys(testdata.brokerName2)

        // FrenchWeight
        await driver.findElement(By.css("input[name='frenchWt']")).sendKeys(testdata.frenchWeight2)

        // EnglishWeight
        await driver.findElement(By.css("input[name='engWt']")).sendKeys(testdata.englishWeight2)

        // Status
        await driver.findElement(By.css(".fields:nth-of-type(3) > .field:nth-of-type(1) .selection")).click()
        await driver.findElement(By.css(".fields:nth-of-type(3) > .field:nth-of-type(1) .selection")).sendKeys(Key.TAB)

        // Connect
        await driver.findElement(By.css("div:nth-of-type(2) > .field > div[role='listbox']")).click()
        await driver.findElement(By.css("div:nth-of-type(2) > .field > div[role='listbox']")).sendKeys(Key.TAB)

        // Type of broker
        await driver.findElement(By.id("non-virage")).click()

        // email
        await driver.findElement(By.css("input[name='email']")).sendKeys(testdata.emailBroker)

        // password
        await driver.findElement(By.css("input[name='password']")).sendKeys(testdata.passwordBroker)

        // confirm password
        await driver.findElement(By.css("input[name='confirm_password']")).sendKeys(testdata.confirmPasswordBroker)

        // phone number
        await driver.findElement(By.css("input[name='phoneNumber']")).sendKeys(testdata.phoneNumber)

        // xml
        await driver.findElement(By.css("input[name='businessHours']")).sendKeys(testdata.xml)

        // Prses button Save
        await driver.findElement(By.css(".addButton.button.ui > span")).click()

        // Verification
        await driver.sleep(3000)
        let confirmMessage = await driver.findElement(By.css(".Toastify__toast-container.Toastify__toast-container--top-right  div[role='alert']")).getText()
        assert.strictEqual(confirmMessage, "Added Successfully")
    })

    // it block Test Case 3 Update Broker Test
    it("Update Broker Test", async function () {

        // Initialize webdriver in already opened browser
        let sessionId = testdata.sessionIdqa;
        let url = 'http://localhost:9515/';
        let browser = 'chrome';
        let startUrl = 'http://portal-dev.tc3.telus.com/CaviPortal';

        // Connect to existing session
        let driver = await new WebDriver(
            sessionId,
            new _http.Executor(Promise.resolve(url)
                .then(
                    url => new _http.HttpClient(url, null, null))
            )
        );

        // Trying to open URL. If does not work - we need to re-create a session
        await driver.get(startUrl).catch(async r => {
            console.log('Session "' + sessionId + '" not found. Creating new session.');
            driver = await new Builder()
                .usingServer(url)
                .forBrowser(browser)
                .build();
            driver.getSession().then(function (e) {
                console.log('Session: ' + JSON.stringify(e, null, 2));
            });
            driver.get(startUrl);
        });

        // Select Broker Option
        await driver.findElement(By.css(".RRT__tabs > div:nth-of-type(2)")).click()

        // Steps for Test Case 3 Update Broker Test

        // Press button Update
        await driver.sleep(500)
        await driver.findElement(By.css("div:nth-of-type(1) > div[role='row'] > div:nth-of-type(10) i[title='Edit']")).click()

        // Edit broker name
        await driver.findElement(By.css("input[name='brokerName']")).clear()
        await driver.findElement(By.css("input[name='brokerName']")).sendKeys(testdata.brokerName3)

        // Prses button Update
        await driver.findElement(By.css(".addButton.button.ui > span")).click()

        // Obtain Message confirmation
        await driver.sleep(3000)
        let confirmMessage = await driver.findElement(By.css(".Toastify__toast-container.Toastify__toast-container--top-right  div[role='alert']")).getText()
        assert.strictEqual(confirmMessage, "Updated Successfully")

    })

    // it block Test Case 4 Delete Broker Test
    it("Delete Broker Test", async function () {

        // Initialize webdriver in already opened browser
        // Open existing instance (copy and paste the sessionid obtained form curl command in the testdata.json file)
        let sessionId = testdata.sessionIdqa;
        let url = 'http://localhost:9515/';
        let browser = 'chrome';
        let startUrl = 'http://portal-dev.tc3.telus.com/CaviPortal';

        // Connect to existing session
        let driver = await new WebDriver(
            sessionId,
            new _http.Executor(Promise.resolve(url)
                .then(
                    url => new _http.HttpClient(url, null, null))
            )
        );

        // Trying to open URL. If does not work - we need to re-create a session
        await driver.get(startUrl).catch(async r => {
            console.log('Session "' + sessionId + '" not found. Creating new session.');
            driver = await new Builder()
                .usingServer(url)
                .forBrowser(browser)
                .build();
            driver.getSession().then(function (e) {
                console.log('Session: ' + JSON.stringify(e, null, 2));
            });
            driver.get(startUrl);
        });

        // Select Broker Option
        await driver.findElement(By.css(".RRT__tabs > div:nth-of-type(2)")).click()

        // Steps for Test Case 4 Delete Broker Test

        // Press button Delete
        await driver.findElement(By.css("div:nth-of-type(1) > div[role='row'] > div:nth-of-type(10) i[title='Delete']")).click()

        // Confirm Delete
        await driver.findElement(By.css(".actions > button:nth-of-type(1)")).click()

        // Verification
        await driver.sleep(3000)
        let confirmMessage = await driver.findElement(By.css(".Toastify__toast-container.Toastify__toast-container--top-right  div[role='alert']")).getText()
        assert.strictEqual(confirmMessage, "Deleted Successfully")
    })

    // it block Test Case 5 Validation Fields Test
    it("Validation Fields (Brokers) Test", async function () {

        // Initialize webdriver in already opened browser
        // Open existing instance (copy and paste the sessionid obtained form curl command in the testdata.json file)
        let sessionId = testdata.sessionIdqa;
        let url = 'http://localhost:9515/';
        let browser = 'chrome';
        let startUrl = 'http://portal-dev.tc3.telus.com/CaviPortal';

        // Connect to existing session
        let driver = await new WebDriver(
            sessionId,
            new _http.Executor(Promise.resolve(url)
                .then(
                    url => new _http.HttpClient(url, null, null))
            )
        );

        // Trying to open URL. If does not work - we need to re-create a session
        await driver.get(startUrl).catch(async r => {
            console.log('Session "' + sessionId + '" not found. Creating new session.');
            driver = await new Builder()
                .usingServer(url)
                .forBrowser(browser)
                .build();
            driver.getSession().then(function (e) {
                console.log('Session: ' + JSON.stringify(e, null, 2));
            });
            driver.get(startUrl);
        });

        // Select Broker Option
        await driver.findElement(By.css(".RRT__tabs > div:nth-of-type(2)")).click()

        // Steps for Test Case 5 Delete Broker Test

        // Press button Add Broker
        await driver.findElement(By.css("button:nth-of-type(2) > span")).click()

        // Press button Save
        await driver.findElement(By.css(".addButton.button.ui > span")).click()

        // Verification
        let brokerNameVal = await driver.findElement(By.css("div:nth-of-type(1) > div:nth-of-type(1) > .Errorstyle")).getText()
        assert.strictEqual(brokerNameVal, "BrokerName is not allowed to be empty")

        let frenchWeightVal = await driver.findElement(By.css("div:nth-of-type(1) > div:nth-of-type(2) > .Errorstyle")).getText()
        assert.strictEqual(frenchWeightVal, "FrenchWt must be a number")

        let englishWeightVal = await driver.findElement(By.css("div:nth-of-type(2) > div:nth-of-type(1) > .Errorstyle")).getText()
        assert.strictEqual(englishWeightVal, "EngWt must be a number")

        let statusVal = await driver.findElement(By.css("div:nth-of-type(3) > div:nth-of-type(1) > .Errorstyle")).getText()
        assert.strictEqual(statusVal, "Status is not allowed to be empty")

        let connectVal = await driver.findElement(By.css("div:nth-of-type(3) > div:nth-of-type(2) > .Errorstyle")).getText()
        assert.strictEqual(connectVal, "Connect is not allowed to be empty")

        let brokerTypeVal = await driver.findElement(By.css(".form.ui > .Errorstyle")).getText()
        assert.strictEqual(brokerTypeVal, "BrokerType is not allowed to be empty")

        // Press cancel
        await driver.findElement(By.css(".button.cancelButton.ui > span")).click()
    })

})