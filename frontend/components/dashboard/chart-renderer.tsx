"use client";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, MousePointerClick, Target, Download, FileText } from "lucide-react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { parse } from "papaparse";

interface ChartData {
    date?: string;
    Spend?: number;
    ROAS?: number;
    Clicks?: number;
    Conversions?: number;
    [key: string]: string | number | undefined;
}

interface CampaignData {
    campaign: string;
    impressions: number;
    clicks: number;
    spend: number;
    cpc: number;
    ctr: number;
    conversions: number;
    roas: number;
    quality_score?: number;
}

interface ChartRendererProps {
    type: string;
    data: ChartData[] | CampaignData[] | { meta: ChartData[]; google: ChartData[] } | { meta: CampaignData[]; google: CampaignData[] } | null;
}

const formatCurrency = (value: number) => `$${value.toLocaleString()}`;
const formatNumber = (value: number) => value.toLocaleString();

function ExportButtons({ data, filename, type }: { data: any; filename: string; type: string }) {
    const exportToPDF = () => {
        const doc = new jsPDF();

        // Add title
        doc.setFontSize(20);
        doc.setTextColor(99, 102, 241);
        doc.text("Marketing Agent Report", 105, 15, { align: "center" });

        doc.setFontSize(10);
        doc.setTextColor(107, 114, 128);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 105, 22, { align: "center" });

        // Add data based on type
        if (type.includes("campaign")) {
            const tableData = Array.isArray(data) ? data : [...(data.meta || []), ...(data.google || [])];
            autoTable(doc, {
                startY: 30,
                head: [['Campaign', 'Impressions', 'Clicks', 'CTR %', 'Spend', 'CPC', 'Conv.', 'ROAS']],
                body: tableData.map((row: CampaignData) => [
                    row.campaign,
                    formatNumber(row.impressions),
                    formatNumber(row.clicks),
                    row.ctr.toFixed(2),
                    formatCurrency(row.spend),
                    `$${row.cpc.toFixed(2)}`,
                    formatNumber(row.conversions),
                    `${row.roas.toFixed(2)}x`
                ]),
                theme: 'grid',
                headStyles: { fillColor: [99, 102, 241], textColor: 255 },
                styles: { fontSize: 9 }
            });
        } else {
            const chartData = Array.isArray(data) ? data : data.meta || [];
            autoTable(doc, {
                startY: 30,
                head: [['Date', 'Spend', 'ROAS', 'Clicks']],
                body: chartData.map((row: ChartData) => [
                    row.date || '',
                    formatCurrency(row.Spend || 0),
                    `${(row.ROAS || 0).toFixed(2)}x`,
                    formatNumber(row.Clicks || 0)
                ]),
                theme: 'grid',
                headStyles: { fillColor: [99, 102, 241], textColor: 255 },
                styles: { fontSize: 10 }
            });
        }

        doc.save(`${filename}.pdf`);
    };

    const exportToCSV = () => {
        let csvData: string;

        if (type.includes("campaign")) {
            const tableData = Array.isArray(data) ? data : [...(data.meta || []), ...(data.google || [])];
            const headers = 'Campaign,Impressions,Clicks,CTR %,Spend,CPC,Conversions,ROAS\n';
            const rows = tableData.map((row: CampaignData) =>
                `"${row.campaign}",${row.impressions},${row.clicks},${row.ctr.toFixed(2)},${row.spend},${row.cpc.toFixed(2)},${row.conversions},${row.roas.toFixed(2)}`
            ).join('\n');
            csvData = headers + rows;
        } else {
            const chartData = Array.isArray(data) ? data : data.meta || [];
            const headers = 'Date,Spend,ROAS,Clicks\n';
            const rows = chartData.map((row: ChartData) =>
                `${row.date},${row.Spend || 0},${(row.ROAS || 0).toFixed(2)},${row.Clicks || 0}`
            ).join('\n');
            csvData = headers + rows;
        }

        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="flex gap-2">
            <button
                onClick={exportToPDF}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
                <FileText className="w-4 h-4" />
                <span className="text-sm font-medium">Export PDF</span>
            </button>
            <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl"
            >
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Export CSV</span>
            </button>
        </div>
    );
}

