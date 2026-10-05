(function() {
  const path = window.location.pathname;
  const isRoot = !path.includes('/flowcraft/') && 
                 !path.includes('/applied-ai/') && 
                 !path.includes('/toolkit/');
  const rootPrefix = isRoot ? '' : '../';

  let backLink = '';
  if (path.includes('/flowcraft/')) {
    backLink = `<div class="sub-nav"><div class="global-nav-container"><a href="../index.html#flow-craft" class="back-link">← Back to Flow Craft</a></div></div>`;
  } else if (path.includes('/applied-ai/')) {
    backLink = `<div class="sub-nav"><div class="global-nav-container"><a href="../index.html#applied-ai" class="back-link">← Back to The Applied AI</a></div></div>`;
  } else if (path.includes('/toolkit/')) {
    backLink = `<div class="sub-nav"><div class="global-nav-container"><a href="../index.html#toolkit" class="back-link">← Back to Toolkit</a></div></div>`;
  }

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

    .sub-nav {
      background-color: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
      padding: 12px 0;
    }
    .sub-nav .global-nav-container {
      height: auto;
      justify-content: flex-start;
    }
    .back-link {
      font-size: 0.9rem;
      font-weight: 600;
      color: #1d4ed8;
      text-decoration: none;
      transition: color 0.2s;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }
    .back-link:hover {
      color: #1e40af;
      text-decoration: underline;
    }

    .scroll-top-btn {
      position: fixed;
      bottom: -60px;
      right: 24px;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background-color: #1d4ed8;
      color: #ffffff;
      border: none;
      box-shadow: 0 4px 12px rgba(10, 25, 47, 0.15);
      font-size: 1.2rem;
      font-weight: bold;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: bottom 0.3s ease, background-color 0.2s ease, transform 0.2s ease;
      z-index: 999;
    }
    .scroll-top-btn.visible {
      bottom: 24px;
    }
    .scroll-top-btn:hover {
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
        </ul>
      </nav>
    </div>
  </header>
  ${backLink}
  <button id="scroll-top-btn" class="scroll-top-btn" aria-label="Scroll to top">↑</button>
  `;

  document.write(headerHTML);

  // Defer script logic until DOM is ready since document.write elements might not be instantly selectable 
  // depending on execution timing, though they usually are.
  document.addEventListener('DOMContentLoaded', () => {
    const scrollBtn = document.getElementById('scroll-top-btn');
    if (scrollBtn) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          scrollBtn.classList.add('visible');
        } else {
          scrollBtn.classList.remove('visible');
        }
      });
      scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  });
})();
