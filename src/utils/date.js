import dayjs from 'dayjs'

export function formatDeliveryDate(dateString) {
  return dayjs(dateString).format("dddd, MMMM D")
}
