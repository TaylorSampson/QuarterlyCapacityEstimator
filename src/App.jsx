// React version of the Capacity Estimator with animations using Framer Motion
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CapacityEstimator() {
  const [velocity, setVelocity] = useState(0);
  const [teamSize, setTeamSize] = useState(0);
  const [removeDays, setRemoveDays] = useState(0);
  const [holidays, setHolidays] = useState(0);
  const [results, setResults] = useState(null);

  const calculate = (e) => {
    e.preventDefault();
    const sprints = 6;
    const sprintLength = 10;

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#edf0f2] to-[#f6f8fa] font-nunito p-4">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center py-8 bg-gradient-to-r from-[#3f5de1] to-[#4a39a6] text-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold">Quarterly Capacity Estimator</h1>
          <p className="mt-2">Use this to build a baseline estimation for your team's upcoming Quarter</p>
        </motion.div>

        <form onSubmit={calculate} className="bg-white mt-6 p-6 rounded-md shadow-md">
          <fieldset className="mb-4">
            <legend className="text-xl font-bold text-[#545454] mb-2">About the Team</legend>

            <label className="block mb-2">What's the average velocity from the last 6 sprints?
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                min="1"
                required
                value={velocity}
                onFocus={e => setTimeout(() => e.target.select(), 0)}
                onChange={e => setVelocity(+e.target.value.replace(/\D/g, ""))}
                className="block w-full mt-1 p-2 border rounded-md"
              />
                <p className="text-sm text-gray-500 mt-1">
                  In Jira, please refer to your eazyBI team dashboard “Velocity” section or the Velocity chart in Team Reports.
                </p>
            </label>

            <label className="block mb-2">How many Engineers are on the team?
              <input
                type="text"
                pattern="[0-9]*"
                min="1"
                required
                value={teamSize}
                onFocus={e => setTimeout(() => e.target.select(), 0)}
                onChange={e => setTeamSize(+e.target.value.replace(/\D/g, ""))}
                className="block w-full mt-1 p-2 border rounded-md"
              />
            </label>

            <div className="bg-gray-100 border-l-4 border-[#5271ff] p-4 my-4 rounded">
              <h3 className="text-[#5271ff] font-bold mb-2">Example</h3>
              <p><strong>Engineer 1</strong>: 2 days out</p>
              <p><strong>Engineer 2</strong>: 1 week out</p>
              <p><strong>Total Days to deduct</strong>: 7</p>
            </div>

            <label className="block mb-2">How many days <i>collectively</i> should be removed?
              <input
                type="text"
                pattern="[0-9]*"
                min="0"
                value={removeDays}
                onFocus={e => setTimeout(() => e.target.select(), 0)}
                onChange={e => setRemoveDays(+e.target.value.replace(/\D/g, ""))}
                className="block w-full mt-1 p-2 border rounded-md"
              />

            </label>

            <label className="block mb-2">How many <strong>Company Holidays</strong> should be added?
              <input
                type="text"
                pattern="[0-9]*"
                min="0"
                value={holidays}
                onFocus={e => setTimeout(() => e.target.select(), 0)}
                onChange={e => setHolidays(+e.target.value.replace(/\D/g, ""))}
                className="block w-full mt-1 p-2 border rounded-md"
              />

            </label>
          </fieldset>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#5271ff] text-white py-3 px-6 font-bold rounded-md hover:bg-[#3f5de1] transition-transform duration-300 transform hover:scale-105"
            >
              Calculate
            </button>
          </div>
        </form>

        <AnimatePresence>
          {results && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="mt-6 bg-[#d4d4d4] p-6 rounded-md text-center shadow-md"
            >
              <h2 className="text-2xl font-bold text-[#5271ff]">Recommended Capacity Commitment:</h2>
              <hr className="my-4 border-t-2 border-gray-400" />
              <p><strong>Max Capacity:</strong> {results.maxQuarterCapacity}</p>
              <p><strong>Max Available Capacity (after PTO & Holidays):</strong> {results.maxWithVariance}</p>
              <p><strong>Capacity with Reserve (20%):</strong> {results.adjustedWithReserve}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
