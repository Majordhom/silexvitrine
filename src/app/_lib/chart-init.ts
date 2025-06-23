import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

let registered = false;
export function registerChartPlugins() {
    if (!registered) {
        Chart.register(ChartDataLabels);
        registered = true;
    }
}