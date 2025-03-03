
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PiggyBank, Plane, Map, UtensilsCrossed, Hotel, Plus } from "lucide-react";
import Navbar from "../components/Navbar";

const ExpenseCard = ({ title, amount, icon: Icon, percentage }: { title: string; amount: number; icon: any; percentage: number }) => (
  <Navbar />
  <Card className="p-6 bg-white/80 backdrop-blur-sm animate-fade-in hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 rounded-lg bg-primary/10">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <Progress value={percentage} className="w-20" />
    </div>
    <h3 className="text-sm font-medium text-gray-600">{title}</h3>
    <p className="text-2xl font-semibold mt-1">${amount.toLocaleString()}</p>
  </Card>
);

const data = [
  { name: "Mon", amount: 1200 },
  { name: "Tue", amount: 900 },
  { name: "Wed", amount: 1600 },
  { name: "Thu", amount: 1400 },
  { name: "Fri", amount: 2100 },
  { name: "Sat", amount: 1800 },
  { name: "Sun", amount: 1300 },
];

const Dashboard = () => {
  const [totalBudget] = useState(10000);
  const [spentAmount] = useState(6300);
  const remainingBudget = totalBudget - spentAmount;
  const spentPercentage = (spentAmount / totalBudget) * 100;

  return (
    <div className="min-h-screen bg-background-light p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Budget Dashboard</h1>
            <p className="text-gray-600 mt-1">Track your Sri Lanka tour expenses</p>
          </div>
          <Button className="bg-primary hover:bg-primary-dark text-white">
            <Plus className="w-4 h-4 mr-2" /> Add Expense
          </Button>
        </div>

        {/* Budget Overview */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm animate-slide-up">
          <h2 className="text-lg font-semibold mb-4">Budget Overview</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">Total Budget</p>
              <p className="text-3xl font-bold text-gray-900">${totalBudget.toLocaleString()}</p>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">Spent Amount</p>
              <p className="text-3xl font-bold text-primary">${spentAmount.toLocaleString()}</p>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">Remaining</p>
              <p className="text-3xl font-bold text-green-600">${remainingBudget.toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={spentPercentage} className="h-2" />
            <p className="text-sm text-gray-600 mt-2">{spentPercentage.toFixed(1)}% of budget spent</p>
          </div>
        </Card>

        {/* Expense Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-scale-in">
          <ExpenseCard
            title="Accommodation"
            amount={2400}
            icon={Hotel}
            percentage={75}
          />

          <ExpenseCard
            title="Transportation"
            amount={1500}
            icon={Plane}
            percentage={60}
          />
          
          <ExpenseCard
            title="Activities"
            amount={1200}
            icon={Map}
            percentage={45}
          />
          <ExpenseCard
            title="Food & Dining"
            amount={1200}
            icon={UtensilsCrossed}
            percentage={40}
          />
        </div>

        {/* Spending Chart */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm h-[400px] animate-fade-in">
          <h2 className="text-lg font-semibold mb-6">Weekly Spending</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="hsl(169, 33%, 46%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;




