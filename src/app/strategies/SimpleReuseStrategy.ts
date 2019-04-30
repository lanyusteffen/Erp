import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
import { Set } from 'typescript-collections';

export class SimpleReuseStrategy implements RouteReuseStrategy {

    private static handlers: { [key: string]: DetachedRouteHandle } = {};
    private static detachHandlers: Set<String> = new Set<string>();

    public static clear(): void {
        SimpleReuseStrategy.handlers = {};
    }

    public static detachTab(tabUrl: string) {
        try {
            SimpleReuseStrategy.detachHandlers.add(tabUrl);
        } catch {
        }
    }

    /** 表示对所有路由允许复用 如果你有路由不想利用可以在这加一些业务逻辑判断 */
    public shouldDetach(route: ActivatedRouteSnapshot): boolean {
        if (this.getRouteUrl(route) === '_home_index' || this.getRouteUrl(route) === '_authorize_login') {
            return false;
        }
        return true;
    }

    /** 当路由离开时会触发。按path作为key存储路由快照&组件当前实例对象 */
    public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        const routeUrl = this.getRouteUrl(route);
        if (SimpleReuseStrategy.detachHandlers.contains(routeUrl)) {
            SimpleReuseStrategy.detachHandlers.remove(routeUrl);
        } else {
            SimpleReuseStrategy.handlers[routeUrl] = handle;
        }
    }

    /** 若 path 在缓存中有的都认为允许还原路由 */
    public shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return !!SimpleReuseStrategy.handlers[this.getRouteUrl(route)];
    }

    /** 从缓存中获取快照，若无则返回null */
    public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        if (!route.routeConfig) {
            return null;
        }
        return SimpleReuseStrategy.handlers[this.getRouteUrl(route)];
    }

    /** 进入路由触发，判断是否同一路由 */
    public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig
            && future.params === curr.params;
    }

    private getRouteUrl(route: ActivatedRouteSnapshot) {
        const path = route['_routerState'].url.replace(/\//g, '_');
        return path;
    }
}
