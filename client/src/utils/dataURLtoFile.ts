// To convert dataUrl (which we get from our blob) to a a file object
export const dataURLtoFile = (dataurl: string, filename: string): File => {
  const arr: string[] = dataurl.split(',');
  const mime: string | null = arr[0].match(/:(.*?);/)?.[1] || '';
  const bstr: string = atob(arr[1]);
  let n: number = bstr.length;
  const u8arr: Uint8Array = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};
