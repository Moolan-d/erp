<template>
        <div class="wrap">
        <div class="left">
             <el-menu 
                default-active="1" 
                @open="handleOpen" 
                @close="handleClose"
                theme="dark">                
                <a href="#/home/booking/list">
                   <el-menu-item index="1-1"> 
                     <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-liebiao1"></use>
                    </svg>
                   订单列表</el-menu-item>
                </a>
                <a href="#/home/booking/create">
                <el-menu-item index="1-2">
                     <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-chuangjian"></use>
                    </svg>
                创建订单</el-menu-item>
                </a>   
            </el-menu>
        </div>
           
            <div class="right-side">
                <transition name="component-fade" mode="out-in">
                    <router-view></router-view>
                 </transition>
            </div>
            
        </div>
            
      
</template>

<script>

export default {
    name: 'bookingCenter',
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
};
</script>

<style scoped>
html,body{
    width: 100%;
    height: 100%
}
a{
    color:#bfcbd9;
 text-decoration: none;
}

.left{
 width: 18%;
 position: fixed;
 top: 60px;
 bottom: 0;
 background-color: #324157
}
.right-side{
  padding: 50px;
  position: relative;
  margin-left: 18%;
  height: 100%
}

.wrap{
overflow-y: auto;
 width: 100%;
 height: 100%;
 position:relative;
}
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-active {
  opacity: 0;
}
</style>


