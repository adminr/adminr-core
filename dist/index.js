(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var module;

module = angular.module('adminr-core', []);

module.provider('AdminrContainerManager', function() {
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

    ContainerManager.prototype.viewForContainer = function(container) {
      if (typeof this.containerViews[container] === 'function') {
        return this.containerViews[container]();
      }
      return this.containerViews[container];
    };

    ContainerManager.prototype.$get = function() {
      return this;
    };

    return ContainerManager;

  })();
  return new ContainerManager();
});

module.directive('adminrContainer', [
  '$templateCache', '$compile', 'AdminrContainerManager', function($templateCache, $compile, AdminrContainerManager) {
    return {
      strict: 'A',
      link: function($scope, $element, $attrs) {
        return $scope.$watch(function() {
          return $scope.$eval($attrs['adminrContainer']);
        }, function(container) {
          var view;
          view = AdminrContainerManager.viewForContainer(container);
          $element.empty();
          if (!view) {
            if (typeof $attrs.optionalContainer === 'undefined') {
              return $element.append($compile('<span>view for container \'' + container + '\' not set (use AdminrContainerManagerProvider.setViewForContainer(container,view))</span>')($scope));
            }
          } else {
            return $element.append($compile('<span ng-include="\'' + view + '\'"></span>')($scope));
          }
        });
      }
    };
  }
]);

module.directive('adminrRootContainer', [
  '$templateCache', '$compile', 'AdminrContainerManager', function($templateCache, $compile, AdminrContainerManager) {
    return {
      strict: 'A',
      link: function($scope, $element, $attrs) {
        var container, view;
        container = 'root';
        view = AdminrContainerManager.viewForContainer(container);
        if (!view) {
          return $element.append($compile('<span>view for container \'' + container + '\' not set (use AdminrContainerManagerProvider.setViewForContainer(container,view))</span>')($scope));
        } else {
          return $element.append($compile('<span ng-include="\'' + view + '\'"></span>')($scope));
        }
      }
    };
  }
]);


},{}]},{},[1]);
