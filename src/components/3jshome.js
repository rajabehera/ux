import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function LandingPage() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const sphereRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create glass sphere
    const geometry = new THREE.SphereGeometry(1.2, 64, 64);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xe8d5ff,
      metalness: 0.1,
      roughness: 0.05,
      transparent: true,
      opacity: 0.6,
      transmission: 0.9,
      thickness: 0.5,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    });
    
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(2, 0, 0);
    sphereRef.current = sphere;
    scene.add(sphere);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xd4b5ff, 1, 100);
    pointLight.position.set(-5, 0, 5);
    scene.add(pointLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Smooth follow mouse
      targetPos.current.x += (mousePos.current.x - targetPos.current.x) * 0.05;
      targetPos.current.y += (mousePos.current.y - targetPos.current.y) * 0.05;

      if (sphereRef.current) {
        sphereRef.current.position.x = 2 + targetPos.current.x * 2;
        sphereRef.current.position.y = targetPos.current.y * 2;
        sphereRef.current.rotation.y += 0.002;
        sphereRef.current.rotation.x += 0.001;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Handle mouse move
    const handleMouseMove = (e) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#f5f0e8]">
      {/* Three.js Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-8 md:px-16 lg:px-24">
        <div className="max-w-5xl">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif leading-tight mb-8">
            Hi, I'm Alisa<br />
            <span className="block">a Visual Creator</span>
            <span className="block">based in Tokyo</span>
          </h1>
          
          <p className="text-sm md:text-base uppercase tracking-[0.3em] text-gray-600 font-light">
            with 6 years of experience design
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="absolute top-8 right-8 md:top-12 md:right-12 z-20">
        <ul className="flex gap-8 text-sm uppercase tracking-wider">
          <li><a href="#work" className="hover:text-purple-400 transition-colors">Work</a></li>
          <li><a href="#about" className="hover:text-purple-400 transition-colors">About</a></li>
          <li><a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a></li>
        </ul>
      </nav>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs uppercase tracking-wider text-gray-500">Scroll</span>
          <div className="w-px h-12 bg-gray-400"></div>
        </div>
      </div>
    </div>
  );
}