function MetricCard({ title, value, trend, icon: Icon, gradient }: {
    title: string;
    value: string;
    trend?: number;
    icon: React.ElementType;
    gradient: string;
}) {
    const isPositive = trend && trend > 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="metric-card group"
        >
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm text-gray-600 font-medium mb-1">{title}</p>
                    <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
                    {trend !== undefined && (
                        <div className="flex items-center gap-1">
                            {isPositive ? (
                                <TrendingUp className="w-4 h-4 text-emerald-500" />
                            ) : (
                                <TrendingDown className="w-4 h-4 text-red-500" />
                            )}
                            <span className={`text-sm font-semibold ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                                {Math.abs(trend).toFixed(1)}%
                            </span>
                            <span className="text-xs text-gray-500">vs last period</span>
                        </div>
                    )}
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>
        </motion.div>
    );
}

function PerformanceChart({ data, title, platform }: { data: ChartData[]; title: string; platform: "meta" | "google" }) {
    const totalSpend = data.reduce((acc, d) => acc + (d.Spend || 0), 0);
    const avgRoas = data.reduce((acc, d) => acc + (d.ROAS || 0), 0) / data.length;
    const totalClicks = data.reduce((acc, d) => acc + (d.Clicks || 0), 0);

    const platformGradient = platform === "meta" ? "from-[#6a9dbe] to-[#4a7d9e]" : "from-[#8ab5d1] to-[#6a9dbe]";
    const platformName = platform === "meta" ? "Meta" : "Google";

    // Transform data for Nivo
    const lineData = [
        {
            id: "Spend",
            color: platform === "meta" ? "hsl(221, 83%, 53%)" : "hsl(158, 64%, 52%)",
            data: data.map(d => ({ x: d.date || '', y: d.Spend || 0 }))
        },
        {
            id: "Clicks",
            color: "hsl(271, 91%, 65%)",
            data: data.map(d => ({ x: d.date || '', y: d.Clicks || 0 }))
        }
    ];

    const roasData = [{
        id: "ROAS",
        color: "hsl(152, 69%, 31%)",
        data: data.map(d => ({ x: d.date || '', y: d.ROAS || 0 }))
    }];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-bold gradient-text">{title}</h3>
                    <p className="text-sm text-gray-600 mt-1">Daily performance over the last 7 days</p>
                </div>
                <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${platformGradient} text-white font-semibold shadow-lg`}>
                    {platformName} Ads
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MetricCard
                    title="Total Spend"
                    value={formatCurrency(totalSpend)}
                    trend={12.5}
                    icon={DollarSign}
                    gradient={platformGradient}
                />
                <MetricCard
                    title="Avg. ROAS"
                    value={`${avgRoas.toFixed(2)}x`}
                    trend={avgRoas > 2.5 ? 8.2 : -3.1}
                    icon={Target}
                    gradient="from-purple-500 to-pink-600"
                />
                <MetricCard
                    title="Total Clicks"
                    value={formatNumber(totalClicks)}
                    trend={15.7}
                    icon={MousePointerClick}
                    gradient="from-amber-500 to-orange-600"
                />
            </div>

            <div className="chart-container">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-800">Spend & Clicks Trend</h4>
                    <ExportButtons data={data} filename={`${platform}-performance`} type="performance" />
                </div>
                <div style={{ height: 300 }}>
                    <ResponsiveLine
                        data={lineData}
                        margin={{ top: 20, right: 120, bottom: 60, left: 80 }}
                        xScale={{ type: 'point' }}
                        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false }}
                        curve="cardinal"
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: -45,
                            legend: 'Date',
                            legendOffset: 50,
                            legendPosition: 'middle'
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Value',
                            legendOffset: -60,
                            legendPosition: 'middle',
                            format: value => formatCurrency(value)
                        }}
                        colors={{ datum: 'color' }}
                        pointSize={8}
                        pointColor={{ from: 'color' }}
                        pointBorderWidth={2}
                        pointBorderColor={{ from: 'serieColor' }}
                        pointLabelYOffset={-12}
                        enableArea={true}
                        areaOpacity={0.1}
                        useMesh={true}
                        legends={[
                            {
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: false,
                                translateX: 100,
                                translateY: 0,
                                itemsSpacing: 0,
                                itemDirection: 'left-to-right',
                                itemWidth: 80,
                                itemHeight: 20,
                                itemOpacity: 0.75,
                                symbolSize: 12,
                                symbolShape: 'circle',
                            }
                        ]}
                        theme={{
                            axis: {
                                ticks: {
                                    text: { fill: '#6b7280', fontSize: 11 }
                                },
                                legend: {
                                    text: { fill: '#374151', fontSize: 12, fontWeight: 600 }
                                }
                            },
                            grid: {
                                line: { stroke: '#e5e7eb', strokeWidth: 1 }
                            }
                        }}
                    />
                </div>
            </div>

            <div className="chart-container">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">ROAS Trend</h4>
                <div style={{ height: 200 }}>
                    <ResponsiveLine
                        data={roasData}
                        margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
                        xScale={{ type: 'point' }}
                        yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
                        curve="monotoneX"
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: -45
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            format: value => `${value}x`
                        }}
                        colors={['#10b981']}
                        pointSize={10}
                        pointColor="#10b981"
                        pointBorderWidth={2}
                        pointBorderColor="#fff"
                        enableArea={true}
                        areaBaselineValue={0}
                        areaOpacity={0.2}
                        useMesh={true}
                        theme={{
                            axis: {
                                ticks: {
                                    text: { fill: '#6b7280', fontSize: 11 }
                                }
                            },
                            grid: {
                                line: { stroke: '#e5e7eb', strokeWidth: 1 }
                            }
                        }}
                    />
                </div>
            </div>
        </motion.div>
    );
}

