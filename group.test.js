
// Description: Regression testing for Intact CAVI application - Group Management Options

const { Builder, By, Key, WebDriver } = require('selenium-webdriver');
const _http = require('selenium-webdriver/http');
const testdata = require('./testdata.json');
const assert = require("assert")

// Steps before run test:
// Run cmd in the root folder (project) the next command: chromedriver.exe command.
// Run cmd in the root folder (project) the next command: curl -XPOST http://localhost:9515/session -d "{\"desiredCapabilities\":{\"browserName\":\"chrome\"}}"

// describe
describe("Regression Testing for Intact CAVI Application, Group Management Options.", function () {

    // it block Test Case 1 Add Group Test
    it("Add Group Test", async function () {

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

        // Select Group Option
        await driver.findElement(By.css(".RRT__tabs > div:nth-of-type(3)")).click()

        // Steps for Test Case 1 Add Group Test

        // Press button Add
        await driver.findElement(By.css(".ReactTableHeaderButton.button.floated.right.ui > span")).click()

        // Enter and select group information
        // GroupName
        await driver.findElement(By.css(".input.ui > input[name='groupName']")).sendKeys(testdata.groupName)

        // AvailableBrokers
        await driver.sleep(1000)
        await driver.findElement(By.css("div[role='list'] > div:nth-of-type(1)")).click()
        await driver.findElement(By.css(".angle.double.icon.right")).click()

        // Prses button Save
        await driver.findElement(By.css(".addButton.button.ui > span")).click()

        // // Verification
        await driver.sleep(3000)
        let confirmMessage = await driver.findElement(By.css(".Toastify__toast-container.Toastify__toast-container--top-right  div[role='alert']")).getText()
        assert.strictEqual(confirmMessage, "Added Successfully")

    })

    // it block Test Case 2 Update Group Test
    it("Update Group Test", async function () {

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

        // Select Group Option
        await driver.findElement(By.css(".RRT__tabs > div:nth-of-type(3)")).click()

        // Steps for Test Case 2 Update Group Test

        // Press button Update
        await driver.findElement(By.css("div:nth-of-type(1) > div[role='row'] > div:nth-of-type(4) i[title='Edit']")).click()

        // GroupName
        await driver.findElement(By.css(".input.ui > input[name='groupName']")).clear()
        await driver.findElement(By.css(".input.ui > input[name='groupName']")).sendKeys(testdata.groupNameEdit)

        // Prses button Update
        await driver.findElement(By.css(".addButton.button.ui > span")).click()

        // // Verification
        await driver.sleep(3000)
        let confirmMessage = await driver.findElement(By.css(".Toastify__toast-container.Toastify__toast-container--top-right  div[role='alert']")).getText()
        assert.strictEqual(confirmMessage, "Updated Successfully")
    })

    // it block Test Case 3 Delete Group Test
    it("Delete Group Test", async function () {

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

        // Select Group Option
        await driver.findElement(By.css(".RRT__tabs > div:nth-of-type(3)")).click()

        // Steps for Test Case 2 Update Group Test

        // Press button Delete
        await driver.findElement(By.css("div:nth-of-type(1) > div[role='row'] > div:nth-of-type(4) i[title='Delete']")).click()

        // Confirm Delete
        await driver.findElement(By.css(".actions > button:nth-of-type(1)")).click()

        // // Verification
        await driver.sleep(3000)
        let confirmMessage = await driver.findElement(By.css(".Toastify__toast-container.Toastify__toast-container--top-right  div[role='alert']")).getText()
        assert.strictEqual(confirmMessage, "Deleted Successfully")
    })

    // it block Test Case 4 Validation Fields Test
    it("Validation Fields (Groups) Test", async function () {

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

        // Select Group Option
        await driver.findElement(By.css(".RRT__tabs > div:nth-of-type(3)")).click()

        // Steps for Test Case 4 Validation Fields Groups Test

        // Press button Delete
        await driver.findElement(By.css(".ReactTableHeaderButton.button.floated.right.ui > span")).click()

        // Press button Save
        await driver.findElement(By.css(".addButton.button.ui")).click()

        // // Verification
        let groupNameVal = await driver.findElement(By.css(".Errorstyle")).getText()
        assert.strictEqual(groupNameVal, "GroupName is not allowed to be empty")

        // Press Cancel
        await driver.findElement(By.css(".button.cancelButton.ui > span")).click()
    })
})