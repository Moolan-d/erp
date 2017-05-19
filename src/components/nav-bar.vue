<template>
    <div class="navbar">
    <div class="right">
        <el-menu theme="dark"  class="el-menu-demo" mode="horizontal" @select="handleSelect">

            <span class="title"> ERP管理系统</span> 
            
            <el-menu-item index="1" class="right-nav"><a href="#/home/delivery">出仓发货</a></el-menu-item> 
            <el-menu-item index="3"><a href="#/home/booking/create">订单管理</a></el-menu-item>
            <el-menu-item index="3"><a href="#/home/product/products">商品入库</a></el-menu-item>
            <el-menu-item index="2"><a href="#/home/product/inrepos">库存管理</a></el-menu-item>
            <el-menu-item index="2"><a href="#/home/center/repolist">基础配置</a></el-menu-item>
            <el-menu-item index="4" class="login"><a href="#/"><i class="el-icon-setting"></i>登录</a></el-menu-item>
            <el-menu-item index="4" class="login"><a href="#/home/workplat/createuser"> 
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yonghu"></use>
                </svg>用户管理</a>
            </el-menu-item>
        </el-menu>
    </div>
    <div class="content"></div>

    <div class="line"></div>
    </div>
</template>


<script>
import center from './sideNav/center.vue'
import workplat from './sideNav/workplat.vue'
import bookingNav from './sideNav/booking.vue'
import deliveryNav from './sideNav/delivery.vue'

export default {
    name: 'navbar',
    components: {
        center,
        workplat,
        bookingNav,
        deliveryNav
    },
    data() {
        return {
          
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            
        }
    }
};
</script>

<style type="text/css">
    .icon {
width: 1em; height: 1em;
vertical-align: -0.15em;
fill: currentColor;
overflow: hidden;
    }
</style>
<style scoped>
html,body{
    width:100%
}
.title{
    float:left;
    display:block;
    line-height:100%;
    margin:20px 0 0 10px;
    position:absolute;
    color:#ccc;
    font-size: 18px;
    font-family: "微软雅黑";
}
.right-nav{
    margin-left:18.5%;
   
}
.navbar  a{
  color:#ccc;
  text-decoration: none;
  font-size: 14px
}
.navbar{
background: #324157;
    height: 60px;
    box-sizing: border-box;

    width: 100%;

}
.right{
 position: fixed;
   z-index: 999;
}
.el-menu-demo{
  background-color:#24292e;
  height: 60px;
  z-index: 999;
  width: 100vw

}
.login{
  float:right
}
.content{
  position: relative;
  z-index: -99

}
</style>
