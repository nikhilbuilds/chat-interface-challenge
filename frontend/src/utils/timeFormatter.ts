import moment from "moment";

export const formatTimestamp = (timestamp: number) => {
    const messageDate = moment(timestamp);
    const now = moment();

    if (messageDate.isSame(now, 'day')) {
      return `Today at ${messageDate.format('h:mm A')}`;
    } else if (messageDate.isSame(now.subtract(1, 'day'), 'day')) {
      return `Yesterday at ${messageDate.format('h:mm A')}`;
    } else {
      return messageDate.format('MMM D, YYYY h:mm A');
    }
  };