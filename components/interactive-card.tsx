// components/interactive-card.tsx
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useGyroscope } from "@/hooks/use-gyroscope";

export default function InteractiveCard({ children, sensorEnabled }: { children: React.ReactNode, sensorEnabled: boolean }) {
  const { coords } = useGyroscope();
  
  // Valores para o arraste (Drag)
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  // Efeito de inclinação (Tilt) baseado nos sensores ou no arraste
  const rotateX = useTransform(dragY, [-100, 100], [10, -10]);
  const rotateY = useTransform(dragX, [-100, 100], [-10, 10]);

  return (
    <div className="flex flex-col items-center gap-6">
      <motion.div
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.1}
        style={{ 
          x: dragX, 
          y: dragY,
          // Se o sensor estiver ligado, usa coords do giroscópio, senão usa rotação do drag
          rotateX: sensorEnabled ? coords.x * 20 : rotateX,
          rotateY: sensorEnabled ? coords.y * 20 : rotateY,
          z: 100 
        }}
        // touch-none é fundamental para o drag funcionar no primeiro toque
        className="touch-none cursor-grab active:cursor-grabbing perspective-1000"
        whileTap={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
    </div>
  );
}