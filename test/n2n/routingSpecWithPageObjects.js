/* global browser, describe, it, expect */
// The Page Objects are ideally in separate files
// to allow for reuse across all the tests,
// but here are listed together for ease of understanding

function ShoppingListPage() {
  'use strict';

  this.open = function() {
    var width = 800;
    var height = 600;
    browser.driver.manage().window().setSize(width, height);

// browser.driver.manage().window().maximize();

//    var x = 150;
//    var y = 100;
//    browser.driver.manage().window().setPosition(x, y);

    browser.get('/');
    browser.waitForAngular();
  };

    this.itemInput = element(by.model('item'));
    this.qtyInput = element(by.model('qty'));
    this.typeInput = element(by.model('item'));
    this.addButton = element(by.partialButtonText(' Add'));

  this.getTypeListRows = function() {
    return element.all(by.repeater('type in types'));
  };

    this.getItemListRows = function() {
        return element.all(by.repeater('item in items'));
    };

    this.getLastItem = function() {
        return element.all(by.repeater('item in items')).last();
        // .find('div').first().find('label').getText()
    };


    this.getItemForRow = function(row) {
        return element(
            by.repeater('item in items')
                .row(row).column('item.item'));
    };


    this.getRankForRow = function(row) {
    return element(
      by.repeater('team in teamListCtrl.teams')
        .row(row).column('team.rank'));
  };

  this.getNameForRow = function(row) {
    return element(
      by.repeater('team in teamListCtrl.teams')
        .row(row).column('team.name'));
  };

  this.isLoginLinkVisible = function() {
    return element(by.css('.login-link')).isDisplayed();
  };

  this.isLogoutLinkVisible = function() {
    return element(by.css('.logout-link')).isDisplayed();
  };
}

describe('Routing Test With Page objects', function() {
  'use strict';

  it('should show teams on the first page', function() {
    var teamsListPage = new ShoppingListPage();
    teamsListPage.open();
    var itemsCount = teamsListPage.getItemListRows().count();
    var last;
    var label;

    teamsListPage.itemInput.sendKeys('Tomaten');
    teamsListPage.qtyInput.sendKeys('2');

    //teamsListPage.addButton.click();
//    last = teamsListPage.getLastItem().then(function(last){
//
//         last.element(by.css('.itemName label')).then(function(label){
//             console.log(label.getId());
//         });
//
//    });


      expect(teamsListPage.getItemForRow(0).getText()).toEqual('Kartoffeln');

    //expect(last.find('div').first().find('label').getText());

    //expect(teamsListPage.getTypeListRows().count()).toEqual(itemsCount);

//    expect(teamsListPage.getRankForRow(0).getText()).toEqual('1');
//
//    expect(teamsListPage.getNameForRow(0).getText()).toEqual('Spain');
//
//    expect(teamsListPage.getRankForRow(4).getText()).toEqual('5');
//
//    expect(teamsListPage.getNameForRow(4).getText()).toEqual('Uruguay');

  });


//
//  it('should add a item to the item list', function () {
//      var teamsListPage = new ShoppingListPage();
//      teamsListPage.open();
//
//      var items = teamsListPage.getItemListRows().count();
//
//      teamsListPage.itemInput.sendKeys('Ketchup');
//      teamsListPage.qtyInput.sendKeys('2');
//
//      element(by.partialButtonText(' Add')).click();
//
//      expect(teamsListPage.getItemListRows().count()).toBeGreaterThan(items);
//
//  });


//
//  it('should remove a item from the list', function () {
//        var teamsListPage = new ShoppingListPage();
//        teamsListPage.open();
//
//        var itemsCount = teamsListPage.getItemListRows().count();
//
//        var lastItem = teamsListPage.getItemListRows().last();
//
//        lastItem.click();
//
//
//        teamsListPage.itemInput.sendKeys('Tomaten');
//        teamsListPage.qtyInput.sendKeys('aa');
//
//
//
//        element(by.partialButtonText(' Add')).click();
//
//       expect(teamsListPage.getItemListRows().count()).not.toBeGreaterThan(itemsCount);
//
//    });
//

//
//  it('should clear item and qty inputs fields', function(){
//        var teamsListPage = new ShoppingListPage();
//        teamsListPage.open();
//
//        var itemsCount = teamsListPage.getItemListRows().count();
//
//        teamsListPage.itemInput.sendKeys('Mayonnaise');
//        teamsListPage.qtyInput.sendKeys('6');
//        var addButton = element(by.partialButtonText(' Add'));
//
//        element(by.partialButtonText(' Clear Entry')).click();
//
//       // expect(addButton.isDisabled()).tobe(true);
//
//        expect(teamsListPage.getItemListRows().count()).toEqual(itemsCount);
//
//    });

    
});

























