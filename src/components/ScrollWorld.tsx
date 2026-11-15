import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Waypoints } from 'lucide-react';
import * as THREE from 'three';
import { WORLD_SECTIONS } from '../data/worldStory';
import { SITE } from '../data/site';

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function lingerMap(t: number, linger: number) {
  if (linger <= 0) return t;
  const L = Math.min(0.6, linger);
  // Slow in the middle (copy peak), faster at edges — f(0)=0, f(1)=1
  const mid = 0.5;
  const s = 1 + L * 2.2;
  const x = (t - mid) * s;
  const sigmoid = 1 / (1 + Math.exp(-x * 6));
  const a = 1 / (1 + Math.exp(mid * s * 6));
  const b = 1 / (1 + Math.exp(-(1 - mid) * s * 6));
  return (sigmoid - a) / (b - a);
}

function makeMat(color: string, emissive = color, intensity = 0.35) {
  return new THREE.MeshStandardMaterial({
    color,
    emissive,
    emissiveIntensity: intensity,
    metalness: 0.55,
    roughness: 0.35,
  });
}

function addBox(
  parent: THREE.Group,
  w: number,
  h: number,
  d: number,
  x: number,
  y: number,
  z: number,
  mat: THREE.Material
) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}

function buildIsland(kind: string, accent: string): THREE.Group {
  const g = new THREE.Group();
  const base = makeMat('#0a1220', '#001a44', 0.15);
  const glow = makeMat(accent, accent, 0.7);
  const soft = makeMat('#121a2a', accent, 0.12);
  const white = makeMat('#dce7ff', accent, 0.2);

  // Floating plate
  const plate = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.6, 0.35, 6), base);
  plate.position.y = 0;
  g.add(plate);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(4.35, 0.06, 8, 6), glow);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.2;
  g.add(rim);

  if (kind === 'city') {
    const heights = [1.2, 2.4, 1.6, 3.1, 1.1, 2.0, 2.8, 1.4];
    heights.forEach((h, i) => {
      const a = (i / heights.length) * Math.PI * 2;
      const r = 1.6 + (i % 3) * 0.35;
      addBox(g, 0.55, h, 0.55, Math.cos(a) * r, 0.2 + h / 2, Math.sin(a) * r, i % 2 ? glow : soft);
    });
    addBox(g, 0.9, 3.6, 0.9, 0, 2, 0, white);
  } else if (kind === 'signals') {
    const dish = new THREE.Mesh(new THREE.SphereGeometry(1.1, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), glow);
    dish.rotation.x = Math.PI;
    dish.position.y = 1.4;
    g.add(dish);
    addBox(g, 0.25, 1.6, 0.25, 0, 0.9, 0, soft);
    for (let i = 0; i < 5; i++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.4 + i * 0.35, 0.03, 8, 48), glow);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 1.5 + i * 0.15;
      ring.userData.spin = 0.4 + i * 0.15;
      g.add(ring);
    }
  } else if (kind === 'needs') {
    ['#0070FF', '#3b8eff', '#5aa2ff', '#89b8ff'].forEach((c, i) => {
      const pillar = addBox(g, 0.7, 1.2 + i * 0.45, 0.7, -1.5 + i * 1.1, 0.7 + i * 0.2, 0, makeMat(c, c, 0.55));
      pillar.userData.bob = i;
    });
    addBox(g, 3.8, 0.08, 1.2, 0.2, 0.35, 1.6, soft);
  } else if (kind === 'vendors') {
    for (let i = 0; i < 6; i++) {
      const x = -2 + (i % 3) * 2;
      const z = -1.2 + Math.floor(i / 3) * 2.4;
      addBox(g, 1.2, 0.15, 1.2, x, 0.35, z, soft);
      addBox(g, 0.9, 0.9, 0.9, x, 0.9, z, i % 2 ? glow : white);
    }
  } else if (kind === 'bridge') {
    const arc = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.12, 10, 48, Math.PI), glow);
    arc.rotation.y = Math.PI / 2;
    arc.position.y = 1.4;
    g.add(arc);
    addBox(g, 0.8, 1.4, 0.8, -2.4, 0.9, 0, soft);
    addBox(g, 0.8, 1.4, 0.8, 2.4, 0.9, 0, soft);
    const orb = new THREE.Mesh(new THREE.SphereGeometry(0.35, 20, 20), white);
    orb.position.y = 2.5;
    orb.userData.pulse = true;
    g.add(orb);
  } else {
    // CTA HQ
    addBox(g, 2.4, 1.8, 2.4, 0, 1.1, 0, soft);
    addBox(g, 1.2, 2.6, 1.2, 0, 2.4, 0, glow);
    const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 16), white);
    beacon.position.y = 4;
    beacon.userData.pulse = true;
    g.add(beacon);
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      addBox(g, 0.15, 0.6, 0.15, Math.cos(a) * 3.2, 0.5, Math.sin(a) * 3.2, glow);
    }
  }

  return g;
}

