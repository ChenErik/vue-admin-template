// / <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module 'acp-core' {
  const acp:any
  export default acp
}
declare module 'prj-confs/src/imps/GlobalInit' {
  const prjConfs:any
  export default prjConfs
}
declare module 'nprogress' {
  const nprogress:any
  export default nprogress
}
declare module 'path-browserify' {
  const pathb:any
  export default pathb
}
