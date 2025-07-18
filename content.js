// CSS Variables for theme system
const CSS_VARIABLES = `
  :root {
    --bg-primary: #ffffff;
    --bg-secondary: #f8f9fa;
    --bg-highlight: #ffffff;
    --text-primary: #1c1e21;
    --text-secondary: #65676b;
    --text-accent: #1877f2;
    --border-color: #dadde1;
    --shadow-light: 0 2px 4px rgba(0, 0, 0, 0.1);
    --shadow-medium: 0 4px 12px rgba(0, 0, 0, 0.15);
    --border-radius: 12px;
    --transition-fast: 0.2s ease;
    --transition-medium: 0.3s ease;
  }

  [data-theme="dark"] {
    --bg-primary: #18191a;
    --bg-secondary: #242526;
    --bg-highlight: #242526;
    --text-primary: #e4e6ea;
    --text-secondary: #b0b3b8;
    --text-accent: #2d88ff;
    --border-color: #3a3b3c;
    --shadow-light: 0 2px 4px rgba(0, 0, 0, 0.3);
    --shadow-medium: 0 4px 12px rgba(0, 0, 0, 0.4);
  }
`;

// Highlight display styles
const HIGHLIGHT_STYLES = `
  .fb-blocker-container {
    background: var(--bg-primary);
    color: var(--text-primary);
    min-height: 100vh;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
    transition: background-color var(--transition-medium), color var(--transition-medium);
    max-width: 100%;
    overflow-x: hidden;
  }

  .fb-blocker-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding: 0 20px;
  }

  .fb-blocker-title {
    font-size: 2rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .fb-blocker-icon {
    width: 32px;
    height: 32px;
    opacity: 0.8;
  }

  .fb-blocker-header-controls {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .fb-blocker-gamification {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .fb-blocker-brain-cells {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 8px 16px;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 600;
    box-shadow: var(--shadow-light);
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .fb-blocker-brain-cells:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-medium);
  }

  #brain-cells-count {
    transition: transform 0.2s ease;
  }

  .fb-blocker-add-note-btn {
    background: var(--bg-secondary);
    border: 2px solid var(--border-color);
    border-radius: 50px;
    padding: 8px 16px;
    cursor: pointer;
    transition: all var(--transition-fast);
    font-size: 14px;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .fb-blocker-add-note-btn:hover {
    background: var(--text-accent);
    color: white;
    transform: translateY(-1px);
  }

  .fb-blocker-add-note-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .fb-blocker-add-note-btn {
    background: #28a745;
    border-color: #28a745;
    color: white;
  }

  .fb-blocker-add-note-btn:hover {
    background: #218838;
    border-color: #1e7e34;
  }

  .fb-blocker-exit-btn {
    background: #dc3545;
    border: 2px solid #dc3545;
    border-radius: 50px;
    padding: 8px 12px;
    cursor: pointer;
    transition: all var(--transition-fast);
    font-size: 14px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }

  .fb-blocker-exit-btn:hover {
    background: #c82333;
    border-color: #bd2130;
    transform: translateY(-1px);
  }

  .fb-blocker-theme-toggle {
    background: var(--bg-secondary);
    border: 2px solid var(--border-color);
    border-radius: 50px;
    padding: 8px 16px;
    cursor: pointer;
    transition: all var(--transition-fast);
    font-size: 14px;
    color: var(--text-primary);
  }

  .fb-blocker-theme-toggle:hover {
    background: var(--text-accent);
    color: white;
    transform: translateY(-1px);
  }

  .fb-blocker-upload-zone-active {
    border-color: var(--text-accent) !important;
    background: var(--bg-highlight) !important;
    transform: scale(1.02) !important;
  }

  .fb-blocker-drag-active .fb-blocker-upload-zone {
    border-color: var(--text-accent) !important;
    background: var(--bg-highlight) !important;
  }

  .fb-blocker-highlights {
    max-width: 780px;
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
  }

  .fb-blocker-highlight {
    background: var(--bg-highlight);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 32px;
    margin-bottom: 24px;
    box-shadow: var(--shadow-light);
    transition: all var(--transition-medium);
    opacity: 0;
    animation: fadeInUp 0.6s ease forwards;
    position: relative;
    overflow: hidden;
  }

  .fb-blocker-highlight::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .fb-blocker-highlight[data-gradient="0"] {
    background: linear-gradient(135deg, 
      rgba(102, 126, 234, 0.08) 0%, 
      rgba(118, 75, 162, 0.12) 100%),
      var(--bg-highlight);
  }

  .fb-blocker-highlight[data-gradient="1"] {
    background: linear-gradient(135deg, 
      rgba(240, 147, 251, 0.08) 0%, 
      rgba(245, 87, 108, 0.12) 100%),
      var(--bg-highlight);
  }

  .fb-blocker-highlight[data-gradient="2"] {
    background: linear-gradient(135deg, 
      rgba(79, 172, 254, 0.08) 0%, 
      rgba(0, 242, 254, 0.12) 100%),
      var(--bg-highlight);
  }

  .fb-blocker-highlight[data-gradient="3"] {
    background: linear-gradient(135deg, 
      rgba(67, 233, 123, 0.08) 0%, 
      rgba(56, 249, 215, 0.12) 100%),
      var(--bg-highlight);
  }

  .fb-blocker-highlight[data-gradient="4"] {
    background: linear-gradient(135deg, 
      rgba(250, 112, 154, 0.08) 0%, 
      rgba(254, 225, 64, 0.12) 100%),
      var(--bg-highlight);
  }

  .fb-blocker-highlight:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.12);
  }

  .fb-blocker-highlight:hover::before {
    opacity: 0.02;
  }


  .fb-blocker-quote {
    font-size: 1.4rem;
    line-height: 1.6;
    color: var(--text-primary);
    margin: 0 0 20px 0;
    font-weight: 400;
    position: relative;
  }

  .fb-blocker-quote::before {
    content: '"';
    font-size: 3rem;
    color: var(--text-accent);
    position: absolute;
    left: -20px;
    top: -10px;
    opacity: 0.3;
  }

  .fb-blocker-attribution {
    font-size: 1rem;
    color: var(--text-secondary);
    font-style: italic;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid var(--border-color);
  }

  .fb-blocker-author-source {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .fb-blocker-author {
    font-weight: 500;
    color: var(--text-accent);
  }

  .fb-blocker-source {
    opacity: 0.8;
  }

  .fb-blocker-source-link {
    color: var(--text-accent);
    text-decoration: none;
    opacity: 0.8;
    transition: all var(--transition-fast);
    font-weight: 500;
  }

  .fb-blocker-source-link:hover {
    opacity: 1;
    color: var(--text-accent);
    text-shadow: 0 0 8px rgba(24, 119, 242, 0.3);
    transform: translateY(-1px);
  }

  .fb-blocker-highlight-grouped {
    background: linear-gradient(135deg, var(--bg-highlight), var(--bg-secondary));
    border-left: 4px solid var(--text-accent);
  }

  .fb-blocker-quote-grouped {
    position: relative;
  }

  .fb-blocker-quote-grouped::before {
    display: none;
  }

  .fb-blocker-quote-item {
    margin: 0 0 16px 0;
    padding-left: 0;
    line-height: 1.5;
  }

  .fb-blocker-quote-item:last-child {
    margin-bottom: 0;
  }

  .fb-blocker-group-badge {
    background: var(--text-accent);
    color: white;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;
    font-style: normal;
  }

  .fb-blocker-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
    color: var(--text-secondary);
  }

  .fb-blocker-loading::after {
    content: '';
    width: 20px;
    height: 20px;
    border: 2px solid var(--border-color);
    border-top: 2px solid var(--text-accent);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-left: 10px;
  }

  .fb-blocker-no-highlights {
    text-align: center;
    padding: 60px 20px;
    color: var(--text-secondary);
    font-size: 1.1rem;
  }

  .fb-blocker-no-highlights h3 {
    color: var(--text-primary);
    margin-bottom: 16px;
  }

  .fb-blocker-upload-zone {
    border: 2px dashed var(--border-color);
    border-radius: var(--border-radius);
    padding: 40px;
    margin: 30px 0;
    cursor: pointer;
    transition: all var(--transition-fast);
    background: var(--bg-secondary);
  }

  .fb-blocker-upload-zone:hover,
  .fb-blocker-upload-zone-active {
    border-color: var(--text-accent);
    background: var(--text-accent);
    color: white;
    transform: translateY(-2px);
  }

  .fb-blocker-upload-content {
    text-align: center;
  }

  .fb-blocker-upload-icon {
    font-size: 3rem;
    margin-bottom: 16px;
    opacity: 0.7;
  }

  .fb-blocker-upload-text {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 8px;
  }

  .fb-blocker-upload-subtext {
    font-size: 0.9rem;
    opacity: 0.7;
  }

  .fb-blocker-upload-status {
    padding: 16px;
    border-radius: var(--border-radius);
    margin: 20px 0;
    text-align: center;
    font-weight: 500;
  }

  .fb-blocker-upload-status-success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }

  .fb-blocker-upload-status-error {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f1b0b7;
  }

  .fb-blocker-upload-status-loading {
    background: var(--bg-secondary);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
  }

  body.fb-blocker-drag-active::after {
    content: 'Drop your CSV file anywhere to upload';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: 600;
    z-index: 10000;
    pointer-events: none;
  }

  /* Subtle grayscale effect for Facebook sidebar elements */
  div[role="navigation"]:not(.fb-blocker-container *),
  div[role="complementary"]:not(.fb-blocker-container *),
  div[data-pagelet="LeftRail"]:not(.fb-blocker-container *),
  div[data-pagelet="RightRail"]:not(.fb-blocker-container *),
  div[aria-label="Account switcher"]:not(.fb-blocker-container *) {
    filter: grayscale(0.3) opacity(0.8);
    transition: filter 0.3s ease, opacity 0.3s ease;
    pointer-events: auto !important;
  }

  div[role="navigation"]:hover:not(.fb-blocker-container *),
  div[role="complementary"]:hover:not(.fb-blocker-container *),
  div[data-pagelet="LeftRail"]:hover:not(.fb-blocker-container *),
  div[data-pagelet="RightRail"]:hover:not(.fb-blocker-container *),
  div[aria-label="Account switcher"]:hover:not(.fb-blocker-container *) {
    filter: grayscale(0) opacity(1);
  }

  /* Target the top navigation bar too */
  div[role="banner"]:not(.fb-blocker-container *) {
    filter: grayscale(0.2) opacity(0.9);
    transition: filter 0.3s ease, opacity 0.3s ease;
    pointer-events: auto !important;
  }

  div[role="banner"]:hover:not(.fb-blocker-container *) {
    filter: grayscale(0) opacity(1);
  }

  /* Ensure all links and buttons within sidebar remain clickable */
  div[role="navigation"] a:not(.fb-blocker-container *),
  div[role="navigation"] button:not(.fb-blocker-container *),
  div[role="navigation"] input:not(.fb-blocker-container *),
  div[role="complementary"] a:not(.fb-blocker-container *),
  div[role="complementary"] button:not(.fb-blocker-container *),
  div[role="complementary"] input:not(.fb-blocker-container *),
  div[data-pagelet="LeftRail"] a:not(.fb-blocker-container *),
  div[data-pagelet="LeftRail"] button:not(.fb-blocker-container *),
  div[data-pagelet="LeftRail"] input:not(.fb-blocker-container *),
  div[data-pagelet="RightRail"] a:not(.fb-blocker-container *),
  div[data-pagelet="RightRail"] button:not(.fb-blocker-container *),
  div[data-pagelet="RightRail"] input:not(.fb-blocker-container *),
  div[role="banner"] a:not(.fb-blocker-container *),
  div[role="banner"] button:not(.fb-blocker-container *),
  div[role="banner"] input:not(.fb-blocker-container *),
  div[role="search"]:not(.fb-blocker-container *),
  input[placeholder*="Search"]:not(.fb-blocker-container *),
  input[aria-label*="Search"]:not(.fb-blocker-container *),
  form[role="search"]:not(.fb-blocker-container *),
  form[role="search"] *:not(.fb-blocker-container *) {
    pointer-events: auto !important;
    cursor: pointer !important;
  }
  
  /* Specifically ensure search inputs are clickable */
  input[type="search"]:not(.fb-blocker-container *),
  input[type="text"]:not(.fb-blocker-container *),
  /* Facebook header area - ensure everything is clickable */
  div[data-pagelet="HeaderActions"]:not(.fb-blocker-container *),
  div[data-pagelet="HeaderActions"] *:not(.fb-blocker-container *),
  header:not(.fb-blocker-container *),
  header *:not(.fb-blocker-container *),
  /* Facebook top navigation */
  div[role="banner"] *:not(.fb-blocker-container *),
  /* Any element in the top area */
  body > div:first-child *:not(.fb-blocker-container *) {
    pointer-events: auto !important;
    cursor: text !important;
  }
  
  /* Override any potential blocking on the entire header area */
  div[data-pagelet="HeaderActions"]:not(.fb-blocker-container *),
  header:not(.fb-blocker-container *),
  div[role="banner"]:not(.fb-blocker-container *) {
    pointer-events: auto !important;
    position: relative !important;
    z-index: 9999 !important;
  }

  /* Inline Note Styles */
  .fb-blocker-note-highlight {
    border-left: 4px solid var(--text-accent);
    position: relative;
  }

  .fb-blocker-note-header-inline {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border-color);
  }

  .fb-blocker-note-icon {
    font-size: 1.2rem;
  }

  .fb-blocker-note-title-inline {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary);
    flex: 1;
  }

  .fb-blocker-note-badge {
    background: var(--text-accent);
    color: white;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .fb-blocker-note-content-inline {
    font-size: 1.1rem;
    line-height: 1.7;
  }

  .fb-blocker-note-content-inline h1,
  .fb-blocker-note-content-inline h2,
  .fb-blocker-note-content-inline h3 {
    margin: 16px 0 12px 0;
    font-weight: 600;
  }

  .fb-blocker-note-content-inline h1 {
    font-size: 1.6rem;
    border-bottom: 2px solid var(--border-color);
    padding-bottom: 8px;
  }

  .fb-blocker-note-content-inline h2 {
    font-size: 1.3rem;
  }

  .fb-blocker-note-content-inline h3 {
    font-size: 1.1rem;
  }

  .fb-blocker-note-content-inline p {
    margin: 12px 0;
  }

  .fb-blocker-note-content-inline code {
    background: var(--bg-secondary);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    color: var(--text-accent);
    font-size: 0.9rem;
  }

  .fb-blocker-note-content-inline pre {
    background: var(--bg-secondary);
    padding: 12px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 12px 0;
  }

  .fb-blocker-note-content-inline pre code {
    background: none;
    padding: 0;
    color: var(--text-primary);
  }

  .fb-blocker-note-content-inline strong {
    font-weight: 600;
  }

  .fb-blocker-note-content-inline em {
    font-style: italic;
    color: var(--text-secondary);
  }

  .fb-blocker-note-content-inline ul {
    margin: 12px 0;
    padding-left: 20px;
  }

  .fb-blocker-note-content-inline ol {
    margin: 12px 0;
    padding-left: 20px;
  }

  .fb-blocker-note-content-inline li {
    margin: 4px 0;
    line-height: 1.6;
  }

  .fb-blocker-note-content-inline blockquote {
    border-left: 4px solid var(--text-accent);
    margin: 12px 0;
    padding: 8px 0 8px 16px;
    background: var(--bg-secondary);
    border-radius: 0 4px 4px 0;
    font-style: italic;
    color: var(--text-secondary);
  }

  .fb-blocker-note-content-inline del {
    text-decoration: line-through;
    opacity: 0.7;
  }

  .fb-blocker-note-content-inline a {
    color: var(--text-accent);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color var(--transition-fast);
  }

  .fb-blocker-note-content-inline a:hover {
    border-bottom-color: var(--text-accent);
  }

  /* Add Note Form Styles */
  .fb-blocker-add-note-form {
    border-left: 4px solid #28a745;
  }

  .fb-blocker-note-close-inline {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: var(--text-secondary);
    padding: 4px;
    border-radius: 50%;
    transition: all var(--transition-fast);
  }

  .fb-blocker-note-close-inline:hover {
    background: var(--border-color);
    color: var(--text-primary);
  }

  .fb-blocker-add-note-content {
    margin-top: 16px;
  }

  .fb-blocker-quick-title {
    width: 100%;
    padding: 12px;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    background: var(--bg-primary);
    color: var(--text-primary);
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 12px;
    transition: border-color var(--transition-fast);
  }

  .fb-blocker-quick-title:focus {
    outline: none;
    border-color: var(--text-accent);
  }

  .fb-blocker-quick-content {
    width: 100%;
    min-height: 100px;
    padding: 12px;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    background: var(--bg-primary);
    color: var(--text-primary);
    font-size: 1rem;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    resize: vertical;
    margin-bottom: 15px;
    transition: border-color var(--transition-fast);
  }

  .fb-blocker-quick-content:focus {
    outline: none;
    border-color: var(--text-accent);
  }

  .fb-blocker-form-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
  }

  .fb-blocker-save-btn,
  .fb-blocker-cancel-btn {
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all var(--transition-fast);
    border: 2px solid;
  }

  .fb-blocker-save-btn {
    background: #28a745;
    border-color: #28a745;
    color: white;
  }

  .fb-blocker-save-btn:hover:not(:disabled) {
    background: #218838;
    border-color: #1e7e34;
  }

  .fb-blocker-save-btn:disabled {
    background: var(--text-secondary);
    border-color: var(--text-secondary);
    cursor: not-allowed;
    opacity: 0.6;
  }

  .fb-blocker-cancel-btn {
    background: var(--bg-primary);
    border-color: var(--border-color);
    color: var(--text-secondary);
  }

  .fb-blocker-cancel-btn:hover {
    background: var(--border-color);
    color: var(--text-primary);
  }

  /* Obsidian Note Modal Styles */
  .fb-blocker-note-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    backdrop-filter: blur(4px);
  }

  .fb-blocker-note-content {
    background: var(--bg-primary);
    border-radius: var(--border-radius);
    max-width: 800px;
    max-height: 80vh;
    width: 90%;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    animation: modalFadeIn 0.3s ease;
  }

  .fb-blocker-note-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    border-bottom: 1px solid var(--border-color);
    background: var(--bg-secondary);
  }

  .fb-blocker-note-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
  }

  .fb-blocker-note-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-secondary);
    transition: color var(--transition-fast);
    padding: 5px;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .fb-blocker-note-close:hover {
    color: var(--text-primary);
    background: var(--border-color);
  }

  .fb-blocker-note-body {
    padding: 30px;
    overflow-y: auto;
    max-height: calc(80vh - 100px);
    color: var(--text-primary);
    line-height: 1.7;
  }

  .fb-blocker-note-body h1,
  .fb-blocker-note-body h2,
  .fb-blocker-note-body h3 {
    color: var(--text-primary);
    margin: 20px 0 15px 0;
  }

  .fb-blocker-note-body h1 {
    font-size: 1.8rem;
    border-bottom: 2px solid var(--border-color);
    padding-bottom: 10px;
  }

  .fb-blocker-note-body h2 {
    font-size: 1.4rem;
  }

  .fb-blocker-note-body h3 {
    font-size: 1.2rem;
  }

  .fb-blocker-note-body p {
    margin: 15px 0;
  }

  .fb-blocker-note-body code {
    background: var(--bg-secondary);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    color: var(--text-accent);
  }

  .fb-blocker-note-body pre {
    background: var(--bg-secondary);
    padding: 15px;
    border-radius: var(--border-radius);
    overflow-x: auto;
    margin: 15px 0;
  }

  .fb-blocker-note-body pre code {
    background: none;
    padding: 0;
    color: var(--text-primary);
  }

  .fb-blocker-note-body a {
    color: var(--text-accent);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .fb-blocker-note-body a:hover {
    color: var(--text-primary);
    text-decoration: underline;
  }

  .fb-blocker-note-body strong {
    font-weight: 600;
    color: var(--text-primary);
  }

  .fb-blocker-note-body em {
    font-style: italic;
    color: var(--text-secondary);
  }

  @keyframes modalFadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

class FeedWiseBlocker {
  constructor() {
    // Prevent multiple instances of the script from running
    if (window.feedWiseBlockerInstance) {
      console.log('[WisdomFeed] Script already running, skipping initialization');
      return;
    }
    window.feedWiseBlockerInstance = this;
    
    this.highlights = [];
    this.displayedHighlights = [];
    this.isLoading = false;
    this.highlightsPerLoad = 5;
    this.platform = this.detectPlatform();
    this.originalFacebookContent = null;
    this.dragEventListeners = [];
    this.sessionStartTime = Date.now();
    this.highlightsViewed = 0;
    this.setupPageVisibilityTracking();
    this.initWithTheme();
  }

  async initWithTheme() {
    this.currentTheme = await this.detectTheme();
    this.init();
  }

  detectTheme() {
    // First check user's stored theme preference
    return new Promise((resolve) => {
      chrome.storage.local.get(['feedwiseTheme'], (data) => {
        if (data.feedwiseTheme) {
          // Use user's explicit theme preference
          console.log('[WisdomFeed] User theme preference:', data.feedwiseTheme);
          resolve(data.feedwiseTheme);
          return;
        }
        
        // Fall back to platform/system detection if no user preference
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        console.log('[WisdomFeed] System prefers dark mode:', prefersDark);
        
        // Check platform-specific dark mode indicators
        const hostname = window.location.hostname;
        let platformDark = false;
    
    if (hostname.includes('facebook.com')) {
      // Facebook dark mode detection
      platformDark = document.documentElement.getAttribute('data-color-mode') === 'dark' ||
                    document.body.classList.contains('theme-dark') ||
                    document.querySelector('[data-colorscheme="dark"]') !== null ||
                    document.querySelector('body[style*="--surface-background: #18191a"]') !== null;
    } else if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
      // Twitter/X dark mode detection - check actual background colors
      const bodyStyle = window.getComputedStyle(document.body);
      const backgroundColor = bodyStyle.backgroundColor;
      // Twitter light mode is usually white (rgb(255, 255, 255))
      const isLightBackground = backgroundColor.includes('rgb(255, 255, 255)') || 
                               backgroundColor.includes('rgba(255, 255, 255');
      platformDark = !isLightBackground && (
                    backgroundColor.includes('rgb(0, 0, 0)') || 
                    backgroundColor.includes('rgb(21, 32, 43)') ||
                    backgroundColor.includes('rgb(15, 20, 25)') ||
                    document.documentElement.style.colorScheme === 'dark' ||
                    document.querySelector('meta[name="theme-color"][content="#000000"]') !== null);
    } else if (hostname.includes('instagram.com')) {
      // Instagram dark mode detection - check actual background colors
      const bodyStyle = window.getComputedStyle(document.body);
      const backgroundColor = bodyStyle.backgroundColor;
      // Instagram light mode is usually white (rgb(255, 255, 255))
      const isLightBackground = backgroundColor.includes('rgb(255, 255, 255)') || 
                               backgroundColor.includes('rgba(255, 255, 255');
      platformDark = !isLightBackground && (
                    backgroundColor.includes('rgb(0, 0, 0)') || 
                    backgroundColor.includes('rgb(18, 18, 18)') ||
                    backgroundColor.includes('rgb(38, 38, 38)') ||
                    document.documentElement.classList.contains('theme-dark') ||
                    document.querySelector('meta[name="theme-color"][content="#000000"]') !== null);
    }
    
        console.log('[WisdomFeed] Platform dark mode detected:', platformDark);
        
        // Use platform dark mode if detected, otherwise fall back to system preference
        const theme = (platformDark || prefersDark) ? 'dark' : 'light';
        console.log('[WisdomFeed] Selected theme:', theme);
        
        resolve(theme);
      });
    });
  }

  detectPlatform() {
    const hostname = window.location.hostname;
    console.log('[WisdomFeed] Detecting platform for hostname:', hostname);
    if (hostname.includes('facebook.com')) {
      console.log('[WisdomFeed] Detected Facebook');
      return 'facebook';
    }
    if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
      console.log('[WisdomFeed] Detected Twitter/X');
      return 'twitter';
    }
    if (hostname.includes('instagram.com')) {
      console.log('[WisdomFeed] Detected Instagram');
      return 'instagram';
    }
    console.log('[WisdomFeed] Unknown platform');
    return 'unknown';
  }

  async init() {
    console.log('[WisdomFeed] Initializing on platform:', this.platform, 'URL:', window.location.href);
    
    // Only initialize if we're on a supported platform
    if (this.platform === 'unknown') {
      console.log('[WisdomFeed] Unknown platform, exiting');
      return;
    }
    
    // Check if this platform is enabled and if we should activate on this page
    const shouldActivate = await this.shouldActivateOnCurrentPage();
    console.log('[WisdomFeed] Should activate:', shouldActivate);
    if (!shouldActivate) return;
    
    // Track blocking session start
    this.trackBlockingSession();
    
    // Wait for DOM to be more stable on dynamic sites
    await this.waitForPageLoad();
    
    // Re-detect theme after page loads (in case platform theme changed)
    this.currentTheme = this.detectTheme();
    
    this.injectStyles();
    this.hidePlatformFeed();
    this.loadHighlights();
    this.setupInfiniteScroll();
  }

  // Gamification Analytics Methods
  trackBlockingSession() {
    chrome.storage.local.get(['feedwiseAnalytics'], (data) => {
      const analytics = data.feedwiseAnalytics || this.getDefaultAnalytics();
      const today = new Date().toDateString();
      
      // Track daily blocking sessions
      if (!analytics.dailyStats[today]) {
        analytics.dailyStats[today] = {
          sessions: 0,
          timeSpent: 0,
          highlightsViewed: 0,
          notesAdded: 0,
          platformsBlocked: new Set()
        };
      }
      
      // Ensure platformsBlocked is a Set (convert from array if needed)
      if (!(analytics.dailyStats[today].platformsBlocked instanceof Set)) {
        analytics.dailyStats[today].platformsBlocked = new Set(analytics.dailyStats[today].platformsBlocked || []);
      }
      
      analytics.dailyStats[today].sessions++;
      analytics.dailyStats[today].platformsBlocked.add(this.platform);
      analytics.totalSessions++;
      analytics.platformStats[this.platform] = (analytics.platformStats[this.platform] || 0) + 1;
      analytics.lastActiveDate = new Date().toISOString();
      
      // Convert Set to Array for storage
      analytics.dailyStats[today].platformsBlocked = Array.from(analytics.dailyStats[today].platformsBlocked);
      
      chrome.storage.local.set({ feedwiseAnalytics: analytics });
      console.log('[WisdomFeed] Tracked blocking session for', this.platform);
    });
  }

  trackHighlightViewed() {
    this.highlightsViewed++;
    
    chrome.storage.local.get(['feedwiseAnalytics'], (data) => {
      const analytics = data.feedwiseAnalytics || this.getDefaultAnalytics();
      const today = new Date().toDateString();
      
      if (!analytics.dailyStats[today]) {
        analytics.dailyStats[today] = {
          sessions: 0,
          timeSpent: 0,
          highlightsViewed: 0,
          notesAdded: 0,
          platformsBlocked: []
        };
      }
      
      analytics.dailyStats[today].highlightsViewed++;
      analytics.totalHighlightsViewed++;
      
      chrome.storage.local.set({ feedwiseAnalytics: analytics }, () => {
        // Update the display after tracking
        setTimeout(() => this.updateBrainCellsDisplay(), 100);
      });
    });
  }

  trackNoteAdded() {
    chrome.storage.local.get(['feedwiseAnalytics'], (data) => {
      const analytics = data.feedwiseAnalytics || this.getDefaultAnalytics();
      const today = new Date().toDateString();
      
      if (!analytics.dailyStats[today]) {
        analytics.dailyStats[today] = {
          sessions: 0,
          timeSpent: 0,
          highlightsViewed: 0,
          notesAdded: 0,
          platformsBlocked: []
        };
      }
      
      analytics.dailyStats[today].notesAdded++;
      analytics.totalNotesAdded++;
      
      chrome.storage.local.set({ feedwiseAnalytics: analytics }, () => {
        // Update the display after tracking
        setTimeout(() => this.updateBrainCellsDisplay(), 100);
      });
    });
  }

  trackSessionEnd() {
    const sessionDuration = Date.now() - this.sessionStartTime;
    
    chrome.storage.local.get(['feedwiseAnalytics'], (data) => {
      const analytics = data.feedwiseAnalytics || this.getDefaultAnalytics();
      const today = new Date().toDateString();
      
      if (!analytics.dailyStats[today]) {
        analytics.dailyStats[today] = {
          sessions: 0,
          timeSpent: 0,
          highlightsViewed: 0,
          notesAdded: 0,
          platformsBlocked: []
        };
      }
      
      analytics.dailyStats[today].timeSpent += sessionDuration;
      analytics.totalTimeSpent += sessionDuration;
      
      chrome.storage.local.set({ feedwiseAnalytics: analytics });
      console.log('[WisdomFeed] Tracked session duration:', sessionDuration, 'ms');
    });
  }

  getDefaultAnalytics() {
    return {
      totalSessions: 0,
      totalTimeSpent: 0,
      totalHighlightsViewed: 0,
      totalNotesAdded: 0,
      brainCellsSaved: 0,
      currentStreak: 0,
      longestStreak: 0,
      firstUseDate: new Date().toISOString(),
      lastActiveDate: new Date().toISOString(),
      platformStats: {
        facebook: 0,
        twitter: 0,
        instagram: 0
      },
      dailyStats: {},
      achievements: []
    };
  }

  calculateBrainCellsSaved() {
    chrome.storage.local.get(['feedwiseAnalytics'], (data) => {
      const analytics = data.feedwiseAnalytics || this.getDefaultAnalytics();
      
      // Calculate brain cells saved based on various factors
      const sessionsWeight = analytics.totalSessions * 10;
      const timeWeight = Math.floor(analytics.totalTimeSpent / (1000 * 60)) * 2; // 2 per minute
      const highlightsWeight = analytics.totalHighlightsViewed * 5;
      const notesWeight = analytics.totalNotesAdded * 25;
      
      const totalBrainCells = sessionsWeight + timeWeight + highlightsWeight + notesWeight;
      
      analytics.brainCellsSaved = totalBrainCells;
      chrome.storage.local.set({ feedwiseAnalytics: analytics });
      
      return totalBrainCells;
    });
  }

  updateBrainCellsDisplay() {
    chrome.storage.local.get(['feedwiseAnalytics'], (data) => {
      const analytics = data.feedwiseAnalytics || this.getDefaultAnalytics();
      
      // Calculate current brain cells saved
      const sessionsWeight = analytics.totalSessions * 10;
      const timeWeight = Math.floor(analytics.totalTimeSpent / (1000 * 60)) * 2; // 2 per minute
      const highlightsWeight = analytics.totalHighlightsViewed * 5;
      const notesWeight = analytics.totalNotesAdded * 25;
      
      const totalBrainCells = sessionsWeight + timeWeight + highlightsWeight + notesWeight;
      
      // Update the display
      const countElement = document.getElementById('brain-cells-count');
      if (countElement) {
        countElement.textContent = totalBrainCells.toLocaleString();
        
        // Add a small animation effect
        countElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
          countElement.style.transform = 'scale(1)';
        }, 200);
      }
      
      // Update analytics with current value
      analytics.brainCellsSaved = totalBrainCells;
      chrome.storage.local.set({ feedwiseAnalytics: analytics });
    });
  }

  setupPageVisibilityTracking() {
    // Track when user leaves/returns to tab
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // User switched away from tab
        this.trackSessionEnd();
      } else {
        // User returned to tab  
        this.sessionStartTime = Date.now();
      }
    });

    // Track when user navigates away
    window.addEventListener('beforeunload', () => {
      this.trackSessionEnd();
    });
  }

  async waitForPageLoad() {
    // Testing without initial delay
    // const initialWait = this.platform === 'facebook' ? 800 : 1200; // Shorter delay for Facebook
    // await new Promise(resolve => setTimeout(resolve, initialWait));
    
    // Wait for specific elements based on platform
    const maxWaits = 8;
    let waits = 0;
    
    while (waits < maxWaits) {
      let targetFound = false;
      
      switch (this.platform) {
        case 'facebook':
          targetFound = !!document.querySelector('[role="main"]');
          break;
        case 'twitter':
          targetFound = !!document.querySelector('[data-testid="primaryColumn"]');
          break;
        case 'instagram':
          targetFound = !!document.querySelector('main[role="main"]');
          break;
      }
      
      if (targetFound) {
        console.log('[WisdomFeed] Target element found after', waits * 300, 'ms');
        break;
      }
      
      await new Promise(resolve => setTimeout(resolve, 300));
      waits++;
    }
    
    console.log('[WisdomFeed] Finished waiting for page load after', waits * 300, 'ms');
  }

  async shouldActivateOnCurrentPage() {
    return new Promise((resolve) => {
      // Check if wisdomfeed is temporarily disabled after user closed it
      const disabledUntil = sessionStorage.getItem('wisdomfeed-disabled-until');
      if (disabledUntil && Date.now() < parseInt(disabledUntil)) {
        console.log('[WisdomFeed] Temporarily disabled after user closed');
        resolve(false);
        return;
      }
      
      chrome.storage.local.get(['feedwiseSettings'], (data) => {
        const settings = data.feedwiseSettings || {};
        const platformSettings = settings.platforms || {};
        
        // Check if platform is enabled (default to true)
        const platformEnabled = platformSettings[this.platform] !== false;
        if (!platformEnabled) {
          resolve(false);
          return;
        }
        
        // Check if we should activate on this specific page
        const pageCheck = this.isTargetPage();
        resolve(pageCheck);
      });
    });
  }

  isTargetPage() {
    const url = window.location.href;
    const pathname = window.location.pathname;
    
    switch (this.platform) {
      case 'facebook':
        // Activate on main feed, not on specific posts, profiles, etc.
        return pathname === '/' || pathname.startsWith('/home') || url.includes('facebook.com/?');
        
      case 'twitter':
        // Activate on home timeline, not on individual tweets or profiles
        return pathname === '/' || pathname === '/home' || url.includes('twitter.com/home') || url.includes('x.com/home');
        
      case 'instagram':
        // Only activate on home feed, not on individual posts, profiles, stories, etc.
        const isHomePage = pathname === '/' || pathname === '' || pathname === '/';
        const hasNoSpecialPaths = !url.includes('/p/') && !url.includes('/stories/') && 
                                !url.includes('/reel/') && !url.includes('/explore/') && 
                                !url.includes('/direct/') && !url.includes('/accounts/') &&
                                !url.includes('/profile/');
        console.log('[WisdomFeed] Instagram check - isHomePage:', isHomePage, 'hasNoSpecialPaths:', hasNoSpecialPaths);
        return isHomePage && hasNoSpecialPaths;
        
      default:
        return false;
    }
  }

  injectStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = CSS_VARIABLES + HIGHLIGHT_STYLES;
    document.head.appendChild(styleElement);
    
    // Apply theme
    document.documentElement.setAttribute('data-theme', this.currentTheme);
  }

  hidePlatformFeed() {
    switch (this.platform) {
      case 'facebook':
        const fbSelectors = ['[role="main"]', '[data-pagelet="Feed"]'];
        for (const selector of fbSelectors) {
          const element = document.querySelector(selector);
          if (element) {
            element.style.display = 'none';
            break;
          }
        }
        break;
        
      case 'twitter':
        // For Twitter, only hide sidebar and apply minimal CSS changes
        // Don't hide the main feed - we'll overlay it instead
        const twitterHideStyle = document.createElement('style');
        twitterHideStyle.id = 'wisdomfeed-twitter-hide';
        twitterHideStyle.textContent = `
          /* Hide Twitter right sidebar completely */
          [data-testid="sidebarColumn"] {
            display: none !important;
          }
          
          /* Hide trending sections */
          [aria-label*="Timeline: Trending"],
          [data-testid="trend"],
          section[aria-labelledby*="trending"],
          aside[aria-label*="Timeline"],
          div[aria-label*="Timeline: Trending"] {
            display: none !important;
          }
          
          /* Hide the main feed content behind overlay */
          [data-testid="primaryColumn"] > div > div {
            visibility: hidden !important;
          }
          
          /* Adjust main layout to not leave empty space */
          main[role="main"] > div > div {
            grid-template-columns: 275px 1fr !important;
          }
          
          /* Hide any flex-based right columns */
          div[style*="flex-basis: 290px"],
          div[style*="width: 290px"],
          div[style*="flex-basis: 350px"] {
            display: none !important;
          }
          
          /* Make sure our overlay covers everything */
          #wisdomfeed-overlay {
            z-index: 9999 !important;
          }
          
          /* Twitter-specific wider layout */
          #wisdomfeed-overlay .fb-blocker-highlights {
            max-width: 1200px !important;
            width: calc(100vw - 360px) !important;
            padding: 0 20px !important;
            margin: 0 auto !important;
          }
          
          #wisdomfeed-overlay .fb-blocker-container {
            padding: 20px 30px 20px 50px !important;
            width: 100% !important;
          }
          
          #wisdomfeed-overlay .fb-blocker-highlight {
            max-width: none !important;
            width: 100% !important;
          }
        `;
        document.head.appendChild(twitterHideStyle);
        // console.log('[WisdomFeed] Applied CSS-only Twitter modifications');
        // console.log('[WisdomFeed DEBUG] Twitter CSS applied:', twitterHideStyle.textContent.includes('1400px'));
        break;
        
      case 'instagram':
        const igSelectors = [
          'div[style*="max-width: 935px"]',
          'section > main[role="main"]',
          'main[role="main"] > div',
          'section > main > div > div',
          'div[style*="max-width: 470px"]',
          'main[role="main"]',
          'section[role="main"]'
        ];
        for (const selector of igSelectors) {
          const element = document.querySelector(selector);
          if (element) {
            element.style.display = 'none';
            break;
          }
        }
        break;
    }
  }

  loadHighlights() {
    // console.log('[WisdomFeed DEBUG] Loading highlights...');
    chrome.storage.local.get(['highlights', 'obsidianNotes'], (data) => {
      const highlights = data.highlights || [];
      const notes = data.obsidianNotes || [];
      
      // console.log('[WisdomFeed DEBUG] Found highlights:', highlights.length, 'notes:', notes.length);
      
      if (highlights.length > 0 || notes.length > 0) {
        // Group highlights before shuffling to preserve context
        const groupedHighlights = highlights.length > 0 ? this.groupRelatedHighlights(highlights) : [];
        
        // Convert notes to highlight-like objects
        const noteHighlights = notes.map(note => ({
          quote: note.content,
          source: note.title.replace('.md', ''),
          author: 'Obsidian Note',
          isNote: true
        }));
        
        // Mix notes into highlights with some spacing
        const mixedContent = this.mixNotesWithHighlights(groupedHighlights, noteHighlights);
        this.highlights = this.shuffleArray([...mixedContent]);
        // console.log('[WisdomFeed DEBUG] Using user content, creating container...');
        this.createContainer();
        this.displayNextBatch();
      } else {
        // Show default quotes for new users
        // console.log('[WisdomFeed DEBUG] No user content, loading default quotes...');
        this.loadDefaultQuotes();
      }
    });
  }

  loadDefaultQuotes() {
    // console.log('[WisdomFeed DEBUG] Loading default quotes for new users');
    this.highlights = this.shuffleArray([...defaultQuotes]);
    // console.log('[WisdomFeed DEBUG] Creating container with upload for default content...');
    this.createContainerWithUpload();
    this.displayNextBatch();
  }

  groupRelatedHighlights(highlights) {
    const grouped = [];
    let currentGroup = [];
    let lastSource = null;
    let lastAuthor = null;
    
    for (let i = 0; i < highlights.length; i++) {
      const highlight = highlights[i];
      const isSameSource = highlight.source === lastSource && highlight.author === lastAuthor;
      const isShort = highlight.quote && highlight.quote.length < 100;
      const isListItem = this.isListItem(highlight.quote);
      
      // If this highlight is from the same source and looks like it might be related
      if (isSameSource && (isShort || isListItem || currentGroup.length > 0)) {
        currentGroup.push(highlight);
      } else {
        // Finalize the current group if it exists
        if (currentGroup.length > 0) {
          if (currentGroup.length === 1) {
            // Single highlight - only add if it's valid on its own
            if (this.isValidHighlight(currentGroup[0])) {
              grouped.push(currentGroup[0]);
            }
          } else {
            // Multiple highlights - create a grouped highlight
            grouped.push(this.createGroupedHighlight(currentGroup));
          }
          currentGroup = [];
        }
        
        // Start a new group or add as standalone
        if (isShort || isListItem) {
          currentGroup.push(highlight);
        } else if (this.isValidHighlight(highlight)) {
          grouped.push(highlight);
        }
      }
      
      lastSource = highlight.source;
      lastAuthor = highlight.author;
    }
    
    // Handle the last group
    if (currentGroup.length > 0) {
      if (currentGroup.length === 1 && this.isValidHighlight(currentGroup[0])) {
        grouped.push(currentGroup[0]);
      } else if (currentGroup.length > 1) {
        grouped.push(this.createGroupedHighlight(currentGroup));
      }
    }
    
    return grouped;
  }

  isListItem(quote) {
    if (!quote) return false;
    const trimmed = quote.trim();
    return trimmed.match(/^\d+\./) || // "1. item"
           trimmed.match(/^[a-zA-Z]\)/) || // "a) item"
           trimmed.match(/^[\-\*\•]/) || // "- item" or "* item" or "• item"
           trimmed.match(/^[IVX]+\./) || // "I. item" (Roman numerals)
           trimmed.match(/^\([a-zA-Z0-9]\)/) || // "(a) item"
           trimmed.match(/^[a-zA-Z0-9]\./); // "a. item"
  }

  createGroupedHighlight(highlights) {
    // Combine the quotes with proper formatting
    const combinedQuote = highlights.map((h) => {
      const quote = h.quote.trim();
      // If it's already a list item, keep it as is
      if (this.isListItem(quote)) {
        return quote;
      }
      // If it's not a list item but part of a group, add bullet point
      return `• ${quote}`;
    }).join('\n\n');
    
    return {
      quote: combinedQuote,
      author: highlights[0].author,
      source: highlights[0].source,
      isGrouped: true,
      groupSize: highlights.length
    };
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  mixNotesWithHighlights(highlights, notes) {
    if (notes.length === 0) return highlights;
    if (highlights.length === 0) return notes;
    
    const mixed = [];
    const noteFrequency = Math.max(1, Math.floor(highlights.length / notes.length));
    
    let noteIndex = 0;
    for (let i = 0; i < highlights.length; i++) {
      mixed.push(highlights[i]);
      
      // Insert a note every noteFrequency highlights
      if ((i + 1) % noteFrequency === 0 && noteIndex < notes.length) {
        mixed.push(notes[noteIndex]);
        noteIndex++;
      }
    }
    
    // Add any remaining notes
    while (noteIndex < notes.length) {
      mixed.push(notes[noteIndex]);
      noteIndex++;
    }
    
    return mixed;
  }

  findPlatformFeed() {
    let feedSelectors = [];
    
    switch (this.platform) {
      case 'facebook':
        feedSelectors = ['[role="main"]', '[data-pagelet="Feed"]'];
        break;
      case 'twitter':
        feedSelectors = [
          '[data-testid="primaryColumn"]',
          'main[role="main"]'
        ];
        break;
      case 'instagram':
        feedSelectors = ['main[role="main"]'];
        break;
    }
    
    console.log('[WisdomFeed] Finding platform feed with selectors:', feedSelectors);
    
    for (let i = 0; i < feedSelectors.length; i++) {
      const selector = feedSelectors[i];
      const feed = document.querySelector(selector);
      console.log('[WisdomFeed] Feed selector', i, ':', selector, '-> Found:', !!feed, feed);
      if (feed) {
        console.log('[WisdomFeed] Using feed element:', feed);
        return feed;
      }
    }
    
    console.log('[WisdomFeed] No feed element found!');
    return null;
  }

  getPlatformEmoji() {
    return '🦉';
  }

  createContainer() {
    const feed = this.findPlatformFeed();
    if (feed) {
      const container = document.createElement('div');
      container.className = 'fb-blocker-container';
      container.id = 'wisdomfeed-overlay';
      
      // For Twitter, use overlay approach to avoid breaking React
      if (this.platform === 'twitter') {
        container.style.cssText = `
          position: fixed;
          top: 0;
          left: 320px;
          right: 0;
          bottom: 0;
          z-index: 9999;
          background: var(--bg-primary);
          overflow-y: auto;
          width: calc(100vw - 320px);
          height: 100vh;
          margin: 0;
          padding: 0;
        `;
        
        // Debug logging for Twitter width
        // console.log('[WisdomFeed DEBUG] Twitter container created');
        // console.log('[WisdomFeed DEBUG] Viewport width:', window.innerWidth);
        // console.log('[WisdomFeed DEBUG] Calculated container width:', window.innerWidth - 260);
        // console.log('[WisdomFeed DEBUG] Container actual width:', container.offsetWidth);
        // console.log('[WisdomFeed DEBUG] Container computed style:', window.getComputedStyle(container).width);
      }
      
      // const platformName = this.platform.charAt(0).toUpperCase() + this.platform.slice(1);
      
      container.innerHTML = `
        <div class="fb-blocker-header">
          <h1 class="fb-blocker-title">
            <span class="fb-blocker-icon">🦉</span>
            WisdomFeed
          </h1>
          <div class="fb-blocker-gamification">
            <div class="fb-blocker-brain-cells" id="brain-cells-counter">
              🧠 <span id="brain-cells-count">0</span> brain cells saved
            </div>
          </div>
          <div class="fb-blocker-header-controls">
            <button class="fb-blocker-add-note-btn" id="add-note-btn" title="Add New Note">
              ➕ Add Note
            </button>
            <button class="fb-blocker-exit-btn" id="exit-btn" title="Go back to ragebait & brainrot?">
              ✕
            </button>
          </div>
        </div>
        <div class="fb-blocker-highlights" id="highlights-container"></div>
        <div class="fb-blocker-loading" id="loading-indicator" style="display: none;">
          Loading more wisdom...
        </div>
      `;
      
      // Use different insertion methods based on platform
      if (this.platform === 'twitter') {
        // Fixed overlay for Twitter - append to body for full coverage
        document.body.appendChild(container);
      } else {
        // Replacement approach for Facebook/Instagram
        // Store original content before clearing for Facebook
        if (this.platform === 'facebook') {
          this.originalFacebookContent = feed.innerHTML;
        }
        feed.innerHTML = '';
        feed.appendChild(container);
        // Ensure the feed element is visible after adding our container
        feed.style.display = '';
      }
      
      // Setup add note button
      document.getElementById('add-note-btn').addEventListener('click', () => {
        this.showAddNoteForm();
      });

      // Setup exit button
      document.getElementById('exit-btn').addEventListener('click', () => {
        this.showExitConfirmation();
      });
      
      // Load and display brain cells saved counter
      this.updateBrainCellsDisplay();
      
      // Debug logging for highlights container on Twitter
      // if (this.platform === 'twitter') {
      //   setTimeout(() => {
      //     const highlightsContainer = document.getElementById('highlights-container');
      //     if (highlightsContainer) {
      //       console.log('[WisdomFeed DEBUG] Highlights container found');
      //       console.log('[WisdomFeed DEBUG] Highlights container width:', highlightsContainer.offsetWidth);
      //       console.log('[WisdomFeed DEBUG] Highlights container computed style:', window.getComputedStyle(highlightsContainer).width);
      //       console.log('[WisdomFeed DEBUG] Highlights container max-width:', window.getComputedStyle(highlightsContainer).maxWidth);
      //       console.log('[WisdomFeed DEBUG] Highlights container padding:', window.getComputedStyle(highlightsContainer).padding);
      //       
      //       const firstHighlight = highlightsContainer.querySelector('.fb-blocker-highlight');
      //       if (firstHighlight) {
      //         console.log('[WisdomFeed DEBUG] First highlight width:', firstHighlight.offsetWidth);
      //         console.log('[WisdomFeed DEBUG] First highlight computed style:', window.getComputedStyle(firstHighlight).width);
      //       }
      //     }
      //   }, 1000);
      // }
    }
  }

  createContainerWithUpload() {
    const feed = this.findPlatformFeed();
    if (feed && feed.parentNode) {
      const container = document.createElement('div');
      container.className = 'fb-blocker-container';
      container.id = 'wisdomfeed-overlay';
      
      // For Twitter, use overlay approach to avoid breaking React
      if (this.platform === 'twitter') {
        container.style.cssText = `
          position: fixed;
          top: 0;
          left: 320px;
          right: 0;
          bottom: 0;
          z-index: 9999;
          background: var(--bg-primary);
          overflow-y: auto;
          width: calc(100vw - 320px);
          height: 100vh;
          margin: 0;
          padding: 0;
        `;
        
        // Debug logging for Twitter width
        // console.log('[WisdomFeed DEBUG] Twitter container with upload created');
        // console.log('[WisdomFeed DEBUG] Viewport width:', window.innerWidth);
        // console.log('[WisdomFeed DEBUG] Calculated container width:', window.innerWidth - 260);
        // console.log('[WisdomFeed DEBUG] Container actual width:', container.offsetWidth);
        // console.log('[WisdomFeed DEBUG] Container computed style:', window.getComputedStyle(container).width);
      }
      
      container.innerHTML = `
        <div class="fb-blocker-header">
          <h1 class="fb-blocker-title">
            <span class="fb-blocker-icon">🦉</span>
            WisdomFeed
          </h1>
          <div class="fb-blocker-gamification">
            <div class="fb-blocker-brain-cells" id="brain-cells-counter">
              🧠 <span id="brain-cells-count">0</span> brain cells saved
            </div>
          </div>
          <div class="fb-blocker-header-controls">
            <button class="fb-blocker-add-note-btn" id="add-note-btn" title="Add New Note">
              ➕ Add Note
            </button>
            <button class="fb-blocker-exit-btn" id="exit-btn" title="Go back to the brainrot?">
              ✕
            </button>
          </div>
        </div>
        <div class="fb-blocker-upload-zone" id="upload-zone" style="margin-bottom: 30px; background: var(--bg-secondary); border: 2px dashed var(--border-color); border-radius: 12px; padding: 40px; text-align: center; cursor: pointer; transition: all 0.3s ease;">
          <div class="fb-blocker-upload-content">
            <div class="fb-blocker-upload-icon" style="font-size: 48px; margin-bottom: 16px;">📁</div>
            <div class="fb-blocker-upload-text" style="font-size: 18px; font-weight: 600; margin-bottom: 8px; color: var(--text-primary);">Upload your Readwise CSV</div>
            <div class="fb-blocker-upload-subtext" style="color: var(--text-secondary); font-size: 14px;">Drag & drop here or click to browse</div>
          </div>
        </div>
        <div class="fb-blocker-upload-status" id="upload-status" style="display: none;"></div>
        <div class="fb-blocker-highlights" id="highlights-container"></div>
        <div class="fb-blocker-loading" id="loading-indicator" style="display: none;">
          Loading more wisdom...
        </div>
      `;
      
      // Use different insertion methods based on platform
      if (this.platform === 'twitter') {
        // Fixed overlay for Twitter - append to body for full coverage
        document.body.appendChild(container);
      } else {
        // Insert before approach for Facebook/Instagram
        feed.parentNode.insertBefore(container, feed);
        // Ensure the feed element is visible (it might have been hidden by hidePlatformFeed)
        feed.style.display = '';
      }
      
      // Setup add note button
      document.getElementById('add-note-btn').addEventListener('click', () => {
        this.showAddNoteForm();
      });

      // Setup exit button
      document.getElementById('exit-btn').addEventListener('click', () => {
        this.showExitConfirmation();
      });

      // Load and display brain cells saved counter
      this.updateBrainCellsDisplay();

      // Debug logging for highlights container on Twitter
      // if (this.platform === 'twitter') {
      //   setTimeout(() => {
      //     const highlightsContainer = document.getElementById('highlights-container');
      //     if (highlightsContainer) {
      //       console.log('[WisdomFeed DEBUG] Upload highlights container found');
      //       console.log('[WisdomFeed DEBUG] Upload highlights container width:', highlightsContainer.offsetWidth);
      //       console.log('[WisdomFeed DEBUG] Upload highlights container computed style:', window.getComputedStyle(highlightsContainer).width);
      //       console.log('[WisdomFeed DEBUG] Upload highlights container max-width:', window.getComputedStyle(highlightsContainer).maxWidth);
      //       console.log('[WisdomFeed DEBUG] Upload highlights container padding:', window.getComputedStyle(highlightsContainer).padding);
      //     }
      //   }, 1000);
      // }

      // Setup drag and drop for CSV upload
      this.setupPageDragAndDrop();
    }
  }

  displayNextBatch() {
    if (this.isLoading || this.displayedHighlights.length >= this.highlights.length) {
      return;
    }

    this.isLoading = true;
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
      loadingIndicator.style.display = 'block';
    }

    // Simulate loading delay for better UX
    setTimeout(() => {
      const container = document.getElementById('highlights-container');
      const sentinel = document.getElementById('scroll-sentinel');
      
      if (container) {
        const startIndex = this.displayedHighlights.length;
        const endIndex = Math.min(startIndex + this.highlightsPerLoad, this.highlights.length);
        
        for (let i = startIndex; i < endIndex; i++) {
          const highlight = this.highlights[i];
          if (this.isValidHighlight(highlight)) {
            const highlightElement = this.createHighlightElement(highlight, i);
            // Insert before sentinel if it exists
            if (sentinel) {
              container.insertBefore(highlightElement, sentinel);
            } else {
              container.appendChild(highlightElement);
            }
            this.displayedHighlights.push(highlight);
            // Track highlight viewed
            this.trackHighlightViewed();
          }
        }
      }
      
      if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
      }
      this.isLoading = false;
    }, 300);
  }

  isValidHighlight(highlight) {
    if (!highlight || !highlight.quote) return false;
    
    // If it's a grouped highlight, it's always valid
    if (highlight.isGrouped) return true;
    
    // For standalone highlights, apply stricter validation
    const quote = highlight.quote.trim();
    
    // Must be at least 15 characters for standalone highlights
    if (quote.length < 15) return false;
    
    // If it's a list item, it should be grouped, not standalone
    if (this.isListItem(quote)) return false;
    
    // Very short highlights without proper endings are likely incomplete
    if (quote.length < 50 && !quote.match(/[.!?]$/)) return false;
    
    return true;
  }

  createHighlightElement(highlight, index) {
    const element = document.createElement('div');
    element.className = highlight.isNote ? 'fb-blocker-highlight fb-blocker-note-highlight' : 'fb-blocker-highlight';
    element.style.animationDelay = `${(index % this.highlightsPerLoad) * 0.1}s`;
    
    // Add different gradient colors based on index
    const gradientIndex = index % 5;
    element.setAttribute('data-gradient', gradientIndex);
    
    if (highlight.isGrouped) {
      element.classList.add('fb-blocker-highlight-grouped');
    }
    
    if (highlight.isNote) {
      // Handle Obsidian notes
      const htmlContent = this.parseMarkdown(highlight.quote);
      const noteName = highlight.source;
      
      element.innerHTML = `
        <div class="fb-blocker-note-header-inline">
          <span class="fb-blocker-note-icon">📝</span>
          <span class="fb-blocker-note-title-inline">${noteName}</span>
          <span class="fb-blocker-note-badge">Obsidian Note</span>
        </div>
        <div class="fb-blocker-quote fb-blocker-note-content-inline">
          ${htmlContent}
        </div>
      `;
    } else {
      // Handle regular highlights
      const cleanQuote = highlight.quote.replace(/"/g, '');
      const author = highlight.author || 'Unknown';
      const source = highlight.source || 'Unknown Source';
      
      // Create Readwise search URL
      const searchQuery = encodeURIComponent(source);
      const readwiseUrl = `https://read.readwise.io/search?q=${searchQuery}`;
      
      // Format the quote content - preserve line breaks for grouped highlights
      const formattedQuote = highlight.isGrouped 
        ? cleanQuote.replace(/\n\n/g, '</p><p class="fb-blocker-quote-item">') 
        : cleanQuote;
      
      const groupBadge = highlight.isGrouped 
        ? `<span class="fb-blocker-group-badge">${highlight.groupSize} related highlights</span>` 
        : '';
      
      element.innerHTML = `
        <div class="fb-blocker-quote ${highlight.isGrouped ? 'fb-blocker-quote-grouped' : ''}">
          ${highlight.isGrouped ? '<p class="fb-blocker-quote-item">' : ''}${formattedQuote}${highlight.isGrouped ? '</p>' : ''}
        </div>
        <div class="fb-blocker-attribution">
          <div class="fb-blocker-author-source">
            <span class="fb-blocker-author">${author}</span>
            <a href="${readwiseUrl}" target="_blank" class="fb-blocker-source-link" title="Search in Readwise">
              ${source} ↗
            </a>
          </div>
          ${groupBadge}
        </div>
      `;
    }
    
    return element;
  }

  setupInfiniteScroll() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.isLoading && this.displayedHighlights.length < this.highlights.length) {
          this.displayNextBatch();
        }
      });
    }, {
      rootMargin: '200px'
    });

    // Create a sentinel element at the bottom to trigger loading
    const createSentinel = () => {
      const sentinel = document.createElement('div');
      sentinel.id = 'scroll-sentinel';
      sentinel.style.height = '20px';
      sentinel.style.background = 'transparent';
      return sentinel;
    };

    // Add sentinel after creating the container
    setTimeout(() => {
      const container = document.getElementById('highlights-container');
      if (container) {
        const sentinel = createSentinel();
        container.appendChild(sentinel);
        observer.observe(sentinel);
      }
    }, 100);
  }


  showNoHighlightsMessage() {
    const feed = this.findPlatformFeed();
    if (feed && feed.parentNode) {
      const container = document.createElement('div');
      container.className = 'fb-blocker-container';
      
      // const platformEmoji = this.getPlatformEmoji();
      
      container.innerHTML = `
        <div class="fb-blocker-header">
          <h1 class="fb-blocker-title">
            <span class="fb-blocker-icon">🦉</span>
            WisdomFeed
          </h1>
          <div class="fb-blocker-gamification">
            <div class="fb-blocker-brain-cells" id="brain-cells-counter">
              🧠 <span id="brain-cells-count">0</span> brain cells saved
            </div>
          </div>
          <div class="fb-blocker-header-controls">
            <button class="fb-blocker-add-note-btn" id="add-note-btn" title="Add New Note">
              ➕ Add Note
            </button>
            <button class="fb-blocker-exit-btn" id="exit-btn" title="Go back to the brainrot?">
              ✕
            </button>
          </div>
        </div>
        <div class="fb-blocker-no-highlights">
          <h3>No highlights found</h3>
          <p>Upload your Readwise CSV by dragging it anywhere on this page, or go to the extension options.</p>
          <div class="fb-blocker-upload-zone" id="upload-zone">
            <div class="fb-blocker-upload-content">
              <div class="fb-blocker-upload-icon">📁</div>
              <div class="fb-blocker-upload-text">Drag & drop your CSV here</div>
              <div class="fb-blocker-upload-subtext">or click to browse</div>
            </div>
          </div>
        </div>
        <div class="fb-blocker-upload-status" id="upload-status" style="display: none;"></div>
      `;
      
      feed.parentNode.insertBefore(container, feed);
      
      // Setup add note button
      document.getElementById('add-note-btn').addEventListener('click', () => {
        this.showAddNoteForm();
      });

      // Setup exit button
      document.getElementById('exit-btn').addEventListener('click', () => {
        this.showExitConfirmation();
      });

      // Load and display brain cells saved counter
      this.updateBrainCellsDisplay();

      // Setup drag and drop for CSV upload
      this.setupPageDragAndDrop();
    }
  }

  setupPageDragAndDrop() {
    const uploadZone = document.getElementById('upload-zone');
    
    // Store event listeners for cleanup
    this.dragEventListeners = [];
    
    // Prevent default drag behaviors
    const preventDefaultHandler = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      document.addEventListener(eventName, preventDefaultHandler);
      this.dragEventListeners.push({ eventName, handler: preventDefaultHandler });
    });

    // Add visual feedback for drag over entire page
    const dragEnterHandler = (e) => {
      if (e.dataTransfer.types.includes('Files')) {
        document.body.classList.add('fb-blocker-drag-active');
      }
    };
    document.addEventListener('dragenter', dragEnterHandler);
    this.dragEventListeners.push({ eventName: 'dragenter', handler: dragEnterHandler });

    const dragLeaveHandler = (e) => {
      if (!e.relatedTarget || e.relatedTarget === document.documentElement) {
        document.body.classList.remove('fb-blocker-drag-active');
      }
    };
    document.addEventListener('dragleave', dragLeaveHandler);
    this.dragEventListeners.push({ eventName: 'dragleave', handler: dragLeaveHandler });

    // Handle drop anywhere on page
    const dropHandler = (e) => {
      document.body.classList.remove('fb-blocker-drag-active');
      this.handleFileDrop(e);
    };
    document.addEventListener('drop', dropHandler);
    this.dragEventListeners.push({ eventName: 'drop', handler: dropHandler });

    // Handle click on upload zone
    if (uploadZone) {
      uploadZone.addEventListener('click', () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.csv';
        fileInput.onchange = (e) => {
          if (e.target.files.length > 0) {
            this.processUploadedFile(e.target.files[0]);
          }
        };
        fileInput.click();
      });

      // Upload zone specific drag events
      ['dragenter', 'dragover'].forEach(eventName => {
        uploadZone.addEventListener(eventName, () => {
          uploadZone.classList.add('fb-blocker-upload-zone-active');
        });
      });

      ['dragleave', 'drop'].forEach(eventName => {
        uploadZone.addEventListener(eventName, () => {
          uploadZone.classList.remove('fb-blocker-upload-zone-active');
        });
      });
    }
  }

  handleFileDrop(e) {
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.name.toLowerCase().endsWith('.csv')) {
        this.processUploadedFile(file);
      } else {
        this.showUploadStatus('Please drop a CSV file', 'error');
      }
    }
  }

  processUploadedFile(file) {
    this.showUploadStatus('Processing CSV file...', 'loading');
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const highlights = this.parseCSV(e.target.result);
        const validHighlights = highlights.filter(h => this.isValidHighlight(h));
        
        chrome.storage.local.set({ 
          highlights: validHighlights,
          uploadDate: new Date().toISOString(),
          totalCount: highlights.length,
          validCount: validHighlights.length
        }, () => {
          this.showUploadStatus(
            `✅ Successfully uploaded ${validHighlights.length} highlights! Refreshing page...`,
            'success'
          );
          
          // Refresh the page to show highlights
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        });
      } catch (error) {
        this.showUploadStatus('❌ Error processing CSV file. Please check the format.', 'error');
      }
    };
    reader.readAsText(file);
  }

  parseCSV(csvText) {
    const lines = csvText.split('\n').filter(line => line.trim() !== '');
    const highlights = [];
    
    // Skip header row
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (line.trim() === '') continue;
      
      // Parse CSV line - format: Highlight,Book Title,Book Author,...
      const parts = this.parseCSVLine(line);
      if (parts.length >= 3) {
        highlights.push({
          quote: parts[0]?.trim() || '',           // Highlight
          source: parts[1]?.trim() || 'Unknown Source', // Book Title
          author: parts[2]?.trim() || 'Unknown'    // Book Author
        });
      }
    }
    
    return highlights;
  }

  parseCSVLine(line) {
    const parts = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        parts.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    
    parts.push(current);
    return parts.map(part => part.replace(/^"(.*)"$/, '$1'));
  }

  showUploadStatus(message, type) {
    const statusEl = document.getElementById('upload-status');
    if (statusEl) {
      statusEl.textContent = message;
      statusEl.className = `fb-blocker-upload-status fb-blocker-upload-status-${type}`;
      statusEl.style.display = 'block';
      
      if (type === 'error') {
        setTimeout(() => {
          statusEl.style.display = 'none';
        }, 5000);
      }
    }
  }


  showDemoNote() {
    const demoNotes = [
      {
        title: "Daily Reflection",
        content: `# Daily Reflection

## Morning Questions
- What am I grateful for today?
- What is my main focus?
- How can I serve others?

## Evening Review
- What went well today?
- What could I improve?
- What did I learn?

**Remember**: Progress over perfection.`
      },
      {
        title: "Productivity Principles",
        content: `# Productivity Principles

## Core Ideas
1. **Focus on outcomes, not activities**
2. **Energy management > Time management**
3. **Clarity reduces anxiety**

## Daily Practices
- Morning planning session
- Afternoon review
- Evening reflection

> "The key is not to prioritize what's on your schedule, but to schedule your priorities." - Stephen Covey`
      },
      {
        title: "Learning Notes",
        content: `# Learning Notes

## Active Learning Strategies
- **Feynman Technique**: Explain in simple terms
- **Spaced Repetition**: Review at intervals
- **Interleaving**: Mix different topics

## Implementation
\`\`\`
1. Learn concept
2. Teach someone else
3. Identify gaps
4. Fill gaps and repeat
\`\`\`

*Knowledge compounds when shared.*`
      }
    ];

    const randomNote = demoNotes[Math.floor(Math.random() * demoNotes.length)];
    this.displayNote(randomNote.title + '.md', randomNote.content);
  }

  async getMarkdownFiles(directoryHandle) {
    const files = [];
    
    for await (const [name, handle] of directoryHandle.entries()) {
      if (handle.kind === 'file' && name.endsWith('.md')) {
        files.push(handle);
      } else if (handle.kind === 'directory') {
        // Recursively search subdirectories
        const subFiles = await this.getMarkdownFiles(handle);
        files.push(...subFiles);
      }
    }
    
    return files;
  }

  displayNoteInline(filename, content) {
    const container = document.getElementById('highlights-container');
    if (!container) return;

    const htmlContent = this.parseMarkdown(content);
    
    // Create note element styled like a highlight
    const noteElement = document.createElement('div');
    noteElement.className = 'fb-blocker-highlight fb-blocker-note-highlight';
    noteElement.setAttribute('data-gradient', Math.floor(Math.random() * 5));
    
    noteElement.innerHTML = `
      <div class="fb-blocker-note-header-inline">
        <span class="fb-blocker-note-icon">📝</span>
        <span class="fb-blocker-note-title-inline">${filename.replace('.md', '')}</span>
        <span class="fb-blocker-note-badge">Obsidian Note</span>
      </div>
      <div class="fb-blocker-quote fb-blocker-note-content-inline">
        ${htmlContent}
      </div>
    `;

    // Insert at the top of highlights
    const firstHighlight = container.querySelector('.fb-blocker-highlight');
    if (firstHighlight) {
      container.insertBefore(noteElement, firstHighlight);
    } else {
      container.appendChild(noteElement);
    }

    // Smooth scroll to the note
    noteElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  displayNote(filename, content) {
    // Keep the modal version for backward compatibility
    this.displayNoteInline(filename, content);
  }

  parseMarkdown(markdown) {
    let html = markdown
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Code blocks (must come before bold/italic)
      .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
      // Inline code (must come before bold/italic)
      .replace(/`(.*?)`/gim, '<code>$1</code>')
      // Bold
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/__(.*?)__/gim, '<strong>$1</strong>')
      // Italic (must come after bold)
      .replace(/\*([^*]*?)\*/gim, '<em>$1</em>')
      .replace(/_([^_]*?)_/gim, '<em>$1</em>')
      // Blockquotes
      .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
      // Unordered lists
      .replace(/^[\s]*[-*+] (.*$)/gim, '<li>$1</li>')
      // Ordered lists
      .replace(/^[\s]*\d+\. (.*$)/gim, '<li>$1</li>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank">$1</a>')
      // Strikethrough
      .replace(/~~(.*?)~~/gim, '<del>$1</del>')
      // Line breaks
      .replace(/\n\n/gim, '</p><p>')
      .replace(/\n/gim, '<br>');

    // Wrap consecutive list items in ul tags
    html = html.replace(/(<li>.*?<\/li>)(\s*<br>\s*<li>.*?<\/li>)*/gim, (match) => {
      return '<ul>' + match.replace(/<br>\s*/g, '') + '</ul>';
    });
    
    // Wrap in paragraphs
    html = '<p>' + html + '</p>';
    
    // Clean up empty paragraphs and fix nested tags
    html = html.replace(/<p><\/p>/gim, '')
             .replace(/<p>(<h[1-6]>.*?<\/h[1-6]>)<\/p>/gim, '$1')
             .replace(/<p>(<ul>.*?<\/ul>)<\/p>/gim, '$1')
             .replace(/<p>(<blockquote>.*?<\/blockquote>)<\/p>/gim, '$1')
             .replace(/<p>(<pre>.*?<\/pre>)<\/p>/gim, '$1');
    
    return html;
  }

  showAddNoteForm() {
    const container = document.getElementById('highlights-container');
    if (!container) return;

    // Remove existing form if present
    const existingForm = document.getElementById('add-note-form');
    if (existingForm) {
      existingForm.remove();
      return;
    }

    const formElement = document.createElement('div');
    formElement.id = 'add-note-form';
    formElement.className = 'fb-blocker-highlight fb-blocker-add-note-form';
    formElement.setAttribute('data-gradient', Math.floor(Math.random() * 5));
    
    formElement.innerHTML = `
      <div class="fb-blocker-note-header-inline">
        <span class="fb-blocker-note-icon">➕</span>
        <span class="fb-blocker-note-title-inline">Add New Note</span>
        <button class="fb-blocker-note-close-inline" id="close-form">✕</button>
      </div>
      <div class="fb-blocker-add-note-content">
        <input type="text" id="quick-note-title" placeholder="Note title..." class="fb-blocker-quick-title">
        <textarea id="quick-note-content" placeholder="Write your note in markdown..." class="fb-blocker-quick-content"></textarea>
        <div class="fb-blocker-form-actions">
          <button id="save-quick-note" class="fb-blocker-save-btn" disabled>💾 Save Note</button>
          <button id="cancel-quick-note" class="fb-blocker-cancel-btn">Cancel</button>
        </div>
      </div>
    `;

    // Insert at the top of highlights
    const firstHighlight = container.querySelector('.fb-blocker-highlight');
    if (firstHighlight) {
      container.insertBefore(formElement, firstHighlight);
    } else {
      container.appendChild(formElement);
    }

    // Setup form functionality
    const titleInput = document.getElementById('quick-note-title');
    const contentTextarea = document.getElementById('quick-note-content');
    const saveBtn = document.getElementById('save-quick-note');
    const cancelBtn = document.getElementById('cancel-quick-note');
    const closeBtn = document.getElementById('close-form');

    const checkForm = () => {
      const hasTitle = titleInput.value.trim().length > 0;
      const hasContent = contentTextarea.value.trim().length > 0;
      saveBtn.disabled = !(hasTitle && hasContent);
    };

    titleInput.addEventListener('input', checkForm);
    contentTextarea.addEventListener('input', checkForm);

    saveBtn.addEventListener('click', () => {
      this.saveQuickNote(titleInput.value.trim(), contentTextarea.value.trim());
    });

    cancelBtn.addEventListener('click', () => {
      formElement.remove();
    });

    closeBtn.addEventListener('click', () => {
      formElement.remove();
    });

    // Focus on title input
    titleInput.focus();

    // Smooth scroll to form
    formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  saveQuickNote(title, content) {
    const note = {
      title: title,
      content: content,
      filename: title + '.md',
      uploadDate: new Date().toISOString()
    };

    chrome.storage.local.get(['obsidianNotes'], (data) => {
      const existingNotes = data.obsidianNotes || [];
      const allNotes = [...existingNotes, note];
      
      chrome.storage.local.set({ obsidianNotes: allNotes }, () => {
        // Remove form
        document.getElementById('add-note-form').remove();
        
        // Track note addition
        this.trackNoteAdded();
        
        // Show success message
        this.showNoteStatus(`✅ Note "${title}" saved successfully!`, 'success');
        
        // Optionally display the new note inline
        this.displayNoteInline(title + '.md', content);
      });
    });
  }

  showNoteStatus(message, type) {
    // Reuse the existing status message system
    this.showUploadStatus(message, type);
  }

  showExitConfirmation() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.id = 'wisdomfeed-exit-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      backdrop-filter: blur(4px);
    `;

    // Create modal content
    modal.innerHTML = `
      <div style="
        background: var(--bg-primary);
        border-radius: 16px;
        padding: 40px;
        max-width: 400px;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        color: var(--text-primary);
      ">
        <h2 style="margin: 0 0 20px 0; font-size: 1.5rem;">Go back to the brainrot?</h2>
        <p style="margin: 0 0 30px 0; color: var(--text-secondary);">
          Are you sure?
        </p>
        <div style="display: flex; gap: 12px; justify-content: center;">
          <button id="exit-yes" style="
            background: #dc3545;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.2s ease;
          ">Yes</button>
          <button id="exit-no" style="
            background: var(--text-accent);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.2s ease;
          ">No</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Setup event handlers
    document.getElementById('exit-yes').addEventListener('click', () => {
      // Store timestamp to prevent immediate reappearance after reload
      sessionStorage.setItem('wisdomfeed-disabled-until', Date.now() + 90000); // 90 seconds
      // Simple page reload to restore original state
      window.location.reload();
    });

    document.getElementById('exit-no').addEventListener('click', () => {
      modal.remove();
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });

    // Close on escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        modal.remove();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);
  }

  exitWisdomFeed() {
    // Track session end before exiting
    this.trackSessionEnd();
    
    // Remove the WisdomFeed overlay
    const overlay = document.getElementById('wisdomfeed-overlay');
    if (overlay) {
      overlay.remove();
    }

    // Remove the injected CSS
    const styleElement = document.getElementById('wisdomfeed-twitter-hide');
    if (styleElement) {
      styleElement.remove();
    }

    // For Twitter, we need to restore visibility
    if (this.platform === 'twitter') {
      const primaryColumn = document.querySelector('[data-testid="primaryColumn"]');
      if (primaryColumn) {
        const children = primaryColumn.querySelectorAll('*');
        children.forEach(child => {
          if (child.style.visibility === 'hidden') {
            child.style.visibility = 'visible';
          }
        });
      }
    }

    // For Facebook, we need to restore display and original content
    if (this.platform === 'facebook') {
      const fbSelectors = ['[role="main"]', '[data-pagelet="Feed"]'];
      for (const selector of fbSelectors) {
        const element = document.querySelector(selector);
        if (element && element.style.display === 'none') {
          element.style.display = '';
          break;
        }
      }
      // Restore original Facebook content if available
      if (this.originalFacebookContent) {
        const fbSelectors = ['[role="main"]', '[data-pagelet="Feed"]'];
        for (const selector of fbSelectors) {
          const element = document.querySelector(selector);
          if (element) {
            element.innerHTML = this.originalFacebookContent;
            this.originalFacebookContent = null;
            break;
          }
        }
      }
    }

    // Clean up drag & drop event listeners
    if (this.dragEventListeners && this.dragEventListeners.length > 0) {
      this.dragEventListeners.forEach(({ eventName, handler }) => {
        document.removeEventListener(eventName, handler);
      });
      this.dragEventListeners = [];
    }

    // Remove any remaining body classes
    document.body.classList.remove('fb-blocker-drag-active');

    // Remove modal
    const modal = document.getElementById('wisdomfeed-exit-modal');
    if (modal) {
      modal.remove();
    }

    console.log('[WisdomFeed] User returned to original feed');
  }
}

// Initialize the extension only if not already running
if (!window.feedWiseBlockerInstance) {
  new FeedWiseBlocker();
} else {
  console.log('[WisdomFeed] Extension already initialized, skipping');
}