export default function ScrollWorld() {
  const mountRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const smoothRef = useRef(0);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const [hintVisible, setHintVisible] = useState(true);
  const reduce =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const totalVh = useMemo(
    () => WORLD_SECTIONS.reduce((s, sec) => s + sec.scroll, 0) + 0.4,
    []
  );

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x03060c, 0.028);
    scene.background = new THREE.Color(0x050505);

    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 200);
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.shadowMap.enabled = true;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const amb = new THREE.AmbientLight(0x334466, 0.55);
    scene.add(amb);
    const key = new THREE.DirectionalLight(0x0070ff, 1.4);
    key.position.set(8, 18, 10);
    key.castShadow = true;
    scene.add(key);
    const fill = new THREE.PointLight(0x3b8eff, 1.2, 40);
    fill.position.set(0, 8, 0);
    scene.add(fill);

    // Star field
    const starGeo = new THREE.BufferGeometry();
    const starCount = 900;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 1] = Math.random() * 40 - 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 120;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    scene.add(
      new THREE.Points(
        starGeo,
        new THREE.PointsMaterial({ color: 0x88aaff, size: 0.05, transparent: true, opacity: 0.7 })
      )
    );

    // Ground grid
    const grid = new THREE.GridHelper(80, 60, 0x0070ff, 0x0a1a33);
    grid.position.y = -1.2;
    scene.add(grid);

    const kinds = WORLD_SECTIONS.map((s) => s.id);
    const islands: THREE.Group[] = [];
    const pathPoints: THREE.Vector3[] = [];

    kinds.forEach((kind, i) => {
      const island = buildIsland(kind, WORLD_SECTIONS[i].accent);
      const x = i * 14;
      const z = Math.sin(i * 0.9) * 3.5;
      island.position.set(x, Math.sin(i) * 0.3, z);
      scene.add(island);
      islands.push(island);
      pathPoints.push(new THREE.Vector3(x - 5.5, 4.2, z + 7.5));
      pathPoints.push(new THREE.Vector3(x - 1.2, 3.2, z + 4.2));
      pathPoints.push(new THREE.Vector3(x + 0.4, 2.6, z + 0.8));
      pathPoints.push(new THREE.Vector3(x + 3.5, 3.8, z - 2.5));
    });
    pathPoints.push(new THREE.Vector3(kinds.length * 14 - 2, 5, -4));

    const curve = new THREE.CatmullRomCurve3(pathPoints, false, 'catmullrom', 0.35);

    // Energy ribbons between islands
    for (let i = 0; i < islands.length - 1; i++) {
      const a = islands[i].position;
      const b = islands[i + 1].position;
      const mid = new THREE.Vector3().lerpVectors(a, b, 0.5).add(new THREE.Vector3(0, 2.2, 0));
      const ribbon = new THREE.CatmullRomCurve3([
        a.clone().add(new THREE.Vector3(0, 1.2, 0)),
        mid,
        b.clone().add(new THREE.Vector3(0, 1.2, 0)),
      ]);
      const tube = new THREE.Mesh(
        new THREE.TubeGeometry(ribbon, 40, 0.04, 8, false),
        makeMat('#0070FF', '#0070FF', 0.85)
      );
      scene.add(tube);
    }

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    resize();
    window.addEventListener('resize', resize);

    let raf = 0;
    const clock = new THREE.Clock();
    const lookTarget = new THREE.Vector3();
    const camPos = new THREE.Vector3();

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(clock.getDelta(), 0.05);
      const target = progressRef.current;
      const lerp = reduce ? 1 : 1 - Math.exp(-dt * 6.5);
      smoothRef.current += (target - smoothRef.current) * lerp;
      const p = THREE.MathUtils.clamp(smoothRef.current, 0, 0.999);

      // Map global progress → section + linger
      let acc = 0;
      const weights = WORLD_SECTIONS.map((s) => s.scroll);
      const sum = weights.reduce((a, b) => a + b, 0);
      let local = 0;
      let si = 0;
      for (let i = 0; i < weights.length; i++) {
        const w = weights[i] / sum;
        if (p <= acc + w || i === weights.length - 1) {
          si = i;
          local = (p - acc) / w;
          break;
        }
        acc += w;
      }
      local = lingerMap(easeInOut(THREE.MathUtils.clamp(local, 0, 1)), WORLD_SECTIONS[si].linger);
      // Camera u across whole curve with section bias
      const u = (si + local) / WORLD_SECTIONS.length;
      curve.getPointAt(THREE.MathUtils.clamp(u, 0, 1), camPos);
      const lookU = Math.min(1, u + 0.04);
      curve.getPointAt(lookU, lookTarget);
      lookTarget.y -= 0.6;
      camera.position.copy(camPos);
      camera.lookAt(lookTarget);

      // Animate islands
      const t = clock.elapsedTime;
      islands.forEach((island, i) => {
        island.rotation.y = Math.sin(t * 0.25 + i) * 0.08;
        island.position.y = Math.sin(t * 0.7 + i) * 0.12;
        island.traverse((obj) => {
          if ((obj as THREE.Mesh).isMesh) {
            const mesh = obj as THREE.Mesh;
            if (mesh.userData.spin) mesh.rotation.z = t * mesh.userData.spin;
            if (mesh.userData.pulse) {
              const s = 1 + Math.sin(t * 3) * 0.12;
              mesh.scale.setScalar(s);
            }
          }
        });
        const focus = 1 - Math.min(1, Math.abs(si + local - i) * 1.1);
        island.scale.setScalar(0.92 + focus * 0.12);
      });

      if (si !== activeRef.current) {
        activeRef.current = si;
        setActive(si);
      }
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [reduce]);

  useEffect(() => {
    const onScroll = () => {
      const el = scrollRef.current;
      if (!el) return;
      const max = el.scrollHeight - window.innerHeight;
      progressRef.current = max > 0 ? window.scrollY / max : 0;
      if (window.scrollY > 40) setHintVisible(false);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const section = WORLD_SECTIONS[active] ?? WORLD_SECTIONS[0];

  return (
    <div className="sw-root relative bg-[#050505] text-white" style={{ height: `${totalVh * 100}vh` }} ref={scrollRef}>
      <div ref={mountRef} className="pointer-events-none fixed inset-0 z-0" aria-hidden />

      {/* Atmosphere overlays */}
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,5,0.35)_70%,rgba(5,5,5,0.85)_100%)]" />

      {/* Top brand bar */}
      <div className="fixed top-0 inset-x-0 z-30 flex items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0070FF] text-white shadow-[0_0_24px_rgba(0,112,255,0.45)]">
            <Waypoints className="h-5 w-5" />
          </span>
          <span className="font-bold tracking-tighter text-lg">{SITE.brand}</span>
        </Link>
        <nav className="hidden gap-5 text-xs font-medium text-white/50 md:flex">
          {WORLD_SECTIONS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                const el = scrollRef.current;
                if (!el) return;
                const max = el.scrollHeight - window.innerHeight;
                const sum = WORLD_SECTIONS.reduce((a, b) => a + b.scroll, 0);
                let acc = 0;
                for (let j = 0; j < i; j++) acc += WORLD_SECTIONS[j].scroll;
                window.scrollTo({ top: ((acc + 0.15) / sum) * max, behavior: 'smooth' });
              }}
              className={`transition-colors ${active === i ? 'text-[#0070FF]' : 'hover:text-white'}`}
            >
              {s.label}
            </button>
          ))}
          <Link to="/contact" className="rounded-full bg-[#0070FF] px-4 py-1.5 text-white shadow-[0_0_20px_rgba(0,112,255,0.35)]">
            Contact
          </Link>
        </nav>
        <Link to="/contact" className="md:hidden rounded-full bg-[#0070FF] px-3 py-1.5 text-xs font-semibold">
          Contact
        </Link>
      </div>

      {/* Progress rail */}
      <div className="fixed right-3 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2 md:flex">
        {WORLD_SECTIONS.map((s, i) => (
          <div
            key={s.id}
            className={`h-8 w-1 rounded-full transition-all ${active === i ? 'bg-[#0070FF] h-12' : 'bg-white/20'}`}
          />
        ))}
      </div>

      {/* Sticky copy */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 px-4 pb-10 pt-24 sm:px-8 sm:pb-14">
        <div className="pointer-events-auto mx-auto max-w-xl rounded-2xl border border-white/10 bg-black/55 p-6 backdrop-blur-xl sm:p-8 shadow-[0_0_60px_rgba(0,112,255,0.12)]">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#0070FF]">
            {section.eyebrow}
          </p>
          <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-4xl">{section.title}</h1>
          <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">{section.body}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {section.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#0070FF]/40 bg-[#0070FF]/10 px-3 py-1 text-[11px] text-[#89b8ff]"
              >
                {tag}
              </span>
            ))}
          </div>
          {section.cta && (
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Link
                to={section.cta.primary.href}
                className="inline-flex items-center justify-center rounded-xl bg-[#0070FF] px-5 py-3 text-sm font-semibold shadow-[0_0_28px_rgba(0,112,255,0.4)]"
              >
                {section.cta.primary.label}
              </Link>
              {section.cta.secondary && (
                <Link
                  to={section.cta.secondary.href}
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white/80"
                >
                  {section.cta.secondary.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {hintVisible && (
        <p className="fixed bottom-36 left-1/2 z-20 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 md:bottom-8">
          Scroll to fly through the world
        </p>
      )}
    </div>
  );
}
