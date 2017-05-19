<template>
    <div class="prdwrap" v-bind="load" v-loading="datas==''?true:false"
    element-loading-text="拼命加载中">
        <div class="tabs">
            <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品入仓</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item></el-breadcrumb>
        </div>
        <!-- 搜索 -->
        <div style="margin-top: 15px;" class="searchWrap">
            <el-row class="demo-autocomplete">
                <el-col :span="12">
                    <el-autocomplete
                        class="inline-input"
                        
                        :fetch-suggestions="querySearch"
                        placeholder="检索品牌"
                        icon="search"
                       
                         :on-icon-click="handleIconClick"
                        @select="handleSelect">
                            
                    </el-autocomplete>
                </el-col>
            </el-row>   
        </div>
        <ul>
        <!-- 总表 -->
            <li  v-for="item in datas.rows"  v-show="select==''?true:showSelect(item)">
                <div class="tabswrap">
        <!-- 表头 -->
                    <span class="title">
                        <span><el-tag type="gray">商品名</el-tag>
                        ：{{item.name}}</span>
                        <span><el-tag type="gray">分类</el-tag>
                        ：{{item.category.name}}</span>
                        <span ><el-tag type="gray">品牌</el-tag>
                        ：{{item.brand.name}}</span>
                    </span>
                    <el-button class="addsku" @click="sharePrd(item)" ><a href="#/home/center/skus" >添加SKU</a></el-button>
                    <el-button class="addsku" @click="sharePrd(item)"><a href="#/home/product/updateprd">更新商品</a></el-button>          
                </div>
        <!-- sku表 -->
                <el-table :data=" item.skus "  stripe border :default-sort="{prop: 'date', order: 'descending'}"  v-if="datas!=''" border style="width: 100%"  class="tables">
                    <el-table-column prop="goodsNo" label="货号" width="150">
                    </el-table-column>
                    <el-table-column  prop="properties" sortable label="规格" >
                        <template scope="scope" >
                            <span class="propwrap" v-for="item2 in (scope.row.properties.split(','))">
                                <el-tag v-if="item2!='' " close-transition>{{item2}}</el-tag>
                            </span>
                        </template>
                    </el-table-column>
                    
                    <el-table-column  label="单位"  width="150" prop="unit"  >
                    </el-table-column>
                    <el-table-column prop="product.id"  width="1" v-if="false" >
                    </el-table-column> 

                    <el-table-column  fixed="right" label="操作" width="120" class="buttonWrap" >
                        <template scope="scope" >
                            <el-button @click.native.prevent="updatebutton(scope.$index, item.skus)" type="text" size="small">更新</el-button>
                            <a href="#/home/center/intoRepo"><el-button @click.native.prevent="creatIntoRepo(scope.$index, item.skus)" type="text" size="small">入库</el-button></a>
                        </template>
                    </el-table-column>
                </el-table>
            </li>

        </ul>
        <!-- dialog -->
    <el-dialog title="更新SKU" v-model="dialogFormVisible">
        <el-form >

            <el-form-item label="规格" :label-width="formLabelWidth">
                <el-tag :key="tag" v-for="tag in dynamicTags" :closable="true" :close-transition="false" @close="handleClose(tag)">{{tag}}
                </el-tag>
                <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="mini" style="width:100px" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新规格
                </el-button>
            </el-form-item>
            





            <el-form-item label="单位" :label-width="formLabelWidth">
                <el-input  v-model="updateForm.unit" auto-complete="off"></el-input>
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
import {
    mapGetters
} from 'vuex';

