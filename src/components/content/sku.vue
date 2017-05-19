<template>
    <div class="skuwrap">

        <!-- <el-button class="back" size="mini"><a href="#/home/product/products">返回</a></el-button> -->

        <div class="tabs">
            <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品入仓</el-breadcrumb-item>
            <el-breadcrumb-item>添加SKU</el-breadcrumb-item></el-breadcrumb>
        </div>




        <el-form 
        :model="skuForm" 
        ref="skuForm" 
        label-width="100px" 
        class="demo-dynamic">

            <el-form-item 
            prop="prdMessage.prdname" 
            label="商品">
                <el-input  :disabled="true" v-model="skuForm.prdMessage.prdname"></el-input>
            </el-form-item>


<!-- 属性 -->            
            <el-form-item 
            
         
            :rules="{
            required: true, message: '域名不能为空', trigger: 'blur'
            }">


            <template scope>
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="" :key="item" v-for="item in skuForm.domains.properties" >
                        <el-input style="width: 100%" v-model="item.key"    class="prdSkuform"    :prop="item.key "  placeholder="属性" :required="true"></el-input>
                      
                    </el-form-item>
                    <el-form-item>
                        <el-button  size="mini" @click="addDomain">+</el-button>
                    </el-form-item>
                </el-form>    
            </template>
                
           
                <el-input  v-model="skuForm.domains.unit"    class="prdSkuform"    :prop="skuForm.domains.unit"  placeholder="单位"></el-input>
                <el-button type="primary" :disabled='false'
            @click=" createSku('skuForm',skuForm)" class="submit">保存</el-button>

            </el-form-item>
             
        </el-form>
       
    </div>
</template>


<script>
import { mapGetters } from 'vuex';
export default{
     data() {
        return {
            skuForm: {
                domains: {
                    properties: [{key:""}],
                    goodsNo: '',
                    price:0,
                    unit:''
                    
                },
                prdMessage:{
                    prdname:"",
                    prdID:''
                }
                
            },
    

        }
    },


    created() {
        var id=this.$store.state.sku.prdMessage.id
        var name=this.$store.state.sku.prdMessage.name
        this.skuForm.prdMessage.prdname=name
      
        this.skuForm.prdMessage.prdID=id

    },
    mounted(){
       

    },
    methods: {
       

        createSku(formName,skuForm) {
            this.$refs[formName].validate((valid) => {
                let that=this
                if (valid) {
                    skuForm.domains["product"]=this.skuForm.prdMessage.prdID

                    let propArr=skuForm.domains.properties
                    var properStr=''
                    var temp =[]
                    propArr.forEach(function(it,index){
                       if (it["key"]) {
                        temp.push(it["key"])
                        properStr = temp.join(',')
                       }
                        
                        
                    })
                    skuForm.domains['properStr']=properStr
                    let skuforms=skuForm.domains
                    if (skuforms.properties==="") {
                        this.$message.error('不能为空')
                    } 
                    else {
                        this.$store.dispatch('createSku', { skuforms })
                        .then(
                            window.location.href="#/home/product/products"
                            )
                     
                    }
                } 
                else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        addDomain() {
            this.skuForm.domains.properties.push({
            key: ''
        });
      }


}}
function ObjtoString(obj) {
            let propArr=[]
            for ( var i in obj){
            propArr.push(obj[i])

            }
            return propArr.join(',')
    }

 

</script>

<style scoped>
  .back{
position: fixed;
top: 70px;
float: left;
}   
  .skuwrap{
    padding: 20px;
    height: 100vh;
    width: 80%;
    overflow:hidden;
  }
  .prdSkuform{
    float: left;
    width: 100%;
    margin: 5px 0
  }
  .submit{
    float: right;
  }
  .demo-dynamic{

  }
  .el-form-item__content{
    width: 100%
  }
</style>