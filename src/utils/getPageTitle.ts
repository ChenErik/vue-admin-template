const title =  'HMI后台管理系统'

export default function getPageTitle(pageTitle:string):string {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
