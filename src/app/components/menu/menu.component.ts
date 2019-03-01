import { Component } from '@angular/core';
import { TabsService } from '../tabs/tabs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})

export class AppMenuComponent {
  constructor(private tabService: TabsService,
    private router: Router) {}
  menus = [
    {
      name: '采购',
      icon: 'cart',
      subMenu: [
        {
          name: '采购订单管理',
          subMenu: [
            { name: '新增采购订单', link: '/purchases/order', paras: { type: 'new', id: -1 }},
            { name: '采购订单历史', link: '/purchases/order/history' }
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
          ]
        }
      ]
    },
    {
      name: '库存',
      icon: 'box',
      subMenu: [
        {
          name: '出库单管理',
          subMenu: [
            { name: '新增出库单', link: '/inventorys/storageout', paras: { type: 'new', id: -1 } },
            { name: '出库单历史', link: '/inventorys/storageout/history' }
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
            { name: '商品配置', link: '/products/productconfig' }
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
    },
    {
      name: '系统管理',
      icon: 'set',
      subMenu: [
        {
          name: '权限管理',
          subMenu: [
            { name: '菜单', link: '/admins/menu' }
          ]
        }
      ]
    }
  ];

  createTab(menu) {
    this.tabService.create({
      name: menu.name,
      link: menu.link,
      paras: menu.paras
    });
  }
}
