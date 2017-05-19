<template>
    <div class="newlistWrap"> 
        <div class="tabs">
            <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>基础配置</el-breadcrumb-item>
            <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
            <el-breadcrumb-item>创建仓库</el-breadcrumb-item>

            </el-breadcrumb>
        </div>
        <el-form ref="form" :model="form" label-width="80px"
         >
            <el-form-item label="名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="联系人">
                <el-input v-model="form.contact"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
        <div class="select">
            <el-form-item label="所有者"  class="owner" v-if="datas!=''">
                <el-select v-model="form.keeper" multiple filterable placeholder="选择标签">
                    <el-option :key="item.id" v-for="item in datas.users.rows" :label="item.displayName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
        </div>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            form: {
                name: '',
                address: '',
                keeper:'',
              }
          };
      },
    computed:mapGetters({
          datas: 'users'
        }),
//获取用户
    created(){
        this.$store.dispatch("getUsers")
      },
    methods: {
     
        onSubmit() {
            let keepers=this.form.keeper.toString()
            var repoForm = this.form;
                repoForm["keepers"]=keepers
                
                this.$store.dispatch('createRepo',{repoForm}).then((res)=>{
                        window.location.href="#/home/center/repolist"            
                })
              },


          }
  };
</script>


<style lang="">
.wrap {
  border-radius: 5px
}
.newlistWrap {
  padding: 30px 0 ;
  width: 80%;
/*  height: 100vh;*/
}
</style>
