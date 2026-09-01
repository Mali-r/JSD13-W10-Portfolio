import React, { useEffect, useRef } from 'react';

function project(p, yaw, pitch, width, height, scale, cy) {
  const cosY = Math.cos(yaw);
  const sinY = Math.sin(yaw);
  const x1 = p.x * cosY - p.y * sinY;
  const y1 = p.x * sinY + p.y * cosY;
  const z1 = p.z;

  const cosX = Math.cos(pitch);
  const sinX = Math.sin(pitch);
  const z2 = y1 * sinX + z1 * cosX;

  const projX = width / 2 + x1 * scale;
  const projY = height / 2 - z2 * scale + cy;

  return { x: projX, y: projY };
}

export const WireframeCanvas = () => {
  const canvasRef = useRef(null);
  const scrollRef = useRef(0);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll fraction
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        scrollRef.current = window.scrollY / maxScroll;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // ----------------------------------------------------
    // 3D MODEL GENERATION
    // ----------------------------------------------------
    const lines = [];
    const flowPaths = [];

    const numFloors = 5;
    const floorHeight = 1.0;
    const buildingWidth = 3.0;
    const buildingDepth = 3.0;

    // 1. Base Grid (Z = 0)
    const gridSize = 4;
    const gridSpacing = 1.0;
    for (let i = -gridSize; i <= gridSize; i++) {
      // X-aligned grid lines
      lines.push({
        p1: { x: i * gridSpacing, y: -gridSize * gridSpacing, z: 0 },
        p2: { x: i * gridSpacing, y: gridSize * gridSpacing, z: 0 },
        layer: 'grid',
        color: 'rgba(67, 86, 99, 0.25)',
        width: 1,
      });
      // Y-aligned grid lines
      lines.push({
        p1: { x: -gridSize * gridSpacing, y: i * gridSpacing, z: 0 },
        p2: { x: gridSize * gridSpacing, y: i * gridSpacing, z: 0 },
        layer: 'grid',
        color: 'rgba(67, 86, 99, 0.25)',
        width: 1,
      });
    }

    // 2. Concrete Structure (Floor Slabs and Columns)
    for (let f = 0; f < numFloors; f++) {
      const z = f * floorHeight;

      // Slab perimeter
      const hHalf = buildingWidth / 2;
      const dHalf = buildingDepth / 2;
      
      lines.push({
        p1: { x: -hHalf, y: -dHalf, z },
        p2: { x: hHalf, y: -dHalf, z },
        layer: 'structure',
        color: 'rgba(67, 86, 99, 0.5)',
        width: 1.5,
      });
      lines.push({
        p1: { x: hHalf, y: -dHalf, z },
        p2: { x: hHalf, y: dHalf, z },
        layer: 'structure',
        color: 'rgba(67, 86, 99, 0.5)',
        width: 1.5,
      });
      lines.push({
        p1: { x: hHalf, y: dHalf, z },
        p2: { x: -hHalf, y: dHalf, z },
        layer: 'structure',
        color: 'rgba(67, 86, 99, 0.5)',
        width: 1.5,
      });
      lines.push({
        p1: { x: -hHalf, y: dHalf, z },
        p2: { x: -hHalf, y: -dHalf, z },
        layer: 'structure',
        color: 'rgba(67, 86, 99, 0.5)',
        width: 1.5,
      });

      // Internal beams
      lines.push({
        p1: { x: 0, y: -dHalf, z },
        p2: { x: 0, y: dHalf, z },
        layer: 'structure',
        color: 'rgba(67, 86, 99, 0.3)',
        width: 1,
      });
      lines.push({
        p1: { x: -hHalf, y: 0, z },
        p2: { x: hHalf, y: 0, z },
        layer: 'structure',
        color: 'rgba(67, 86, 99, 0.3)',
        width: 1,
      });
    }

    // Vertical Columns
    const colCoords = [
      { x: -1.5, y: -1.5 }, { x: 0, y: -1.5 }, { x: 1.5, y: -1.5 },
      { x: -1.5, y: 0 },    { x: 0, y: 0 },    { x: 1.5, y: 0 },
      { x: -1.5, y: 1.5 },  { x: 0, y: 1.5 },  { x: 1.5, y: 1.5 }
    ];

    colCoords.forEach(col => {
      lines.push({
        p1: { x: col.x, y: col.y, z: 0 },
        p2: { x: col.x, y: col.y, z: (numFloors - 1) * floorHeight },
        layer: 'structure',
        color: 'rgba(67, 86, 99, 0.6)',
        width: 2,
      });
    });

    // 3. MEP Layers
    // HVAC (Sage Green ducts - thick, square)
    // Run ducts on floors 1, 2, 3, 4
    for (let f = 1; f < numFloors; f++) {
      const z = f * floorHeight - 0.2; // hang below ceiling
      // Main central duct trunk
      lines.push({
        p1: { x: -0.8, y: -0.8, z },
        p2: { x: 0.8, y: -0.8, z },
        layer: 'hvac',
        color: '#A3B087',
        width: 4,
      });
      lines.push({
        p1: { x: 0, y: -0.8, z },
        p2: { x: 0, y: 0.8, z },
        layer: 'hvac',
        color: '#A3B087',
        width: 4,
      });

      // Branch ducts (thinner)
      lines.push({
        p1: { x: -0.8, y: -0.8, z },
        p2: { x: -0.8, y: -1.4, z },
        layer: 'hvac',
        color: '#A3B087',
        width: 2.5,
      });
      lines.push({
        p1: { x: 0.8, y: -0.8, z },
        p2: { x: 0.8, y: -1.4, z },
        layer: 'hvac',
        color: '#A3B087',
        width: 2.5,
      });
      lines.push({
        p1: { x: -0.5, y: 0.8, z },
        p2: { x: -1.3, y: 0.8, z },
        layer: 'hvac',
        color: '#A3B087',
        width: 2.5,
      });
      lines.push({
        p1: { x: 0.5, y: 0.8, z },
        p2: { x: 1.3, y: 0.8, z },
        layer: 'hvac',
        color: '#A3B087',
        width: 2.5,
      });

      // Add a couple of flows along HVAC
      flowPaths.push({
        points: [
          { x: -0.8, y: -0.8, z },
          { x: 0, y: -0.8, z },
          { x: 0, y: 0.8, z },
          { x: 0.5, y: 0.8, z },
          { x: 1.3, y: 0.8, z }
        ],
        layer: 'hvac',
        color: 'rgba(163, 176, 135, 0.8)',
        speed: 0.015,
        size: 3,
      });
    }

    // Plumbing/Sanitary (Slate Blue/Teal-ish - runs in cores and floors)
    // vertical riser in core
    lines.push({
      p1: { x: -0.4, y: 0.4, z: 0 },
      p2: { x: -0.4, y: 0.4, z: 4.2 },
      layer: 'plumbing',
      color: '#536b7b',
      width: 2,
    });
    
    // Water flows vertically in core
    flowPaths.push({
      points: [
        { x: -0.4, y: 0.4, z: 0 },
        { x: -0.4, y: 0.4, z: 4.2 }
      ],
      layer: 'plumbing',
      color: 'rgba(83, 107, 123, 0.9)',
      speed: 0.025,
      size: 2,
    });

    for (let f = 1; f < numFloors; f++) {
      const z = f * floorHeight - 0.4;
      // floor distribution
      lines.push({
        p1: { x: -0.4, y: 0.4, z },
        p2: { x: 1.2, y: 0.4, z },
        layer: 'plumbing',
        color: '#536b7b',
        width: 1.5,
      });
      lines.push({
        p1: { x: 1.2, y: 0.4, z },
        p2: { x: 1.2, y: 1.2, z },
        layer: 'plumbing',
        color: '#536b7b',
        width: 1.5,
      });
      lines.push({
        p1: { x: -0.4, y: 0.4, z },
        p2: { x: -1.2, y: 0.4, z },
        layer: 'plumbing',
        color: '#536b7b',
        width: 1.5,
      });

      flowPaths.push({
        points: [
          { x: -0.4, y: 0.4, z },
          { x: 1.2, y: 0.4, z },
          { x: 1.2, y: 1.2, z }
        ],
        layer: 'plumbing',
        color: 'rgba(163, 210, 240, 0.8)',
        speed: 0.02,
        size: 2,
      });
    }

    // Fire Protection System (Red / Glowing Sage color for accent)
    // Red sprinklers along perimeter ceiling
    for (let f = 1; f < numFloors; f++) {
      const z = f * floorHeight - 0.1;
      const size = 1.3;
      lines.push({
        p1: { x: -size, y: -size, z },
        p2: { x: size, y: -size, z },
        layer: 'fire',
        color: '#d97706',
        width: 1,
      });
      lines.push({
        p1: { x: size, y: -size, z },
        p2: { x: size, y: size, z },
        layer: 'fire',
        color: '#d97706',
        width: 1,
      });
      lines.push({
        p1: { x: size, y: size, z },
        p2: { x: -size, y: size, z },
        layer: 'fire',
        color: '#d97706',
        width: 1,
      });
      lines.push({
        p1: { x: -size, y: size, z },
        p2: { x: -size, y: -size, z },
        layer: 'fire',
        color: '#d97706',
        width: 1,
      });

      // Sprinkler nozzles (short vertical ticks)
      const nozzleOffset = 0.6;
      const nozzles = [
        { x: -nozzleOffset, y: -size },
        { x: nozzleOffset, y: -size },
        { x: size, y: -nozzleOffset },
        { x: size, y: nozzleOffset },
        { x: nozzleOffset, y: size },
        { x: -nozzleOffset, y: size },
        { x: -size, y: nozzleOffset },
        { x: -size, y: -nozzleOffset }
      ];

      nozzles.forEach(nozzle => {
        lines.push({
          p1: { x: nozzle.x, y: nozzle.y, z },
          p2: { x: nozzle.x, y: nozzle.y, z: z - 0.1 },
          layer: 'fire',
          color: '#d97706',
          width: 1,
        });
      });
    }

    // Electrical Cable Trays (Yellow/Yellow-Green lines)
    for (let f = 1; f < numFloors; f++) {
      const z = f * floorHeight - 0.3;
      lines.push({
        p1: { x: -1.0, y: -1.0, z },
        p2: { x: -0.5, y: -0.5, z },
        layer: 'electrical',
        color: '#fbbf24',
        width: 0.8,
      });
      lines.push({
        p1: { x: -0.5, y: -0.5, z },
        p2: { x: 0.5, y: 0.5, z },
        layer: 'electrical',
        color: '#fbbf24',
        width: 0.8,
        dash: [2, 2],
      });
      lines.push({
        p1: { x: 0.5, y: 0.5, z },
        p2: { x: 1.0, y: 1.0, z },
        layer: 'electrical',
        color: '#fbbf24',
        width: 0.8,
      });

      flowPaths.push({
        points: [
          { x: -1.0, y: -1.0, z },
          { x: -0.5, y: -0.5, z },
          { x: 0.5, y: 0.5, z },
          { x: 1.0, y: 1.0, z }
        ],
        layer: 'electrical',
        color: '#ffffff',
        speed: 0.03,
        size: 1.5,
      });
    }

    // ----------------------------------------------------
    // ANIMATION LOOP VARIABLES
    // ----------------------------------------------------
    let angle = 0;
    const particles = flowPaths.map(p => ({
      path: p,
      t: Math.random(),
    }));

    let introProgress = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (introProgress < 1) {
        introProgress += 0.015;
      }

      const scroll = scrollRef.current; // 0 to 1

      let yaw = angle; 
      let pitch = -0.5;
      let scale = 140;
      let cy = 0;
      let cx = 0;

      if (scroll < 0.2) {
        angle += 0.003;
        yaw = 0.5 + angle + (scroll * 1.5);
        pitch = -0.5 - (scroll * 0.5);
        scale = 130 + (scroll * 100);
        cy = (height * 0.05) - (scroll * (height * 0.3));
        cx = 0;
      } else if (scroll >= 0.2 && scroll < 0.45) {
        const sectionScroll = (scroll - 0.2) / 0.25;
        angle += 0.001;
        yaw = 2.0 + angle + (sectionScroll * 0.5);
        pitch = -1.0 + (sectionScroll * 0.4);
        scale = 230 - (sectionScroll * 60);
        cy = -(height * 0.2) + (sectionScroll * (height * 0.1));
        cx = (width > 768) ? (width * 0.18 * sectionScroll) : 0;
      } else if (scroll >= 0.45 && scroll < 0.7) {
        const sectionScroll = (scroll - 0.45) / 0.25;
        yaw = 2.5 + (sectionScroll * 0.8);
        pitch = -0.6 - (sectionScroll * 0.3);
        scale = 170 + (sectionScroll * 90);
        cy = -(height * 0.1) - (sectionScroll * (height * 0.05));
        cx = (width > 768) ? (width * 0.18 - (sectionScroll * (width * 0.35))) : 0;
      } else if (scroll >= 0.7 && scroll < 0.9) {
        const sectionScroll = (scroll - 0.7) / 0.2;
        angle += 0.002;
        yaw = 3.3 + angle + (sectionScroll * 0.8);
        pitch = -0.9 + (sectionScroll * 0.4);
        scale = 260 - (sectionScroll * 120);
        cy = -(height * 0.15) + (sectionScroll * (height * 0.2));
        cx = (width > 768) ? (-width * 0.17 + (sectionScroll * (width * 0.17))) : 0;
      } else {
        const sectionScroll = (scroll - 0.9) / 0.1;
        angle += 0.001;
        yaw = 4.1 + angle;
        pitch = -0.5 - (sectionScroll * 0.2);
        scale = 140 - (sectionScroll * 40);
        cy = (height * 0.05) + (sectionScroll * (height * 0.15));
        cx = 0;
      }

      const opacityMultiplier = scroll >= 0.9 ? Math.max(0, 1 - (scroll - 0.9) * 10) : 1;

      // Draw Viewport HUD (AutoCAD-like style)
      ctx.font = '10px monospace';
      ctx.fillStyle = `rgba(163, 176, 135, ${0.4 * opacityMultiplier})`;
      ctx.fillText('[VIEW: SW ISO - PERSPECTIVE]', 20, 30);
      ctx.fillText(`[GRID_SCALE: 1.0m] [UNITS: METRIC]`, 20, 45);
      
      const layersActive = [
        'STRUC',
        scroll > 0.15 ? 'HVAC' : null,
        scroll > 0.3 ? 'PLUMB' : null,
        scroll > 0.45 ? 'ELECT' : null,
        scroll > 0.6 ? 'FIRE' : null,
      ].filter(Boolean).join('::');
      ctx.fillText(`[ACTIVE_LAYERS: ${layersActive || 'GRID'}]`, 20, 60);

      // Simple Coordinate Compass in Corner
      const compassP = { x: -2.3, y: -2.3, z: 0.5 };
      const centerProj = { x: 70, y: height - 70 };
      const axes = [
        { pt: { x: -1.7, y: -2.3, z: 0.5 }, color: '#f43f5e', lbl: 'X' },
        { pt: { x: -2.3, y: -1.7, z: 0.5 }, color: '#10b981', lbl: 'Y' },
        { pt: { x: -2.3, y: -2.3, z: 1.1 }, color: '#3b82f6', lbl: 'Z' }
      ];

      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosX = Math.cos(pitch);
      const sinX = Math.sin(pitch);

      const projCompassBase = (p) => {
        let x1 = p.x * cosY - p.y * sinY;
        let y1 = p.x * sinY + p.y * cosY;
        let z1 = p.z;
        let z2 = y1 * sinX + z1 * cosX;
        return { x: x1 * 40 + centerProj.x, y: -z2 * 40 + centerProj.y };
      };

      const cBase = projCompassBase(compassP);

      if (opacityMultiplier > 0.1) {
        axes.forEach(axis => {
          const ptProj = projCompassBase(axis.pt);
          ctx.beginPath();
          ctx.moveTo(cBase.x, cBase.y);
          ctx.lineTo(ptProj.x, ptProj.y);
          ctx.strokeStyle = axis.color;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.fillStyle = axis.color;
          ctx.fillText(axis.lbl, ptProj.x + 3, ptProj.y + 3);
        });
        ctx.fillStyle = 'rgba(67, 86, 99, 0.4)';
        ctx.beginPath();
        ctx.arc(cBase.x, cBase.y, 2, 0, 2 * Math.PI);
        ctx.fill();
      }

      // ----------------------------------------------------
      // DRAW 3D MODEL
      // ----------------------------------------------------
      lines.forEach(line => {
        if (line.layer === 'hvac' && scroll < 0.15) return;
        if (line.layer === 'plumbing' && scroll < 0.3) return;
        if (line.layer === 'electrical' && scroll < 0.45) return;
        if (line.layer === 'fire' && scroll < 0.6) return;

        if (line.layer === 'structure' && line.p1.z / 4.0 > introProgress) return;

        const p1Proj = project(line.p1, yaw, pitch, width, height, scale, cy);
        const p2Proj = project(line.p2, yaw, pitch, width, height, scale, cy);

        ctx.beginPath();
        ctx.moveTo(p1Proj.x + cx, p1Proj.y);
        ctx.lineTo(p2Proj.x + cx, p2Proj.y);
        
        let alpha = 1;
        if (line.layer === 'grid') {
          alpha = 0.25 - (scroll * 0.15);
        } else if (line.layer === 'structure') {
          alpha = 0.45 - (scroll * 0.15);
        } else {
          if (line.layer === 'hvac' && scroll >= 0.15 && scroll < 0.35) alpha = 1.0;
          else if (line.layer === 'plumbing' && scroll >= 0.35 && scroll < 0.55) alpha = 1.0;
          else if (line.layer === 'electrical' && scroll >= 0.55 && scroll < 0.75) alpha = 1.0;
          else if (line.layer === 'fire' && scroll >= 0.75 && scroll < 0.9) alpha = 1.0;
          else alpha = 0.4;
        }

        alpha *= opacityMultiplier;

        if (alpha <= 0) return;

        ctx.strokeStyle = line.color;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = line.width;
        if (line.dash) {
          ctx.setLineDash(line.dash);
        } else {
          ctx.setLineDash([]);
        }
        ctx.stroke();
      });

      // ----------------------------------------------------
      // DRAW FLOW PARTICLES
      // ----------------------------------------------------
      particles.forEach(p => {
        if (p.path.layer === 'hvac' && scroll < 0.15) return;
        if (p.path.layer === 'plumbing' && scroll < 0.35) return;
        if (p.path.layer === 'electrical' && scroll < 0.55) return;
        if (p.path.layer === 'fire' && scroll < 0.75) return;

        p.t += p.path.speed;
        if (p.t > 1.0) p.t = 0;

        const points = p.path.points;
        const totalSegments = points.length - 1;
        const segmentFloat = p.t * totalSegments;
        const segmentIdx = Math.floor(segmentFloat);
        const segmentT = segmentFloat - segmentIdx;

        const startPt = points[segmentIdx];
        const endPt = points[Math.min(segmentIdx + 1, points.length - 1)];

        if (!startPt || !endPt) return;

        const current3D = {
          x: startPt.x + (endPt.x - startPt.x) * segmentT,
          y: startPt.y + (endPt.y - startPt.y) * segmentT,
          z: startPt.z + (endPt.z - startPt.z) * segmentT
        };

        const proj = project(current3D, yaw, pitch, width, height, scale, cy);

        ctx.beginPath();
        ctx.arc(proj.x + cx, proj.y, p.path.size, 0, 2 * Math.PI);
        ctx.fillStyle = p.path.color;
        ctx.globalAlpha = opacityMultiplier;
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;
      ctx.setLineDash([]);

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-navy"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
