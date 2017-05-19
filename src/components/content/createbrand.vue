<template>

    <div class="branwrap">
        <div class="tabs">
            <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>基础配置</el-breadcrumb-item>
            <el-breadcrumb-item>品牌管理</el-breadcrumb-item>
            <el-breadcrumb-item>创建品牌</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="80px" class="demo-ruleForm">
            <el-form-item label="品牌" prop="brand" >
                <el-input v-model="ruleForm2.brand"></el-input>
            </el-form-item>
        <div class="submit">
            <el-form-item>
                <el-button type="primary" @click="createBrand('ruleForm2',ruleForm2)">提交</el-button>
            </el-form-item>
        </div>
          
        </el-form>
          


        
    </div>

</template>

<script>
import { mapGetters } from 'vuex';

export default {

    data() {
        var checkAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('商品名称不能为空'));
            }
            setTimeout(() => {
                callback()                
                }, 
                10
            )
        };
        return {

            ruleForm2: {
                brand: ''
            },
            dialogVisible: false,
            fullscreenLoading: false,
            rules2: {
                brand: [{
                    validator: checkAge,
                    trigger: 'blur'
                }]
            }
        };
    },
        
    methods: {
        createBrand(formName,ruleForm2) {
            this.$refs[formName].validate((valid) => {
                let that = this
                if (valid) {
                    let newbrand = ruleForm2;
                    console.log(newbrand);
                    this.$store.dispatch('createbrand', {
                        newbrand
                    }).then(
                        that.$message({
                            message: "订单创建成功",
                            type: "success"
                        })
                    ).then(location.href = "#/home/center/brand")
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleCurrentChange(val) {
            this.currentRow = val;
            this.store.dispatch('');
        },
        openFullScreen() {

            this.fullscreenLoading = true;
            setTimeout(() => {
                this.fullscreenLoading = false;
        }, 3000);
      }
    }
};
</script>


<style scoped>
.branwrap{
     position: relative;
     width: 95%;
     margin-top: 30px;
    }
.submit{
    position: absolute;
    right: 25%;
    top: 0
}
</style>