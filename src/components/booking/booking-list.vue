<template>
    <div class="content-wrap">
        <el-tabs type="border-card" active-name="#100" @tab-click="tabClick">
            <el-tab-pane label="等待审核" name="#100"></el-tab-pane>
            <el-tab-pane label="等待配仓" name="#101"></el-tab-pane>
            <el-tab-pane label="配仓完成" name="#102"></el-tab-pane>
            <el-tab-pane label="已发货" name="#103"></el-tab-pane>
            <el-tab-pane label="问题订单" name="#99"></el-tab-pane>
        </el-tabs>
        <el-table :data="bookings.rows">
            <el-table-column type="expand" class="extend">
                <template scope="props">
                    <el-table :data="props.row.orders" :show-header=false>
                        <el-table-column type="index"></el-table-column>
                        <el-table-column prop="sku.goodsNo" label="货号" width="200"></el-table-column>
                        <el-table-column prop="sku.product.name" label="商品" width="200"></el-table-column>
                        <el-table-column prop="sku.properties" label="属性" width="200"></el-table-column>
                        <el-table-column label="货号" width="200">
                            <template scope="scope">
                                x {{scope.row.quantity}}
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column label="下单时间" prop="createdAt" width="200"></el-table-column>
            <el-table-column label="提交人">
                <template scope="scope">
                    <template v-if="scope.row.owner">
                       {{ scope.row.owner.displayName }}
                    </template>
                    <template v-else>
                        系统
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="实付" width="100">
                <template scope="scope">
                    ￥{{scope.row.receiptFee.toFixed(2)}}
                </template>
            </el-table-column>
            <el-table-column label="来源" prop="source"></el-table-column>
            <el-table-column label="收货人" prop="receiverName" width="100"></el-table-column>
            <el-table-column label="收货人电话" prop="receiverPhone" width="150"></el-table-column>
            <el-table-column label="收货人地址" prop="receiverAddress" width="300"></el-table-column>
            <el-table-column label="交易号" prop="tradeNumber" width="200"></el-table-column>
            <el-table-column label="外部交易号" prop="outTradeNumber" width="200"></el-table-column>
            <el-table-column label="备注" prop="memo" width="200"></el-table-column>            
            <el-table-column fixed="right" label="操作" width="180">
                <template scope="scope">
                    <template v-if="scope.row.status == '100'">
                        <el-button  type="text" size="small" @click="statusHandler('101', scope.row)">可以出库</el-button>
                        <el-button  type="text" size="small" @click="statusHandler('99', scope.row)">不能出库</el-button>
                    </template>
                    <template v-if="scope.row.status == '101'">
                        <el-button
                            type="text" 
                            size="small"
                            @click="outRepoHandler(scope.row)"
                        >订单配仓</el-button>
                    </template>
                    <template v-if="scope.row.status == '102'">
                        <el-button  type="text" size="small" @click="showOutRepoHandler(scope.row)">配仓信息</el-button>
                    </template>
                    <template v-if="scope.row.status == '103'">
                        <el-button  type="text" size="small" @click="showShipInfoHandler(scope.row)">查看发货信息</el-button>
                    </template>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog v-if="selectedBooking" title="订单出库" v-model="showOrdersDialog">
            <el-table :data="selectedBooking.orders">
                <el-table-column property="sku.product.name" label="商品名" width="150"></el-table-column>
                <el-table-column property="sku.properties" label="属性" width="200"></el-table-column>
                <el-table-column label="数量">
                    <template scope="scope">
                        x {{scope.row.quantity}}
                    </template>
                </el-table-column>
                <el-table-column label="出仓批次">
                    <template scope="scope">
                        <el-button type="text" @click="chooseIntoRepo(scope.row)">
                            <template v-if="scope.row.intoRepo">
                                {{ scope.row.intoRepo.repo.name }}
                                # {{scope.row.intoRepo.id}}
                           </template>
                           <template v-else>
                                选择仓储
                           </template>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showOrdersDialog = false">取 消</el-button>
                <el-button type="primary" @click="submitOutRepo">确 定</el-button>
            </span>
        </el-dialog>

         <el-dialog title="选择仓储" v-model="showIntoRepoDialog">
            <el-cascader
                :options="repos"
                @change="repoChange"
                :props="{children: 'children'}"
                style="margin-bottom: 10px;"
                >
            </el-cascader>
            <el-table
                :data="dealIntoRepos"
                border
                style="width:100%;"
                @row-click="intoRepoSelected"
                >
                <el-table-column label="批次">
                    <template scope="scope">
                        # {{scope.row.id}}
                    </template>
                </el-table-column>
                <el-table-column label="单价">
                    <template scope="scope">
                        ￥{{parseFloat(scope.row.unitPrice).toFixed(2)}}
                    </template>
                </el-table-column>
                <el-table-column label="库存">
                     <template scope="scope">
                        x {{scope.row.quantity}}
                    </template>
                </el-table-column>
                <el-table-column label="入库时间" width="200">
                     <template scope="scope">
                        {{scope.row.dealTime}}
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>

        <el-dialog title="配仓信息" v-model="showOutRepoDialog">
            <el-table
                :data="dealOutRepos.rows"
                border
                style="width:100%;"
                >
                <el-table-column label="属性">
                    <template scope="scope">
                        {{scope.row.intoRepo.sku.properties}}
                    </template>
                </el-table-column>
                <el-table-column label="仓库">
                    <template scope="scope">
                        {{scope.row.intoRepo.repo.name}}
                    </template>
                </el-table-column>
                <el-table-column label="批次">
                    <template scope="scope">
                        # {{scope.row.intoRepo.id}}
                    </template>
                </el-table-column>
                <el-table-column label="数量">
                    <template scope="scope">
                        x {{scope.row.quantity}}
                    </template>
                </el-table-column>
                <el-table-column label="操作人">
                    <template scope="scope">
                        {{scope.row.operationer.displayName}}
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>

        <el-dialog title="发货信息" v-model="showShipInfoDialog">
            <el-table
                :data="dealShips"
                border
                style="width:100%;"
                >
                <el-table-column prop="name" label="快递名称"></el-table-column>
                <el-table-column prop="number" label="快递单号"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        computed: mapGetters({
            bookings: 'bookings'
        }),
        data() {
            return {
                status: "100",
                selectedBooking: null,
                showOrdersDialog: false,
                showIntoRepoDialog: false,
                showOutRepoDialog: false,
                showShipInfoDialog: false,
                repos: [], //仓库列表
                dealIntoRepos: [], //当前选择商品以及仓库的入库列表,
                dealOrder: null, //当前操作的Order,
                dealOutRepos: [], //当前订单出库信息,
                dealShips: [] //当前订单物流信息
            }
        },
        mounted(){
            var that = this;
            this.request();
            this.$store.dispatch("filterRepos", {
                fields: "rows {id, name}"
            }).then(res => {
                let repos = [];
                for(let repo of res.repos.rows){
                    repos.push({
                        label: repo.name,
                        value: repo.id
                    })
                }
                that.repos = [{
                    label: "华东地区",
                    value: "华东地区",
                    children: repos
                }];
            });
        },
        methods: {
            request() {
                let that = this;
                this.$store.dispatch('getBookings', {
                    filters: {
                        status: that.status
                    },
                    fields: `
                        id,
                        receiptFee,
                        source,
                        receiverName,
                        receiverAddress,
                        receiverPhone,
                        memo,
                        tradeNumber,
                        outTradeNumber,
                        createdAt,
                        status,
                        owner {
                            id,
                            displayName,
                            email
                        },
                        orders {
                            id,
                            sku {
                                id,
                                properties,
                                goodsNo,
                                product {
                                    name
                                }
                            },
                            quantity,
                            receiptFee
                        }
                    `
                });
            },
            tabClick(tab, event) {
                this.status = tab.name.replace("#", "");
                this.request();
            },
            statusHandler(status, booking) {
                let r = confirm("确定操作？");
                let that = this;
                if (r) {
                    this.$store.dispatch('updateBookingStatus', {
                        status: status,
                        id: booking.id
                    }).then(res => {
                        let index = that.bookings.rows.indexOf(booking);
                        that.bookings.rows.splice(index, 1);
                    });
                }
            },
            outRepoHandler(booking) {
                this.showOrdersDialog= true; 
                this.selectedBooking= booking;
            },
            repoChange(val) {
                let that = this;
                this.$store.dispatch("filterIntoRepos", {
                    fields: `
                        rows {
                            quantity,
                            unitPrice,
                            dealTime,
                            id,
                            repo {
                                id,
                                name
                            }
                        }`,
                    filters: {
                        skuId: this.dealOrder.sku.id,
                        repoId: val[1]
                    }
                }).then(res=>{
                    that.dealIntoRepos = res.intoRepos.rows;
                });
            },
            chooseIntoRepo(order) {
                this.showIntoRepoDialog = true;
                this.dealOrder = order;
                this.dealIntoRepos = [];
            },
            intoRepoSelected(row) {
                this.showIntoRepoDialog = false;
                let orders = this.selectedBooking.orders;
                let index = orders.indexOf(this.dealOrder);
                this.dealOrder.intoRepo = row;
                this.$set(orders, index, this.dealOrder);
            },
            submitOutRepo() {
                let that = this;
                let outRepos = [];
                let booking = this.selectedBooking;
                for(let order of booking.orders) {
                    outRepos.push({
                        quantity: order.quantity,
                        order: order.id,
                        intoRepo: order.intoRepo.id,
                        sku: order.sku.id
                    })
                }
                this.$store.dispatch("deliverBooking", {
                    booking: booking.id,
                    outRepos: outRepos
                }).then(res => {
                    let index = that.bookings.rows.indexOf(booking);
                    that.bookings.rows.splice(index, 1);
                    that.showOrdersDialog = false;
                    that.$message({
                        message: "配仓成功",
                        type: "success"
                    })
                })
            },
            showShipInfoHandler(booking) {
                let that = this;
                this.selectedBooking = booking;
                this.showShipInfoDialog = true;
                this.$store.dispatch("getBooking", {
                    id: this.selectedBooking.id,
                    fields: `
                        id, 
                        ships {
                            id, 
                            name, 
                            number
                        }
                    `
                }).then(res => {
                    that.dealShips = [];
                    for(let ship of res.booking.ships) {
                        let isExist = that.dealShips.find(cship => {
                            let uniqueStr = cship.name + cship.number;
                            return uniqueStr == (ship.name + cship.number);
                        });
                        if (!isExist) {
                            that.dealShips.push(ship);
                        }
                    }
                });
            },
            showOutRepoHandler(booking) {
                let that = this;
                this.selectedBooking = booking;
                this.showOutRepoDialog = true;
                let orders = booking.orders.map(order => {
                    return order.id;
                });

                this.$store.dispatch("filterOutRepos", {
                    filters: {
                        bookingOrderId: {
                            $in: orders
                        }
                    },
                    fields: `
                        rows {
                            id, quantity, 
                            operationer {
                                displayName
                            },
                            intoRepo {
                                id,
                                repo {
                                    name
                                },
                                sku {
                                    properties
                                }
                            }
                        }
                    `
                }).then(res => {
                    console.log(res.outRepos)
                    that.dealOutRepos = res.outRepos;
                });
            }
        }
    }
</script>