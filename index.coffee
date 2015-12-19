module = angular.module('adminr-core',[])

module.provider('ContainerManager',()->
  class ContainerManager
    containerViews: {}
    setViewForRootContainer:(view)->
      @containerViews['root'] = view
    setViewForContainer:(container,view)->
      @containerViews[container] = view
    unsetViewForContainer:(container)->
      delete @containerViews[container]

    viewForContainer:(container)->
      if typeof @containerViews[container] is 'function'
        return @containerViews[container]()
      return @containerViews[container]

    $get:()->
      return @

  return new ContainerManager()
)

module.directive('adminrContainer',($templateCache,$compile,ContainerManager)->
  return {
  strict:'A'
  link:($scope,$element,$attrs)->
    $scope.$watch(()->
      return $scope.$eval($attrs['adminrContainer'])
    ,(container)->
      view = ContainerManager.viewForContainer(container)
      $element.empty()
      if not view
        $element.append($compile('<span>view for container \''+container+'\' not set (use ContainerManagerProvider.setViewForContainer(container,view))</span>')($scope))
      else
        $element.append($compile('<span ng-include="\'' + view + '\'"></span>')($scope))
    )
  }
)

module.directive('adminrRootContainer',($templateCache,$compile,ContainerManager)->
  return {
  strict:'A'
  link:($scope,$element,$attrs)->
    container = 'root'
    view = ContainerManager.viewForContainer(container)
    if not view
      $element.append($compile('<span>view for container \''+container+'\' not set (use ContainerManagerProvider.setViewForContainer(container,view))</span>')($scope))
    else
      $element.append($compile('<span ng-include="\'' + view + '\'"></span>')($scope))
  }
)