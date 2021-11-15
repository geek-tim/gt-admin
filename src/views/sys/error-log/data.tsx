// import { BasicColumn } from '/@/components/Table/index'
import { ErrorTypeEnum } from '/@/enums/exceptionEnum'
import { useI18n } from '/@/hooks/web/useI18n'

const { t } = useI18n()

export function getColumns() {
  return [
    {
      id: 'type',
      title: t('sys.errorLog.tableColumnType'),
      width: 80,
      customRender: ({ text }) => {
        const color =
          text === ErrorTypeEnum.VUE
            ? 'green'
            : text === ErrorTypeEnum.RESOURCE
            ? 'cyan'
            : text === ErrorTypeEnum.PROMISE
            ? 'blue'
            : ErrorTypeEnum.AJAX
            ? 'red'
            : 'purple'
        return <el-tag color={color}>{() => text}</el-tag>
      }
    },
    {
      id: 'url',
      title: 'URL',
      width: 200
    },
    {
      id: 'time',
      title: t('sys.errorLog.tableColumnDate'),
      width: 160
    },
    {
      id: 'file',
      title: t('sys.errorLog.tableColumnFile'),
      width: 200
    },
    {
      id: 'name',
      title: 'Name',
      width: 200
    },
    {
      id: 'message',
      title: t('sys.errorLog.tableColumnMsg'),
      width: 300
    },
    {
      id: 'stack',
      title: t('sys.errorLog.tableColumnStackMsg'),
      'show-overflow-tooltip': true
    }
  ]
}

export function getDescSchema(): any {
  return getColumns().map((column) => {
    return {
      field: column.id!,
      label: column.title,
      ...column
    }
  })
}