export default {
    data() {
            return {
                updateForm: {
                    properties: "",
                    id: "",
                    goodsNo: "",
                    product:"",
                    unit:""
                },
                brandsGroup:[],
                restaurants:'',
                select: '',
                intoRepoForm: {
                    skuId:"",
                    productName:""
                },
                dynamicTags: [],
                inputVisible: false,
                inputValue: '',
                dialogFormVisible: false,

                formLabelWidth: '120px'
            }
        },

        computed: {
            ...mapGetters({
            datas: 'products',
            datas2:'brands'

        }),
            load(){
            let temp  =this.datas2.brands
            this.restaurants = temp
            return this.restaurants
            },
        },

        created() {
            this.$store.dispatch('getProducts')   
            this.$store.dispatch('getBrands')
        },
        mounted() {
    
        },
        methods: {
            formatter(row, column) {
                return row.address;
            },

            sharePrd(item) {
                let prdId = item.id;
                let prdName = item.name;
                let prd = {};
                prd['id'] = prdId;
                prd['name'] = prdName;
                prd['brandId']=item.brand.id;
                prd['categoryId']=item.category.id;
                this.$store.dispatch('sharePrd', {
                    prd
                });

            },
          
            handleClick(e, index) {
                console.log(index);

            },
            handleIconClick(ev) {
                console.log(ev);
            },
            handleSelect(select) {
                this.select=select.value
            },
            //显示选中品牌
            showSelect(item){
                return item.brand.name===this.select
            },

            //唤醒Dilog
            updatebutton(index, rows) {
                let str=rows[index].properties
                str=str.substring(0,str.length-1)
                this.dynamicTags=str.split(',')
                this.updateForm.id = rows[index].id
                this.updateForm.goodsNo = rows[index].goodsNo
                this.updateForm.product=rows[index].product.id
                this.updateForm.unit=rows[index].unit
                this.dialogFormVisible = true

            },
            //更新Sku
            update(updateForm) {
                this.updateForm.properties = this.dynamicTags.join(',')
                this.dialogFormVisible = false
                if (updateForm.properties!="") {
                this.$store.dispatch('updateSku', {
                    updateForm
                })  
                }   

            },
         
            creatIntoRepo(index, rows) {
                this.intoRepoForm.skuId= rows[index].id
                this.intoRepoForm.productName=rows[index].product.name
                this.intoRepoForm.properties = rows[index].properties
                let skuIdForm= this.intoRepoForm
                this.$store.dispatch("shareSku",{ skuIdForm })
                window.location.href="#/home/center/intoRepo"
            },
            //搜索提示
            querySearch(queryString, cbs) {
                var brandsGroup = this.restaurants.rows
                brandsGroup.forEach(function(it,index,array){
                    it['value']=it.name
                })

         
                var results = queryString ? brandsGroup.filter(this.createFilter(queryString)) : brandsGroup;
                 // 调用 callback 返回建议列表的数据
                cbs(results);
            },
            createFilter(queryString) {
                return (res) => {
                return (res.value.indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                    }
                this.inputVisible = false;
                this.inputValue = '';
            }
            
    
    }



}; 
</script>



<style scoped>
li{
    list-style: none;
    margin-bottom: 20px  
}
.prdwrap{
    margin-bottom: 60px;
    background:rgba(0,0,0,0.05);
    border-radius:5px;
    position: relative;
    padding: 2px
}
.tabswrap{
    margin-bottom: 10px 
}
.tabswrap>span>span{
    font-size: 14px ;
    color: #48576a;
    margin-right: 20px
}
.addsku{
    float: right;
   margin: 0 10px;

    padding:0
}
.loadingWrap{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -999;
}
.title{
    width: 70%;
    display: inline-block;
    overflow: hidden;
    border-radius: 3px;
    padding: 0
}
.title > span{
    width: 29%;
    display: inline-block;
    overflow:hidden;
    color: #ddd
}
.addsku:hover{
    cursor: pointer;
    background-color: #ccc
}
.addsku{
    width: 60px;
    padding: 3px;
    box-sizing: border-box;

}
.addsku a{
    font-size: 12px;
    font-family: "幼圆";
    text-align: none;
    text-decoration:none;
    color: #000
}
ul{
    padding: 20px;
    margin: 0
}
.el-loading-mask {  
  top: 20% !important;

}
.buttonWrap{
    text-align: center
}
.propwrap:nth-child(2n+1) > {
    background-color: rgba(20,155,0,0.2);
    color:#666;
}
.propwrap{
    margin-right: 8px

}
.searchWrap{
  margin-left: 20px;
}

</style>




