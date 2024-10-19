(function () {
  let throttle = function (type, name, obj) {
    obj = obj || window;
    let running = false;
    let func = function () {
      if (running) {
        return;
      }
      running = true;
      requestAnimationFrame(function () {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };

  throttle("resize", "optimizedResize");
})();

function init() {
  const mobileStyle = "mobile";
  const desktopStyle = "desktop";
  const statue = document.querySelector(".statue");
  const portal = document.querySelector(".portal");

  let currentLayout = window.innerWidth > 879 ? desktopStyle : mobileStyle;
  currentLayout === desktopStyle
    ? replaceSpans(desktopStyle)
    : replaceSpans(mobileStyle);

  function replaceSpans(toLayout) {
    const mainContainer = document.querySelector(".container");
    const textArea = document.querySelector(".text_area");
    const slogan = document.querySelectorAll(".slogan");

    if (toLayout === "desktop") {
      const mobileTextArea = document.querySelector("#mobile_text_area");
      if (mobileTextArea) {
        mainContainer.removeChild(mobileTextArea);
      }
      for (let el of slogan) {
        textArea.appendChild(el);
      }
      currentLayout = "desktop";
    } else if (toLayout === "mobile") {
      const newTextArea = document.createElement("section");
      newTextArea.id = "mobile_text_area";
      newTextArea.className = "text_area";
      mainContainer.appendChild(newTextArea);
      for (let el of slogan) {
        newTextArea.appendChild(el);
      }
      currentLayout = "mobile";
    }
  }

  window.addEventListener("optimizedResize", () => {
    if (window.innerWidth < 879) {
      if (currentLayout === mobileStyle) return;
      else {
        replaceSpans(mobileStyle, currentLayout);
      }
    } else if (window.innerWidth >= 850) {
      if (currentLayout === desktopStyle) return;
      else {
        replaceSpans(desktopStyle, currentLayout);
      }
    }
  });

  portal.onanimationend = () => {
    statue.className = "statue appearing";
    portal.className = "portal_resized";
  };
}

window.onload = init;
