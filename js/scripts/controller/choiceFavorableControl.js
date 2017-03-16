/**
 * Created by 刘磊 on 2017/2/27.
 */
//得到全局的模型
(function () {
    var app=angular.module("ticketPrinter");
    app.controller("choiceFavorableControl",["$scope","$rootScope",function ($scope,$rootScope) {
        $scope.getTicket=function () {
            $rootScope.favorable=$scope.favorable1;
            //节省
            $rootScope.save=0;
            // 定义数组存放优惠1的商品
            $rootScope.GoodsList1=[];
            //定义数组存放优惠2的商品
            $rootScope.GoodsList2=[];
            //买2送1活动商品不为空
            if($scope.favorable1){
                //循环newGoodsInfo将它的值拷贝到新的对象中
                angular.forEach($rootScope.newGoodsInfo,function (v) {
                    var obj=new Object();
                    angular.forEach(v,function (key,name) {
                        obj[name]=key;
                    })
                    $rootScope.GoodsList1.push(obj);
                });
                //循环GoodsList1，计算优惠商品的数量
                angular.forEach($rootScope.GoodsList1,function (v) {
                    if(v.goodsType==$scope.favorable1){
                        v.goodsNumber=v.goodsNumber-Math.floor(v.goodsNumber/2);
                    }
                })
                //计算节省
                angular.forEach($rootScope.GoodsList1,function (v) {
                    if(v.goodsType==$scope.favorable1){
                        $rootScope.save+=v.goodsPrice*Math.floor(v.goodsNumber/2);
                    }
                });
            }
            //95折
            if($scope.favorable2){
                angular.forEach($rootScope.newGoodsInfo,function (v,i) {
                    if(v.goodsType==$scope.favorable2){
                        $rootScope.GoodsList2.push($rootScope.newGoodsInfo[i]);
                    }
                });
                //计算节省
                angular.forEach($rootScope.GoodsList2,function (v) {
                    $rootScope.save+=v.goodsPrice*v.goodsNumber*0.05;
                });
            }

        }
    }])
})();