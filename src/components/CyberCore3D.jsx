import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { getPalette } from '../data/palettes';

export default function CyberCore3D() {
  const mountRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 360;

    const savedId = localStorage.getItem('portfolio-palette') || 'amber-gold';
    const initPal = getPalette(savedId);

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold all 3D elements
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Outer Cyber Icosahedron Wireframe
    const outerGeo = new THREE.IcosahedronGeometry(2.1, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: initPal.three.mesh,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    mainGroup.add(outerMesh);

    // 2. Inner Quantum Core
    const innerGeo = new THREE.OctahedronGeometry(1.2, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: initPal.three.core,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerMesh);

    // 3. Floating Nucleus (solid glowing sphere)
    const nucleusGeo = new THREE.SphereGeometry(0.45, 16, 16);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: initPal.three.nucleus,
      transparent: true,
      opacity: 0.9,
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    mainGroup.add(nucleusMesh);

    // 4. Orbiting Particle Belt
    const particleCount = 140;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const initP1 = new THREE.Color(initPal.three.particle1);
    const initP2 = new THREE.Color(initPal.three.particle2);

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 2.8 + (Math.random() - 0.5) * 0.6;
      const y = (Math.random() - 0.5) * 0.8;

      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius;

      const c = Math.random() > 0.5 ? initP1 : initP2;
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    // Dynamic 3D palette change handler
    const handlePaletteChange = (e) => {
      const p = e.detail;
      if (!p || !p.three) return;
      outerMat.color.setHex(p.three.mesh);
      innerMat.color.setHex(p.three.core);
      nucleusMat.color.setHex(p.three.nucleus);

      const col1 = new THREE.Color(p.three.particle1);
      const col2 = new THREE.Color(p.three.particle2);
      const colors = particleGeo.attributes.color.array;
      for (let i = 0; i < particleCount; i++) {
        const c = Math.random() > 0.5 ? col1 : col2;
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }
      particleGeo.attributes.color.needsUpdate = true;
    };
    window.addEventListener('portfolio:palette-change', handlePaletteChange);

    const particleMat = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    particleSystem.rotation.x = 0.45;
    mainGroup.add(particleSystem);

    // Interaction state
    let targetRotX = 0;
    let targetRotY = 0;
    let spinSpeed = 0.005;
    let boostSpin = 0;
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    // Mouse movement inside container
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const deltaX = e.clientX - prevMousePos.x;
        const deltaY = e.clientY - prevMousePos.y;
        mainGroup.rotation.y += deltaX * 0.01;
        mainGroup.rotation.x += deltaY * 0.01;
        prevMousePos = { x: e.clientX, y: e.clientY };
      } else {
        targetRotY = x * 0.8;
        targetRotX = -y * 0.6;
      }
    };

    const handleMouseDown = (e) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
      boostSpin = 0.04; // Click energy burst
      setPulseCount(p => p + 1);
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Smooth spin & dampening
      boostSpin *= 0.94;
      const currentSpeed = spinSpeed + boostSpin;

      outerMesh.rotation.y += currentSpeed;
      outerMesh.rotation.x += currentSpeed * 0.6;

      innerMesh.rotation.y -= currentSpeed * 1.5;
      innerMesh.rotation.z += currentSpeed * 0.8;

      particleSystem.rotation.y += currentSpeed * 1.2;

      // Pulse breathing
      const scale = 1 + Math.sin(elapsedTime * 2.2) * 0.04 + boostSpin * 2;
      innerMesh.scale.set(scale, scale, scale);

      // Smooth mouse follow
      if (!isDragging) {
        mainGroup.rotation.y += (targetRotY - mainGroup.rotation.y) * 0.05;
        mainGroup.rotation.x += (targetRotX - mainGroup.rotation.x) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('portfolio:palette-change', handlePaletteChange);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      outerGeo.dispose();
      innerGeo.dispose();
      nucleusGeo.dispose();
      particleGeo.dispose();
      outerMat.dispose();
      innerMat.dispose();
      nucleusMat.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div
      className="cybercore-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '360px',
        cursor: 'grab',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} />

      {/* Floating 3D Interaction Hint */}
      <div
        className="cybercore-hint"
        style={{
          position: 'absolute',
          bottom: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '0.72rem',
          fontWeight: 600,
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-muted)',
          background: 'rgba(7, 8, 14, 0.75)',
          padding: '4px 12px',
          borderRadius: '100px',
          border: '1px solid var(--border)',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          backdropFilter: 'blur(8px)',
          opacity: isHovered ? 1 : 0.75,
          transition: 'opacity 0.2s ease',
        }}
      >
        <span>⚡ Drag to rotate · Click for pulse burst</span>
      </div>
    </div>
  );
}
