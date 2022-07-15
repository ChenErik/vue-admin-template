import Mock from 'mockjs'

interface ExcelData {
  id: string
  userName: string
  url: string
  price: number
  createAt: string
}
export const getExcelData = async (limit: number): Promise<ExcelData[]> => {
  return new Promise((resolve, reject) => {
    try {
      const { Random } = Mock
      const data: ExcelData[] = Array.from({ length: limit }, (v, i) => {
        return {
          id: `200020${i}`,
          userName: Random.cname(),
          url: Random.url('http'),
          price: Random.float(0, 110000, 0, 2),
          createAt: Random.datetime('yyyy-MM-dd HH:mm:ss'),
        }
      })
      resolve(data)
    }
    catch (e) {
      reject(e)
    }
  })
}
