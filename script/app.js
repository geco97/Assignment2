(function () {
    'use strict';
    var shoppingList1 = [
        {
          name: "Milk",
          quantity: "10"
        },
        {
          name: "Donuts",
          quantity: "20"
        },
        {
          name: "Cookies",
          quantity: "30"
        },
        {
          name: "Chocolate",
          quantity: "25"
        },
        {
          name: "Peanut Butter",
          quantity: "35"
        },
        {
          name: "Pepto Bismol",
          quantity: "45"
        },
        {
          name: "Pepto Bismol (Chocolate flavor)",
          quantity: "51"
        },
        {
          name: "Pepto Bismol (Cookie flavor)",
          quantity: "52"
        }     
      ]; 
      var shoppingList2 = [];
      angular.module('ShoppingListCheckOff', [])
      .controller('ToBuyController', ToBuyController)
      .controller('AlreadyBoughtController', AlreadyBoughtController)
      .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
      
      // LIST #1 - controller
      ToBuyController.$inject = ['ShoppingListCheckOffService'];
      function ToBuyController(ShoppingListCheckOffService) {
        var list = this;
        list.items = ShoppingListCheckOffService.getItems();
        list.itemName = "";
        list.itemQuantity = "";

        list.boughtItem = function (itemIndex) {
         try {
            ShoppingListCheckOffService.addItem(itemIndex);
            ShoppingListCheckOffService.removeItem(itemIndex);
         } catch (error) {
        list.errorMessage = error.message;
         }
     };

       
       }
      
      
      // LIST #2 - controller
      AlreadyBoughtController.$inject = ['$scope'];
      function AlreadyBoughtController($scope) {
        $scope.shoppingList2 = shoppingList2;   
      }
    
 

function ShoppingListCheckOffService() {
    var service = this;
    // List of shopping items
    var items = shoppingList1;
    var maxItems = items.length;
    
    var items2 = shoppingList2;

    service.addItem = function (itemIndex) {
      
        var item = {
          name: items[itemIndex].name,
          quantity: items[itemIndex].quantity
        };
        items2.push(item);
     
      
    };
  
    service.removeItem = function (itemIndex) {
      items.splice(itemIndex, 1);
      if (items.length === 0) {
        throw new Error("Everything is bought!.");
      }
    };
  
    service.getItems = function () {
      return items;
    };
  }
   
      
    
    })();
    