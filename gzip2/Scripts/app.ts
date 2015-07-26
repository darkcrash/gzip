/// <reference path="./typings/angularjs/angular.d.ts" />
/// <reference path="./typings/angularjs/angular-route.d.ts" />


module apps {

    export interface IScopeMain extends ng.IScope {
        inputText: string;
        outputText: string;
        convert();
    }

    export class MainController {

        constructor(private $scope: IScopeMain, private $http: ng.IHttpService) {
            $scope.inputText = null;
            $scope.outputText = null;
            $scope.convert = () => this.Convert();
        }

        public Convert() {
            var data = this.$scope.inputText;

            var result = this.$http.post("/api/values", data);
            result.success(() => this.Callback);
        }

        public Callback(data: string, status: number, headers: ng.IHttpHeadersGetter, config: ng.IRequestConfig) {
            this.$scope.outputText = data;
        }

    }


    var app = angular.module("app", ["ngRoute"]);
    app.controller("MainController", ["$scope", "$http", MainController]);

}