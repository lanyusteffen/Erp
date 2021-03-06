import { Component, OnInit } from '@angular/core';
import { TabsService } from '../tabs/tabs.service';
import { Router, NavigationExtras } from '@angular/router';
import { MenuService } from '@services/menu.service';
import { SimpleReuseStrategy } from '@strategies/SimpleReuseStrategy';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
  providers: [
    MenuService
  ]
})

export class AppMenuComponent implements OnInit {

  private localMenus = [];

  private basicMenus = [
    {
      name: '资料',
      icon: 'data',
      module: 2,
      subMenus: []
      // subMenu: [
      //   {
      //     name: '往来单位',
      //     subMenu: [
      //       { name: '供应商', link: '/basics/supplier' },
      //       { name: '客户', link: '/basics/customer' },
      //       { name: '其他往来单位', link: '/basics/otherexchangeunit' }
      //     ]
      //   },
      //   {
      //     name: '组织结构',
      //     subMenu: [
      //       { name: '地区信息', link: '/basics/area' },
      //       { name: '部门信息', link: '/basics/department' },
      //       { name: '内部职员', link: '/basics/employee' },
      //       { name: '仓库信息', link: '/products/storage' }
      //     ]
      //   }
      // ]
    },
    {
      name: '财务',
      icon: 'dollar',
      module: 3,
      subMenus: []
      // subMenu: [
      //   {
      //     name: '基础资料',
      //     subMenu: [
      //       { name: '资金账户', link: '/finances/fundsaccount' },
      //       { name: '费用类型', link: '/finances/feetype' },
      //       { name: '收入类型', link: '/finances/otherincome' }
      //     ]
      //   }
      // ]
    },
    {
      name: '商品',
      icon: 'category',
      module: 4,
      subMenus: []
      // subMenu: [
      //   {
      //     name: '商品管理',
      //     subMenu: [
      //       { name: '商品信息', link: '/products/product' },
      //       { name: '商品配置', link: '/products/productconfig' }
      //     ]
      //   }
      // ]
    },
    {
      name: '销售',
      icon: 'manageorder',
      module: 5,
      subMenus: []
      // subMenu: [
      //   {
      //     name: '销售订单管理',
      //     subMenu: [
      //       { name: '新增销售订单', link: '/sales/order', paras: { type: 'new', id: -1 }},
      //       { name: '销售订单历史', link: '/sales/order/history' }
      //     ]
      //   }
      // ]
    },
    {
      name: '采购',
      icon: 'cart',
      module: 6,
      subMenus: []
      // subMenu: [
      //   {
      //     name: '采购订单管理',
      //     subMenu: [
      //       { name: '新增采购订单', link: '/purchases/order', paras: { type: 'new', id: -1 }},
      //       { name: '采购订单历史', link: '/purchases/order/history' }
      //     ]
      //   }
      // ]
    },
    {
      name: '库存',
      icon: 'box',
      module: 7,
      subMenus: []
      // subMenu: [
      //   {
      //     name: '出库单管理',
      //     subMenu: [
      //       { name: '新增出库单', link: '/inventorys/storageout', paras: { type: 'new', id: -1 } },
      //       { name: '出库单历史', link: '/inventorys/storageout/history' }
      //     ]
      //   }
      // ]
    },
    {
      name: '管理',
      icon: 'set',
      module: 1,
      subMenus: []
      // subMenu: [
      //   {
      //     Name: '基础资料',
      //     subMenu: [
      //       { Name: '公司管理', Link: '/admins/company' },
      //       { Name: '用户管理', Link: '/admins/user' },
      //       { Name: '角色管理', Link: '/admins/role' }
      //     ]
      //   },
      //   {
      //     Name: '系统设置',
      //     subMenu: [
      //       { Name: '菜单设置', Link: '/admins/menu', paras: { isInternal: true } },
      //       { Name: '全局配置', Link: '/admins/systemconfig' }
      //     ]
      //   }
      // ]
    }
  ];

  constructor(private tabService: TabsService,
    private menuService: MenuService,
    private router: Router) {
  }

  toLogin(): void {
    // Set our navigation extras object
    // that contains our global query params and fragment
    const navigationExtras: NavigationExtras = {
      //   queryParams: { 'return': sessionId },
      //   fragment: 'anchor'
      };
    SimpleReuseStrategy.clear();

    // Navigate to the login page with extras
    this.router.navigate(['/authorize/login'], navigationExtras);
  }

  ngOnInit(): void {
    this.menuService.getMenusCached(remoteMenus => {
      const sourceBasicMenus = this.basicMenus;
      for (let i = 0; i < remoteMenus.length; i++) {
        for (let j = 0; j < sourceBasicMenus.length; j++) {
          if (remoteMenus[i].ModuleType === sourceBasicMenus[j].module) {
            this.addSubMenu(sourceBasicMenus[j], remoteMenus[i]);
          }
        }
      }
      for (let j = 0; j < sourceBasicMenus.length; j++) {
        if (!sourceBasicMenus[j].subMenus || sourceBasicMenus[j].subMenus.length === 0) {
          sourceBasicMenus.splice(j, 1);
          --j;
        }
      }
      this.localMenus = sourceBasicMenus.map(x => Object.assign({}, x));
    }, () => {
      this.toLogin();
    });
  }

  private addSubMenu(moduleMenu: any, remoteMenu: any) {
    if (remoteMenu.LinkParameters) {
      try {
        // 提高容错度, 避免影响整个菜单加载
        remoteMenu.LinkParameters = JSON.parse(remoteMenu.LinkParameters);
      } catch {
      }
    }
    if (remoteMenu.ParentId) {
      for (let i = 0; i < moduleMenu.subMenus.length; i++) {
        if (moduleMenu.subMenus[i].Id === remoteMenu.ParentId) {
          if (!moduleMenu.subMenus[i].subMenus) {
            moduleMenu.subMenus[i].subMenus = [];
          }
          moduleMenu.subMenus[i].subMenus.push(Object.assign({}, remoteMenu));
          break;
        }
      }
    } else {
      moduleMenu.subMenus.push(Object.assign({}, remoteMenu));
    }
  }

  createTab(menu) {
    this.tabService.create({
      name: menu.Name,
      link: menu.Link,
      paras: menu.LinkParameters
    });
  }
}
