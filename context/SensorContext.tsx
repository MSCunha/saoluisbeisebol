"use client";
import { createContext, useContext, ReactNode } from "react";
import { useGyroscope } from "@/hooks/use-gyroscope";

const SensorContext = createContext<any>(null);

export function SensorProvider({ children }: { children: ReactNode }) {
  const gyro = useGyroscope();
  return <SensorContext.Provider value={gyro}>{children}</SensorContext.Provider>;
}

export const useSensor = () => useContext(SensorContext);