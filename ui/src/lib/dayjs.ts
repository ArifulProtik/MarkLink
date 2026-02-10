import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'

dayjs.extend(relativeTime)
dayjs.extend(utc)

export const formatSmartTime = (timestamp: string | number | Date): string => {
  const now = dayjs()

  // Handle Date objects - convert to ISO string first to ensure UTC parsing
  let dateInput: string | number
  if (timestamp instanceof Date) {
    dateInput = timestamp.toISOString()
  } else {
    dateInput = timestamp
  }

  const date = dayjs.utc(dateInput).local()

  const diffInDays = now.diff(date, 'day')

  if (diffInDays < 7) {
    return date.fromNow()
  }

  return date.format('D MMM YYYY')
}

export const simpleFormat = (timestamp: string | number | Date): string => {
  return dayjs(timestamp).format('D MMM YYYY')
}
