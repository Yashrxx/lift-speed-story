import blockDiagram from "@/assets/dc-motor-block-diagram.png";
import { Card } from "@/components/ui/card";

const BlockDiagram = () => {
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-5xl">
        <Card className="p-8 shadow-card hover:shadow-hover transition-all duration-300 animate-fade-in">
          <h2 className="text-3xl font-bold text-primary mb-6">System Block Diagram</h2>
          <div className="mb-6 rounded-lg overflow-hidden border-2 border-border bg-muted/30 p-4">
            <img 
              src={blockDiagram} 
              alt="Simulink block diagram of DC motor speed control"
              className="w-full h-auto"
            />
          </div>
          <p className="text-sm text-muted-foreground italic mb-4">
            Simulink block diagram of DC motor speed control used in lift operation.
          </p>
          <div className="prose prose-slate max-w-none">
            <p className="text-foreground leading-relaxed">
              The circuit employs a closed-loop control system to regulate the DC motor's speed and torque 
              for lift operation. By controlling the <strong>armature voltage</strong> and <strong>field current</strong>, 
              the system can precisely vary the motor's speed according to operational requirements. 
              The feedback mechanism continuously monitors the motor's performance, ensuring smooth acceleration, 
              steady operation at desired speeds, and controlled deceleration for safe and accurate floor-level stopping.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default BlockDiagram;
