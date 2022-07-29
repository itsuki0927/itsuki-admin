const saveFile = (content: string, fileName: string, fileType?: string) => {
  const blob = new Blob([content], { type: fileType || 'text/plain' });
  if ((window as any).saveAs) {
    (window as any).saveAs(blob, fileName);
  } else {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  }
};

export default saveFile;
