
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
        let startUrl = 'http://portal-dev.tc3.telus.com/CaviReporting';

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
    })

    // it block Test Case 1 Add Scheduler Test
    it("Add Scheduler Test", async function () {

        // Steps for Test Case 1 Add Scheduler Test

        // Press button Add
        await driver.findElement(By.css(".ReactTableHeaderButton.button.floated.right.ui > span")).click()

        // Enter and select scheduler information
        // ScheduleName
        await driver.findElement(By.css("input[name='schedulerName']")).sendKeys(testdata.scheduleName)

        // Status
        await driver.findElement(By.css("div:nth-of-type(2) > .field > div[role='listbox']")).click()
        await driver.findElement(By.css("div:nth-of-type(2) > .field > div[role='listbox']")).sendKeys(Key.TAB)

        // Start Date
        await driver.findElement(By.css("input[name='startDate']")).click()
        await driver.findElement(By.css("input[name='startDate']")).sendKeys(Key.ENTER)

        // Time
        await driver.findElement(By.css(".fields:nth-of-type(4) .selection")).click()

        // email
        await driver.findElement(By.css("textarea[name='email']")).sendKeys(testdata.emailScheduler)

        // Press button Save
        await driver.findElement(By.css(".addButton.button.ui")).click()

        // Verification
        await driver.sleep(3000)
        let confirmMessage = await driver.findElement(By.css(".Toastify__toast-container.Toastify__toast-container--top-right  div[role='alert']")).getText()
        assert.strictEqual(confirmMessage, "Added Successfully")

    })

    // it block Test Case 2 Update Scheduler Test
    it("Update Scheduler Test", async function () {

        // Steps for Test Case 2 Update Scheduler Test

        // Press button Update
        await driver.sleep(500)
        await driver.findElement(By.css("div:nth-of-type(1) > div[role='row'] > div:nth-of-type(11) .edit.icon")).click()

        // Scheduler name
        await driver.findElement(By.css("input[name='schedulerName']")).clear()
        await driver.findElement(By.css("input[name='schedulerName']")).sendKeys(testdata.scheduleNameEdit)

        // Prses button Update
        await driver.findElement(By.css(".addButton.button.ui")).click()

        // Verification
        await driver.sleep(3000)
        let confirmMessage = await driver.findElement(By.css(".Toastify__toast-container.Toastify__toast-container--top-right  div[role='alert']")).getText()
        assert.strictEqual(confirmMessage, "Updated Successfully")
    })

    // it block Test Case 3 Delete Scheduler Test
    it("Delete Scheduler Test", async function () {

        // Steps for Test Case 3 Delete Scheduler Test

        // Press button Delete
        await driver.findElement(By.css("div:nth-of-type(1) > div[role='row'] > div:nth-of-type(11) .alternate.icon.outline.trash")).click()

        // Confirm Delete
        await driver.findElement(By.css(".actions > button:nth-of-type(1)")).click()

        // // Verification
        await driver.sleep(3000)
        let confirmMessage = await driver.findElement(By.css(".Toastify__toast-container.Toastify__toast-container--top-right  div[role='alert']")).getText()
        assert.strictEqual(confirmMessage, "Deleted Successfully")
    })

    // it block Test Case 4 Validation Fields Scheduler Test
    it("Validation Fields (Scheduler) Test", async function () {

        // Steps for Test Case 4 Validation Fields Scheduler Test

        // Press button Add
        await driver.findElement(By.css(".ReactTableHeaderButton.button.floated.right.ui > span")).click()

        // Press button Save
        await driver.findElement(By.css(".addButton.button.ui")).click()

        // // Verification
        let scheduleNameVal = await driver.findElement(By.css("div:nth-of-type(1) > div:nth-of-type(1) > .Errorstyle")).getText()
        assert.strictEqual(scheduleNameVal, "Schedule Name is not allowed to be empty")

        let statusSchedulVal = await driver.findElement(By.css("div:nth-of-type(1) > div:nth-of-type(2) > .Errorstyle")).getText()
        assert.strictEqual(statusSchedulVal, "Status is not allowed to be empty")

        let startDateVal = await driver.findElement(By.css("div:nth-of-type(3) > div:nth-of-type(1) > .Errorstyle")).getText()
        assert.strictEqual(startDateVal, "Start Date is not allowed to be empty")

        let timeVal = await driver.findElement(By.css("div:nth-of-type(4) > div:nth-of-type(1) > .Errorstyle")).getText()
        assert.strictEqual(timeVal, "Time is not allowed to be empty")

        let emailSchedulerVal = await driver.findElement(By.css("div:nth-of-type(4) > div:nth-of-type(2) > .Errorstyle")).getText()
        assert.strictEqual(emailSchedulerVal, "Email is not allowed to be empty")

        // Cancel
        await driver.findElement(By.css(".button.cancelButton.ui > span")).click()
    })
})