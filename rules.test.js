
// Description: Regression testing for Intact CAVI application - Rule Management Options

const { Builder, By, Key, WebDriver } = require('selenium-webdriver');
const _http = require('selenium-webdriver/http');
const testdata = require('./testdata.json');
const assert = require ("assert")

// Steps before run test:
// Run cmd in the root folder (project) the next command: chromedriver.exe command.
// Run cmd in the root folder (project) the next command: curl -XPOST http://localhost:9515/session -d "{\"desiredCapabilities\":{\"browserName\":\"chrome\"}}"
// Open existing instance (copy and paste the sessionid obtained form curl command in the testdata.json file)

// describe
describe("Regression Testing for Intact CAVI Application, Rule Management Options.", function () {

    // it block Test Case 1 Add Rule Test
    it("Add Rule Test", async function () {

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

        // Steps for Test Case 1 Add Rule Test

        // Select Rule Management options
        await driver.findElement(By.id("tab-0")).click()

        // Press button Add Rule
        await driver.findElement(By.css(".ReactTableHeaderButton.button.floated.right.ui > span")).click()

        // Enter Rule Name
        await driver.findElement(By.css("input[name='ruleName']")).sendKeys(testdata.ruleName)

        // Select Rule Type
        await driver.findElement(By.css("div:nth-of-type(1) > div:nth-of-type(2) > .field > div[role='listbox']")).sendKeys(Key.TAB)

        // Select RVI Model
        await driver.sleep(500)
        await driver.findElement(By.css(".fields:nth-of-type(2) > .field:nth-of-type(1) .selection")).sendKeys(Key.TAB)

        // Select Route Point
        await driver.sleep(500)
        await driver.findElement(By.css("div:nth-of-type(2) > div:nth-of-type(2) > .field > div[role='listbox']")).click()
        await driver.findElement(By.css("div:nth-of-type(2) > div:nth-of-type(2) > .field > div[role='listbox']")).sendKeys(Key.TAB)
        await driver.findElement(By.css("div:nth-of-type(2) > div:nth-of-type(2) > .field > div[role='listbox']")).sendKeys(Key.ARROW_DOWN)


        // Enter Priority
        await driver.findElement(By.css("input[name='priorityNo']")).sendKeys(testdata.priority)

        // Select Status
        await driver.findElement(By.css("div:nth-of-type(3) > div:nth-of-type(2) > .field > div[role='listbox']")).sendKeys(Key.TAB)
        //await driver.findElement(By.css(".menu.transition.visible > div:nth-of-type(1)")).click()

        // Enter Rule Content
        await driver.findElement(By.css("textarea[label='Content']")).sendKeys(testdata.ruleContent)

        // Save rule
        await driver.findElement(By.css(".add.icon")).click()

        // Verification
        await driver.sleep(3000)
        var confirmMessage = await driver.findElement(By.css(".Toastify__toast-container.Toastify__toast-container--top-right  div[role='alert']")).getText()
        assert.strictEqual(confirmMessage,"Added Successfully")
    })

    // it block Test Case 2 Update Rule Test
    it("Update Rule Test", async function () {

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

        // Steps for Test Case 2 Update Rule Test

        // Select Rule Management options
        await driver.findElement(By.id("tab-0")).click()

        // Press button Update Rule
        await driver.sleep(500)
        await driver.findElement(By.css("div:nth-of-type(1) > div[role='row'] > div:nth-of-type(9) i[title='Edit']")).click()

        // Enter Rule Name
        await driver.sleep(500)
        await driver.findElement(By.css("input[name='ruleName']")).clear()
        await driver.findElement(By.css("input[name='ruleName']")).sendKeys(testdata.updateRuleName)

        // Save rule
        await driver.findElement(By.css(".addButton.button.ui > span")).click()

        // Verification
        await driver.sleep(3000)
        let confirmMessage = await driver.findElement(By.css(".Toastify__toast-container.Toastify__toast-container--top-right  div[role='alert']")).getText()
        assert.strictEqual(confirmMessage,"Updated Successfully")
    })

    // it block Test Case 3 Delete Rule Test
    it("Delete Rule Test", async function () {

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

        // Steps for Test Case 3 Delete Rule Test

        // Select Rule Management options
        await driver.findElement(By.id("tab-0")).click()

        // Press button Delete Rule
        await driver.sleep(500)
        await driver.findElement(By.css("div:nth-of-type(1) > div[role='row'] > div:nth-of-type(9) i[title='Delete']")).click()

        // Confirm Delete
        //await driver.sleep(500)
        await driver.findElement(By.css(".actions > button:nth-of-type(1)")).click()

        // Verification
        await driver.sleep(3000)
        let confirmMessage = await driver.findElement(By.css(".Toastify__toast-container.Toastify__toast-container--top-right  div[role='alert']")).getText()
        assert.strictEqual(confirmMessage,"Deleted Successfully")
    })

// it block Test Case 4 Validation Fields Rule Test
it("Validation Fields (Rule) Test", async function () {

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

    // Steps for Test Case 4 Validation Fields Rule Test

    // Select Rule Management options
    await driver.findElement(By.id("tab-0")).click()

    // Press button Add Rule
    await driver.findElement(By.css(".ReactTableHeaderButton.button.floated.right.ui > span")).click()

    // Press button Save
    await driver.findElement(By.css(".add.icon")).click()

    // Verification
    let ruleNameVal = await driver.findElement(By.css("div:nth-of-type(1) > div:nth-of-type(1) > .Errorstyle")).getText()
    assert.strictEqual(ruleNameVal,"RuleName is not allowed to be empty")

    let ruleTypeVal = await driver.findElement(By.css("div:nth-of-type(1) > div:nth-of-type(2) > .Errorstyle")).getText()
    assert.strictEqual(ruleTypeVal,"RuleType is not allowed to be empty")

    let rviModelVal = await driver.findElement(By.css("div:nth-of-type(2) > div:nth-of-type(1) > .Errorstyle")).getText()
    assert.strictEqual(rviModelVal,"RviModel is not allowed to be empty")

    let routePointVal = await driver.findElement(By.css("div:nth-of-type(2) > div:nth-of-type(2) > .Errorstyle")).getText()
    assert.strictEqual(routePointVal,"RoutePoint is not allowed to be empty")

    let priorityVal = await driver.findElement(By.css("div:nth-of-type(3) > div:nth-of-type(1) > .Errorstyle")).getText()
    assert.strictEqual(priorityVal,"PriorityNo must be a number")

    let statusVal = await driver.findElement(By.css("div:nth-of-type(3) > div:nth-of-type(2) > .Errorstyle")).getText()
    assert.strictEqual(statusVal,"Status is not allowed to be empty")

    let ruleContentVal = await driver.findElement(By.css(".form.ui > .field > .Errorstyle")).getText()
    assert.strictEqual(ruleContentVal,"Content is not allowed to be empty")

    // Press Cancel
    await driver.findElement(By.css(".button.cancelButton.ui > span")).click()

})

})