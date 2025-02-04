import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";

export const StudentTable = ({
    title,
    data,
    columns,
  }: {
    title: string;
    data: { [key: string]: string }[];
    columns: string[];
    
  }) => {
    console.log("📌 Datos de StudentTable:", data); 
    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold bg-customBlue text-white px-4 py-2 rounded-md text-center">
          {title}
        </h3>
        <div className="overflow-x-auto mt-2">
          <Table className="w-full border border-gray-300 dark:border-gray-700 rounded-lg">
            <TableHeader>
              <TableRow className="bg-neutral-300 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-100">
                {columns.map((col, index) => (
                  <TableHead key={index} className="text-center px-4 py-2">
                    {col}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex} className="border-b">
                  {columns.map((col, colIndex) => (
                    <TableCell key={colIndex} className="px-4 py-2 text-neutral-800 dark:text-neutral-200 text-center">
                      {row[col.toLowerCase()] || "N/A"}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  };
  