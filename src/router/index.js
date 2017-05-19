import Vue from 'vue';
import Router from 'vue-router';
import home from '@/components/home';
import center from '@/components/sideNav/center';
import workplat from '@/components/sideNav/workplat';
import bookingNav from '@/components/sideNav/booking';
import login from '@/components/login/login.vue';
import repolist from '../components/content/repos.vue';
import creatRepo from '../components/content/createrepo.vue';
import createuser from '@/components/content/createuser';
import allusers from '../components/content/users.vue';
import createbrand from '../components/content/createbrand.vue';
import brands from '../components/content/brand.vue';
import categories from '../components/content/category.vue';
import createprd from '../components/content/createProduct.vue';
import products from '../components/content/products.vue';
import skus from '../components/content/sku.vue';
import product from '../components/sideNav/product.vue'
import bookingForm from '../components/booking/booking-form.vue';
import creatcats from '../components/content/createcatory.vue'
import bookingList from '../components/booking/booking-list.vue';
import creatCategory from '../components/content/createcatory.vue'
import deliveryNav from '../components/sideNav/delivery.vue'
import deliveryBookingList from "../components/delivery/booking-list.vue"
import intoRepo from '../components/content/createIntoRepo.vue'
import updateProduct from '../components/content/updateProduct.vue'

import inRepos from '../components/content/intoRepos.vue'
// import{
//   createCatory,creatbrand,createuser,allcatory,brands,allusers,creatrepo,repolist
// }from "../components/content"

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: '登录',
            component: login 
        },
        {
            path: '/home',
            name: 'home',
            component: home,
            children: [
                {
                    path: 'center',
                    name: '处理中心',
                    component: center,
                    children: [
                        {
                            path: 'repolist',
                            name: '查看仓库',
                            component: repolist
                        },
                        {
                            path: 'creatRepo',
                            name: '创建仓库',
                            component: creatRepo
                        },
                         {
                            path: 'intoRepo',
                            name: '创建入库',
                            component: intoRepo
                        },
                        {
                            path: 'createbrand',
                            name: '创建品牌',
                            component: createbrand
                        },
                        {
                            path: 'brand',
                            name: '所有品牌',
                            component: brands
                        },
                        {
                            path: 'categories',
                            name: '所有分类',
                            component: categories
                        },
                         {
                            path: 'creatCategory',
                            name: '创建分类',
                            component: creatCategory
                        },
                        
                        {
                            path: 'skus',
                            name: '创建Sku',
                            component: skus
                        },
                     
                    ]
                },
                {
                    path:'product',
                    name:'商品入仓',
                    component:product,
                    children:[
                        {
                            path: 'createprd',
                            name: '创建商品',
                            component: createprd
                        },
                        {
                            path: 'products',
                            name: '商品列表',
                            component: products
                        },
                        {
                            path:'updateprd',
                            name:'更新商品',
                            component:updateProduct
                        },
                          {
                            path:'inRepos',
                            name:'入库信息',
                            component:inRepos
                        },
                        
                    ]
                },
                {
                    path: 'workplat',
                    name: '工作台',
                    component: workplat,
                    children: [
                        {
                            path: 'createuser',
                            name: '创建用户',
                            component: createuser
                        },
                        {
                            path: 'allusers',
                            name: '所有用户',
                            component: allusers
                        }

                    ]
                },
                {
                    path: 'booking',
                    name: "订单管理",
                    component: bookingNav,
                    children: [
                        {
                            path: 'create',
                            name: "创建订单",
                            component: bookingForm
                        },
                        {
                            path: 'list',
                            name: "订单列表",
                            component: bookingList
                        }
                    ]
                },
                {
                    path: 'delivery',
                    name: '出仓发货',
                    component: deliveryNav,
                    children: [
                        {
                            path: 'booking',
                            name: "仓库订单列表",
                            component: deliveryBookingList
                        }
                    ]
                }
            ]
        }
   
    ]
});
