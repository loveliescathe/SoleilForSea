/* =========================================================
   MAIN.JS
   EXTRA EFFECTS:
   - Digital falling petals
   - Big moving blue hearts
   - Sparkles
   - Heart explosions
   - Mouse/touch interaction
   - Extra flower glow
   ========================================================= */

(() => {
  "use strict";

  /* =========================================================
     CREATE EFFECT LAYER
     ========================================================= */

  function createEffectLayer() {
    let layer = document.getElementById("extra-effects");

    if (!layer) {
      layer = document.createElement("div");
      layer.id = "extra-effects";
      document.body.appendChild(layer);
    }

    const style = document.createElement("style");

    style.textContent = `
      #extra-effects {
        position: fixed;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
        z-index: 9999;
      }

      /* =========================
         FALLING PETALS
         ========================= */

      .js-petal {
        position: absolute;
        top: -40px;
        width: 13px;
        height: 18px;
        border-radius: 100% 0 100% 0;
        background: linear-gradient(
          135deg,
          #fff,
          #8fd8ff 35%,
          #3ca7ff 75%,
          #1675ff
        );
        box-shadow:
          0 0 7px rgba(91, 190, 255, .9),
          0 0 18px rgba(57, 150, 255, .65);

        opacity: .9;

        animation:
          petalFall var(--fall-time) linear forwards,
          petalSpin var(--spin-time) ease-in-out infinite;
      }

      @keyframes petalFall {
        0% {
          transform:
            translate3d(0, -30px, 0)
            rotate(0deg);
          opacity: 0;
        }

        10% {
          opacity: 1;
        }

        100% {
          transform:
            translate3d(var(--drift), 110vh, 0)
            rotate(720deg);
          opacity: 0;
        }
      }

      @keyframes petalSpin {
        0% {
          scale: .7;
        }

        50% {
          scale: 1.25;
        }

        100% {
          scale: .7;
        }
      }


      /* =========================
         BIG BLUE HEARTS
         ========================= */

      .js-heart {
        position: absolute;

        width: var(--heart-size);
        height: var(--heart-size);

        transform:
          rotate(45deg)
          scale(var(--heart-scale));

        background: linear-gradient(
          135deg,
          #ffffff 0%,
          #9fe4ff 25%,
          #49b7ff 55%,
          #1674ff 100%
        );

        filter:
          drop-shadow(0 0 8px #55c8ff)
          drop-shadow(0 0 20px rgba(30, 140, 255, .85));

        animation:
          heartFloat var(--heart-time) ease-in-out infinite;

        opacity: var(--heart-opacity);
      }

      .js-heart::before,
      .js-heart::after {
        content: "";
        position: absolute;

        width: 100%;
        height: 100%;

        border-radius: 50%;

        background: inherit;
      }

      .js-heart::before {
        left: -50%;
      }

      .js-heart::after {
        top: -50%;
      }

      @keyframes heartFloat {
        0% {
          transform:
            translate3d(0, 105vh, 0)
            rotate(45deg)
            scale(var(--heart-scale));
        }

        25% {
          margin-left: var(--move-1);
        }

        50% {
          margin-left: var(--move-2);

          transform:
            translate3d(0, 45vh, 0)
            rotate(135deg)
            scale(calc(var(--heart-scale) * 1.2));
        }

        75% {
          margin-left: var(--move-3);
        }

        100% {
          transform:
            translate3d(0, -30vh, 0)
            rotate(405deg)
            scale(var(--heart-scale));
        }
      }


      /* =========================
         SPARKLES
         ========================= */

      .js-sparkle {
        position: absolute;

        width: var(--sparkle-size);
        height: var(--sparkle-size);

        background: white;

        border-radius: 50%;

        box-shadow:
          0 0 6px white,
          0 0 12px #6ed4ff,
          0 0 25px #218cff;

        animation:
          sparkleAnimation var(--sparkle-time)
          ease-in-out infinite;

        opacity: 0;
      }

      @keyframes sparkleAnimation {
        0% {
          transform: scale(.1) rotate(0deg);
          opacity: 0;
        }

        30% {
          opacity: 1;
        }

        50% {
          transform: scale(1.5) rotate(180deg);
          opacity: 1;
        }

        75% {
          opacity: .8;
        }

        100% {
          transform: scale(.1) rotate(360deg);
          opacity: 0;
        }
      }


      /* =========================
         HEART BURST
         ========================= */

      .js-burst-heart {
        position: absolute;

        width: 14px;
        height: 14px;

        background: #51bfff;

        transform: rotate(45deg);

        border-radius: 2px;

        box-shadow:
          0 0 8px #8de1ff,
          0 0 20px #168bff;

        animation:
          burstHeart .9s cubic-bezier(.2,.8,.3,1)
          forwards;
      }

      .js-burst-heart::before,
      .js-burst-heart::after {
        content: "";

        position: absolute;

        width: 100%;
        height: 100%;

        background: inherit;

        border-radius: 50%;
      }

      .js-burst-heart::before {
        left: -50%;
      }

      .js-burst-heart::after {
        top: -50%;
      }

      @keyframes burstHeart {
        0% {
          transform:
            rotate(45deg)
            translate(0, 0)
            scale(.3);

          opacity: 1;
        }

        100% {
          transform:
            rotate(45deg)
            translate(var(--burst-x), var(--burst-y))
            scale(1);

          opacity: 0;
        }
      }


      /* =========================
         CLICK FLASH
         ========================= */

      .js-flash {
        position: absolute;

        width: 30px;
        height: 30px;

        border-radius: 50%;

        border: 2px solid rgba(150, 230, 255, .9);

        box-shadow:
          0 0 15px #72d7ff,
          0 0 40px #1e91ff;

        transform: translate(-50%, -50%);

        animation:
          flashExpand .7s ease-out forwards;
      }

      @keyframes flashExpand {
        0% {
          transform:
            translate(-50%, -50%)
            scale(.1);

          opacity: 1;
        }

        100% {
          transform:
            translate(-50%, -50%)
            scale(7);

          opacity: 0;
        }
      }


      /* =========================
         FLOWER GLOW
         ========================= */

      .flowers .flower {
        filter:
          drop-shadow(0 0 5px rgba(100, 205, 255, .45))
          drop-shadow(0 0 15px rgba(45, 145, 255, .25));
      }
    `;

    document.head.appendChild(style);

    return layer;
  }


  /* =========================================================
     RANDOM HELPER
     ========================================================= */

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }


  /* =========================================================
     CREATE FALLING PETAL
     ========================================================= */

  function createPetal(layer) {
    const petal = document.createElement("div");

    petal.className = "js-petal";

    petal.style.left = `${random(-5, 105)}%`;

    petal.style.setProperty(
      "--drift",
      `${random(-180, 180)}px`
    );

    petal.style.setProperty(
      "--fall-time",
      `${random(5, 10)}s`
    );

    petal.style.setProperty(
      "--spin-time",
      `${random(.8, 2)}s`
    );

    const size = random(.55, 1.35);

    petal.style.transform = `scale(${size})`;

    layer.appendChild(petal);

    setTimeout(() => {
      petal.remove();
    }, 11000);
  }


  /* =========================================================
     PETAL LOOP
     ========================================================= */

  function startPetals(layer) {
    setInterval(() => {
      createPetal(layer);

      if (Math.random() > .45) {
        createPetal(layer);
      }
    }, 280);
  }


  /* =========================================================
     CREATE BIG HEART
     ========================================================= */

  function createHeart(layer) {
    const heart = document.createElement("div");

    heart.className = "js-heart";

    const size = random(18, 45);

    heart.style.setProperty(
      "--heart-size",
      `${size}px`
    );

    heart.style.setProperty(
      "--heart-scale",
      random(.75, 1.25)
    );

    heart.style.setProperty(
      "--heart-opacity",
      random(.45, .95)
    );

    heart.style.setProperty(
      "--heart-time",
      `${random(7, 13)}s`
    );

    heart.style.setProperty(
      "--move-1",
      `${random(-150, 150)}px`
    );

    heart.style.setProperty(
      "--move-2",
      `${random(-250, 250)}px`
    );

    heart.style.setProperty(
      "--move-3",
      `${random(-180, 180)}px`
    );

    heart.style.left = `${random(0, 100)}%`;

    layer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 14000);
  }


  /* =========================================================
     HEART LOOP
     ========================================================= */

  function startHearts(layer) {
    setInterval(() => {
      createHeart(layer);

      if (Math.random() > .3) {
        createHeart(layer);
      }
    }, 700);
  }


  /* =========================================================
     CREATE SPARKLE
     ========================================================= */

  function createSparkle(layer) {
    const sparkle = document.createElement("div");

    sparkle.className = "js-sparkle";

    sparkle.style.left = `${random(0, 100)}%`;

    sparkle.style.top = `${random(0, 100)}%`;

    const size = random(2, 7);

    sparkle.style.setProperty(
      "--sparkle-size",
      `${size}px`
    );

    sparkle.style.setProperty(
      "--sparkle-time",
      `${random(1.2, 3.5)}s`
    );

    sparkle.style.animationDelay =
      `${random(0, 2)}s`;

    layer.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 5000);
  }


  /* =========================================================
     SPARKLE LOOP
     ========================================================= */

  function startSparkles(layer) {
    setInterval(() => {
      createSparkle(layer);

      if (Math.random() > .5) {
        createSparkle(layer);
      }

      if (Math.random() > .65) {
        createSparkle(layer);
      }
    }, 300);
  }


  /* =========================================================
     HEART BURST
     ========================================================= */

  function heartBurst(
    layer,
    x,
    y,
    amount = 18
  ) {
    for (let i = 0; i < amount; i++) {
      const heart =
        document.createElement("div");

      heart.className =
        "js-burst-heart";

      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;

      const angle =
        Math.random() * Math.PI * 2;

      const distance =
        random(70, 250);

      const burstX =
        Math.cos(angle) * distance;

      const burstY =
        Math.sin(angle) * distance;

      heart.style.setProperty(
        "--burst-x",
        `${burstX}px`
      );

      heart.style.setProperty(
        "--burst-y",
        `${burstY}px`
      );

      heart.style.animationDuration =
        `${random(.65, 1.25)}s`;

      heart.style.animationDelay =
        `${random(0, .15)}s`;

      const size = random(.5, 1.5);

      heart.style.transform =
        `rotate(45deg) scale(${size})`;

      layer.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 1500);
    }
  }


  /* =========================================================
     CLICK EFFECT
     ========================================================= */

  function clickEffect(layer, x, y) {
    const flash =
      document.createElement("div");

    flash.className = "js-flash";

    flash.style.left = `${x}px`;
    flash.style.top = `${y}px`;

    layer.appendChild(flash);

    setTimeout(() => {
      flash.remove();
    }, 800);

    heartBurst(
      layer,
      x,
      y,
      25
    );
  }


  /* =========================================================
     MOUSE / TOUCH
     ========================================================= */

  function enableInteraction(layer) {

    let lastBurst = 0;

    document.addEventListener(
      "pointermove",
      (event) => {

        const now = Date.now();

        if (now - lastBurst < 80) {
          return;
        }

        lastBurst = now;

        if (Math.random() > .65) {
          const sparkle =
            document.createElement("div");

          sparkle.className =
            "js-sparkle";

          sparkle.style.left =
            `${event.clientX}px`;

          sparkle.style.top =
            `${event.clientY}px`;

          sparkle.style.setProperty(
            "--sparkle-size",
            `${random(2, 5)}px`
          );

          sparkle.style.setProperty(
            "--sparkle-time",
            "1s"
          );

          layer.appendChild(sparkle);

          setTimeout(() => {
            sparkle.remove();
          }, 1200);
        }
      }
    );


    document.addEventListener(
      "click",
      (event) => {

        clickEffect(
          layer,
          event.clientX,
          event.clientY
        );

      }
    );


    document.addEventListener(
      "touchstart",
      (event) => {

        const touch =
          event.touches[0];

        if (!touch) return;

        clickEffect(
          layer,
          touch.clientX,
          touch.clientY
        );

      },
      {
        passive: true
      }
    );
  }


  /* =========================================================
     EXTRA FLOWER GLOW
     ========================================================= */

  function enhanceFlowers() {

    const flowers =
      document.querySelectorAll(
        ".flowers .flower"
      );

    flowers.forEach(
      (flower, index) => {

        flower.style.animationDelay =
          `${index * .3}s`;

        flower.style.transition =
          "filter .5s ease";

      }
    );

  }


  /* =========================================================
     RANDOM INITIAL BURSTS
     ========================================================= */

  function startRandomBursts(layer) {

    setInterval(() => {

      const x =
        random(
          window.innerWidth * .15,
          window.innerWidth * .85
        );

      const y =
        random(
          window.innerHeight * .15,
          window.innerHeight * .75
        );

      heartBurst(
        layer,
        x,
        y,
        Math.floor(random(5, 12))
      );

    }, 3500);

  }


  /* =========================================================
     INITIALIZE
     ========================================================= */

  function init() {

    const layer =
      createEffectLayer();

    startPetals(layer);

    startHearts(layer);

    startSparkles(layer);

    enableInteraction(layer);

    enhanceFlowers();

    startRandomBursts(layer);

    /* Initial effect */

    setTimeout(() => {

      heartBurst(
        layer,
        window.innerWidth / 2,
        window.innerHeight / 2,
        35
      );

    }, 1000);

  }


  /* =========================================================
     START
     ========================================================= */

  if (
    document.readyState === "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      init
    );

  } else {

    init();

  }

})();
