export default function(date: string): string {
  const now = new Date()
  const then = new Date(date)

  const differenceInMillis = Number(now) - Number(then)
 
  if(differenceInMillis > 87840000) return new Intl.DateTimeFormat('sk-SK', {
    dateStyle: 'short',
    timeStyle: 'medium' 
  }).format(then)

  if(differenceInMillis > 3660000) return new Intl.RelativeTimeFormat('sk', {
    style: 'long'
  }).format(-Math.floor((differenceInMillis / 1000 / 60 / 60)), 'hour')

  if(differenceInMillis > 61000) return new Intl.RelativeTimeFormat('sk', {
    style: 'long'
  }).format(-Math.floor((differenceInMillis / 1000 / 60)), 'minute')

  return new Intl.RelativeTimeFormat('sk', {
    style: 'long'
  }).format(-Math.floor((differenceInMillis / 1000)), 'second')
}