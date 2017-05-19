<template>
    <div class="wrap"  v-loading="datas==''?true:false">
        <div class="tabs">
            <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>基础配置</el-breadcrumb-item>
            <el-breadcrumb-item>分类管理</el-breadcrumb-item>
            <el-breadcrumb-item>分类列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table :data="datas.categories.rows "  highlight-current-row
        @current-change="handleCurrentChange" v-loading="loading" v-if="datas!=''" border style="width: 100%" height="600">
            <el-table-column fixed prop="id" label="分类ID" width="150">
            </el-table-column>
            <el-table-column prop="name" label="分类标签" >
            </el-table-column>
        </el-table>
        <!-- 更新按钮 -->
        <transition name="slide-fade">
            <el-button v-on:click="dialogFormVisible = true"  type="primary" class="update" v-if="updatebutton">更新<i class="el-icon-upload el-icon--right"></i></el-button>
        </transition>
        <!-- 更新Dialog -->
        <el-dialog title="更新分类" v-model="dialogFormVisible">
            <el-form >
                <el-form-item label="分类" :label-width="formLabelWidth">
                    <el-input  v-model="updateForm.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="update(updateForm)">确 定</el-button>
        </div>
        </el-dialog>
    </div>	
</template>


<script>
import { mapGetters } from 'vuex';
export default{
    data(){
    return {
        updateForm:{
          name:"",
          id:""
        },
        dialogFormVisible: false,
        updatebutton:false,
        loading:true,
        formLabelWidth: '120px'
      } 
    },

    computed: mapGetters({
        datas: 'categories',

    }),
  
   created(){
        this.$store.dispatch('getCategories')
         if (this.datas) {
            this.loading=false
        }
    },
    methods: {
        formatter(row, column) {
            return row.address;
        },
        handleCurrentChange(val,updatebutton) {
            this.updatebutton=true
            this.currentRow = val
            this.updateForm.name=val.name
            this.updateForm.id=val.id         
        },
        update(updateForm) {
          this.dialogFormVisible=false
          this.$store.dispatch('updateCatetory',{ updateForm })
        }
    }
};	
</script>
