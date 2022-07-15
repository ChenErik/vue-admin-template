import { saveAs } from 'file-saver'

const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
export default async function useExportToExcel(data: any[], size = 1000, onProcess = (_value: number) => {}) {
  try {
    if (!data || !Array.isArray(data))
      Promise.reject(new Error('暂无数据导出'))
    const step = Math.ceil(data.length / size)
    const csvArray: any = []
    const csvHead = ['编号', '用户名', '官网', '报价', '创建日期']
    csvArray.push(`${csvHead.join()}\n`)
    for (let i = 0; i < step; i++) {
      await new Promise((resolve, reject) => {
        try {
          (async function on() {
            const stepData = data.slice(i * size, (i + 1) * size)
            stepData.forEach((row: any) => {
              csvArray.push(`${Object.values(row).join()}\n`)
            })
            const process = Math.trunc((i / step) * 100)
            onProcess(process)
            await sleep(50)
            resolve(true)
          })()
        }
        catch (e) {
          reject(e)
        }
      })
    }
    onProcess(100)
    const blob = new Blob([String.fromCharCode(0xFEFF), ...csvArray], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, 'file.csv')
    return true
  }
  catch (e) {
    return Promise.reject(e)
  }
}
