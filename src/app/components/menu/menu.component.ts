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
            { name: '新增采购订单', link: '/home/purchase/order/new', outlet: 'purchase-order-new' },
            { name: '采购订单历史', link: '/home/purchase/order/record' }
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
            { name: '商品信息', link: '/home/product' },
            { name: '价格管理表', link: '/home/product' },
            { name: '商品套餐', link: '/home/product' }
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
            { name: '商品信息', link: '/home/product' },
            { name: '价格管理表', link: '/home/product' },
            { name: '商品套餐', link: '/home/product' }
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
            { name: '资金账户', link: '/home/finances/funds', outlet: 'finances-funds' },
            { name: '费用类型', link: '/home/finances/feetype', outlet: 'finances-feetype' },
            { name: '收入类型', link: '/home/finances/incometype', outlet: 'finances-incometype' }
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
            { name: '商品信息', link: '/home/product' },
            { name: '价格管理表', link: '/home/product' },
            { name: '商品套餐', link: '/home/product' }
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
            { name: '商品信息', link: '/home/products/product', outlet: 'products-product' },
            { name: '价格管理表', link: '/home/product' },
            { name: '商品套餐', link: '/home/product' }
          ]
        },
        {
          name: '往来单位',
          subMenu: [
            { name: '供应商', link: '/home/basics/supplier', outlet: 'basics-supplier' },
            { name: '客户', link: '/home/basics/customer', outlet: 'basics-customer' },
            { name: '其他往来单位', link: '/home/basics/otherexchangeunit',
                outlet: 'basics-otherexchangeunit' },
            { name: '地区信息', link: '/home/basics/area', outlet: 'basics-area' },
          ]
        },
        {
          name: '公司内部组织',
          subMenu: [
            { name: '部门信息', link: '/home/basics/department', outlet: 'basics-department' },
            { name: '仓库信息', link: '/home/products/storage', outlet: 'products-storage' },
            { name: '内部职员', link: '/home/basics/employee', outlet: 'basics-employee' }
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
            { name: '公司管理', link: '/home/admins/company', outlet: 'admin-company' },
            { name: '用户管理', link: '/home/admins/user', outlet: 'admin-user' },
            { name: '商品套餐', link: '/home/product' }
          ]
        }
      ]
    }
  ];

  createTab(menu) {
    this.tabsService.create({
      name: menu.name,
      link: menu.link,
      outlet: menu.outlet
    });
  }
}
