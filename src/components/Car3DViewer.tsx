'use client';

import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function F1Car() {
  const group = useRef<THREE.Group>(null);

  return (
    <group ref={group}>
      {/* Main Chassis */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[0.6, 0.3, 3]} />
        <meshStandardMaterial color="#e10600" />
      </mesh>
      
      {/* Nose cone */}
      <mesh position={[0, 0.3, 1.8]}>
        <boxGeometry args={[0.4, 0.2, 1]} />
        <meshStandardMaterial color="#e10600" />
      </mesh>

      {/* Front Wing */}
      <mesh position={[0, 0.2, 2.3]}>
        <boxGeometry args={[1.6, 0.05, 0.5]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      {/* Rear Wing */}
      <mesh position={[0, 0.8, -1.3]}>
        <boxGeometry args={[1.2, 0.05, 0.4]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      {/* Rear Wing Pillars */}
      <mesh position={[-0.4, 0.6, -1.3]}>
        <boxGeometry args={[0.05, 0.4, 0.3]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      <mesh position={[0.4, 0.6, -1.3]}>
        <boxGeometry args={[0.05, 0.4, 0.3]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      {/* Halo (Simplified) */}
      <mesh position={[0, 0.7, 0.2]} rotation={[0.2, 0, 0]}>
        <torusGeometry args={[0.25, 0.03, 16, 100, Math.PI]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      <mesh position={[0, 0.65, 0.4]} rotation={[1.57, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      {/* Wheels */}
      {/* Front Left */}
      <mesh position={[0.8, 0.3, 1.6]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, 0.3, 32]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      {/* Front Right */}
      <mesh position={[-0.8, 0.3, 1.6]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, 0.3, 32]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      {/* Rear Left */}
      <mesh position={[0.8, 0.35, -1.2]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.35, 0.35, 0.4, 32]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      {/* Rear Right */}
      <mesh position={[-0.8, 0.35, -1.2]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.35, 0.35, 0.4, 32]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
    </group>
  );
}

export default function Car3DViewer() {
  return (
    <div className="w-full h-[500px] bg-neutral-900 border-b-4 border-f1-red relative">
      <div className="absolute top-4 left-4 z-10">
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Interactive 3D Chassis</h2>
        <p className="text-gray-400 text-sm">Drag to orbit, scroll to zoom</p>
      </div>
      <Canvas camera={{ position: [3, 2, 4], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <F1Car />
        <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={10} blur={2} far={4} />
        <Environment preset="city" />
        <OrbitControls autoRotate autoRotateSpeed={2} enablePan={false} minPolarAngle={0} maxPolarAngle={Math.PI / 2 - 0.1} />
      </Canvas>
    </div>
  );
}
