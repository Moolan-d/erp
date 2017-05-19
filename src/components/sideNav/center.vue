<template>
<div class="wrap">
    <div class="left">
        <el-menu   unique-opened class="el-menu-vertical-demo" theme="dark" @open="handleOpen" @close="handleClose" >
            <el-submenu index="1">
                <template slot="title">仓库管理</template>
                 
                    <a href="#/home/center/creatRepo"><el-menu-item index="1-3">创建仓库</el-menu-item></a>

                    <a href="#/home/center/repolist"><el-menu-item index="1-2">仓库列表</el-menu-item></a>
             </el-submenu>
 
        
            <el-submenu index="3">
                <template slot="title">品牌管理</template>
                        <a href="#/home/center/brand"><el-menu-item index="3-1">品牌列表</el-menu-item></a>
                        <a href="#/home/center/createbrand"><el-menu-item index="2-2">创建品牌</el-menu-item></a>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">分类管理</template>
                        <a href="#/home/center/categories"><el-menu-item index="4-3">分类列表</el-menu-item></a>
                        <a href="#/home/center/creatCategory"><el-menu-item index="4-4">创建分类</el-menu-item></a>
            </el-submenu>
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
    name: 'center',
    components: {
 
    },
    computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
    methods: {
        handleOpen(key, keyPath) {
            
        },
        handleClose(key, keyPath) {
           
        }
    }
};
</script>

<style scoped>


a{
 color: #eee;
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
