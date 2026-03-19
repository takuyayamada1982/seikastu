@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    min-height: 100%;
    -webkit-tap-highlight-color: transparent;
    -webkit-text-size-adjust: 100%;
    background: #020611;
  }

  body {
    min-height: 100dvh;
    color: #e6fbff;
    background:
      radial-gradient(circle at 15% 12%, rgba(34, 211, 238, 0.16), transparent 26%),
      radial-gradient(circle at 84% 10%, rgba(217, 70, 239, 0.14), transparent 24%),
      radial-gradient(circle at 50% 100%, rgba(59, 130, 246, 0.14), transparent 32%),
      linear-gradient(180deg, #030712 0%, #06101d 48%, #020611 100%);
    font-feature-settings: "palt";
  }

  a {
    -webkit-tap-highlight-color: transparent;
  }
}

@layer utilities {
  .safe-area-bottom {
    padding-bottom: env(safe-area-inset-bottom);
  }

  .safe-area-top {
    padding-top: env(safe-area-inset-top);
  }

  .grid-bg {
    background-image:
      linear-gradient(rgba(34, 211, 238, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(34, 211, 238, 0.05) 1px, transparent 1px);
    background-size: 22px 22px;
  }

  .cyber-panel {
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(34, 211, 238, 0.18);
    background:
      linear-gradient(180deg, rgba(5, 14, 27, 0.96), rgba(4, 10, 20, 0.9)),
      rgba(2, 6, 23, 0.94);
    box-shadow:
      inset 0 0 0 1px rgba(255, 255, 255, 0.02),
      0 0 0 1px rgba(34, 211, 238, 0.05),
      0 0 24px rgba(34, 211, 238, 0.12),
      0 0 44px rgba(168, 85, 247, 0.08);
    backdrop-filter: blur(14px);
  }

  .cyber-panel::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.06), transparent);
    opacity: 0.45;
    pointer-events: none;
  }

  .cyber-outline {
    position: relative;
  }

  .cyber-outline::after {
    content: "";
    position: absolute;
    inset: 10px;
    border: 1px solid rgba(34, 211, 238, 0.12);
    border-radius: 20px;
    pointer-events: none;
  }

  .neon-text {
    text-shadow:
      0 0 10px rgba(34, 211, 238, 0.22),
      0 0 20px rgba(168, 85, 247, 0.08);
  }

  .neon-blue {
    box-shadow:
      0 0 0 1px rgba(34, 211, 238, 0.14),
      0 0 18px rgba(34, 211, 238, 0.2);
  }

  .neon-purple {
    box-shadow:
      0 0 0 1px rgba(217, 70, 239, 0.14),
      0 0 18px rgba(217, 70, 239, 0.18);
  }

  .cyber-chip {
    border: 1px solid rgba(34, 211, 238, 0.16);
    background: rgba(34, 211, 238, 0.08);
    color: rgba(225, 250, 255, 0.9);
    box-shadow: 0 0 14px rgba(34, 211, 238, 0.08);
  }

  .cyber-btn {
    border: 1px solid rgba(34, 211, 238, 0.22);
    background:
      linear-gradient(90deg, rgba(6, 182, 212, 0.16), rgba(59, 130, 246, 0.1)),
      rgba(2, 6, 23, 0.88);
    box-shadow:
      0 0 0 1px rgba(34, 211, 238, 0.08),
      0 0 18px rgba(34, 211, 238, 0.14);
  }
}

@keyframes pulse-route {
  0%,
  100% {
    opacity: 0.45;
    filter: drop-shadow(0 0 2px rgba(34, 211, 238, 0.2));
  }
  50% {
    opacity: 1;
    filter: drop-shadow(0 0 10px rgba(34, 211, 238, 0.72));
  }
}

@keyframes pulse-dot {
  0%,
  100% {
    transform: scale(0.92);
    opacity: 0.58;
  }
  50% {
    transform: scale(1.16);
    opacity: 1;
  }
}

@keyframes pulse-ring {
  0% {
    transform: scale(0.82);
    opacity: 0.72;
  }
  100% {
    transform: scale(1.9);
    opacity: 0;
  }
}

@keyframes panel-float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-2px);
  }
}

.animate-route {
  animation: pulse-route 1.5s ease-in-out infinite;
}

.animate-dot {
  animation: pulse-dot 1.2s ease-in-out infinite;
}

.animate-ring {
  animation: pulse-ring 1.8s ease-out infinite;
}

.animate-float-soft {
  animation: panel-float 4s ease-in-out infinite;
}
