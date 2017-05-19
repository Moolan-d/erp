<template>

    <div class="wrap">
        <div class="left">
            <el-menu theme="dark" default-active="activeIndex"   class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" >
                 <a href="#/home/workplat/allusers"><el-menu-item index="3">
                   用户列表
                </el-menu-item></a> 
                <a href="#/home/workplat/createuser"><el-menu-item index="2">
                    创建用户</el-menu-item></a>
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
    name: 'order',
    components: {
        activeIndex: '',
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
            this.activeIndex=keyPath
        }
    }
};
</script>
<style>
a{
 color:#bfcbd9;
 text-decoration: none;
 width: 100%;
 height: 100%
}

</style>
<style scoped>
html,body{
    width: 100%;
    height: 100%
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
