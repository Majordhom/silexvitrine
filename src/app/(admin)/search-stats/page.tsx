"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Enregistrement du plugin datalabels (une seule fois)
if (!(Chart as any)._datalabelsRegistered) {
    Chart.register(ChartDataLabels);
    (Chart as any)._datalabelsRegistered = true;
}

// Palettes de couleurs par graphique
const yellowPalette = [
    "#FBBF24", "#F59E42", "#F59E1B", "#FDE68A", "#FCA311", "#FFD166", "#FFB703", "#FF8800", "#FFB347", "#FF9900"
];
const bluePalette = [
    "#3B82F6", "#60A5FA", "#2563EB", "#1D4ED8", "#93C5FD", "#BFDBFE", "#0EA5E9", "#38BDF8", "#0284C7", "#0369A1"
];
const greenPalette = [
    "#4ADE80", "#22D3EE", "#6EE7B7", "#A7F3D0", "#34D399", "#10B981", "#6EE7B7", "#BBF7D0", "#86EFAC", "#99F6E4"
];
const purplePalette = [
    "#A78BFA", "#C4B5FD", "#8B5CF6", "#7C3AED", "#C084FC", "#E9D5FF", "#A21CAF", "#9333EA", "#D8B4FE", "#7C3AED"
];

// Fonction pour calculer la luminance d'une couleur hex
function getLuminance(hex: string) {
    const c = hex.replace("#", "");
    const r = parseInt(c.substring(0, 2), 16) / 255;
    const g = parseInt(c.substring(2, 4), 16) / 255;
    const b = parseInt(c.substring(4, 6), 16) / 255;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Retourne la couleur du texte en fonction du fond
function getLabelColor(bg: string) {
    return getLuminance(bg) > 0.7 ? "#222" : "#fff";
}

// Hook pour détecter la largeur de l'écran (mobile): useLayoutEffect pour la synchro immédiate
function useIsMobile(breakpoint = 640) {
    const [isMobile, setIsMobile] = useState(false);
    useLayoutEffect(() => {
        const check = () => setIsMobile(window.innerWidth < breakpoint);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, [breakpoint]);
    return isMobile;
}

const barOptionsBase = (isMobile: boolean) => ({
    responsive: true,
    plugins: {
        legend: { display: false },
        datalabels: {
            anchor: "center" as const,
            align: "center" as const,
            display: !isMobile,
            formatter: (value: number, context: any) => {
                if (value > 0) {
                    return context.dataset.label;
                }
                return "";
            },
        },
        tooltip: { enabled: true }
    },
    scales: {
        x: {
            grid: { display: false },
            ticks: {
                color: "#1e293b",
                font: { size: 12 },
                maxRotation: 0,
                minRotation: 0,
                callback: (value: any) => value === 0 || value === "0" ? "" : value // Masque le tick "0"
            },
            barPercentage: 0.4,
            categoryPercentage: 0.6,
            stacked: false,
        },
        y: {
            grid: { color: "#e5e7eb" },
            ticks: {
                display: true, // Affiche les valeurs de l’axe vertical
                color: "#64748b",
                font: { size: 12 },
                stepSize: 1,
                callback: (value: any) => Number.isInteger(value) ? value : null
            },
            beginAtZero: true,
            stacked: false,
        }
    }
});

type Period = "day" | "week" | "month" | "year" | "custom";
type StatsData = {
    dates: string[];
    pieces: Record<string, number[]>;
    types: Record<string, number[]>;
    prix: Record<string, number[]>;
    secteurs: Record<string, number[]>;
};

async function fetchStats(period: Period, start?: Date, end?: Date): Promise<StatsData> {
    const params = new URLSearchParams({ period });
    if (start) params.append("start", start.toISOString());
    if (end) params.append("end", end.toISOString());
    const res = await fetch(`/api/admin/search-stats?${params.toString()}`);
    return res.json();
}

// Affichage de la période choisie
function renderPeriod(period: Period, dates: string[], start: Date | null, end: Date | null) {
    if (!dates?.length) return null;
    if (period === "custom" && start && end) {
        return (
            <div className="text-xs text-gray-500 mt-1">
                Période: {start.toLocaleDateString()} au {end.toLocaleDateString()}
            </div>
        );
    }
    // Pour les autres périodes, on affiche la première et la dernière date
    return (
        <div className="text-xs text-gray-500 mt-1">
            Période: {dates[0]} au {dates[dates.length - 1]}
        </div>
    );
}

export default function SearchStatsPage() {
    const [period, setPeriod] = useState<Period>("day");
    const [start, setStart] = useState<Date | null>(null);
    const [end, setEnd] = useState<Date | null>(null);
    const [data, setData] = useState<StatsData | null>(null);
    const [loading, setLoading] = useState(false);

    const isMobile = useIsMobile();

    useEffect(() => {
        setLoading(true);
        fetchStats(period, start ?? undefined, end ?? undefined).then((d) => {
            setData(d);
            setLoading(false);
        });
    }, [period, start, end]);

    // Génère les datasets avec coins arrondis en haut et palette personnalisée + couleur label adaptée
    const makeDatasets = (obj: Record<string, number[]>, palette: string[]) =>
        Object.entries(obj ?? {}).map(([label, values], i) => {
            const bg = palette[i % palette.length];
            return {
                label,
                data: values,
                backgroundColor: bg,
                datalabels: {
                    display: !isMobile,
                    color: getLabelColor(bg),
                    font: { weight: "bold" as const }
                },
                borderRadius: { topLeft: 8, topRight: 8, bottomLeft: 0, bottomRight: 0 }
            };
        });

    // Génère la légende personnalisée (pastilles + label)
    const renderLegend = (obj: Record<string, number[]>, palette: string[]) => (
        <div className="flex flex-wrap gap-2 mt-2">
            {Object.entries(obj ?? {}).map(([label], i) => (
                <span key={label} className="flex items-center gap-1 text-xs">
                    <span
                        className="inline-block w-3 h-3 rounded-full"
                        style={{ background: palette[i % palette.length] }}
                    />
                    {label}
                </span>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto bg-white rounded shadow p-8">
                <h1 className="text-3xl font-bold mb-6">Statistiques des recherches</h1>
                <div className="flex flex-wrap gap-4 items-center mb-8">
                    <label>Période :</label>
                    <select
                        className="border rounded px-2 py-1"
                        value={period}
                        onChange={(e) => setPeriod(e.target.value as Period)}
                    >
                        <option value="day">Jour</option>
                        <option value="week">Semaine</option>
                        <option value="month">Mois</option>
                        <option value="year">Année</option>
                        <option value="custom">Personnalisée</option>
                    </select>
                    {period === "custom" && (
                        <>
                            <DatePicker
                                selected={start}
                                onChange={(date) => setStart(date)}
                                selectsStart
                                startDate={start}
                                endDate={end}
                                placeholderText="Début"
                                className="border rounded px-2 py-1"
                            />
                            <DatePicker
                                selected={end}
                                onChange={(date) => setEnd(date)}
                                selectsEnd
                                startDate={start}
                                endDate={end}
                                minDate={start ?? undefined}
                                placeholderText="Fin"
                                className="border rounded px-2 py-1"
                            />
                        </>
                    )}
                </div>
                {loading && <div>Chargement...</div>}
                {data && (
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Nombre de pièces recherchées</h2>
                            <Bar
                                key={"pieces-" + (isMobile ? "mobile" : "desktop")}
                                data={{
                                    labels: data.dates,
                                    datasets: makeDatasets(data.pieces ?? {}, yellowPalette)
                                }}
                                options={barOptionsBase(isMobile)}
                                plugins={[ChartDataLabels]}
                            />
                            {renderPeriod(period, data.dates, start, end)}
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Types de biens recherchés</h2>
                            <Bar
                                key={"types-" + (isMobile ? "mobile" : "desktop")}
                                data={{
                                    labels: data.dates,
                                    datasets: makeDatasets(data.types ?? {}, bluePalette)
                                }}
                                options={barOptionsBase(isMobile)}
                                plugins={[ChartDataLabels]}
                            />
                            {renderPeriod(period, data.dates, start, end)}
                            {isMobile && renderLegend(data.types, bluePalette)}
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Fourchettes de prix recherchés</h2>
                            <Bar
                                key={"prix-" + (isMobile ? "mobile" : "desktop")}
                                data={{
                                    labels: data.dates,
                                    datasets: makeDatasets(data.prix ?? {}, greenPalette)
                                }}
                                options={barOptionsBase(isMobile)}
                                plugins={[ChartDataLabels]}
                            />
                            {renderPeriod(period, data.dates, start, end)}
                            {isMobile && renderLegend(data.prix, greenPalette)}
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Secteurs les plus recherchés</h2>
                            <Bar
                                key={"secteurs-" + (isMobile ? "mobile" : "desktop")}
                                data={{
                                    labels: data.dates,
                                    datasets: makeDatasets(data.secteurs ?? {}, purplePalette)
                                }}
                                options={barOptionsBase(isMobile)}
                                plugins={[ChartDataLabels]}
                            />
                            {renderPeriod(period, data.dates, start, end)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}