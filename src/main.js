/*
 * @Author: liyy
 * @Date: 2022-11-25 16:41:36
 * @Description: 
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {
    Button, TreeSelect, Collapse, CollapseItem, Sidebar, SidebarItem, NavBar, Search,
    Tag, List, Icon, Toast, Field, CellGroup, Slider, ActionSheet
} from 'vant';
import './assets/css/main.css'
import 'animate.css';
import './assets/js/colorPicker'

const app = createApp(App)

app.use(router)

app.mount('#app')
app.use(Button);
app.use(TreeSelect);
app.use(Collapse);
app.use(CollapseItem);
app.use(Sidebar);
app.use(SidebarItem);
app.use(NavBar);
app.use(Search);
app.use(Tag);
app.use(List);
app.use(Icon);
app.use(Toast);
app.use(Field);
app.use(CellGroup);
app.use(Slider);
app.use(ActionSheet);

//自定义指令全局注册-设置字体颜色
app.directive('color', (el, binding) => {
    // 这会在 `mounted` 和 `updated` 时都调用
    el.style.color = binding.value
    // console.log('el, binding', el, binding)
})

//自定义指令全局注册-输入框第一次自动聚焦
app.directive('focus', (el, binding) => {
    // 这会在 `mounted` 和 `updated` 时都调用
    el.focus()
    // console.log('el, binding', el, binding)
})
