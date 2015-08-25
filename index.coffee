module = angular.module('adminr-core',[])

module.provider('ContainerManager',()->
  class ContainerManager
    containerViews: {}
    setViewForContainer:(container,view)->
      @containerViews[container] = view
    unsetViewForContainer:(container)->
      delete @containerViews[container]

    viewForContainer:(container,view)->
      return @containerViews[container]

    $get:()->
      return @

  return new ContainerManager()
)

module.directive('adminrContainer',($templateCache,$compile,ContainerManager)->
  return {
  strict:'A'
  link:($scope,$element,$attrs)->
    container = $scope.$eval($attrs['adminrContainer'])
    view = ContainerManager.viewForContainer(container)
    if not view
      $element.append($compile('<span>view for container \''+container+'\' not set (use ContainerManagerProvider.setViewForContainer(container,view))</span>')($scope))
    else
      $element.append($compile('<span ng-include="\'' + view + '\'"></span>')($scope))
  }
)