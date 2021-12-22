![enter image description here](https://camo.githubusercontent.com/c0a4fbab9a1bf5a6269f336564e3dac8807ff96ce0c0f6f14fef83db064f2ce0/68747470733a2f2f63646e2e7261776769742e636f6d2f74656c75736469676974616c2f7464732d636f72652f31363237393931632f67756964652f4c6f676f2e737667)

# Automation Testing Documentation

## [Telus International Digital Solutions](https://www.telusinternational.com/)

Every application needs to be tested, automation testing can improve software quality, productivity, times and increase the scope of testing. These project contains all the elements required to run the regression testing for Intact CAVI application.

Last Update: 07/22/2021

JavaScript: Dynamic computer programming language. By using JavaScript to create test scripts, it is easy to execute automated UI Testing for Applications.

Selenium: Most popularly used freeware and open source automation tool. It also enables record and playback for testing web applications.

# Automation Testing for Intact CAVI application

This file contains the steps to properly and successfully execute the automated regression testing for Intact CAVI application. 

## Pre requisites for testing

1) Access to Intact CAVI application (laboratory ambient): http://portal-dev.tc3.telus.com/
2) A valid username and password is required to access the application.
3) Applications required and installed:
- Git bash
- Java script
- Node js
- Visual Studio Code
- Selenium WebDriver
- Mocha

## Installation

1) Clone the project with Git bash in your selected directory.
2) Run the commands to install Selenium WebDriver and Mocha:
- Selenium: 
```
npm install --save selenium-webdriver chromedriver
```
Make sure you have the correct Selenium driver for the version of google chorme installed on your computer. More information and documentation can be found in: https://www.selenium.dev/downloads/.

- Mocha: 
```
npm install mocha
```

## Steps to execute the tests

1) Run these commands in cmd:

```
chromedriver.exe
curl -XPOST http://localhost:9515/session -d "{\"desiredCapabilities\":{\"browserName\":\"chrome\"}}"
```

2) Copy the session id described in the curl command on the .env file.

3) Commands to run specific modules of testing:
```
npm run brokers-test
npm run group-test
npm run region-test
npm run rules-test
npm run scheduler-test
npm run users-test
```

4) Command to run all the regression testing in one execution:
```
npm run intact-cavi.tes'
```

If you only require to run one specific option, just add the command ".only" after the "it" block.