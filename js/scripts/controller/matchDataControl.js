/**
 * Created by 刘磊 on 2017/2/27.
 */
//得到全局的模型
(function () {
    var app=angular.module("ticketPrinter");
    //商品信息
    var goodsInfo=[{
        "goodsTitle":"可乐",
        "goodsNumber":0,
        "goodsPrice":3.00,
        "goodsType":"1",
        "barCode":"01"
    }
        ,{
        "goodsTitle":"羽毛球",
        "goodsNumber":0,
        "goodsPrice":1.00,
        "goodsType":"1",
        "barCode":"03"
    },{
        "goodsTitle":"苹果",
        "goodsNumber":0,
        "goodsPrice":5.50,
        "goodsType":"3",
        "barCode":"05"
    },{
            "goodsTitle":"香蕉",
            "goodsNumber":0,
            "goodsPrice":5.50,
            "goodsType":"3",
            "barCode":"06"
        }];
    //根据条形码获取对应的商品信息控制器
    app.controller("matchDataControl",["$scope","$http","$q","$getValue","$matchGoodsInfo","$rootScope",function ($scope,$http,$q,$getValue,$matchGoodsInfo,$rootScope) {
        //获取远程(模拟)数据
        $scope.defer = $q.defer();
        $scope.promise = $scope.defer.promise;
        //总价
        $scope.total=0;
        $http.get('./js/json/barCode.json').success(function(data){
            $scope.defer.resolve(data);
        });
        $scope.promise.then(function(data){
            //获取对应的编码和数量
            $scope.value=$getValue.getValue(data);
            $rootScope.newGoodsInfo=$matchGoodsInfo.matchGoodsInfo(goodsInfo,$scope.value);
            //计算总价
            angular.forEach($rootScope.newGoodsInfo,function (v) {
                $scope.total+=v.goodsPrice*v.goodsNumber;
            });

        });
    }]).filter("myFloor",function(){
        //返回一个处理格式化的函数
        return function(input) {
            //input是我们传入的数字
            if (input) {
                return Math.floor(input/2);//返回最终的内容
            }
        }
    });
})();