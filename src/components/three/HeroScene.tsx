"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { prefersReducedMotion } from "@/lib/utils";

const BLUE = new THREE.Color("#1565ff");
const SOFT = new THREE.Color("#7aa8ff");

/** Deterministic PRNG so geometry stays stable across re-renders. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Star-dust field distributed in a shell around the camera. */
function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const rand = mulberry32(count * 7919);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + rand() * 9;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = r * Math.cos(phi);
      const c = rand() > 0.7 ? SOFT : BLUE;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.02;
    // particles drift away from the pointer
    const p = state.pointer;
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, -p.x * 0.6, 0.03);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, -p.y * 0.4, 0.03);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Wireframe globe + inner core — the "digital planet". */
function Globe() {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.08;
    const p = state.pointer;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, p.y * 0.25, 0.04);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -p.x * 0.15, 0.04);
    if (inner.current) inner.current.rotation.y -= delta * 0.15;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[2.1, 2]} />
        <meshBasicMaterial color="#1565ff" wireframe transparent opacity={0.18} />
      </mesh>
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial color="#4d8dff" wireframe transparent opacity={0.1} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial
          color="#0a2250"
          emissive="#1565ff"
          emissiveIntensity={0.55}
          roughness={0.35}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
}

/** Random constellation lines — the "AI network". */
function Network() {
  const ref = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const rand = mulberry32(42);
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < 26; i++) {
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const v = new THREE.Vector3()
        .setFromSphericalCoords(1, phi, theta)
        .multiplyScalar(2.4 + rand() * 0.8);
      nodes.push(v);
    }
    const verts: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 2.2 && rand() > 0.5) {
          verts.push(...nodes[i].toArray(), ...nodes[j].toArray());
        }
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    return g;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y -= delta * 0.05;
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#4d8dff" transparent opacity={0.14} />
    </lineSegments>
  );
}

/** Floating glass cubes orbiting the globe. */
function GlassCubes() {
  const cubes = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        position: [
          Math.cos((i / 6) * Math.PI * 2) * (3.4 + (i % 2) * 0.9),
          (i % 3) * 0.9 - 1,
          Math.sin((i / 6) * Math.PI * 2) * (3.2 + (i % 3) * 0.6),
        ] as [number, number, number],
        scale: 0.28 + (i % 3) * 0.14,
        speed: 1 + (i % 3) * 0.5,
      })),
    []
  );

  return (
    <>
      {cubes.map((c, i) => (
        <Float key={i} speed={c.speed} rotationIntensity={1.4} floatIntensity={1.6}>
          <mesh position={c.position} scale={c.scale}>
            <boxGeometry />
            <meshPhysicalMaterial
              color="#4d8dff"
              metalness={0.1}
              roughness={0.05}
              transparent
              opacity={0.22}
              clearcoat={1}
            />
          </mesh>
          <lineSegments position={c.position} scale={c.scale}>
            <edgesGeometry args={[new THREE.BoxGeometry()]} />
            <lineBasicMaterial color="#7aa8ff" transparent opacity={0.5} />
          </lineSegments>
        </Float>
      ))}
    </>
  );
}

function Rig() {
  useFrame((state) => {
    const p = state.pointer;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, p.x * 0.7, 0.03);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, p.y * 0.45, 0.03);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  const [active, setActive] = useState(true);
  // rendered client-only (dynamic ssr:false), so window is available at first render
  const [mobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = typeof window !== "undefined" && prefersReducedMotion();

  // Pause the render loop when the hero scrolls out of view
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0 });
    if (wrapRef.current) io.observe(wrapRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 1.75]}
        frameloop={reduced ? "demand" : active ? "always" : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[6, 4, 6]} intensity={40} color="#1565ff" />
        <pointLight position={[-6, -2, -4]} intensity={25} color="#7aa8ff" />
        <fog attach="fog" args={["#030918", 8, 16]} />
        <Particles count={mobile ? 700 : 1600} />
        <Globe />
        <Network />
        {!mobile && <GlassCubes />}
        {!reduced && <Rig />}
      </Canvas>
    </div>
  );
}
