import { formatDistanceToNow, parseISO } from "date-fns";

export default function TimeAgo({ timestamp }) {
  if (timestamp) {
    const date = parseISO(timestamp)
    const timePeriod = formatDistanceToNow(date)

    return (
      <span>
        &nbsp;<i>{timePeriod} ago</i>
      </span>
    )
  }
  else {
    return
  }
}