
angular.module('App.services')
    .service('alertService', function () {
        var self = this;

        self.alerts = [];

        self.add = function (type, msg) {
            return self.alerts.push({
                type: type,
                msg: msg
            });
        };

        self.closeAlert = function (index) {
            self.alerts.splice(index, 1);
        };

        self.clear = function () {
            self.alerts = [];
        };

        self.get = function () {
            return self.alerts;
        };

        return self;
    });