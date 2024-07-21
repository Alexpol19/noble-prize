import React from "react"
import { TimeSeriesChart } from "./TimeSeriesChart";
import LaureatesModal from "./LaureatesModal";

export function LaureatesNumberChart({
  title,
  subtitle,
  data,
}: {
  title: string,
  subtitle: string,
  data: Record<string, any>
}) {
  const [laureatesPerYear, setLaureatesPerYear] = React.useState(null)
  const [laureatesYear, setLaureatesYear] = React.useState<string | null>(null)

  const chartData = React.useMemo(() => {
    return [...Object.entries(data).map((item)=>({
      key: item[0],
      value: item[1].length,
    }))]
  }, [data]);

  const onChartClick = (activeLabel?: string) => {
    setLaureatesPerYear(activeLabel ? data[activeLabel] : null)
    setLaureatesYear(activeLabel || null)
  }

  return (
    <>
      <TimeSeriesChart
        title={title}
        subtitle={subtitle}
        tooltipLabel="Number of laureates"
        data={chartData}
        onChartClick={onChartClick}
      />
      <LaureatesModal
        laureates={laureatesPerYear || []}
        awardYear={laureatesYear}
        open={!!laureatesPerYear}
        onOpenChange={(open) => !open && onChartClick()}
      />
    </>
  )
}
