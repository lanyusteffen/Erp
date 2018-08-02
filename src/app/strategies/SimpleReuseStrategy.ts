import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
import { Injectable } from '../../../node_modules/@angular/core';

interface IRouteConfigData {
    reuse: boolean;
}

interface ICachedRoute {
    handle: DetachedRouteHandle;
    data: IRouteConfigData;
}

@Injectable()
export class SimpleReuseStrategy implements RouteReuseStrategy {

    private routeCache = new Map<string, ICachedRoute>();

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig;
    }

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        const data = this.getRouteData(route);
        return data && data.reuse;
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        const url = this.getFullRouteUrl(route);
        const data = this.getRouteData(route);
        this.routeCache.set(url, { handle, data });
        this.addRedirectsRecursively(route);
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        const url = this.getFullRouteUrl(route);
        return this.routeCache.has(url);
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        const url = this.getFullRouteUrl(route);
        const data = this.getRouteData(route);
        return data && data.reuse && this.routeCache.has(url)
        ? this.routeCache.get(url).handle
        : null;
    }

    private addRedirectsRecursively(route: ActivatedRouteSnapshot): void {
        const config = route.routeConfig;
        if (config) {
        if (!config.loadChildren) {
            const routeFirstChild = route.firstChild;
            const routeFirstChildUrl = routeFirstChild
            ? this.getRouteUrlPaths(routeFirstChild).join('/')
            : '';
            const childConfigs = config.children;
            if (childConfigs) {
            const childConfigWithRedirect = childConfigs.find(c => c.path === '' && !!c.redirectTo);
            if (childConfigWithRedirect) {
                childConfigWithRedirect.redirectTo = routeFirstChildUrl;
            }
            }
        }
        route.children.forEach(childRoute => this.addRedirectsRecursively(childRoute));
        }
    }

    private getFullRouteUrl(route: ActivatedRouteSnapshot): string {
        return this.getFullRouteUrlPaths(route).filter(Boolean).join('/');
    }

    private getFullRouteUrlPaths(route: ActivatedRouteSnapshot): string[] {
        const paths = this.getRouteUrlPaths(route);
        return route.parent
        ? [ ...this.getFullRouteUrlPaths(route.parent), ...paths ]
        : paths;
    }

    private getRouteUrlPaths(route: ActivatedRouteSnapshot): string[] {
        return route.url.map(urlSegment => urlSegment.path);
    }

    private getRouteData(route: ActivatedRouteSnapshot): IRouteConfigData {
        return route.routeConfig && route.routeConfig.data as IRouteConfigData;
    }
}
