import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en)

const timeAgo = new TimeAgo('en-US')

export const formatDate = (date: Date) =>
  date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

export const secureTimeAgo = date => {
  try {
    return timeAgo.format(new Date(date))
  } catch (error) {
    return timeAgo.format(new Date())
  }
}
