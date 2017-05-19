<template>
    <ul>
        <el-table class="wrap" :data="datas.users.rows" v-if="datas!=''" border :default-sort="{prop: 'date', order: 'descending'}" style="width: 99%">
            <el-table-column prop="id" label="ID"  sortable width="120"></el-table-column>
            <el-table-column prop="email" label="邮箱"  width="240"></el-table-column>
            <el-table-column prop="displayName" label="描述"></el-table-column>
        </el-table>
    </ul>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    
      computed: mapGetters({
          datas: 'users'
      }),
  
      mounted(){
          this.$store.dispatch('getUsers');
      },
      methods: {
          formatter(row, column) {
              return row.address;
          }
      }
        
  };
</script>

<style lang="">
.wrap{
  border-radius: 5px
}
</style>