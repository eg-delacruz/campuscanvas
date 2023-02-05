//Function that formats seconds into a string of the format "DD:HH:MM:SS"

export default function formatSeconds(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor(((seconds % 86400) % 3600) / 60);
  const secs = Math.floor(((seconds % 86400) % 3600) % 60);

  const daysString = days > 0 ? `${days}d:` : '0d';
  const hoursString = hours > 0 ? `${hours}h:` : '0h:';
  const minutesString = minutes > 0 ? `${minutes}m:` : '0m:';
  const secsString = secs > 0 ? `${secs}s` : '0s';

  return `${daysString}${hoursString}${minutesString}${secsString}`;
}
