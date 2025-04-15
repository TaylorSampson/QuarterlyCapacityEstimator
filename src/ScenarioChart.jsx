import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Baseline',
    capacity: 100,
  },
  {
    name: 'Add 2 holidays',
    capacity: 86,
  },
  {
    name: 'Remove 3 OOO days',
    capacity: 91,
  },
  {
    name: 'Add 1 engineer',
    capacity: 115,
  },
];

export default function ScenarioChart({ capacityData }) {
  return (
    <div className="my-8">
      <h2 className="text-xl font-bold text-center text-[#5271ff] mb-4">Scenario Comparison</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={capacityData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="capacity" fill="#5271ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
