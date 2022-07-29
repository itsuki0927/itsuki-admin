// TODO: Clipboard Api

/**
 * 剪切板复制
 *
 * @param str 需要复制的内容
 */
export const copy = (str: string) => {
  const temp = document.createElement('textarea');
  temp.value = str;
  temp.setAttribute('readonly', '');
  temp.style.position = 'absolute';
  temp.style.left = '-99999px';
  document.body.appendChild(temp);

  const rangeCount = document.getSelection()?.rangeCount || 0;
  const select = rangeCount > 0 ? document.getSelection()?.getRangeAt(0) : null;
  temp.select();
  document.execCommand('copy');

  document.body.removeChild(temp);
  if (select) {
    document.getSelection()?.removeAllRanges();
    document.getSelection()?.addRange(select);
  }
};
