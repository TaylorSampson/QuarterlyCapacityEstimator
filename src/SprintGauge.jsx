import GaugeChart from 'react-gauge-chart';

export default function SprintGauge({ percentage }) {
  let warning = '';
  let colors = ['#00C49F', '#00C49F', '#00C49F']; // default green

  if (percentage > 1.25) {
    warning = `🚨 Overcommitted by ${Math.round((percentage - 1) * 100)}%`;
    colors = ['#FF5F6D', '#FF5F6D', '#FF5F6D']; // red
  } else if (percentage > 1.1) {
    warning = `🟠 Overcommitted by ${Math.round((percentage - 1) * 100)}%`;
    colors = ['#FDC830', '#FF8C00', '#FF8C00']; // orange
  } else if (percentage > 1) {
    warning = `⚠️ Overcommitted by ${Math.round((percentage - 1) * 100)}%`;
    colors = ['#FDC830', '#FDC830', '#FDC830']; // yellow
  }

  // ✅ Define the clamped value here for use in the chart
  const clamped = Math.min(percentage, 1.25);

  return (
    <>
      <GaugeChart
        key={colors.join('')}
        id="sprint-load-gauge"
        nrOfLevels={3}
        percent={clamped}
        colors={colors}
        arcPadding={0.05}
        arcWidth={0.3}
        needleColor="#545454"
        needleBaseColor="#545454"
        textColor="#545454"
        animate={true}
        hideText={true}
      />

      <style jsx="true">{`
        #sprint-load-gauge .needle,
        #sprint-load-gauge .needle-base {
          transition: transform 1.2s ease-out !important;
        }
      `}</style>

      <div className="text-xl font-bold mt-4">
        {Math.round(percentage * 100)}%
      </div>

      {warning && (
        <p className="mt-1 font-semibold text-[#ff5f5f]">{warning}</p>
      )}
    </>
  );
}

