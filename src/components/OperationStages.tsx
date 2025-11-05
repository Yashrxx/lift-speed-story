import { Card } from "@/components/ui/card";
import { ArrowUp, Activity, Square } from "lucide-react";

const OperationStages = () => {
  const stages = [
    {
      icon: <ArrowUp className="w-8 h-8 text-accent" />,
      title: "Starting",
      description: "High Torque, Low Speed",
      details: "During the starting phase, the motor draws high current to generate maximum torque. The armature voltage is gradually increased to overcome the lift's inertia and begin upward or downward movement. Speed control ensures smooth acceleration without jerking."
    },
    {
      icon: <Activity className="w-8 h-8 text-primary" />,
      title: "Running",
      description: "Stable Speed, Constant Torque",
      details: "Once the lift reaches the desired speed, the control system maintains constant armature voltage and field current. The motor operates at steady-state with balanced torque and minimal current fluctuations, ensuring passenger comfort and energy efficiency."
    },
    {
      icon: <Square className="w-8 h-8 text-destructive" />,
      title: "Braking/Stopping",
      description: "Controlled Deceleration",
      details: "To stop at the desired floor, the control system reduces armature voltage or reverses polarity for regenerative braking. This controlled deceleration ensures accurate floor-level stopping, prevents overshooting, and enhances passenger safety. The motor absorbs kinetic energy during braking."
    }
  ];

  return (
    <section className="py-16 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-primary mb-10 text-center">Lift Operation Stages</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {stages.map((stage, index) => (
            <Card 
              key={index} 
              className="p-6 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 p-3 bg-gradient-card rounded-full w-fit">
                {stage.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{stage.title}</h3>
              <p className="text-sm font-medium text-accent mb-3">{stage.description}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{stage.details}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OperationStages;
