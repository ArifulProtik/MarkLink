import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const formatSmartTime = (timestamp: string | number | Date): string => {
  const now = dayjs()
  const date = dayjs(timestamp)

  const diffInDays = now.diff(date, 'day')

  if (diffInDays < 7) {
    return date.fromNow()
  }

  return date.format('D MMM YYYY')
}

export const simpleFormat = (timestamp: string | number | Date): string => {
  return dayjs(timestamp).format('D MMM YYYY')
}
