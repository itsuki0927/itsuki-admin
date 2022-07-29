export const pad = (n: number) => `${Math.abs(n)}`.padStart(2, '0');

/**
 * 将 params 转换为Date
 */
export const formatDate = (params: string | number | Date) => {
  const date = new Date(params);

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());

  const hour = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
};
