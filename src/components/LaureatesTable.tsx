import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui"

export function LaureatesTable({
  data,
  handleRowClick,
  loading,
}: {
  data?: any[],
  handleRowClick: (id: number) => void,
  loading: boolean,
}) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Known as</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!loading && data?.length && data.map((laureate) => (
            <TableRow
              key={laureate.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleRowClick(laureate.id)}
            >
              <TableCell>{laureate.id}</TableCell>
              <TableCell className="font-medium">{laureate.fullName?.en || laureate.orgName?.en}</TableCell>
              <TableCell>{laureate.knownName?.en || laureate.nativeName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {(!data || !data.length) && !loading && (
        <h4 className="w-full py-3 text-2xl font-semibold text-center my-0">No data found</h4>
      )}
      {loading && (
        <h4 className="w-full py-3 text-2xl font-semibold text-center my-0 text-gray-600">Loading...</h4>
      )}
    </>
  )
}
