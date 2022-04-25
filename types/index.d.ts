import { RouteRecordRaw,RouteMeta } from "vue-router"

interface RouterMetaType extends RouteMeta {
    icon?:string,
    title?:string,
    activeMenu?:string
}
export declare interface RoutesType {
    path:RouteRecordRaw['path'],
    component?:RouteRecordRaw['component'],
    redirect?:RouteRecordRaw['redirect'],
    name?:string,
    hidden?:boolean,
    alwaysShow?:boolean,
    noShowingChildren?:boolean,
    children?:RoutesType[]
    meta?:RouterMetaType
}

export interface TagType {
    fullPath:string,
    path:string,
    name?:string,
    meta:RouterMetaType,
}

export interface menuType {
    id: string;
    parent: string;
    appId: string;
    alias: string;
    desp: string;
    service?: any;
    component?: any;
    param1: string;
    param2: string;
    param3: string;
    icon: string;
    seq: number;
    mduid: string;
    webUrl: string;
    webCmpName?: any;
    entityState: number;
    modifyFields?: any;
    parentMenuName: string;
    moduleName: string;
    children:menuType[]
}