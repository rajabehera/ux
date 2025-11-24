import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function GlassCursor() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const cursorMeshRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const isHoveringText = useRef(false);
  const textRefs = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create glass sphere
    const geometry = new THREE.SphereGeometry(0.4, 32, 32);
    
    // Glass material with refraction
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0,
      roughness: 0.1,
      transmission: 0.95,
      transparent: true,
      opacity: 0.8,
      thickness: 0.5,
      envMapIntensity: 1,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      ior: 1.5,
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    cursorMeshRef.current = sphere;

    // Add rim light
    const rimLight = new THREE.PointLight(0xffffff, 1, 100);
    rimLight.position.set(2, 2, 2);
    scene.add(rimLight);

    const rimLight2 = new THREE.PointLight(0xccccff, 0.5, 100);
    rimLight2.position.set(-2, -2, 2);
    scene.add(rimLight2);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add environment for reflections
    const cubeTextureLoader = new THREE.CubeTextureLoader();
    const envMap = cubeTextureLoader.load([
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
    ]);
    scene.environment = envMap;

    // Mouse move handler
    const handleMouseMove = (e) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let targetX = 0;
    let targetY = 0;
    
    const animate = () => {
      requestAnimationFrame(animate);

      if (cursorMeshRef.current) {
        // Smooth follow
        targetX += (mousePos.current.x * 3 - targetX) * 0.1;
        targetY += (mousePos.current.y * 3 - targetY) * 0.1;
        
        cursorMeshRef.current.position.x = targetX;
        cursorMeshRef.current.position.y = targetY;

        // Subtle rotation
        cursorMeshRef.current.rotation.x += 0.01;
        cursorMeshRef.current.rotation.y += 0.01;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      overflow: 'hidden',
      background: 'black',
      cursor: 'none',
      position: 'relative'
    }}>
      <div ref={containerRef} style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999
      }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        fontFamily: 'serif',
        color: '#4a4a4a',
        userSelect: 'none'
      }}>
     
      </div>
    </div>
  );
}