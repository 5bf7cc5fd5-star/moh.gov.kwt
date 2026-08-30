"use client";

import { useEffect, useRef } from "react";

export function ChromeOffline() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const raw = canvas.getContext("2d");
    if (!raw) return;
    const ctx: CanvasRenderingContext2D = raw;

    const W = 600;
    const H = 150;
    const scale = Math.min(1, (canvas.parentElement?.clientWidth ?? W) / W);
    canvas.width = W;
    canvas.height = H;
    canvas.style.width = `${Math.round(W * scale)}px`;
    canvas.style.height = `${Math.round(H * scale)}px`;

    let running = false;
    let dead = false;
    let t = 0;
    let speed = 6;
    let score = 0;
    let hi = Number(localStorage.getItem("dino-hi") || 0);
    let y = 0;
    let vy = 0;
    let duck = false;
    const ground = 110;
    const obstacles: { x: number; w: number; h: number }[] = [];
    let spawn = 90;
    let raf = 0;

    function reset() {
      running = true;
      dead = false;
      t = 0;
      speed = 6;
      score = 0;
      y = 0;
      vy = 0;
      duck = false;
      obstacles.length = 0;
      spawn = 80;
    }

    function jump() {
      if (dead) {
        reset();
        return;
      }
      if (!running) {
        reset();
        return;
      }
      if (y === 0) vy = -11.2;
    }

    function drawDino(x: number, footY: number) {
      ctx.fillStyle = "#535353";
      const bob = running && y === 0 ? Math.floor(t / 6) % 2 : 0;
      if (duck) {
        ctx.fillRect(x, footY - 18, 38, 18);
        ctx.fillRect(x + 28, footY - 24, 16, 10);
        ctx.fillRect(x + 40, footY - 22, 4, 4);
        return;
      }
      ctx.fillRect(x + 14, footY - 44, 20, 16);
      ctx.fillRect(x + 28, footY - 40, 4, 4);
      ctx.fillRect(x + 18, footY - 48, 6, 4);
      ctx.fillRect(x + 4, footY - 32, 22, 22);
      ctx.fillRect(x, footY - 24, 8, 8);
      ctx.fillRect(x + 8, footY - 12, 10, 12);
      if (bob) ctx.fillRect(x + 18, footY - 8, 8, 8);
      else ctx.fillRect(x + 4, footY - 8, 8, 8);
      ctx.fillStyle = "#f7f7f7";
      ctx.fillRect(x + 26, footY - 42, 3, 3);
    }

    function frame() {
      t += 1;
      ctx.fillStyle = "#f7f7f7";
      ctx.fillRect(0, 0, W, H);

      ctx.strokeStyle = "#535353";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, ground);
      ctx.lineTo(W, ground);
      ctx.stroke();

      if (running && !dead) {
        vy += 0.7;
        y += vy;
        if (y > 0) {
          y = 0;
          vy = 0;
        }
        speed = Math.min(13, 6 + score / 120);
        spawn -= 1;
        if (spawn <= 0) {
          obstacles.push({
            x: W + 10,
            w: 10 + Math.floor(Math.random() * 18),
            h: 22 + Math.floor(Math.random() * 18),
          });
          spawn = 55 + Math.floor(Math.random() * 70);
        }
        for (const o of obstacles) o.x -= speed;
        while (obstacles.length && obstacles[0]!.x < -40) obstacles.shift();
        score += 0.15 * speed;

        const dino = { x: 42, y: ground + y - (duck ? 18 : 44), w: 36, h: duck ? 18 : 44 };
        for (const o of obstacles) {
          const ox = o.x;
          const oy = ground - o.h;
          if (
            dino.x < ox + o.w &&
            dino.x + dino.w > ox &&
            dino.y < oy + o.h &&
            dino.y + dino.h > oy
          ) {
            dead = true;
            running = false;
            hi = Math.max(hi, Math.floor(score));
            localStorage.setItem("dino-hi", String(hi));
          }
        }
      }

      ctx.fillStyle = "#535353";
      for (const o of obstacles) {
        ctx.fillRect(o.x, ground - o.h, o.w, o.h);
        ctx.fillRect(o.x + 3, ground - o.h - 8, 4, 8);
      }

      drawDino(40, ground + y);

      ctx.font = "16px 'Segoe UI', system-ui, sans-serif";
      ctx.fillStyle = "#535353";
      ctx.textAlign = "right";
      const s = String(Math.floor(score)).padStart(5, "0");
      const h = String(Math.floor(hi)).padStart(5, "0");
      ctx.fillText(`HI ${h}  ${s}`, W - 8, 22);

      if (dead) {
        ctx.textAlign = "center";
        ctx.font = "bold 18px 'Segoe UI', system-ui, sans-serif";
        ctx.fillText("G A M E  O V E R", W / 2, 48);
      }

      raf = requestAnimationFrame(frame);
    }

    function onKey(e: KeyboardEvent) {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        jump();
      }
      duck = e.code === "ArrowDown" && running && !dead;
    }
    function onUp(e: KeyboardEvent) {
      if (e.code === "ArrowDown") duck = false;
    }
    function onTap(e: Event) {
      e.preventDefault();
      jump();
    }

    window.addEventListener("keydown", onKey, { passive: false });
    window.addEventListener("keyup", onUp);
    canvas.addEventListener("pointerdown", onTap);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onUp);
      canvas.removeEventListener("pointerdown", onTap);
    };
  }, []);

  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "#f7f7f7",
        color: "#5f6368",
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        display: "flex",
        justifyContent: "center",
        padding: "12vh 24px 40px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 620 }}>
        <button
          type="button"
          onClick={() => canvasRef.current?.dispatchEvent(new Event("pointerdown"))}
          style={{
            display: "block",
            width: "100%",
            padding: 0,
            border: 0,
            background: "transparent",
            cursor: "pointer",
          }}
          aria-label="Tap the dino or press space to play"
        >
          <canvas ref={canvasRef} style={{ display: "block", margin: "0 auto" }} />
        </button>
        <p style={{ margin: "8px 0 28px", fontSize: 13, color: "#80868b" }}>
          Tap the dino or press space to play
        </p>
        <h1
          style={{
            margin: "0 0 16px",
            fontSize: 24,
            fontWeight: 500,
            color: "#202124",
            letterSpacing: "-0.2px",
          }}
        >
          No internet
        </h1>
        <p style={{ margin: "0 0 8px", fontSize: 15 }}>Try:</p>
        <ul style={{ margin: "0 0 22px", paddingLeft: 20, fontSize: 15, lineHeight: 1.7 }}>
          <li>Checking the network cables, modem, and router</li>
          <li>Reconnecting to Wi-Fi</li>
          <li>Running Windows Network Diagnostics</li>
        </ul>
        <p style={{ margin: 0, fontSize: 13, color: "#80868b" }}>ERR_INTERNET_DISCONNECTED</p>
      </div>
    </main>
  );
}
