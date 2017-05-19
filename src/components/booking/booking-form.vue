<template>
    <div class="content-wrap">
        <el-row>
            <el-col :span="18">
                <el-form ref="bookingForm" :rules="rules" :model="form" label-width="100px">
                    <el-form-item label="实付金额" prop="receiptFee">
                        <el-input  v-model="form.receiptFee" step="0.1" type="number" style="width:200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="来源" prop="source">
                        <el-select v-model="form.source" placeholder="来源">
                            <el-option label="淘宝" value="淘宝"></el-option>
                            <el-option label="京东" value="京东"></el-option>
                            <el-option label="freshin" value="freshin"></el-option>
                            <el-option label="其他" value="其他"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="收货人" prop="receiverName">
                        <el-input v-model="form.receiverName"></el-input>
                    </el-form-item>
                    <el-form-item label="收货人电话" prop="receiverPhone">
                        <el-input v-model="form.receiverPhone"></el-input>
                    </el-form-item>
                    <el-form-item label="收货人地址" prop="receiverAddress">
                        <el-input v-model="form.receiverAddress"></el-input>
                    </el-form-item>
                    <el-form-item label="订单备注" prop="memo">
                        <el-input v-model="form.memo"></el-input>
                    </el-form-item>
                    <el-form-item label="购买商品">
                        <el-button 
                            icon="plus"
                            style="margin-bottom:10px;"
                            @click="dialogTableVisible = true"
                        >添加</el-button>
                        <el-table :data="orders" style="width:800px;height:">
                            <el-table-column label="品名" prop="product"></el-table-column>
                            <el-table-column label="属性" prop="properties"></el-table-column>
                            <el-table-column label="实付" prop="receiptFee">
                                <template scope="scope">
                                    <el-input v-model="scope.row.receiptFee" step="0.1" type="number"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="数量" width="">
                                <template scope="scope">
                                    <el-input v-model="scope.row.number" :min="1" step="1" type="number">
                                    </el-input >
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template scope="scope">
                                    <el-button icon="delete" @click="deleteOrder(scope.row)"></el-button>
                                </template>
                            </el-table-column>
                            <div class="line" style="height:2px;width:100%"></div>
                        </el-table>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        
        <el-dialog title="收货地址" v-model="dialogTableVisible">
            <product-list :sku-selection="skuSelection"></product-list>
        </el-dialog>
    </div>
</template>

<script>
import productList from './product-list.vue'
export default {
    components: {
        productList
    },
    data() {
        return {
            orders: [],
            dialogTableVisible: false,
            form: {
                receiptFee: '',
                source: "其他",
                receiverName: '',
                receiverPhone: '',
                receiverAddress: '',
                memo: ''
            },
            rules: {
                receiptFee: [{
                    required: true,
                    message: "请输入实付金额",
                    trigger: 'blur'
                }],
                source: [{
                    required: true,
                    message: "请选择来源",
                    trigger: 'change'
                }],
                receiverName: [{
                    required: true,
                    message: "请输入收货人姓名"
                }],
                receiverPhone: [{
                    required: true,
                    message: "请输入收货人电话"
                }],
                receiverAddress: [{
                    required: true,
                    message: "请输入收货人地址"
                }]
            }
        }
    },
    methods: {
        skuSelection(sku) {
            let order = this.orders.find(function(order) {
                return order.id == sku.id;
            });
            if (!order) {
                this.orders.push(sku);
            } else {
                order.number += 1;
            }
        },
        deleteOrder(row) {
            let index = this.orders.indexOf(row);
            this.orders.splice(index, 1);
        },
        onSubmit() {
            if (!this.orders.length) {
                this.$message({
                    message: "至少选择一个商品",
                    type: 'error'
                });
                return false;
            }
            this.$refs["bookingForm"].validate((valid) => {
                let that = this;
                if (valid) {
                    let orders = this.orders.map(order => {
                        return [order.goodsNo, order.number, order.receiptFee];
                    });
                    this.form.orders = JSON.stringify(orders).replace(/"/g, '\\"');
                    this.$store.dispatch("createBooking", this.form)
                        .then(booking => {
                            that.$message({
                                message: "订单创建成功",
                                type: "success"
                            })
                            location.href = "#/home/booking/list"
                        });
                } else {
                    return false;
                }
            });
        }
    }
}
</script>
<style scoped>
.content-wrap{

    box-sizing: border-box;


}
.line{
    height: 2px;
    width: 100%
}
</style>