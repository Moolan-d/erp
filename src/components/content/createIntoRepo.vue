<template>
    <div class="intoRepowrap">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="商品名" prop="skuId">
                <el-input v-model="ruleForm.productName" :disabled="true"></el-input>
            </el-form-item>

        <el-form-item label="属性" prop="properties">
            <el-input v-model="ruleForm.properties" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="商品数量" prop="quantity" :rules="[
        { required: true, message: '数量不能为空'},
        { type: 'number', message: '数量必须为数字值'}
        ]">
            <el-input v-model.number="ruleForm.quantity"></el-input>
        </el-form-item>

        <el-form-item label="单价" prop="unitPrice" :rules="[
        { required: true, message: '价格不能为空'},
        { type: 'number', message: '价格必须为数字值'}
        ]">
            <el-input v-model.number="ruleForm.unitPrice"></el-input>
        </el-form-item>

        <el-form-item label="仓库" prop="repos">
            <el-select v-model="ruleForm.repo" placeholder="请选择">
                <el-option
                v-for="item in ruleForm.repos"
                :label="item.label"
                :value="item.value"
                :key="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="生产批次" required>
            <el-date-picker v-model="ruleForm.batchDate" type="date" placeholder="选择日期">
            </el-date-picker>
        </el-form-item>


        <el-form-item label="入库时间" required>
            <el-date-picker
      v-model="ruleForm.date2"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="createIntoRepo('ruleForm',ruleForm)">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
    export default{
        data(){
            return {
                 ruleForm: {
                  quantity: '',      
                  unitPrice:'',
                  productName:'',
                  properties:'',
                  sku:'',
                  repos:[],
                  repo:'',
                  date1: '',
                  date2: '',
                  batchDate:''         
            },
            rules: {
                repo:[ { required: true, message: '请选择活动区域', trigger: 'change' }],
                sku:[ { required: true, message: '请选择活动区域', trigger: 'change' }],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
              ],
                date2: [
                { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
              ],
                  
            },
                     
        }
    },

    computed: mapGetters({
          datas: 'skumessage',

      }),
    created() {
        var id=this.$store.state.sku.skuMessage.id
        var name=this.$store.state.sku.skuMessage.name
        var properties=this.$store.state.sku.skuMessage.properties
        this.ruleForm.productName=name
        this.ruleForm.sku=id
        this.ruleForm.properties=properties
        this.ruleForm.batchDate=new Date()
        this.ruleForm.date2=new Date()
    },
    mounted(){
        var that = this;
        this.$store.dispatch("filterRepos", {
                fields: "rows {id, name}"
            }).then(res => {
            let repos=that.ruleForm.repos

                for(let repo of res.repos.rows){
                    repos.push({
                        label: repo.name,
                        value: repo.id
                    })
                }
            })
    },
    methods: {
        createIntoRepo(formName,ruleForm) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                   //时间格式化
                    let dealTime=dateFormat(ruleForm.date2)
                    let batch=dateFormat(ruleForm.batchDate)
                    let formData=ruleForm
                    formData['dealTime']=dealTime
                    formData['batch']=batch
                    console.log(formData)
                    this.$store.dispatch('createIntoRepo',{ formData })
                    .then(
                        this.$message({
                                    message: "入库成功",
                                    type: "success"
                                })   
                            ).then(location.href="#/home/product/inrepos")
                    } else
                    {
                        console.log('error submit!!');
                        return false;
                }
            });
      },

  }


}
//时间格式化
function dateFormat(utcDate) {
    let date = new Date(utcDate)
    date= `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}   ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `
    return date
}
</script>


<style>
    
</style>