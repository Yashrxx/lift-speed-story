import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface SpeedSimulatorProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
}

const SpeedSimulator = ({ speed, onSpeedChange }: SpeedSimulatorProps) => {
  const [localSpeed, setLocalSpeed] = useState<number>(speed);
  const [simulated, setSimulated] = useState(false);

  const generateMotorData = (targetSpeed: number) => {
    const data = [];
    for (let t = 0; t <= 10; t += 0.5) {
      const speedValue = targetSpeed * (1 - Math.exp(-t / 2));
      const torque = 50 * Math.exp(-t / 3) + 10;
      const current = 15 * Math.exp(-t / 2.5) + 3;
      data.push({
        time: t,
        speed: speedValue,
        torque: torque,
        current: current,
      });
    }
    return data;
  };

  const motorData = generateMotorData(speed);

  const handleSimulate = () => {
    onSpeedChange(localSpeed);
    setSimulated(true);
  };

  return (
    <section className="py-16 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <Card className="p-8 shadow-card animate-fade-in">
          <h2 className="text-3xl font-bold text-primary mb-6">Interactive Lift Speed Simulator</h2>
          
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="speed" className="text-lg mb-2 block">Set Lift Speed (rpm)</Label>
              <Input
                id="speed"
                type="number"
                value={localSpeed}
                onChange={(e) => setLocalSpeed(Number(e.target.value))}
                min="0"
                max="500"
                className="text-lg"
              />
            </div>
            <Button 
              onClick={handleSimulate}
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8"
            >
              Simulate & Activate Lift
            </Button>
          </div>

          {simulated && (
            <div className="space-y-8 animate-slide-in">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Motor Speed vs Time</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={motorData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="time" 
                      label={{ value: 'Time (s)', position: 'insideBottom', offset: -5 }}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis 
                      label={{ value: 'Speed (rpm)', angle: -90, position: 'insideLeft' }}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="speed" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={false}
                      name="Speed (rpm)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Motor Torque vs Time</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={motorData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="time" 
                      label={{ value: 'Time (s)', position: 'insideBottom', offset: -5 }}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis 
                      label={{ value: 'Torque (Nm)', angle: -90, position: 'insideLeft' }}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="torque" 
                      stroke="hsl(var(--accent))" 
                      strokeWidth={2}
                      dot={false}
                      name="Torque (Nm)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Armature Current vs Time</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={motorData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="time" 
                      label={{ value: 'Time (s)', position: 'insideBottom', offset: -5 }}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis 
                      label={{ value: 'Current (A)', angle: -90, position: 'insideLeft' }}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="current" 
                      stroke="hsl(214 85% 50%)" 
                      strokeWidth={2}
                      dot={false}
                      name="Current (A)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};

export default SpeedSimulator;
