import Excel from "exceljs";

export async function readExcelFromBuffer(buffer: ArrayBuffer) {
  const workbook = new Excel.Workbook();
  return await workbook.xlsx.load(buffer);
}

export function getRowsFromWorkbook(workbook: Excel.Workbook, keys: string[]) {
  const rows: Record<string, Excel.CellValue>[] = [];
  workbook.eachSheet((sheet) => {
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as Excel.CellValue[];
      const target: Record<string, Excel.CellValue> = {};
      values.map((item, idx) => {
        target[keys[idx - 1]] = item;
      });
      rows.push(target);
    });
  });
  return rows;
}
