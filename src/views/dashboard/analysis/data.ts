export interface GrowCardItem {
  icon: string
  title: string
  value: number
  total: number
  color: string
  type: string
  action: string
}
// { name: 'Tag 2', type: 'success' },
// { name: 'Tag 3', type: 'info' },
// { name: 'Tag 4', type: 'warning' },
// { name: 'Tag 5', type: 'danger' },

export const growCardList: GrowCardItem[] = [
  {
    title: '访问数',
    icon: 'visit-count|svg',
    value: 2000,
    total: 120000,
    type: 'success',
    color: 'green',
    action: '月'
  },
  {
    title: '成交额',
    icon: 'total-sales|svg',
    value: 20000,
    total: 500000,
    type: 'info',
    color: 'blue',
    action: '月'
  },
  {
    title: '下载数',
    icon: 'download-count|svg',
    value: 8000,
    total: 120000,
    type: 'danger',
    color: 'orange',
    action: '周'
  },
  {
    title: '成交数',
    icon: 'transaction|svg',
    value: 5000,
    total: 50000,
    type: 'warning',
    color: 'purple',
    action: '年'
  }
]
