import React from "react"
import { TimeSeriesChart } from "./TimeSeriesChart";
import PrizesModal from "./PrizesModal";

export function PrizeAmountChart({
  title,
  subtitle,
  data,
}: {
  title: string,
  subtitle: string,
  data: Record<string, any>
}) {
  const [prizesPerYear, setPrizesPerYear] = React.useState(null);
  const [prizesYear, setPrizesYear] = React.useState<string | null>(null)

  const chartData = React.useMemo(() => {
    return Object.entries(data).map(([key, values]) => ({
      key,
      value: values[0]?.prizeAmountAdjusted ?? 0,
    }));
  }, [data]);

  const onChartClick = (activeLabel?: string) => {
    setPrizesPerYear(activeLabel ? data[activeLabel] : null)
    setPrizesYear(activeLabel || null)
  }

  return (
    <>
      <TimeSeriesChart
        title={title}
        subtitle={subtitle}
        tooltipLabel="Adjusted award amount"
        data={chartData}
        onChartClick={onChartClick}
      />
      <PrizesModal
        prizes={prizesPerYear || []}
        awardYear={prizesYear}
        loading={false}
        open={!!prizesPerYear}
        onOpenChange={(open) => !open && onChartClick()}
      />
    </>
  )
}
