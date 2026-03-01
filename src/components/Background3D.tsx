import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Stars } from '@react-three/drei'
import * as THREE from 'three'

/* ───── Shared mouse state (normalised -1…1) ───── */
function useMouseTracker() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
  return mouse
}

/* ───── Camera rig that follows the cursor ───── */
function CameraRig({ mouse }: { mouse: { x: number; y: number } }) {
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3(0, 0, 6))

  useFrame(() => {
    target.current.set(mouse.x * 1.2, mouse.y * 0.8, 6)
    camera.position.lerp(target.current, 0.04)
    camera.lookAt(0, 0, -4)
  })
  return null
}

/* ───── Animated torus knot — reacts to cursor ───── */
function FloatingKnot({ mouse }: { mouse: { x: number; y: number } }) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.rotation.x = t * 0.15 + mouse.y * 0.3
    ref.current.rotation.y = t * 0.2 + mouse.x * 0.3
    ref.current.position.x = 3 + mouse.x * 0.5
    ref.current.position.y = 1.5 + mouse.y * 0.4
  })
  return (
    <Float speed={1.2} rotationIntensity={0.8} floatIntensity={1.5}>
      <mesh ref={ref} position={[3, 1.5, -5]}>
        <torusKnotGeometry args={[1, 0.35, 128, 32]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#1d4ed8"
          emissiveIntensity={0.4}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
    </Float>
  )
}

/* ───── Rotating icosahedron ───── */
function FloatingIco({ mouse }: { mouse: { x: number; y: number } }) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.rotation.x = t * 0.1 - mouse.y * 0.25
    ref.current.rotation.z = t * 0.12 + mouse.x * 0.2
    ref.current.position.x = -3.5 - mouse.x * 0.4
    ref.current.position.y = -1 + mouse.y * 0.35
  })
  return (
    <Float speed={0.8} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={ref} position={[-3.5, -1, -4]}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#6d28d9"
          emissiveIntensity={0.35}
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  )
}

/* ───── Orbiting ring ───── */
function OrbitalRing({ mouse }: { mouse: { x: number; y: number } }) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.2) * 0.15 + mouse.y * 0.15
    ref.current.rotation.z = t * 0.08 + mouse.x * 0.1
  })
  return (
    <mesh ref={ref} position={[0, 0, -6]}>
      <torusGeometry args={[3, 0.04, 16, 100]} />
      <meshStandardMaterial
        color="#06b6d4"
        emissive="#0891b2"
        emissiveIntensity={0.6}
        transparent
        opacity={0.2}
      />
    </mesh>
  )
}

/* ───── Particle field ───── */
function Particles({ count = 300, mouse }: { count?: number; mouse: { x: number; y: number } }) {
  const ref = useRef<THREE.Points>(null!)

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5
      sz[i] = Math.random() * 2 + 0.5
    }
    return [pos, sz]
  }, [count])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.rotation.y = t * 0.02 + mouse.x * 0.08
    ref.current.rotation.x = Math.sin(t * 0.01) * 0.05 + mouse.y * 0.06
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#60a5fa"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

/* ───── Sphere grid ───── */
function GlowSphere({ mouse }: { mouse: { x: number; y: number } }) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.rotation.y = t * 0.05 + mouse.x * 0.15
    ref.current.rotation.x = t * 0.03 + mouse.y * 0.1
  })
  return (
    <mesh ref={ref} position={[0, 0, -8]}>
      <sphereGeometry args={[2.5, 24, 24]} />
      <meshStandardMaterial
        color="#1e40af"
        emissive="#1e3a5f"
        emissiveIntensity={0.3}
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  )
}

/* ───── Main background canvas ───── */
export default function Background3D() {
  const mouse = useMouseTracker()

  return (
    <div className="fixed inset-0 z-0" style={{ pointerEvents: 'auto' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent', pointerEvents: 'none' }}
        eventSource={document.documentElement}
        eventPrefix="client"
      >
        <CameraRig mouse={mouse} />

        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.4} color="#93c5fd" />
        <pointLight position={[-4, 3, 2]} intensity={0.5} color="#8b5cf6" distance={15} />
        <pointLight position={[4, -2, 3]} intensity={0.3} color="#06b6d4" distance={12} />

        <Stars
          radius={60}
          depth={60}
          count={2500}
          factor={3}
          saturation={0.3}
          fade
          speed={0.8}
        />

        <Particles count={300} mouse={mouse} />
        <FloatingKnot mouse={mouse} />
        <FloatingIco mouse={mouse} />
        <OrbitalRing mouse={mouse} />
        <GlowSphere mouse={mouse} />

        {/* Fog for depth */}
        <fog attach="fog" args={['#050d1a', 8, 30]} />
      </Canvas>
    </div>
  )
}
