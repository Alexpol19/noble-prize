import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui"

export function SelectYearRange({
  value,
  handleChangeValue,
}: {
  value: string,
  handleChangeValue: (value: string) => void;
}) {
  return (
    <Select value={value} onValueChange={handleChangeValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select year range" />
      </SelectTrigger>
      <SelectContent className="bg-white">
          <SelectItem value="1901-1909">1901-1909</SelectItem>
          <SelectItem value="1910-1919">1910-1919</SelectItem>
          <SelectItem value="1920-1929">1920-1929</SelectItem>
          <SelectItem value="1930-1939">1930-1939</SelectItem>
          <SelectItem value="1940-1949">1940-1949</SelectItem>
          <SelectItem value="1950-1959">1950-1959</SelectItem>
          <SelectItem value="1960-1969">1960-1969</SelectItem>
          <SelectItem value="1970-1979">1970-1979</SelectItem>
          <SelectItem value="1980-1989">1980-1989</SelectItem>
          <SelectItem value="1990-1999">1990-1999</SelectItem>
          <SelectItem value="2000-2009">2000-2009</SelectItem>
          <SelectItem value="2010-2019">2010-2019</SelectItem>
          <SelectItem value="2020-2024">2020-2024</SelectItem>
      </SelectContent>
    </Select>
  )
}
