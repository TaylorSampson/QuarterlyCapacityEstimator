import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScenarioChart from './ScenarioChart';
import SprintGauge from './SprintGauge';

export default function CapacityEstimator() {
  const [velocity, setVelocity] = useState(0);
  const [teamSize, setTeamSize] = useState(0);
  const [removeDays, setRemoveDays] = useState(0);
  const [holidays, setHolidays] = useState(0);

  const [results, setResults] = useState(null);
  const [chartData, setChartData] = useState([]);

  // Experimental inputs
  const [plannedPoints, setPlannedPoints] = useState(0);
  const [expAddEng, setExpAddEng] = useState(0);
  const [expRemoveEng, setExpRemoveEng] = useState(0);
  const [expExtraOOO, setExpExtraOOO] = useState(0);

  const sprints = 6;
  const sprintLength = 10;

  const calculate = (e) => {
    e.preventDefault();
    const maxQuarterCapacity = velocity * sprints;
    const pointsPerPerson = teamSize > 0 ? velocity / teamSize : 0;
    const pointsPerDay = pointsPerPerson / sprintLength;

    const oooAdjustment = removeDays * pointsPerDay;
    const holidayAdjustment = holidays * pointsPerDay * teamSize;
    const totalAdjustments = oooAdjustment + holidayAdjustment;

    const maxAvailableCapacity = maxQuarterCapacity - totalAdjustments;
    const adjustedWithReserve = maxAvailableCapacity * 0.8;

    setResults({
      maxQuarterCapacity: Math.round(maxQuarterCapacity),
      maxWithVariance: Math.round(maxAvailableCapacity),
      adjustedWithReserve: Math.round(adjustedWithReserve),
    });
  };

  useEffect(() => {
    if (!results) return;

    const pointsPerPerson = teamSize > 0 ? velocity / teamSize : 0;
    const pointsPerDay = pointsPerPerson / sprintLength;

    const baseCapacity = velocity * sprints;
    const baseAdjustments = removeDays * pointsPerDay + holidays * pointsPerDay * teamSize;

    const scenarioData = [
      { name: 'Max Capacity', capacity: results.maxQuarterCapacity },
      { name: 'Adjusted Capacity', capacity: results.maxWithVariance },
      { name: 'With Reserve (80%)', capacity: results.adjustedWithReserve }
    ];

    if (expAddEng > 0) {
      const addedEffort = expAddEng * 0.75;
      const extraCapacity = (velocity / teamSize) * addedEffort * sprints;
      const cap = results.maxWithVariance + extraCapacity;
      scenarioData.push({ name: `➕ Add ${expAddEng} Engineer(s)`, capacity: Math.round(cap) });
    }

    if (expRemoveEng > 0) {
      const removedEffort = expRemoveEng;
      const lostCapacity = (velocity / teamSize) * removedEffort * sprints;
      const cap = teamSize > expRemoveEng
        ? results.maxWithVariance - lostCapacity
        : 0;
      scenarioData.push({ name: `➖ Remove ${expRemoveEng} Engineer(s)`, capacity: Math.round(cap) });
    }

    if (expExtraOOO > 0) {
      const newAdjustments = (removeDays + expExtraOOO) * pointsPerDay + holidays * pointsPerDay * teamSize;
      const cap = baseCapacity - newAdjustments;
      scenarioData.push({ name: `🕓 Add ${expExtraOOO} OOO Day(s)`, capacity: Math.round(cap) });
    }

    setChartData(scenarioData);
  }, [results, expAddEng, expRemoveEng, expExtraOOO]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#edf0f2] to-[#f6f8fa] font-nunito p-4">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center py-8 bg-gradient-to-r from-[#3f5de1] to-[#4a39a6] text-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold">Quarterly Capacity Estimator</h1>
          <p className="mt-2">Use this to build a baseline estimation for your team's upcoming Quarter</p>
        </motion.div>

        <form onSubmit={calculate} className="bg-white mt-6 p-6 rounded-md shadow-md">
          <fieldset className="mb-4">
            <legend className="text-xl font-bold text-[#545454] mb-2">Team Baseline Data</legend>

            <label className="block mb-2">Average velocity from the last 6 sprints:
              <input type="text" inputMode="numeric" value={velocity} onFocus={e => setTimeout(() => e.target.select(), 0)} onChange={e => setVelocity(+e.target.value.replace(/\D/g, ""))} className="block w-full mt-1 p-2 border rounded-md" required />
            </label>

            <label className="block mb-2">Number of Engineers on the team:
              <input type="text" inputMode="numeric" value={teamSize} onFocus={e => setTimeout(() => e.target.select(), 0)} onChange={e => setTeamSize(+e.target.value.replace(/\D/g, ""))} className="block w-full mt-1 p-2 border rounded-md" required />
            </label>

            <label className="block mb-2">Collective OOO days to remove:
              <input type="text" inputMode="numeric" value={removeDays} onFocus={e => setTimeout(() => e.target.select(), 0)} onChange={e => setRemoveDays(+e.target.value.replace(/\D/g, ""))} className="block w-full mt-1 p-2 border rounded-md" />
            </label>

            <label className="block mb-2">Company holidays:
              <input type="text" inputMode="numeric" value={holidays} onFocus={e => setTimeout(() => e.target.select(), 0)} onChange={e => setHolidays(+e.target.value.replace(/\D/g, ""))} className="block w-full mt-1 p-2 border rounded-md" />
            </label>
          </fieldset>

          <div className="flex justify-center">
            <button type="submit" className="bg-[#5271ff] text-white py-3 px-6 font-bold rounded-md hover:bg-[#8c52ff] transition-transform duration-300 transform hover:scale-105">
              Calculate
            </button>
          </div>
        </form>

        <AnimatePresence>
          {results && (
            <motion.div key="results" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.6 }} className="mt-6 p-[4px] rounded-md bg-gradient-to-r from-[#3f5de1] to-[#4a39a6] shadow-md">
              <div className="bg-white rounded-md p-6 text-center">
                <h2 className="text-2xl font-bold text-[#3f5de1]">Recommended Capacity Commitment:</h2>
                <hr className="my-4 border-t-2 border-gray-200" />
                <p className="text-gray-600"><strong>Max Capacity:</strong> {results.maxQuarterCapacity}</p>
                <p className="text-gray-600"><strong>Max Available Capacity (after PTO & Holidays):</strong> {results.maxWithVariance}</p>
                <p className="text-gray-600"><strong>Capacity with Reserve (20%):</strong> {results.adjustedWithReserve}</p>

                <div className="mt-6 text-left">
                  <label className="block mb-2 font-semibold text-gray-700">Planned commitment (story points):</label>
                  <input type="text" inputMode="numeric" value={plannedPoints} onFocus={e => setTimeout(() => e.target.select(), 0)} onChange={e => setPlannedPoints(+e.target.value.replace(/\D/g, ""))} className="block w-full mt-1 p-2 border rounded-md" />
                </div>

                {plannedPoints > 0 && (
                  <div className="mt-8 border-t border-gray-300 pt-6">
                    <SprintGauge percentage={plannedPoints / results.maxWithVariance} />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {results && (
          <div className="bg-white mt-6 p-6 rounded-md shadow-md">
            <h3 className="text-xl font-bold text-[#545454] mb-4">Experiment with Scenarios</h3>

            <label className="block mb-2">Experiment: Add Engineer(s)
              <input type="text" inputMode="numeric" value={expAddEng} onFocus={e => setTimeout(() => e.target.select(), 0)} onChange={e => setExpAddEng(+e.target.value.replace(/\D/g, ""))} className="block w-full mt-1 p-2 border rounded-md" />
            </label>

            <label className="block mb-2">Experiment: Remove Engineer(s)
              <input type="text" inputMode="numeric" value={expRemoveEng} onFocus={e => setTimeout(() => e.target.select(), 0)} onChange={e => setExpRemoveEng(+e.target.value.replace(/\D/g, ""))} className="block w-full mt-1 p-2 border rounded-md" />
            </label>

            <label className="block mb-2">Experiment: Add OOO Day(s)
              <input type="text" inputMode="numeric" value={expExtraOOO} onFocus={e => setTimeout(() => e.target.select(), 0)} onChange={e => setExpExtraOOO(+e.target.value.replace(/\D/g, ""))} className="block w-full mt-1 p-2 border rounded-md" />
            </label>

            <div className="mt-8">
              <ScenarioChart capacityData={chartData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}