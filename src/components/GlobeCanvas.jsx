import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";

const Globe = () => (
  <group>
    <Sphere args={[1.5, 64, 64]}>
      <meshStandardMaterial color="#22d3ee" transparent opacity={0.8} />
    </Sphere>
    <ambientLight intensity={0.7} />
    <directionalLight position={[5, 5, 5]} intensity={1} />
  </group>
);

const GlobeCanvas = () => (
  <Canvas className="w-full h-80 sm:h-96 md:h-[500px]" camera={{ position: [0, 0, 6], fov: 60 }}>
    <Suspense fallback={null}>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2.5} />
      <Globe />
    </Suspense>
  </Canvas>
);

export default GlobeCanvas;
