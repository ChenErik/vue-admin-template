import { defineStore } from 'pinia'
export const useAppStore = defineStore({
  id: 'App', // id必填，且需要唯一
  state: () => {
    return {
        sidebar:{
          opened: localStorage.getItem('sidebarStatus') === 'close' ? false : true
        },
        viewHeight: document.documentElement.clientHeight
    }
  },
  actions:{
    setViewHeight(){
      this.viewHeight = document.documentElement.clientHeight
    },
    toogleSidebar(){
        this.sidebar.opened = !this.sidebar.opened
        if(this.sidebar.opened){
            localStorage.setItem('sidebarStatus','open')
        }else{
            localStorage.setItem('sidebarStatus','close')
        }
    }
  }
})