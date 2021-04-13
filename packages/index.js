import FuiTable from './fuitable.vue';
//存储组件列表
const components =[
    FuiTable
];
//定义install 方法
const install = function(Vue){
    //遍历注册全局组件
    // Vue.component(FuiTable.name,FuiTable)
    components.forEach(item=>{
        Vue.component(item.name,item)
    })
}

//判断是否直接引入文件，如果是，就不用调用Vue.use()
if(typeof window !== 'undefined' && window.Vue){
    install(window.Vue)
}

export default {
    install
}