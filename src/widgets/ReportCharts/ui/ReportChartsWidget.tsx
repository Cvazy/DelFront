import React from "react";
import { Box } from "@mui/material";
import { ChartDataItem } from "entities/report";
import { ChartContainer } from "./ChartContainer";
import { PieChartComponent } from "./PieChartComponent";
import { BarChartComponent } from "./BarChartComponent";
import { ChartLoading } from "./ChartLoading";

interface ReportChartsWidgetProps {
  isLoading: boolean;
  chartDataModels: ChartDataItem[];
  chartDataStatus: ChartDataItem[];
  chartDataServices: ChartDataItem[];
  chartDataDistance: ChartDataItem[];
}

export const ReportChartsWidget: React.FC<ReportChartsWidgetProps> = ({
  isLoading,
  chartDataModels,
  chartDataStatus,
  chartDataServices,
  chartDataDistance,
}) => {
  if (isLoading) {
    return <ChartLoading />;
  }

  console.log("chartDataModels:", chartDataModels);
  console.log("chartDataStatus:", chartDataStatus);
  console.log("chartDataServices:", chartDataServices);
  console.log("chartDataDistance:", chartDataDistance);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3, mb: 4 }}>
      {/* График по моделям транспорта */}
      <ChartContainer
        title="Доставки по моделям"
        hasData={chartDataModels.length > 0}
      >
        <PieChartComponent data={chartDataModels} />
      </ChartContainer>

      {/* График по статусам */}
      <ChartContainer
        title="Статусы доставок"
        hasData={chartDataStatus.length > 0}
      >
        <PieChartComponent data={chartDataStatus} />
      </ChartContainer>

      {/* График по услугам */}
      <ChartContainer title="Услуги" hasData={chartDataServices.length > 0}>
        <PieChartComponent data={chartDataServices} />
      </ChartContainer>

      {/* График по дистанции */}
      <ChartContainer
        title="Распределение по дистанции"
        hasData={chartDataDistance.length > 0}
        gridSpan={{ xs: "span 12", md: "span 12" }}
      >
        <BarChartComponent data={chartDataDistance} />
      </ChartContainer>
    </Box>
  );
};
