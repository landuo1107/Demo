export function downloadFromBuffer(buffer: Buffer, fileName: string) {
  const blob = new Blob([buffer]);
  const link = document.createElement("a");
  link.style.display = "none";
  const href = window.URL.createObjectURL(blob);
  link.href = href;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(href);
}

export function downloadFromUrl(url: string) {
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function openFile(
  accept: string = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
) {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    try {
      input.style.display = "none";
      input.type = "file";
      input.accept = accept;
      input.addEventListener("change", (event: any) => {
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onload = (ev) => {
          if (ev.target?.result) {
            resolve(ev.target.result);
          }
        };
        fileReader.readAsArrayBuffer(file);
      });
      document.body.appendChild(input);
      input.click();
    } finally {
      document.body.removeChild(input);
    }
  });
}
