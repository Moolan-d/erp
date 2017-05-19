<template>
	<div class="wrap">
    <div class="tabs">
            <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>基础配置</el-breadcrumb-item>
            <el-breadcrumb-item>分类管理</el-breadcrumb-item>
            <el-breadcrumb-item>创建分类</el-breadcrumb-item>

            </el-breadcrumb>
        </div>
		<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="80px" class="demo-ruleForm">
			<el-form-item label="分类" prop="cats">
				<el-input v-model="ruleForm2.cats"></el-input>
			</el-form-item>
		<div class="submit">
			<el-form-item>
				<el-button type="primary" @click="createcats('ruleForm2',ruleForm2)">提交</el-button>
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
                return callback(new Error('分类名称不能为空'));
            }
            setTimeout(() => {
                callback();
                }, 
                10
            );
        };
        return {
            ruleForm2: {
                cats: ''
            },
            rules2: {
                cats: [{
                    validator: checkAge,
                    trigger: 'blur'
                }]
            }
        };
    },
        
    methods: {
        createcats(formName,ruleForm2) {
            this.$refs[formName].validate((valid) => {
            	let that =this
                if (valid) {
                    let categoryForm = ruleForm2;
                  
                    this.$store.dispatch('createCategory', {
                        categoryForm
                    }).then(
                        that.$message({
                                    message: "订单创建成功",
                                    type: "success"
                                }) 
                    ).then(location.href="#/home/center/categories")
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
        }
    }
};
</script>


<style scoped>
.demo-ruleForm{
    margin: 0
}
.wrap{
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