function ComparisonChart({ data }: { data: { meta: ChartData[]; google: ChartData[] } }) {
    const metaTotalSpend = data.meta.reduce((acc, d) => acc + (d.Spend || 0), 0);
    const googleTotalSpend = data.google.reduce((acc, d) => acc + (d.Spend || 0), 0);

    const pieData = [
        { id: "Meta Ads", label: "Meta Ads", value: metaTotalSpend, color: "hsl(221, 83%, 53%)" },
        { id: "Google Ads", label: "Google Ads", value: googleTotalSpend, color: "hsl(158, 64%, 52%)" }
    ];

    // Combine data for comparison
    const barData = data.meta.map((m, i) => ({
        date: m.date || '',
        Meta: m.Spend || 0,
        Google: data.google[i]?.Spend || 0
    }));

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <div>
                <h3 className="text-2xl font-bold gradient-text">Platform Comparison</h3>
                <p className="text-sm text-gray-600 mt-1">Side-by-side performance analysis</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="chart-container">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Spend Distribution</h4>
                    <div style={{ height: 250 }}>
                        <ResponsivePie
                            data={pieData}
                            margin={{ top: 20, right: 80, bottom: 20, left: 80 }}
                            innerRadius={0.6}
                            padAngle={2}
                            cornerRadius={4}
                            activeOuterRadiusOffset={8}
                            colors={{ datum: 'data.color' }}
                            borderWidth={2}
                            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                            arcLinkLabelsSkipAngle={10}
                            arcLinkLabelsTextColor="#374151"
                            arcLinkLabelsThickness={2}
                            arcLinkLabelsColor={{ from: 'color' }}
                            arcLabelsSkipAngle={10}
                            arcLabelsTextColor="#ffffff"
                            valueFormat={value => formatCurrency(value)}
                        />
                    </div>
                </div>

                <div className="chart-container">
                    <div className="grid grid-cols-2 gap-4 h-full content-center">
                        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                            <p className="text-sm text-gray-600 mb-1">Meta Total</p>
                            <p className="text-3xl font-bold text-blue-600">{formatCurrency(metaTotalSpend)}</p>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50">
                            <p className="text-sm text-gray-600 mb-1">Google Total</p>
                            <p className="text-3xl font-bold text-emerald-600">{formatCurrency(googleTotalSpend)}</p>
                        </div>
                        <div className="col-span-2 text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50">
                            <p className="text-sm text-gray-600 mb-1">Combined Spend</p>
                            <p className="text-4xl font-bold gradient-text">{formatCurrency(metaTotalSpend + googleTotalSpend)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="chart-container">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-800">Daily Spend Comparison</h4>
                    <ExportButtons data={data} filename="platform-comparison" type="comparison" />
                </div>
                <div style={{ height: 300 }}>
                    <ResponsiveBar
                        data={barData}
                        keys={['Meta', 'Google']}
                        indexBy="date"
                        margin={{ top: 20, right: 130, bottom: 60, left: 80 }}
                        padding={0.3}
                        groupMode="grouped"
                        valueScale={{ type: 'linear' }}
                        indexScale={{ type: 'band', round: true }}
                        colors={['#667eea', '#10b981']}
                        borderRadius={8}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: -45,
                            legend: 'Date',
                            legendPosition: 'middle',
                            legendOffset: 50
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Spend ($)',
                            legendPosition: 'middle',
                            legendOffset: -60,
                            format: value => formatCurrency(value)
                        }}
                        labelSkipWidth={12}
                        labelSkipHeight={12}
                        labelTextColor="#ffffff"
                        legends={[
                            {
                                dataFrom: 'keys',
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: false,
                                translateX: 120,
                                translateY: 0,
                                itemsSpacing: 2,
                                itemWidth: 100,
                                itemHeight: 20,
                                itemDirection: 'left-to-right',
                                itemOpacity: 0.85,
                                symbolSize: 20,
                            }
                        ]}
                        theme={{
                            axis: {
                                ticks: {
                                    text: { fill: '#6b7280', fontSize: 11 }
                                },
                                legend: {
                                    text: { fill: '#374151', fontSize: 12, fontWeight: 600 }
                                }
                            },
                            grid: {
                                line: { stroke: '#e5e7eb', strokeWidth: 1 }
                            }
                        }}
                    />
                </div>
            </div>
        </motion.div>
    );
}

