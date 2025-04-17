import { useState } from "react";
import { motion } from "framer-motion";
import CapacityEstimator from './App';

export default function TabbedApp() {
  const [activeTab, setActiveTab] = useState("quarter");

  return (
    <div className="min-h-screen bg-white font-nunito p-4">
      <div className="max-w-3xl mx-auto">

        {/* 🔷 Header stays outside the tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-8 bg-gradient-to-r from-[#3f5de1] to-[#4a39a6] text-white rounded-lg shadow-lg mb-10"
        >
          <h1 className="text-3xl font-bold">Quarterly Capacity Estimator</h1>
          <p className="mt-2 text-white text-sm opacity-90">
            Use this to build a baseline estimation for your team's upcoming Quarter
          </p>
        </motion.div>

        {/* 🟪 Tab Buttons */}
        <div className="flex mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("quarter")}
            className={`py-2 px-4 font-semibold border-b-2 transition ${
              activeTab === "quarter"
                ? "text-[#3f5de1] border-[#3f5de1]"
                : "text-gray-500 border-transparent hover:text-[#3f5de1]"
            }`}
          >
            Quarterly Calculator
          </button>
          <button
            onClick={() => setActiveTab("sprint")}
            className={`ml-4 py-2 px-4 font-semibold border-b-2 transition ${
              activeTab === "sprint"
                ? "text-[#3f5de1] border-[#3f5de1]"
                : "text-gray-500 border-transparent hover:text-[#3f5de1]"
            }`}
          >
            Sprint Calculator
          </button>
        </div>

        {/* 🧩 Tab Content */}
        {activeTab === "quarter" ? (
          <CapacityEstimator />
        ) : (
          <div className="text-center font-medium text-gray-600 p-8">
            🚧 Sprint Calculator Coming Soon!
          </div>
        )}
      </div>
    </div>
  );
}
