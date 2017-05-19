<template>
    <div class="wrap" v-loading="datas==''?true:false">
    <div class="tabs">
            <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>基础配置</el-breadcrumb-item>
            <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
            <el-breadcrumb-item>仓库列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table stripe v-loading="loading" class="wrap2" :data="repoList" border :default-sort="{prop: 'date', order: 'descending'}" style="width: 99%" height="450">
            <el-table-column prop="name" label="名称" width="100" sortable></el-table-column>
          
            <el-table-column prop="address" width="300" sortable label="地址"></el-table-column>
            <el-table-column prop="contact" sortable width="100" label="联系人"></el-table-column>
            <el-table-column prop="phone" sortable label="联系方式"></el-table-column>
            <el-table-column label="仓管员">
                <template scope="scope">
                    <span v-for="keeper in scope.row.keepers" style="margin-right: 5px;">
                        <el-tag type="gray">{{ keeper.displayName }}</el-tag>
                    </span>
                </template>
            </el-table-column>
            <el-table-column  fixed="right" label="操作" width="100" class="buttonWrap" >
                <template scope="scope">
                    <el-button @click.native.prevent="updatebutton(scope.$index, repoList)"  size="small">更新</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="更新仓库" v-model="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="仓库名" >
                    <el-input  v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="地址" >
                    <el-input  v-model="form.address" auto-complete="off"></el-input>
                </el-form-item>
                 <el-form-item label="联系人" >
                    <el-input  v-model="form.contact" auto-complete="off"></el-input>
                </el-form-item>
                 <el-form-item label="联系电话" >
                    <el-input  v-model="form.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="ID"  style="display:none">
                    <el-input v-model="form.id" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="仓管员" class="owner" >
                    <el-select v-if="editRepo" v-model="form.keepers" multiple placeholder="选择仓管员">
                        <el-option
                            :key="item.id"
                            v-for="item in datas.users.rows" 
                            :label="item.displayName" 
                            :value="item.id">
                            </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
      
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="onSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
    
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    data(){
        return {
             repoList:[],
             dialogFormVisible:false,
             formLabelWidth:120,
             form:{
                name:"",
                address:"",
                phone:"",
                contact:"",
                keepers: [],
                id:""
             },
             editRepo: null,
             editIndex: null,
             loading:true
        }
       
    },
    computed: mapGetters({
        repos: 'repos',
        datas: 'users'
    }),
  
    created(){
        var that =this
        this.$store.dispatch('filterRepos',{ fields: `
            rows {
                id, 
                name,
                address,
                contact,
                phone,
                keepers {
                    id,
                    displayName
                }
            }
        `}).then(res=>{
            that.repoList = res.repos.rows;
        }).then(()=>{ 
            if (this.repos) {
              this.loading=false
            }
        });
           
        this.$store.dispatch("getUsers")
      },
    methods: {
        formatter(row, column) {

            return row.address;
        },
        updatebutton(index,rows) {

            this.dialogFormVisible=true;
            let form = this.form

            form.name = rows[index].name;
            form.address = rows[index].address;
            form.id = rows[index].id;
            form.phone = rows[index].phone;
            form.contact = rows[index].contact;
            form.keepers = rows[index].keepers.map((keeper) => {
                return keeper.id;
            });
            this.editIndex = index;
            this.editRepo = rows[index];
        },
        onSubmit() {

            let updateForm= this.form;
            updateForm.keepers = updateForm.keepers.join(",");
            let that = this;
            this.$store.dispatch('updateRepo',{
                data: updateForm,
                fields: `
                    id,
                    name,
                    address,
                    phone,
                    contact,
                    keepers {
                        id,
                        displayName
                    }
                `
            }).then((res)=>{
                that.dialogFormVisible = false;
                that.$message({
                    message: "仓库更新成功",
                    type: "success"
                });
                that.$set(that.repoList, that.editIndex, res.repo);
            });
        }
      }
        
  };
</script>



