//
//angular.module('App.services', ['App.mocks', '$http'])
//    .service("cacheService", ['$rootScope', function($rootScope){
//        var self = this;
//        self.cachedItems = {};
//
//        self.getObject = function(key) {
//            if(!self.cachedItems[key]){
//                self.cachedItems[key] = {};
//            }
//            return self.cachedItems[key];
//        };
//
//        self.getArray = function(key) {
//            if(!self.cachedItems[key]){
//                self.cachedItems[key] = [];
//            }
//            return self.cachedItems[key];
//        };
//
//        self.set = function(key, value) {
//            if(!self.cachedItems[key]){
//                self.cachedItems[key] = [];
//            }
//            self.cachedItems[key] = value;
//        };
//
//        $rootScope.$on("cacheRefresh", function(){
//            for(var key in self.cachedItems){
//                if(Array.isArray(self.cachedItems[key])){
//                    self.cachedItems[key] = [];
//                }
//                else{
//                    self.cachedItems[key] = {};
//                }
//            }
//        });
//    }]);