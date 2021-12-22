
// Description: Regression testing for Intact CAVI application - User Management Options
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
        let startUrl = 'http://portal-dev.tc3.telus.com/UserManagement';

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

    // it block Test Case 1 Add User Test
    it("Add User Test", async function () {

        // Steps for Test Case 1 Add User Test

        // Press button Add
        await driver.findElement(By.css("button:nth-of-type(2) > span")).click()

        // Enter and select user information
        // Username
        await driver.findElement(By.css("input[name='name']")).sendKeys(testdata.userName)

        // email
        await driver.findElement(By.css("input[name='email']")).sendKeys(testdata.email)

        // Password
        await driver.findElement(By.css("input[name='password']")).sendKeys(testdata.password)

        // ConfirmPassword
        await driver.findElement(By.css("input[name='confirm_password']")).sendKeys(testdata.confirmPassword)

        // Status
        await driver.findElement(By.css(".fields:nth-of-type(3) > .field:nth-of-type(1) .icon")).click()
        await driver.findElement(By.css(".menu.transition.visible > div:nth-of-type(1)")).click()

        // UserRole
        await driver.findElement(By.css("div:nth-of-type(2) > .field > div[role='listbox']")).click()
        await driver.findElement(By.css(".menu.transition.visible > div:nth-of-type(1)")).click()

        // Prses button Save
        await driver.findElement(By.css(".addButton.button.ui")).click()

        // Verification
        await driver.sleep(3000)
        let confirmMessage = await driver.findElement(By.css(".Toastify__toast-container.Toastify__toast-container--top-right  div[role='alert']")).getText()
        //Just wanted to review the confirmation message
        //console.log(confirmMessage);
        assert.strictEqual(confirmMessage, "Added Successfully")

    })

    // it block Test Case 2 Update User Test
    it("Update User Test", async function () {

        // Steps for Test Case 2 Update User Test

        // Select User
        await driver.findElement(By.css("div:nth-of-type(1) > div[role='row'] > div:nth-of-type(5) i[title='Edit']")).click()

        // Enter username
        await driver.findElement(By.css("input[name='name']")).sendKeys(testdata.editUserName)

        // Press button update
        await driver.findElement(By.css(".addButton.button.ui > span")).click()

        // Verification
        await driver.sleep(3000)
        let confirmMessage = await driver.findElement(By.css(".Toastify__toast-container.Toastify__toast-container--top-right  div[role='alert']")).getText()
        assert.strictEqual(confirmMessage, "Updated Successfully")

    })

    //it block Test Case 3 Update User Password Test
    it("Update User Password Test", async function () {

        // Steps for Test Case 3 Update User Password Test

        // Press button Change Password
        await driver.findElement(By.css("button:nth-of-type(3) > span")).click()

        // Select user
        await driver.sleep(1000)
        await driver.findElement(By.css("select[name='UserNamePassword']")).click()
        await driver.findElement(By.css("select[name='UserNamePassword']")).sendKeys(Key.TAB)
        await driver.findElement(By.css("select[name='UserNamePassword']")).sendKeys(Key.ARROW_DOWN)

        // Enter new password
        await driver.findElement(By.id("myInput2")).sendKeys(testdata.newPass)

        // Enter confirm password
        await driver.findElement(By.id("myInput")).sendKeys(testdata.newPassConfirm)

        // // Press button update
        await driver.findElement(By.css(".add.icon")).click()

        // Verification
        await driver.sleep(5000)
        let confirmMessage = await driver.findElement(By.css(".Toastify__toast-container.Toastify__toast-container--top-right  div[role='alert']")).getText()
        assert.strictEqual(confirmMessage, "Updated Successfully")

    })

    //it block Test Case 4 Delete User Test
    it("Delete User Test", async function () {
        // Steps for Test Case 4 Delete User Test

        // Select User
        await driver.sleep(500)
        await driver.findElement(By.css("div:nth-of-type(1) > div[role='row'] > div:nth-of-type(5) i[title='Delete']")).click()

        // Confirm Delete
        await driver.findElement(By.css(".actions > button:nth-of-type(1) > span")).click()

        // Obtain message
        await driver.sleep(3000)
        let confirmMessage = await driver.findElement(By.css(".Toastify__toast-container.Toastify__toast-container--top-right  div[role='alert']")).getText()
        assert.strictEqual(confirmMessage, "Deleted Successfully")

    })
    //it block Test Case 5 Validation Fields User Test
    it("Validation Fields User Test", async function () {

        // Steps for Test Case 5 Validation Fields User Test

        // Press button Add
        await driver.findElement(By.css("button:nth-of-type(2) > span")).click()

        // Press button Save
        await driver.findElement(By.css(".addButton.button.ui > span")).click()

        // Verification
        let userNameVal = await driver.findElement(By.css("div:nth-of-type(1) > div:nth-of-type(1) > .Errorstyle")).getText()
        assert.strictEqual(userNameVal, "Name is not allowed to be empty")

        let emailUserVal = await driver.findElement(By.css("div:nth-of-type(1) > div:nth-of-type(2) > .Errorstyle")).getText()
        assert.strictEqual(emailUserVal, "Email must be a valid email")

        let passwordVal = await driver.findElement(By.css("div:nth-of-type(2) > div:nth-of-type(1) > .Errorstyle")).getText()
        assert.strictEqual(passwordVal, "Required: min 8 chars, 1 uppercase, 1 lowercase, 2 numeric digits, 1 special character and no repetitive characters(3).")

        let statusUserVal = await driver.findElement(By.css("div:nth-of-type(3) > div:nth-of-type(1) > .Errorstyle")).getText()
        assert.strictEqual(statusUserVal, "Status must be a number")

        let userRoleVal = await driver.findElement(By.css("div:nth-of-type(3) > div:nth-of-type(2) > .Errorstyle")).getText()
        assert.strictEqual(userRoleVal, "Role is not allowed to be empty")

        // Cancel
        await driver.findElement(By.css(".button.cancelButton.ui > span")).click()

    })
})