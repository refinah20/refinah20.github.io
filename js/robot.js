/* AI CORE — procedural 3D android (no external model files). */
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const canvas = document.getElementById("robot-canvas");
const fallback = document.getElementById("robot-fallback");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function showFallback() {
  if (canvas) canvas.hidden = true;
  if (fallback) fallback.hidden = false;
}

try {
  init();
} catch (err) {
  console.warn("3D robot unavailable, showing fallback:", err);
  showFallback();
}

function init() {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, -0.75, 8.2);
  camera.lookAt(0, -0.95, 0);

  /* ---------- materials ---------- */
  const titanium = new THREE.MeshPhysicalMaterial({ color: 0xc4ccd5, metalness: 1, roughness: 0.3, clearcoat: 0.35, clearcoatRoughness: 0.25, envMapIntensity: 1.7 });
  const gunmetal = new THREE.MeshPhysicalMaterial({ color: 0x3a424c, metalness: 0.92, roughness: 0.34, envMapIntensity: 1.4 });
  const graphite = new THREE.MeshStandardMaterial({ color: 0x0d1014, metalness: 0.55, roughness: 0.5 });
  const visor = new THREE.MeshPhysicalMaterial({ color: 0x04070a, metalness: 0.3, roughness: 0.06, clearcoat: 1, clearcoatRoughness: 0.03 });
  const glow = new THREE.MeshStandardMaterial({ color: 0x45d8ef, emissive: 0x45d8ef, emissiveIntensity: 2.4, toneMapped: false });
  const seam = new THREE.MeshStandardMaterial({ color: 0x07090c, metalness: 0.4, roughness: 0.6 });

  const robot = new THREE.Group();
  scene.add(robot);

  /* ---------- head ---------- */
  const head = new THREE.Group();
  head.position.y = 0.05;
  robot.add(head);
  const skull = new THREE.Group();
  skull.scale.set(0.9, 1.06, 0.98);
  head.add(skull);

  skull.add(new THREE.Mesh(new THREE.SphereGeometry(1, 72, 54), titanium));
  // visor band across the eyes (front segment of a slightly larger sphere)
  const visorMesh = new THREE.Mesh(new THREE.SphereGeometry(1.012, 72, 24, Math.PI / 2 - 0.86, 1.72, 1.12, 0.62), visor);
  skull.add(visorMesh);
  // visor trim lines
  [1.12, 1.74].forEach((theta) => {
    const r = Math.sin(theta) * 1.016, y = Math.cos(theta) * 1.016;
    // arc lies in the XZ plane after the X rotation; start angle centres it on the face (+Z)
    const trim = new THREE.Mesh(new THREE.TorusGeometry(r, 0.012, 8, 96, 1.72), gunmetal);
    trim.rotation.set(Math.PI / 2, 0, Math.PI / 2 - 0.86);
    trim.position.y = y;
    skull.add(trim);
  });
  // panel seams: crown seam and lower jaw seam
  const crown = new THREE.Mesh(new THREE.TorusGeometry(1.004, 0.008, 6, 128, Math.PI), seam);
  crown.rotation.y = Math.PI / 2; skull.add(crown);
  [0.62, -0.5].forEach((y) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(Math.sqrt(1 - y * y) * 1.003, 0.007, 6, 128), seam);
    ring.rotation.x = Math.PI / 2; ring.position.y = y; skull.add(ring);
  });
  // eyes
  const eyes = [];
  [-1, 1].forEach((s) => {
    const phi = Math.PI / 2 + s * 0.34, theta = 1.43, r = 1.02;
    const eye = new THREE.Mesh(new THREE.CapsuleGeometry(0.05, 0.17, 6, 16), glow);
    eye.position.set(-r * Math.cos(phi) * Math.sin(theta), r * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta));
    eye.rotation.set(0, s * 0.34, Math.PI / 2); // lie horizontally, follow the visor curve
    skull.add(eye); eyes.push(eye);
  });
  // mouth grille: short horizontal slots
  for (let i = 0; i < 5; i++) {
    const slot = new THREE.Mesh(new THREE.BoxGeometry(0.34 - Math.abs(i - 2) * 0.05, 0.016, 0.05), seam);
    slot.position.set(0, -0.58 - i * 0.045, 0.79 - i * 0.012);
    slot.rotation.x = -0.45 - i * 0.04;
    skull.add(slot);
  }
  // ear modules
  [-1, 1].forEach((s) => {
    const ear = new THREE.Group();
    ear.position.set(s * 0.9, 0.02, 0);
    ear.rotation.z = Math.PI / 2;
    ear.add(new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.3, 0.2, 56), gunmetal));
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.06, 56), graphite);
    cap.position.y = s * 0.12; ear.add(cap);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.014, 10, 64), glow);
    ring.rotation.x = Math.PI / 2; ring.position.y = s * 0.155; ear.add(ring);
    // small vent fins
    for (let k = 0; k < 4; k++) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.05, 0.16), titanium);
      fin.position.set(-0.06 + k * 0.04, s * 0.155, 0); ear.add(fin);
    }
    head.add(ear);
  });
  // antenna sensor
  const sensor = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.05, 0.28, 16), gunmetal);
  sensor.position.set(0.42, 1.0, -0.15); sensor.rotation.z = -0.35; head.add(sensor);
  const sensorTip = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 12), glow);
  sensorTip.position.set(0.47, 1.14, -0.15); head.add(sensorTip);

  /* ---------- neck & body ---------- */
  const body = new THREE.Group();
  robot.add(body);
  for (let i = 0; i < 4; i++) {
    const seg = new THREE.Mesh(new THREE.CylinderGeometry(0.3 + i * 0.02, 0.32 + i * 0.02, 0.1, 40), i % 2 ? graphite : gunmetal);
    seg.position.y = -1.0 - i * 0.11; body.add(seg);
  }
  // torso lathe (shoulders and chest), flattened front-to-back
  const prof = [[0.42, -1.42], [0.62, -1.5], [1.15, -1.66], [1.55, -1.86], [1.72, -2.12], [1.74, -2.6], [1.62, -3.6]].map(([x, y]) => new THREE.Vector2(x, y));
  const torso = new THREE.Mesh(new THREE.LatheGeometry(prof, 96), titanium);
  torso.scale.z = 0.6; body.add(torso);
  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.47, 0.05, 16, 64), gunmetal);
  collar.rotation.x = Math.PI / 2; collar.position.y = -1.45; body.add(collar);
  // chest plate seam lines
  [-2.0, -2.9].forEach((y) => {
    const rr = 1.7;
    const s2 = new THREE.Mesh(new THREE.TorusGeometry(rr, 0.008, 6, 128), seam);
    s2.rotation.x = Math.PI / 2; s2.position.y = y; s2.scale.set(1, 0.6, 1); body.add(s2);
  });
  // shoulder pauldrons
  [-1, 1].forEach((s) => {
    const p = new THREE.Mesh(new THREE.SphereGeometry(0.58, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2), gunmetal);
    p.position.set(s * 1.48, -1.95, 0); p.scale.set(1, 0.7, 0.85); p.rotation.z = -s * 0.5; body.add(p);
    const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.04, 20), titanium);
    bolt.position.set(s * 1.62, -1.72, 0.32); bolt.rotation.x = Math.PI / 2.4; body.add(bolt);
  });
  // AI core in the chest
  const coreGroup = new THREE.Group();
  coreGroup.position.set(0, -2.38, 1.02);
  body.add(coreGroup);
  const housing = new THREE.Mesh(new THREE.TorusGeometry(0.27, 0.07, 24, 64), gunmetal);
  coreGroup.add(housing);
  const coreRing = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.012, 8, 64), glow);
  coreGroup.add(coreRing);
  const coreMat = glow.clone();
  const core = new THREE.Mesh(new THREE.SphereGeometry(0.15, 32, 24), coreMat);
  core.scale.z = 0.5; coreGroup.add(core);
  for (let k = 0; k < 6; k++) {
    const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.09, 0.03), titanium);
    const a = (k / 6) * Math.PI * 2;
    spoke.position.set(Math.cos(a) * 0.235, Math.sin(a) * 0.235, 0.03); spoke.rotation.z = a + Math.PI / 2;
    coreGroup.add(spoke);
  }
  const coreLight = new THREE.PointLight(0x45d8ef, 2.2, 3.2, 2);
  coreLight.position.set(0, -2.3, 1.5); body.add(coreLight);

  /* ---------- lights ---------- */
  scene.add(new THREE.HemisphereLight(0xbfd4e6, 0x05070a, 0.35));
  const key = new THREE.DirectionalLight(0xffffff, 2.1); key.position.set(3, 4, 6); scene.add(key);
  const rim = new THREE.DirectionalLight(0x45d8ef, 3.2); rim.position.set(-5, 2.5, -4); scene.add(rim);
  const rim2 = new THREE.DirectionalLight(0x4c84e0, 1.6); rim2.position.set(5, 0, -3); scene.add(rim2);
  const fill = new THREE.DirectionalLight(0xdfe8f0, 1.1); fill.position.set(-1.5, -3, 6); scene.add(fill);
  const eyeLight = new THREE.PointLight(0x45d8ef, 0.9, 2.5, 2); eyeLight.position.set(0, 0.2, 1.6); head.add(eyeLight);

  /* ---------- neural particles ---------- */
  const N = 260, pts = [], pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const r = 2.9 + Math.random() * 1.6, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
    const v = new THREE.Vector3(r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph) * 0.8 - 0.9, r * Math.sin(ph) * Math.sin(th) - 1.2);
    pts.push(v); pos.set([v.x, v.y, v.z], i * 3);
  }
  const pGeo = new THREE.BufferGeometry(); pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0x7fe6f6, size: 0.035, transparent: true, opacity: 0.7, depthWrite: false }));
  const linePos = [];
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
    if (pts[i].distanceTo(pts[j]) < 0.62 && linePos.length < 2400) linePos.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
  }
  const lGeo = new THREE.BufferGeometry(); lGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePos, 3));
  const lines = new THREE.LineSegments(lGeo, new THREE.LineBasicMaterial({ color: 0x45d8ef, transparent: true, opacity: 0.12, depthWrite: false }));
  const neural = new THREE.Group(); neural.add(particles, lines); scene.add(neural);

  /* ---------- sizing ---------- */
  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  };
  new ResizeObserver(resize).observe(canvas);
  resize();

  /* ---------- interaction ---------- */
  const target = new THREE.Vector2(0, 0);
  window.addEventListener("pointermove", (e) => {
    const r = canvas.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height * 0.42;
    target.set(THREE.MathUtils.clamp((e.clientX - cx) / (window.innerWidth * 0.5), -1, 1), THREE.MathUtils.clamp((e.clientY - cy) / (window.innerHeight * 0.5), -1, 1));
  }, { passive: true });

  /* ---------- loop ---------- */
  const clock = new THREE.Clock();
  let running = false, visible = true, nextBlink = 2.5, blinkT = -1;
  const frame = () => {
    const t = clock.getElapsedTime();
    // idle drift + pointer tracking
    const idleX = Math.sin(t * 0.35) * 0.08, idleY = Math.sin(t * 0.23) * 0.04;
    head.rotation.y += ((target.x * 0.42 + idleX) - head.rotation.y) * 0.06;
    head.rotation.x += ((target.y * 0.2 + idleY) - head.rotation.x) * 0.06;
    head.rotation.z = Math.sin(t * 0.3) * 0.02;
    body.rotation.y += ((target.x * 0.1) - body.rotation.y) * 0.04;
    // breathing
    const breath = Math.sin(t * 1.15);
    body.position.y = breath * 0.018; body.scale.set(1 + breath * 0.004, 1, 1 + breath * 0.006);
    head.position.y = 0.05 + breath * 0.022;
    // blink
    if (t > nextBlink && blinkT < 0) blinkT = t;
    if (blinkT >= 0) {
      const k = (t - blinkT) / 0.16;
      const s = k < 1 ? Math.max(0.1, Math.abs(1 - 2 * k)) : 1;
      eyes.forEach((e) => (e.scale.y = s));
      if (k >= 1) { blinkT = -1; nextBlink = t + 3 + Math.random() * 3.5; }
    }
    // core pulse
    const pulse = 0.5 + 0.5 * Math.sin(t * 2.1);
    coreMat.emissiveIntensity = 1.8 + pulse * 1.6;
    coreLight.intensity = 1.6 + pulse * 1.4;
    coreRing.rotation.z = t * 0.6;
    neural.rotation.y = t * 0.03;
    renderer.render(scene, camera);
  };
  const loop = () => { if (!running) return; frame(); requestAnimationFrame(loop); };
  const start = () => { if (!running && visible && !document.hidden && !reduceMotion) { running = true; clock.start(); requestAnimationFrame(loop); } };
  const stop = () => { running = false; };

  frame(); // first still frame (also the only frame for reduced motion)
  window.__robotReady = true;
  new IntersectionObserver((en) => { visible = en[0].isIntersecting; visible ? start() : stop(); }).observe(canvas);
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
  if (reduceMotion) window.addEventListener("resize", () => frame());
  start();
}
