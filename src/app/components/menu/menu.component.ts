import { Component } from '@angular/core';
import { TabsService } from '../tabs/tabs.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})

export class MenuComponent {
  constructor(private tabsService: TabsService) {}

  menus = [
    {
      name: '采购',
      icon: 'cart',
      subMenu: [
        {
          name: '采购订单管理',
          subMenu: [
            { name: '新增采购订单', link: '/purchases/order/new' },
            { name: '采购订单历史', link: '/purchases/order/list' }
          ]
        }
      ]
    },
    {
      name: '销售',
      icon: 'manageorder',
      subMenu: [
        {
          name: '商品管理',
          subMenu: [
            { name: '商品信息', link: '/products' },
            { name: '价格管理表', link: '/products' },
            { name: '商品套餐', link: '/products' }
          ]
        }
      ]
    },
    {
      name: '库存',
      icon: 'box',
      subMenu: [
        {
          name: '商品管理',
          subMenu: [
            { name: '商品信息', link: '/products' },
            { name: '价格管理表', link: '/products' },
            { name: '商品套餐', link: '/products' }
          ]
        }
      ]
    },
    {
      name: '财务',
      icon: 'dollar',
      subMenu: [
        {
          name: '基础资料',
          subMenu: [
            { name: '资金账户', link: '/finances/fundsaccount' },
            { name: '费用类型', link: '/finances/feetype' },
            { name: '收入类型', link: '/finances/otherincome' }
          ]
        }
      ]
    },
    {
      name: '报表',
      icon: 'training',
      subMenu: [
        {
          name: '商品管理',
          subMenu: [
            { name: '商品信息', link: '/product' },
            { name: '价格管理表', link: '/product' },
            { name: '商品套餐', link: '/product' }
          ]
        }
      ]
    },
    {
      name: '资料',
      icon: 'data',
      subMenu: [
        {
          name: '商品管理',
          subMenu: [
            { name: '商品信息', link: '/products/product' },
            { name: '商品配置', link: '/products/productconfig' },
            { name: '价格管理表', link: '/product' },
            { name: '商品套餐', link: '/product' }
          ]
        },
        {
          name: '往来单位',
          subMenu: [
            { name: '供应商', link: '/basics/supplier' },
            { name: '客户', link: '/basics/customer' },
            { name: '其他往来单位', link: '/basics/otherexchangeunit' },
            { name: '地区信息', link: '/basics/area' },
          ]
        },
        {
          name: '公司内部组织',
          subMenu: [
            { name: '部门信息', link: '/basics/department' },
            { name: '仓库信息', link: '/products/storage' },
            { name: '内部职员', link: '/basics/employee' }
          ]
        }
      ]
    },
    {
      name: '设置',
      icon: 'set',
      subMenu: [
        {
          name: '系统设置',
          subMenu: [
            { name: '公司管理', link: '/admins/company' },
            { name: '用户管理', link: '/admins/user' },
            { name: '角色管理', link: '/admins/role' },
            { name: '系统配置', link: '/admins/systemconfig' }
          ]
        }
      ]
    }
  ];

  createTab(menu) {
    this.tabsService.create({
      name: menu.name,
      link: menu.link
    });
  }
}
