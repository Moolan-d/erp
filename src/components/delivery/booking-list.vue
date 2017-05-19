<template>
    <div class="content-wrap">
        <el-table :data="result.rows">
            <el-table-column label="下单时间" prop="booking.createdAt" width="200"></el-table-column>
            <el-table-column label="提交人">
                <template scope="scope">
                    <template v-if="scope.row.booking.owner">
                       {{ scope.row.booking.owner.displayName }}
                    </template>
                    <template v-else>
                        系统
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="实付" width="100">
                <template scope="scope">
                    ￥{{scope.row.booking.receiptFee.toFixed(2)}}
                </template>
            </el-table-column>
            <el-table-column label="来源" prop="booking.source"></el-table-column>
            <el-table-column label="收货人" prop="booking.receiverName" width="100"></el-table-column>
            <el-table-column label="收货人电话" prop="booking.receiverPhone" width="150"></el-table-column>
            <el-table-column label="收货人地址" prop="booking.receiverAddress" width="300"></el-table-column>
            <el-table-column label="交易号" prop="booking.tradeNumber" width="200"></el-table-column>
            <el-table-column label="外部交易号" prop="booking.outTradeNumber" width="200"></el-table-column>
            <el-table-column label="备注" prop="booking.memo" width="200"></el-table-column>            
            <el-table-column fixed="right" label="操作" width="180">
                <template scope="scope">
                    <el-button  type="text" size="small" @click="deliveryHandler(scope.row)">发货</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog v-if="currentRow" title="订单发货" v-model="showDeliveryDialog">
            <el-row>
                <el-col :span="4"><div class="grid-content">下单时间</div></el-col>
                <el-col :span="16"><div class="grid-content">{{ currentRow.booking.createdAt }}</div></el-col>
            </el-row>
            <el-row>
                <el-col :span="4"><div class="grid-content">交易号</div></el-col>
                <el-col :span="16">
                    <div class="grid-content">{{ currentRow.booking.tradeNumber }}</div>
                </el-col>
            </el-row>
            <template v-if="currentRow.booking.outTradeNumber">
                <el-row>
                    <el-col :span="4"><div class="grid-content">外部交易号</div></el-col>
                    <el-col :span="16">
                        <div class="grid-content">{{ currentRow.booking.outTradeNumber }}</div>
                    </el-col>
                </el-row>
            </template>
            <el-row>
                <el-col :span="4"><div class="grid-content">提交人</div></el-col>
                <el-col :span="16">
                    <div class="grid-content">{{ currentRow.booking.owner.displayName }}</div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4"><div class="grid-content">来源</div></el-col>
                <el-col :span="16">
                    <div class="grid-content">{{ currentRow.booking.source }}</div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4"><div class="grid-content">收货人</div></el-col>
                <el-col :span="16">
                    <div class="grid-content">{{ currentRow.booking.receiverName }}</div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4"><div class="grid-content">收货人电话</div></el-col>
                <el-col :span="16">
                    <div class="grid-content">{{ currentRow.booking.receiverPhone }}</div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4"><div class="grid-content">收货人地址</div></el-col>
                <el-col :span="16">
                    <div class="grid-content">{{ currentRow.booking.receiverAddress }}</div>
                </el-col>
            </el-row>
            <template v-if="currentRow.booking.memo">
            <el-row>
                <el-col :span="4"><div class="grid-content">备注</div></el-col>
                <el-col :span="16">
                    <div class="grid-content">{{ currentRow.booking.memo }}</div>
                </el-col>
            </el-row>
            </template>

            <el-table :data="currentRow.outRepos" style="margin-top:15px;">
                <el-table-column label="商品名称" prop="order.sku.product.name">
                </el-table-column>
                <el-table-column label="属性" prop="order.sku.properties">
                </el-table-column>
                <el-table-column label="数量">
                    <template scope="scope">
                        {{scope.row.quantity}} / {{scope.row.order.sku.unit}}
                    </template>
                </el-table-column>
            </el-table>

            <h4>快递信息</h4>
            <el-form ref="shipForm" :model="shipForm" label-width="100px">
                <el-form-item 
                    label="快递名称"
                    prop="name"
                    :rules="[{ required: true, message: '快递名称不能为空'}]"
                >
                    <el-input style="width: 200px;" v-model="shipForm.name"></el-input>
                </el-form-item>
                <el-form-item 
                    label="快递单号"
                    prop="number"
                    :rules="[{ required: true, message: '快递单号不能为空'}]"
                >
                    <el-input v-model="shipForm.number"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="showDeliveryDialog = false">取 消</el-button>
                <el-button type="primary" @click="shipHandler">发货</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
    export default {
        watch: {
            '$route': 'fetchData'
        },
        data() {
            return {
                result: {},
                showDeliveryDialog: false,
                currentRow: null,
                shipForm: {
                    name: "",
                    number: ""
                }
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            shipHandler() {
                let that = this;
                this.$refs["shipForm"].validate((valid) => {
                    if (!valid) {
                        return false
                    }
                    let outRepos = this.currentRow.outRepos.map(outRepo => {
                        return String(outRepo.id);
                    }).join(",");
                    this.$store.dispatch("shipBooking", {
                        data: {
                            name: this.shipForm.name,
                            number: this.shipForm.number,
                            outRepos: outRepos,
                            booking: this.currentRow.booking.id
                        },
                        fields: "id,status"
                    }).then(res => {
                        let indexRow = that.result.rows.find(row => {
                            return row.booking.id == res.booking.id
                        });
                        let index = that.result.rows.indexOf(indexRow);
                        that.result.rows.splice(index);
                    });
                });
            },
            deliveryHandler(row) {
                let that = this;
                this.showDeliveryDialog = true;
                this.$store.dispatch("filterOutRepos", {
                    fields: `
                        rows {
                            id,
                            quantity,
                            intoRepo {
                                id
                            },
                            order {
                                sku {
                                    unit,
                                    properties,
                                    product {
                                        name
                                    }
                                }
                            }
                        }
                    `,
                    filters: {
                        repoId: this.$route.query.repo,
                        bookingId: row.booking.id
                    }
                }).then(res => {
                    that.currentRow = {
                        booking: row.booking,
                        outRepos: res.outRepos.rows
                    }
                })
            },
            fetchData() {
                let that = this;
                let repoId = this.$route.query.repo;
                if (!repoId) return;
                this.$store.dispatch("filterOutRepos", {
                    fields: `
                        rows {
                            id,
                            repo {
                                name,
                                id
                            },
                            booking {
                                id,
                                tradeNumber,
                                receiptFee,
                                source,
                                receiverName,
                                receiverAddress,
                                receiverPhone,
                                memo,
                                owner {
                                    displayName
                                },
                                tradeNumber,
                                outTradeNumber,
                                createdAt
                            }
                        }
                    `,
                    filters: {
                        repoId: repoId,
                        status: "100"
                    },
                    group: ["bookingId"]
                }).then(res => {
                    that.result = res.outRepos;
                })
            }
        }
    }
</script>