import { defineStore } from "pinia";
export const useTagsViewStore = defineStore({
  id: "TagsView", // id必填，且需要唯一
  state: (): any => {
    return {
      visitedViews: [],
      cachedViews: [],
    };
  },
  getters:{
    getCachedTabList(): string[] {
      return Array.from(this.cachedViews);
    },
    getTabList(): string[] {
      return this.visitedViews;
    },
  },
  actions: {
    addView(view: any) {
      this.addVisitedView(view);
      this.addCachedView(view);
    },
    addVisitedView(view: any) {
      if (this.visitedViews.some((v: any) => v.path === view.path)) return;
      this.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || "no-name",
        })
      );
    },
    addCachedView(view: any) {
      if (this.cachedViews.includes(view.name)) return;
      if (!view.meta.noCache) {
        this.cachedViews.push(view.name);
      }
    },
    delView(view: any) {
      return new Promise((resolve) => {
        this.delVisitedView(view);
        this.delCachedView(view);
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        });
      });
    },
    delVisitedView(view: any) {
      return new Promise((resolve) => {
        for (const [i, v] of this.visitedViews.entries()) {
          if (v.path === view.path) {
            this.visitedViews.splice(i, 1);
            break;
          }
        }
        resolve([...this.visitedViews]);
      });
    },
    delCachedView(view: any) {
      return new Promise((resolve) => {
        const index = this.cachedViews.indexOf(view.name);
        index > -1 && this.cachedViews.splice(index, 1);
        resolve([...this.cachedViews]);
      });
    },
    delOthersViews(view: any) {
      return new Promise((resolve) => {
        this.delOthersVisitedViews(view);
        this.delOthersCachedViews(view);
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        });
      });
    },
    delOthersVisitedViews(view: any) {
      return new Promise((resolve) => {
        this.visitedViews = this.visitedViews.filter((v:any) => {
          return v.meta.affix || v.path === view.path;
        });
        resolve([...this.visitedViews]);
      });
    },
    delOthersCachedViews(view: any) {
      return new Promise((resolve) => {
        const index = this.cachedViews.indexOf(view.name)
        if (index > -1) {
            this.cachedViews = this.cachedViews.slice(index, index + 1)
        } else {
            this.cachedViews = []
        }
        resolve([...this.cachedViews]);
      });
    },
    delAllViews(view:any) {
        return new Promise(resolve => {
          this.delAllVisitedViews()
          this.delAllCachedViews()
          resolve({
            visitedViews: [...this.visitedViews],
            cachedViews: [...this.cachedViews]
          })
        })
    },
    delAllVisitedViews() {
        return new Promise(resolve => {
            const affixTags = this.visitedViews.filter((tag:any) => tag.meta.affix)
            this.visitedViews = affixTags
          resolve([...this.visitedViews])
        })
    },
    delAllCachedViews() {
        return new Promise(resolve => {
            this.cachedViews = []
            resolve([...this.cachedViews])
        })
    },
    updateVisitedView(view:any) {
        for (let v of this.visitedViews) {
            if (v.path === view.path) {
              v = Object.assign(v, view)
              break
            }
          }
        }
  }
})
