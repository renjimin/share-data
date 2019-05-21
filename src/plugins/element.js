import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';



import {
  Loading,
  Message,
  Form,
  FormItem,
  Input,
  Button,
  Icon,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Breadcrumb,
  BreadcrumbItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  // 表格
  Table,
  TableColumn,
  Pagination,
  // flex
  Row,
  Col,
  // 表单
  Select,
  Option,
  Dialog,
  Cascader,
  Tag,
  Steps,
  Step,
  Tabs,
  TabPane,
  MessageBox,
  DatePicker,
  TimeSelect,
  TimePicker,
  //other
  Card,
  Scrollbar,

  Header,
  Main,
  Footer,
  //popover
  Popover,
  /**树 */
  Tree,
} from 'element-ui';

Vue.use(Loading);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Row);
Vue.use(Col);
Vue.use(Select);
Vue.use(Option);
Vue.use(Dialog);
Vue.use(Cascader);
Vue.use(Tag);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Card);
Vue.use(Scrollbar);
Vue.use(Header);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Popover);
 //树
Vue.use(Tree);


Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
Vue.prototype.$prompt = MessageBox.prompt
