interface treeConfigType {
  id: string
  parentId: string
  childrenList: string
}
export function handleTree(data: [], id?: string, parentId?: string, children?: string): [] {
  const config: treeConfigType = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children',
  }

  const childrenListMap: any = {}
  const nodeIds = {}
  const tree: [] = []

  for (const d of data) {
    const parentId = d[config.parentId]
    if (childrenListMap[parentId] == null)
      childrenListMap[parentId] = []

    nodeIds[d[config.id]] = d
    childrenListMap[parentId].push(d)
  }

  for (const d of data) {
    const parentId = d[config.parentId]
    if (nodeIds[parentId] == null)
      tree.push(d)
  }

  for (const t of tree)
    adaptToChildrenList(t)

  function adaptToChildrenList(o: any) {
    if (childrenListMap[o[config.id]] !== null)
      o[config.childrenList] = childrenListMap[o[config.id]]

    if (o[config.childrenList]) {
      for (const c of o[config.childrenList])
        adaptToChildrenList(c)
    }
  }
  return tree
}

// /**
//  * @param {Function} func
//  * @param {number} wait
//  * @param {boolean} immediate
//  * @return {*}
//  */
// export function debounce(func: any, wait: number, immediate?: boolean) {
//   let timeout: NodeJS.Timeout | null, args: any, context: any, timestamp: number, result: any

//   const later = function () {
//     // 据上一次触发时间间隔
//     const last = +new Date() - timestamp

//     // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
//     if (last < wait && last > 0) {
//       timeout = setTimeout(later, wait - last)
//     }
//     else {
//       timeout = null
//       // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
//       if (!immediate) {
//         result = func.apply(context, args)
//         if (!timeout)
//           context = args = null
//       }
//     }
//   }

//   return function (...args: any) {
//     // eslint-disable-next-line @typescript-eslint/no-this-alias
//     context = this
//     timestamp = +new Date()
//     const callNow = immediate && !timeout
//     // 如果延时不存在，重新设定延时
//     if (!timeout)
//       timeout = setTimeout(later, wait)
//     if (callNow) {
//       result = func.apply(context, args)
//       context = args = null
//     }

//     return result
//   }
// }
