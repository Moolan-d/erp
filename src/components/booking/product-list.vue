<template>
    <el-table
    :data="products.rows">
        <el-table-column type="expand">
            <template scope="props">
                <el-table :data="props.row.skus" scope="scope" @row-click="function(row) {
                    skuSelected(props.row, row);
                }">
                    <el-table-column prop="properties" label="属性"></el-table-column>
                    <el-table-column prop="goodsNo" label="货号"></el-table-column>
                </el-table>
            </template>
        </el-table-column>
        <el-table-column label="品名" prop="name"></el-table-column>
        <el-table-column label="分类" prop="category.name"></el-table-column>
        <el-table-column label="品牌" prop="brand.name"></el-table-column>
    </el-table>
</template>
<script>
    import { mapGetters } from 'vuex';
    export default {
        props: {
            skuSelection: {
                type: Function,
                default: function() {
                    console.log("sku row click");
                }
            }
        },
        computed: mapGetters({
            products: 'products'
        }),
        mounted() {
            this.$store.dispatch("getProducts");
        },
        methods: {
            skuSelected(product, sku) {
                this.skuSelection({
                    product: product.name,
                    properties: sku.properties,
                    goodsNo: sku.goodsNo,
                    number: 1,
                    id: sku.id,
                    receiptFee: 0
                });
            }
        }
    }
</script>