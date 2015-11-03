(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var module;

module = angular.module('adminr-core', []);

module.provider('ContainerManager', function() {
  var ContainerManager;
  ContainerManager = (function() {
    function ContainerManager() {}

    ContainerManager.prototype.containerViews = {};

    ContainerManager.prototype.setViewForRootContainer = function(view) {
      return this.containerViews['root'] = view;
    };

    ContainerManager.prototype.setViewForContainer = function(container, view) {
      return this.containerViews[container] = view;
    };

    ContainerManager.prototype.unsetViewForContainer = function(container) {
      return delete this.containerViews[container];
    };

    ContainerManager.prototype.viewForContainer = function(container, view) {
      return this.containerViews[container];
    };

    ContainerManager.prototype.$get = function() {
      return this;
    };

    return ContainerManager;

  })();
  return new ContainerManager();
});

module.directive('adminrContainer', ["$templateCache", "$compile", "ContainerManager", function($templateCache, $compile, ContainerManager) {
  return {
    strict: 'A',
    link: function($scope, $element, $attrs) {
      return $scope.$watch(function() {
        return $attrs['adminrContainer'];
      }, function() {
        var container, view;
        container = $scope.$eval($attrs['adminrContainer']);
        view = ContainerManager.viewForContainer(container);
        if (!view) {
          return $element.append($compile('<span>view for container \'' + container + '\' not set (use ContainerManagerProvider.setViewForContainer(container,view))</span>')($scope));
        } else {
          return $element.append($compile('<span ng-include="\'' + view + '\'"></span>')($scope));
        }
      });
    }
  };
}]);

module.directive('adminrRootContainer', ["$templateCache", "$compile", "ContainerManager", function($templateCache, $compile, ContainerManager) {
  return {
    strict: 'A',
    link: function($scope, $element, $attrs) {
      var container, view;
      container = 'root';
      view = ContainerManager.viewForContainer(container);
      if (!view) {
        return $element.append($compile('<span>view for container \'' + container + '\' not set (use ContainerManagerProvider.setViewForContainer(container,view))</span>')($scope));
      } else {
        return $element.append($compile('<span ng-include="\'' + view + '\'"></span>')($scope));
      }
    }
  };
}]);


},{}]},{},[1]);
