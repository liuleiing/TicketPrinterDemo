/**
 * Created by 刘磊 on 2017/2/27.
 */
(function () {
    //调用模块
    var app=angular.module("ticketPrinter");
    /**
     * 循环数组，找出数组中相同的值和对应的次数
     */
    app.factory("$getValue",function () {
        function getValue(ary) {
            var datas=[];
            //循环遍历，找出带有‘-’的值
            angular.forEach(ary,function (v) {
                if(v.lastIndexOf("-")!=-1){
                    //获取“-”后面的数字
                    var num=parseFloat(v.substring(v.lastIndexOf("-")+1));
                    var title=v.substr(0,v.lastIndexOf("-"));
                    //将title循环加入到datas中
                    for(var i=0;i<num;i++){
                        datas.push(title);
                    }
                }else{
                    datas.push(v);
                }
            });
            var res = [];
            datas.sort();
            for(var i = 0;i<datas.length;) {
                var count = 0;
                for(var j=i;j<datas.length;j++) {
                    if(datas[i] == datas[j]) {
                        count++;
                    }
                }
                res.push([datas[i],count]);
                i+=count;
            }
            return res;
        }
        return {getValue:getValue};
    });
    //对比商品原始信息和输入的信息，得到新的商品信息
    app.factory("$matchGoodsInfo",function (){
        function matchGoodsInfo(srcInfo,InputInfo) {
            //定义数组
            var newInfo=[];
            angular.forEach(InputInfo,function (v) {
                //输入的条形码
                var barCode=v[0];
                //循环原始的商品信息数组，找到对应的商品   需要优化
                angular.forEach(srcInfo,function (d) {
                    if(barCode==d.barCode){
                        d.goodsNumber=v[1];
                        newInfo.push(d);
                    }
                });
            });
            return newInfo;
        }
        return {matchGoodsInfo:matchGoodsInfo};
    })
})();