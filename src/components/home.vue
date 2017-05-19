<template>
  <div class="home">
    <navbar class="tops"></navbar>
        <div class="content">
            <transition name="move" mode="out-in">
                <router-view></router-view>
            </transition>   
        </div>
  </div>
</template>

<script>
import navbar from './nav-bar.vue';
export default {
    name: 'home',
    components: {
        navbar,
    },
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        };
    }
};
</script>


<style scoped>
a{
  text-decoration: none;
  color: #ccc
}
.home{
position: relative;
height: 100%;
}
.content{
position: absolute;
top: 60px;
width: 100%;
height: 100%;
overflow: auto;
}
</style>