function CampaignTable({ data, platform }: { data: CampaignData[]; platform: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="chart-container"
        >
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h4 className="text-xl font-bold text-gray-900">Campaign Performance</h4>
                    <p className="text-sm text-gray-600">Detailed breakdown by campaign</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className={`px-4 py-2 rounded-full ${platform === "meta"
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                        : "bg-gradient-to-r from-emerald-500 to-teal-600"
                        } text-white font-semibold shadow-lg`}>
                        {platform === "meta" ? "Meta" : "Google"} Ads
                    </div>
                    <ExportButtons data={data} filename={`${platform}-campaigns`} type="campaign" />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b-2 border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                            <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Campaign</th>
                            <th className="text-right py-4 px-4 text-sm font-semibold text-gray-700">Impressions</th>
                            <th className="text-right py-4 px-4 text-sm font-semibold text-gray-700">Clicks</th>
                            <th className="text-right py-4 px-4 text-sm font-semibold text-gray-700">CTR</th>
                            <th className="text-right py-4 px-4 text-sm font-semibold text-gray-700">Spend</th>
                            <th className="text-right py-4 px-4 text-sm font-semibold text-gray-700">CPC</th>
                            <th className="text-right py-4 px-4 text-sm font-semibold text-gray-700">Conv.</th>
                            <th className="text-right py-4 px-4 text-sm font-semibold text-gray-700">ROAS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((campaign, index) => (
                            <motion.tr
                                key={campaign.campaign}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all"
                            >
                                <td className="py-4 px-4 text-gray-900 font-medium">{campaign.campaign}</td>
                                <td className="py-4 px-4 text-right text-gray-700">{formatNumber(campaign.impressions)}</td>
                                <td className="py-4 px-4 text-right text-gray-700">{formatNumber(campaign.clicks)}</td>
                                <td className="py-4 px-4 text-right text-gray-700">{campaign.ctr.toFixed(2)}%</td>
                                <td className="py-4 px-4 text-right text-gray-700 font-semibold">{formatCurrency(campaign.spend)}</td>
                                <td className="py-4 px-4 text-right text-gray-700">${campaign.cpc.toFixed(2)}</td>
                                <td className="py-4 px-4 text-right text-gray-700">{formatNumber(campaign.conversions)}</td>
                                <td className="py-4 px-4 text-right">
                                    <span className={`badge ${campaign.roas >= 3 ? 'badge-success' : campaign.roas >= 2 ? 'badge-warning' : 'badge-primary'
                                        }`}>
                                        {campaign.roas.toFixed(2)}x
                                    </span>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}

export function ChartRenderer({ type, data }: ChartRendererProps) {
    if (!data) return null;

    switch (type) {
        case "meta_performance_chart":
            return <PerformanceChart data={data as ChartData[]} title="Meta Ads Performance" platform="meta" />;

        case "google_performance_chart":
            return <PerformanceChart data={data as ChartData[]} title="Google Ads Performance" platform="google" />;

        case "comparison_chart":
            return <ComparisonChart data={data as { meta: ChartData[]; google: ChartData[] }} />;

        case "meta_campaign_table":
            return <CampaignTable data={data as CampaignData[]} platform="meta" />;

        case "google_campaign_table":
            return <CampaignTable data={data as CampaignData[]} platform="google" />;

        case "all_campaigns_table":
            const allData = data as { meta: CampaignData[]; google: CampaignData[] };
            return (
                <div className="space-y-6">
                    <CampaignTable data={allData.meta} platform="meta" />
                    <CampaignTable data={allData.google} platform="google" />
                </div>
            );

        default:
            return null;
    }
}
