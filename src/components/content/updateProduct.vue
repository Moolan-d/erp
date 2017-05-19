<template>
    <div class="wrap" v-if="datas!=''">
        <div class="tabs">
            <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品入仓</el-breadcrumb-item>
            <el-breadcrumb-item>更新商品</el-breadcrumb-item></el-breadcrumb>
        </div>
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="" class="demo-ruleForm">
            <el-form-item label="更新商品" prop="prdname" label-width="100px" :rules="[
        { required: true, message: '商品名称不能为空'},
        
        ]">
                <el-input v-model="ruleForm2.prdname" class="inpwrap"></el-input>
            </el-form-item>

        <div class="brandwrap" >
        <el-form-item label="选择品牌" label-width="100px" prop="brd"  :rules="[
        { required: true, message: '品牌名称不能为空'},
        
        ]">
            <el-select v-model="ruleForm2.brd" filterable placeholder="选择品牌" >
                <el-option :key="item.id" v-for="item in datas.brands.rows" :label="item.name" :value="item.id"></el-option>
            </el-select>
            </el-form-item>
        </div>

        <div class="catorywrap" v-if="datas2!=''">
        <el-form-item label="选择分类" label-width="100px" prop="cat"  :rules="[
        { required: true, message: '分类名称不能为空'},
        
        ]">
            <el-select v-model="ruleForm2.cat" filterable placeholder="选择分类">
                <el-option :key="item.id" v-for="item in datas2.categories.rows" :label="item.name" :value="item.id"></el-option>
            </el-select>
            </el-form-item>
        </div>

        <el-form-item class="buton">
            <el-button type="primary" @click="updateProduct('ruleForm2',ruleForm2)">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button></el-form-item>
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
        
                callback();
          
            }, 10);
        };


        return {
            ruleForm2: {
                prdname: '',
                prdId:'',
                brd: '',
                cat: ''
            },     
            rules2: {
                brand: [{
                    validator: checkAge,
                    trigger: 'blur'
                }]
            }
        };
    },
    computed: mapGetters({
        datas: 'brands',
        datas2: 'categories'
    }),
  
    created(){

        this.$store.dispatch('getBrands'),
        this.$store.dispatch('getCategories');

       console.log(this.$store.state.sku.prdMessage)
        let id=this.$store.state.sku.prdMessage.id
        let name=this.$store.state.sku.prdMessage.name
        this.ruleForm2.brd=this.$store.state.sku.prdMessage.brandId
        this.ruleForm2.cat=this.$store.state.sku.prdMessage.categoryId
        this.ruleForm2.prdname=name
        this.ruleForm2.prdId=id

    },
    methods: {
        updateProduct(formName,ruleForm2) {
            
            this.$refs[formName].validate((valid) => {
                var that =this
                if (valid) {
                    let updateForm = ruleForm2;
                    this.$store.dispatch('updateProduct',{updateForm}).then(
                                that.$message({
                                    message: "更改成功",
                                    type: "success"
                                })   
                            ).then(window.open("#/home/product/products"))
                    
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        selectBrand(index, datas) {
            let target = datas.brands.rows[index];
            this.ruleForm2.brd = target.id;
            let temp = this.ruleForm2.brd;

        },
        selectCat(index,datas2){
            let target = datas2.categories.rows[index];
            this.ruleForm2.cat = target.id;
            let temp = this.ruleForm2.cat;
            console.log(temp);
        },
        handleCurrentChange(val) {
            this.currentRow = val;
            this.store.dispatch('');
        }
   
    }
};
</script>


<style scoped>

.wrap{
    width: 80%;
}

.select{
  font-size: 14px;
  color: #48576a;
  padding: 11px 12px 11px 0;
}
.buton{
  float: right;
 
}

.brandwrap{
    margin-bottom: 20px;

}

.demo-ruleForm{
    width: 85%
}

</style>