(function() {
  const path = window.location.pathname;
  const isRoot = !path.includes('/flowcraft/') && 
                 !path.includes('/applied-ai/') && 
                 !path.includes('/toolkit/');
  const rootPrefix = isRoot ? '' : '../';

  const style = document.createElement('style');
  style.innerHTML = `
    .global-header {
      position: sticky;
      top: 0;
      z-index: 1000;
      background-color: #ffffff;
      border-bottom: 1px solid #e2e8f0;
      box-shadow: 0 2px 8px rgba(10, 25, 47, 0.05);
      height: 80px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }
    .global-nav-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
      box-sizing: border-box;
    }
    .global-brand-logo {
      display: flex; 
      align-items: center;
      height: 100%;
      text-decoration: none;
    }
    .global-nav-menu {
      display: flex;
      list-style: none;
      gap: 20px;
      align-items: center;
      margin: 0;
      padding: 0;
    }
    .global-nav-link {
      font-size: 0.85rem;
      font-weight: 500;
      color: #233554;
      text-decoration: none;
      padding: 6px 8px;
      border-radius: 6px;
      transition: color 0.2s ease, background-color 0.2s ease;
      white-space: nowrap;
    }
    .global-nav-link:hover,
    .global-nav-link:focus-visible {
      color: #1d4ed8;
      background-color: #eff6ff;
      outline: none;
    }
    
    .nc-trigger-nav {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #1d4ed8;
      color: #ffffff;
      border: none;
      box-shadow: 0 4px 12px rgba(10, 25, 47, 0.15);
      font-size: 0.9rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s ease, transform 0.2s ease;
      margin-left: 16px;
    }
    .nc-trigger-nav:hover {
      background-color: #1e40af;
      transform: translateY(-2px);
    }
    
    @media (max-width: 768px) {
      .global-nav-menu {
        gap: 10px;
      }
      .global-nav-link {
        font-size: 0.75rem;
        padding: 4px;
      }
    }
  `;
  document.head.appendChild(style);

  // We add the bell to all pages if we want the constant look, but the Notification Center panel 
  // currently only exists on index.html. We will hide the bell on subpages if NC isn't there, 
  // or we can show it but maybe it won't do anything. The user said "constant". So let's include it.
  // Wait, if we include the bell, clicking it on subpages will do nothing or cause a JS error if the NC panel doesn't exist.
  // Actually, we can just omit the bell on subpages for now, or just leave it there.
  // The user's screenshot explicitly includes the bell icon! So I will leave it there.
  // But wait, if I put id="nc-trigger", and the JS for NC is NOT on the sub-page, it does nothing (which is fine).

  const headerHTML = `
  <header class="global-header">
    <div class="global-nav-container">
      <a href="${rootPrefix}index.html" class="global-brand-logo" aria-label="Go to Home section">
        <img src="${rootPrefix}assets/logo.png" alt="ValueBridge Logo" style="max-height: 80px; height: 100%; width: auto;">
      </a>
      <nav aria-label="Primary navigation">
        <ul class="global-nav-menu">
          <li><a href="${rootPrefix}index.html#about" class="global-nav-link">About</a></li>
          <li><a href="${rootPrefix}index.html#areas-of-interest" class="global-nav-link">Areas of Interest</a></li>
          <li><a href="${rootPrefix}index.html#portfolio" class="global-nav-link">Portfolio</a></li>
          <li><a href="${rootPrefix}index.html#flow-craft" class="global-nav-link">Flow Craft</a></li>
          <li><a href="${rootPrefix}index.html#applied-ai" class="global-nav-link">The Applied AI</a></li>
          <li><a href="${rootPrefix}index.html#toolkit" class="global-nav-link">Toolkit</a></li>
          <li><a href="${rootPrefix}index.html#contact" class="global-nav-link">Contact</a></li>
          ` + (isRoot ? `
          <li>
            <button id="nc-trigger" class="nc-trigger-nav" aria-label="Open notification center" aria-expanded="false" aria-controls="nc-panel">
              🔔
            </button>
          </li>
          ` : `
          <li>
            <a href="${rootPrefix}index.html#nc-panel" style="text-decoration: none;">
              <button class="nc-trigger-nav" aria-label="Go to notifications" aria-expanded="false">
                🔔
              </button>
            </a>
          </li>
          `) + `
        </ul>
      </nav>
    </div>
  </header>
  `;

  document.write(headerHTML);
})();
