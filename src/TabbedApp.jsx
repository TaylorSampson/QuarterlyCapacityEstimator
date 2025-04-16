import { useState } from "react";
import { motion } from "framer-motion";
import CapacityEstimator from './App';
// import SprintEstimator from './SprintEstimator';

export default function TabbedApp() {
  const [activeTab, setActiveTab] = useState("quarter");
  const isQuarter = activeTab === "quarter";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#edf0f2] to-[#f6f8fa] font-nunito pt-10 px-4">
      {/* CONTAINER */}
      <div className="max-w-3xl mx-auto">

        {/* 🌟 Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center py-8 bg-gradient-to-r from-[#3f5de1] to-[#4a39a6] text-white rounded-lg shadow-lg mb-8"
        >
          <h1 className="text-3xl font-bold">
            {isQuarter ? "Quarterly Capacity Estimator" : "Sprint Capacity Estimator"}
          </h1>
          <p className="mt-2 text-white text-sm opacity-90">
            {isQuarter
              ? "Use this to build a baseline estimation for your team's upcoming Quarter"
              : "Plan sprint-level commitments and calculate team availability in detail"}
          </p>

          <button
            onClick={() => setActiveTab(isQuarter ? "sprint" : "quarter")}
            className={`absolute top-4 ${isQuarter ? "right-4" : "left-4"} 
              bg-white text-[#3f5de1] font-bold py-1 px-3 rounded-full shadow-md hover:bg-gray-100 transition`}
          >
            {isQuarter ? "Sprint View →" : "← Quarterly View"}
          </button>
        </motion.div>

        {/* RENDER VIEW */}
        <div>
          {isQuarter ? (
            <div className="-mt-4">
              <CapacityEstimator />
            </div>
          ) : (
            <div className="text-center font-medium text-gray-600 bg-white rounded-md p-8 shadow">
              🚧 Sprint Calculator Coming Soon!
            </div>
          )}
        </div>

      </div> {/* closes max-w-3xl */}
    </div>

  );
}
