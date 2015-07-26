/// <reference path="./typings/angularjs/angular.d.ts" />
/// <reference path="./typings/angularjs/angular-route.d.ts" />
var apps;
(function (apps) {
    var MainController = (function () {
        function MainController($scope, $http) {
            var _this = this;
            this.$scope = $scope;
            this.$http = $http;
            $scope.inputText = null;
            $scope.outputText = null;
            $scope.convert = function () { return _this.Convert(); };
        }
        MainController.prototype.Convert = function () {
            var _this = this;
            var data = this.$scope.inputText;
            var result = this.$http.post("/api/values", data);
            result.success(function () { return _this.Callback; });
        };
        MainController.prototype.Callback = function (data, status, headers, config) {
            this.$scope.outputText = data;
        };
        return MainController;
    })();
    apps.MainController = MainController;
    var app = angular.module("app", ["ngRoute"]);
    app.controller("MainController", ["$scope", "$http", MainController]);
})(apps || (apps = {}));
