var mod = angular.module('adminr-core-test',['adminr-core']);

mod.config(function(AdminrContainerManagerProvider){
    AdminrContainerManagerProvider.setViewForRootContainer('root-view.html')
    AdminrContainerManagerProvider.setViewForContainer('A','view-a.html')
    AdminrContainerManagerProvider.setViewForContainer('B','view-b.html')
})
