
// Description: Regression testing for Intact CAVI application - Region Management Options
require('dotenv').config()
const { Builder, By, Key, WebDriver } = require('selenium-webdriver');
const _http = require('selenium-webdriver/http');
const {testdata} = require('./testdata.js');
const assert = require("assert")

// Steps before run test:
// 1) Run in cmd the next commands: 
//chromedriver.exe command.
//curl -XPOST http://localhost:9515/session -d "{\"desiredCapabilities\":{\"browserName\":\"chrome\"}}"
// 2) Copy the session id described in the curl command on the .env file.

// describe
describe("Regression Testing for Intact CAVI Application, Broker Management Options.", function () {

    let driver;

    // Steps before all tests are executed
    before(async () => {
        // Initialize webdriver in already opened browser
        let sessionId = testdata.sessionIdqa;
        let url = 'http://localhost:9515/';
        let browser = 'chrome';
        let startUrl = 'http://portal-dev.tc3.telus.com/CaviPortal';

        // Connect to existing session
        driver = await new WebDriver(
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

        // Select Region Option
        await driver.findElement(By.css(".RRT__tabs > div:nth-of-type(4)")).click()

    })

    // it block Test Case 1 Add Region Test
    it("Add Region Test", async function () {

        // Steps for Test Case 1 Add Region Test

        // Press button Add
        await driver.findElement(By.css(".ReactTableHeaderButton.button.floated.right.ui > span")).click()

        // Enter and select region information
        // RegionName
        await driver.findElement(By.css(".input.ui > input[name='regionName']")).sendKeys(testdata.regionName)

        // NPANXX
        await driver.findElement(By.css("textarea[name='areaCode']")).sendKeys(testdata.npanxx)

        // AvailableBrokers
        await driver.sleep(500)
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
    it("Update Region Test", async function () {

        // Steps for Test Case 2 Update Region Test

        // Press button Update
        await driver.findElement(By.css("div:nth-of-type(1) > div[role='row'] > div:nth-of-type(5) i[title='Edit']")).click()

        // GroupName
        await driver.sleep(1000)
        await driver.findElement(By.css(".input.ui > input[name='regionName']")).clear()
        await driver.findElement(By.css(".input.ui > input[name='regionName']")).sendKeys(testdata.regionNameEdit)

        // Prses button Update
        await driver.findElement(By.css(".addButton.button.ui")).click()

        // // Verification
        await driver.sleep(3000)
        let confirmMessage = await driver.findElement(By.css(".Toastify__toast-container.Toastify__toast-container--top-right  div[role='alert']")).getText()
        assert.strictEqual(confirmMessage, "Updated Successfully")
    })

    // it block Test Case 3 Delete Region Test
    it("Delete Region Test", async function () {

        // Steps for Test Case 3 Delete Region Test

        // Press button Delete
        await driver.findElement(By.css("div:nth-of-type(1) > div[role='row'] > div:nth-of-type(5) i[title='Delete']")).click()

        // Confirm Delete
        await driver.findElement(By.css(".delete.icon")).click()

        // // Verification
        await driver.sleep(3000)
        let confirmMessage = await driver.findElement(By.css(".Toastify__toast-container.Toastify__toast-container--top-right  div[role='alert']")).getText()
        assert.strictEqual(confirmMessage, "Deleted Successfully")
    })

    // it block Test Case 4 Validation Fields (Region) Test
    it("Validation Fields (Region) Test", async function () {

        // Steps for Test Case 4 Validation Fields Test

        // Select Region Option
        await driver.findElement(By.css(".RRT__tabs > div:nth-of-type(4)")).click()

        // Steps for Validation Fields Region Test

        // Press button Add
        await driver.findElement(By.css(".ReactTableHeaderButton.button.floated.right.ui > span")).click()

        // Press button Save
        await driver.findElement(By.css(".addButton.button.ui")).click()

        // // Verification
        let regionNameVal = await driver.findElement(By.css("div:nth-of-type(1) > .column > .Errorstyle")).getText()
        assert.strictEqual(regionNameVal, "RegionName is not allowed to be empty")

        let npanxxVal = await driver.findElement(By.css("div:nth-of-type(2) > .column > .Errorstyle")).getText()
        assert.strictEqual(npanxxVal, "AreaCode is not allowed to be empty")

        // Press Cancel
        await driver.findElement(By.css(".button.cancelButton.ui")).click()
    })
})