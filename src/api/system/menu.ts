import { menuType } from 'types';
import acp from 'acp-core'
// import AppMduLogi  from '../appmdu/AppMduLogi'


class NavMenuLogi{
    constructor(){
    }

    async LoadMenus(){
        let resp =await acp.us.req.post(acp.rmt.def,'Menu/AuthedMenus');
        let res = await resp.json();
        return res;

    }

    createPage(mn:any){
        if(!mn || !mn.webUrl)return null;
        let pginfo = {ori:mn,url:mn.webUrl,header:mn.alias,id:acp.core.newId()}
        let pna = window.location.pathname
        if(pginfo.url.indexOf('{prefix}')!=-1 && pna){
            pginfo.url= pginfo.url.replace('{prefix}',pna );
        }
        return pginfo;
    }

    async search (cnd:any){
        let resp =await acp.us.req.postJson(acp.rmt.def,'Menu/SearchMenus',cnd);
        let res = await resp.json();
        res.sort((a:any,b:any)=>{
            //console.log(`${p.parent?1:0}_${p.parent??acp.num.format(p.seq,'000')}_${acp.num.format(p.seq,'000')}_${p.alias}`)
            return `${a.parent??a.id}_${a.parent?1:0}_${acp.num.format(a.seq,'000')}`.localeCompare(`${b.parent??b.id}_${b.parent?1:0}_${acp.num.format(b.seq,'000')}`)
           // return `${p.parent?1:0}_${p.parent??acp.num.format(p.seq,'000')}_${acp.num.format(p.seq,'000')}`
        })
        return res;  
    }

    async save (mn:any){
        let resp =await acp.us.req.postJson(acp.rmt.def,'MenuOperator/save',mn);
        let res = await resp.json();
        return res;  
    }

    async newItem(){
        let resp =await acp.us.req.post(acp.rmt.def,'MenuOperator/Create');
        let res = await resp.json();     
        return res;   
    }

    async getMenuById(id:string){
        if(!id)return null;      
        let resp =await acp.us.req.postJson(acp.rmt.def,'Menu/menubyid',id );
        let res = await resp.json();     
        return res;   
    }

    // async repaireForEdit(mn:any){
    //     if(!mn)return;
    //     if(mn.parent){
    //         mn.parentMenuName=(await this.getMenuById(mn.parent))?.alias;
    //     } 
    //     if(mn.mduId){
    //         let appmdu=new AppMduLogi()
    //         mn.moduleName=(await appmdu.getModuleById(mn.mduId))?.mduName
    //     } 

    // }










}


export default NavMenuLogi;