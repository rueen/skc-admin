import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {
  Button,
  Input,
  Select,
  Table,
  Menu,
  Layout,
  Space,
  Tag,
  Modal,
  Form,
  Card,
  Row,
  Col,
  Dropdown,
} from 'ant-design-vue'
import router from './router'
import App from './App.vue'
import './styles/global.less'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Button)
app.use(Input)
app.use(Select)
app.use(Table)
app.use(Menu)
app.use(Layout)
app.use(Space)
app.use(Tag)
app.use(Modal)
app.use(Form)
app.use(Card)
app.use(Row)
app.use(Col)
app.use(Dropdown)

app.mount('#app') 