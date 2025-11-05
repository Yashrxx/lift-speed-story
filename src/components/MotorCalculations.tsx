import { Card } from "@/components/ui/card";

interface MotorCalculationsProps {
  speed: number;
}

const MotorCalculations = ({ speed }: MotorCalculationsProps) => {
  // Motor parameters (example values)
  const Ra = 0.5; // Armature resistance (Ohms)
  const P = 5000; // Power (Watts)
  const Ia = 10; // Armature current (Amperes)
  
  // Calculations
  const omega = (speed * 2 * Math.PI) / 60; // Angular velocity (rad/s)
  const torque = omega !== 0 ? P / omega : 0; // Electrical torque (Nm)
  const Eb = 220; // Back EMF (Volts) - simplified
  const Va = Eb + (Ia * Ra); // Armature voltage (Volts)

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-5xl">
        <Card className="p-8 shadow-card hover:shadow-hover transition-all duration-300 animate-fade-in">
          <h2 className="text-3xl font-bold text-primary mb-6">Motor Calculations</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-card rounded-lg border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">Angular Velocity (ω)</h3>
              <div className="text-3xl font-bold text-primary mb-2">{omega.toFixed(2)} rad/s</div>
              <p className="text-sm text-muted-foreground">ω = (2πN) / 60</p>
            </div>

            <div className="p-6 bg-gradient-card rounded-lg border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">Electrical Torque (T)</h3>
              <div className="text-3xl font-bold text-accent mb-2">{torque.toFixed(2)} Nm</div>
              <p className="text-sm text-muted-foreground">T = P / ω</p>
            </div>

            <div className="p-6 bg-gradient-card rounded-lg border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">Armature Voltage (V<sub>a</sub>)</h3>
              <div className="text-3xl font-bold text-primary mb-2">{Va.toFixed(2)} V</div>
              <p className="text-sm text-muted-foreground">V<sub>a</sub> = E<sub>b</sub> + I<sub>a</sub>R<sub>a</sub></p>
            </div>

            <div className="p-6 bg-gradient-card rounded-lg border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">Motor Power (P)</h3>
              <div className="text-3xl font-bold text-accent mb-2">{P} W</div>
              <p className="text-sm text-muted-foreground">P = V<sub>a</sub> × I<sub>a</sub></p>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-secondary/50 rounded-lg border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-3">Key Parameters Used:</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">R<sub>a</sub>:</span> {Ra} Ω
              </div>
              <div>
                <span className="font-medium">I<sub>a</sub>:</span> {Ia} A
              </div>
              <div>
                <span className="font-medium">E<sub>b</sub>:</span> {Eb} V
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default MotorCalculations;
