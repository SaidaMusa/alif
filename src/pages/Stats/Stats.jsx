import * as React from 'react';
import { BarChart} from '@mui/x-charts/BarChart';
import { PieChart, PiePlot } from '@mui/x-charts/PieChart';
import { ChartContainer } from '@mui/x-charts';
export default function Stats() {
  const pieData = [
  { id: 0, value: 10, label: 'iOS' },
  { id: 1, value: 20, label: 'Android' },
  { id: 2, value: 30, label: 'Windows' },
];
  return (
    <>
    <BarChart
      series={[
        { data: [35, 44, 24, 34] },
        { data: [51, 6, 49, 30] },
        { data: [15, 25, 30, 50] },
        { data: [60, 50, 15, 25] },
      ]}
      height={290}
      xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
    />


<PieChart series={[{ data: pieData }]} skipAnimation />
<ChartContainer>
  <PiePlot skipAnimation />
</ChartContainer>

  

  </>
  );
}