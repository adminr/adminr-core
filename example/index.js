var mod = angular.module('adminr-core-test',['adminr-core']);

mod.config(function(ContainerManagerProvider){
    ContainerManagerProvider.setViewForRootContainer('root-view.html')
    ContainerManagerProvider.setViewForContainer('A','view-a.html')
    ContainerManagerProvider.setViewForContainer('B','view-b.html')
})

mod.run(function($templateCache){
    $templateCache.put('root-view.html','layout <select ng-model="view"><option value="">none</option><option value="A">View A</option><option value="B">View B</option></select> <div adminr-container="view" ng-if="view"></div>')
    $templateCache.put('view-a.html','this is view A')
    $templateCache.put('view-b.html','this is view B')
})
