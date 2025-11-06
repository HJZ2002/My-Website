document.addEventListener("DOMContentLoaded", () => {
  /** ------------ CONTACT FORM ------------ **/
  const form = document.getElementById("contactForm");
  if (form) {
    const btn = form.querySelector(".send-btn");
    const msg =
      document.getElementById("contactStatus") ||
      (() => {
        const p = document.createElement("p");
        p.id = "contactStatus";
        p.style.marginTop = "1rem";
        p.style.opacity = ".85";
        form.appendChild(p);
        return p;
      })();

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = new FormData(form);
      data.append("access_key", "75487d63-0561-4f15-8773-4d6505e0c8aa");
      data.append("from_name", "Anonymous");
      data.append("subject", "New message from your portfolio");

      const prev = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Sending…";
      msg.textContent = "";

      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: data,
        });
        const json = await res.json();

        if (json.success) {
          btn.textContent = "Sent ✓";
          msg.textContent = "Thanks! Your message has been sent.";
          form.reset();
        } else {
          btn.textContent = prev;
          msg.textContent = json.message || "Failed to send. Please try again.";
        }
      } catch {
        btn.textContent = prev;
        msg.textContent = "Network error. Please try again.";
      } finally {
        setTimeout(() => {
          btn.disabled = false;
          btn.textContent = "Send Message";
        }, 1500);
      }
    });
  }

  /** Theme music station setup **/
  const bgm = document.getElementById("bgm");
  const bgmToggle = document.getElementById("bgmToggle");

  if (bgm && bgmToggle) {
    // restore previous volume (optional)
    const savedVol = localStorage.getItem("bgmVol");
    bgm.volume = savedVol ? Math.min(1, Math.max(0, parseFloat(savedVol))) : 0.4;

    // attempt loud autoplay first
    (async () => {
      try {
        bgm.muted = false;             
        await bgm.play();
        setIcon(true);
      } catch {
        // if blocked, start muted (allowed) and wait for any gesture
        try { bgm.muted = true; await bgm.play(); } catch {}
        setIcon(false);
      }
    })();

    // on tab return
    document.addEventListener("visibilitychange", async () => {
      if (!document.hidden) {
        try {
          bgm.muted = false;
          await bgm.play();
          setIcon(true);
        } catch {}
      }
    });

    // icon only mutes/unmutes (no other consent UI)
    bgmToggle.addEventListener("click", async () => {
      if (bgm.paused) {
        // if user muted via browser controls and paused, resume with sound if possible
        try { bgm.muted = false; await bgm.play(); setIcon(true); } catch {}
        return;
      }
      // toggle mute only
      const willMute = !bgm.muted;
      bgm.muted = willMute;
      setIcon(!willMute);
    });

    // persist volume
    bgm.addEventListener("volumechange", () => {
      localStorage.setItem("bgmVol", String(bgm.volume));
    });

    function setIcon(isOn) {
      const i = bgmToggle.querySelector("i");
      if (!i) return;
      i.className = isOn ? "bx bx-volume-full" : "bx bx-volume-mute";
      bgmToggle.title = isOn ? "Mute site music" : "Unmute site music";
      bgmToggle.setAttribute(
        "aria-label",
        isOn ? "Mute site music" : "Unmute site music"
      );
    }
  }
});
const menuIcon = document.getElementById("menu-icon");
const navbar   = document.getElementById("primary-navigation");

if (menuIcon && navbar) {
  let menuOpen = false;
  let ignoreNextDocPointerDown = false; // hard guard for the very next tap

  const setOpen = (willOpen) => {
    menuOpen = willOpen;

    navbar.classList.toggle("active", willOpen);
    document.body.classList.toggle("menu-open", willOpen);
    menuIcon.classList.toggle("bx-x", willOpen);
    menuIcon.classList.toggle("bx-menu", !willOpen);
    menuIcon.setAttribute("aria-expanded", String(willOpen));
    menuIcon.setAttribute("aria-label", willOpen ? "Close menu" : "Open menu");

    if (willOpen) {
      // Ignore the very next document pointerdown triggered by the same tap
      ignoreNextDocPointerDown = true;
      setTimeout(() => (ignoreNextDocPointerDown = false), 500); // safety window
    }
  };

  // Toggle on icon — stop both pointerdown & click from bubbling
  const onIconPointerDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    setOpen(!menuOpen);
  };
  const onIconClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  };
  menuIcon.addEventListener("pointerdown", onIconPointerDown);
  menuIcon.addEventListener("click", onIconClick);

  // Close when a nav link is tapped
  navbar.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => setOpen(false));
  });

  // Outside tap closes (runs on pointerdown, before click synthesis)
  document.addEventListener(
    "pointerdown",
    (e) => {
      if (!menuOpen) return;
      if (ignoreNextDocPointerDown) {
        ignoreNextDocPointerDown = false;
        return;
      }

      const path = e.composedPath ? e.composedPath() : null;
      const hitIcon = path ? path.includes(menuIcon) : menuIcon.contains(e.target);
      const inMenu  = path ? path.includes(navbar)   : navbar.contains(e.target);
      if (hitIcon || inMenu) return;

      setOpen(false);
    },
    { capture: true } // capture ensures we see the event early
  );

  // Esc to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuOpen) setOpen(false);
  });
}