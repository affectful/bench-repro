import React, { ReactNode, useLayoutEffect, useRef } from 'react';

interface ManualProfilerProps {
  id: string;
  onMeasure: (id: string, duration: number) => void;
  children: ReactNode;
}

const ManualProfiler: React.FC<ManualProfilerProps> = ({ id, onMeasure, children }) => {
  const startTimeRef = useRef<number>(0);

  // Record start time just before children are rendered by this component's instance.
  // This happens during the "render" phase of ManualProfiler.
  startTimeRef.current = performance.now();

  useLayoutEffect(() => {
    // This runs after the ManualProfiler and its children have been rendered
    // and committed to the screen (for useLayoutEffect).
    const endTime = performance.now();
    const duration = endTime - startTimeRef.current;
    onMeasure(id, duration);
  }); // Runs on every render of ManualProfiler where children might change

  return <>{children}</>;
};

export default ManualProfiler;