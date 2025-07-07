class OnboardingManager {
  constructor() {
    this.newTabEnabled = true; // Default to enabled
    this.init();
  }

  init() {
    this.fixExtensionLinks();
    this.setupEventListeners();
    this.loadSettings();
  }

  fixExtensionLinks() {
    // Fix the extension ID in links
    if (chrome.runtime && chrome.runtime.getURL) {
      const optionsLink = document.getElementById('options-link');
      if (optionsLink) {
        optionsLink.href = chrome.runtime.getURL('options.html');
      }
    }
  }

  setupEventListeners() {
    // Toggle for new tab setting
    const toggle = document.getElementById('newtab-toggle');
    toggle.addEventListener('click', () => {
      this.toggleNewTab();
    });

    // Get started button
    const getStartedBtn = document.getElementById('get-started-btn');
    getStartedBtn.addEventListener('click', () => {
      this.completeOnboarding();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.completeOnboarding();
      }
      if (e.key === 'Escape') {
        this.skipOnboarding();
      }
    });
  }

  loadSettings() {
    // Load existing settings if any
    chrome.storage.local.get(['feedwiseSettings'], (data) => {
      const settings = data.feedwiseSettings || {};
      this.newTabEnabled = settings.newTabEnabled !== false; // Default to true
      this.updateToggleDisplay();
    });
  }

  toggleNewTab() {
    this.newTabEnabled = !this.newTabEnabled;
    this.updateToggleDisplay();
    this.saveNewTabSetting();
  }

  updateToggleDisplay() {
    const toggle = document.getElementById('newtab-toggle');
    if (this.newTabEnabled) {
      toggle.classList.add('active');
    } else {
      toggle.classList.remove('active');
    }
  }

  saveNewTabSetting() {
    // Save the new tab preference
    chrome.storage.local.get(['feedwiseSettings'], (data) => {
      const settings = data.feedwiseSettings || {};
      settings.newTabEnabled = this.newTabEnabled;
      
      chrome.storage.local.set({ feedwiseSettings: settings }, () => {
        // Update manifest if needed (note: this requires reload)
        this.updateManifestNewTab();
      });
    });
  }

  updateManifestNewTab() {
    // Note: In practice, manifest changes require extension reload
    // We'll handle this by showing appropriate messaging to the user
    if (this.newTabEnabled) {
      // New tab override is already in manifest
      console.log('New tab enabled - will take effect after extension reload');
    } else {
      // We can't dynamically remove the new tab override
      // But we can show a different page or redirect
      console.log('New tab disabled - user preference saved');
    }
  }

  completeOnboarding() {
    // Mark onboarding as complete
    chrome.storage.local.set({ 
      feedwiseOnboardingComplete: true,
      feedwiseSettings: {
        newTabEnabled: this.newTabEnabled,
        onboardingCompletedAt: new Date().toISOString()
      }
    }, () => {
      // Show completion message and close
      this.showCompletionMessage();
    });
  }

  skipOnboarding() {
    // Mark as complete but with minimal settings
    chrome.storage.local.set({ 
      feedwiseOnboardingComplete: true,
      feedwiseSettings: {
        newTabEnabled: false,
        onboardingSkipped: true,
        onboardingCompletedAt: new Date().toISOString()
      }
    }, () => {
      window.close();
    });
  }

  showCompletionMessage() {
    const container = document.querySelector('.onboarding-container');
    
    // Add success animation
    container.style.transform = 'scale(0.95)';
    container.style.opacity = '0.8';
    
    setTimeout(() => {
      container.innerHTML = `
        <div class="logo" style="font-size: 5rem;">📤️</div>
        <h1 class="title">Your Feed, Your Rules:</h1>
        <br>
        <p class="subtitle">FeedWise is ready to transform your social media experience</p>
        <div style="margin: 20px 0; text-align: center;">
          <p style="margin-bottom: 10px;">Don't have Readwise? <a href="https://readwise.io/propane" target="_blank" style="color: #FF6B6B; text-decoration: none; font-weight: 500;">Get it here</a></p>
          <p><a href="https://youtu.be/63V38hyckp8" target="_blank" style="color: #FF6B6B; text-decoration: none; font-weight: 500;">📺 Watch tutorial video</a></p>
        </div>
        <div class="upload-section" id="upload-section" style="margin: 32px 0; padding: 24px; background: rgba(255, 255, 255, 0.08); border-radius: 16px;">
          <h3 style="margin-bottom: 16px; color: #fff;">Upload Your Highlights</h3>
          <p style="margin-bottom: 20px; color: rgba(255, 255, 255, 0.8);">Get started by uploading your Readwise highlights CSV file.</p>
          <div class="file-input-wrapper" style="margin-bottom: 20px;">
            <input type="file" id="csvFile" accept=".csv" class="file-input" style="display: none;">
            <label for="csvFile" class="file-input-label" id="file-label" style="
              display: block;
              padding: 16px 24px;
              background: rgba(255, 255, 255, 0.1);
              border: 2px dashed rgba(255, 255, 255, 0.3);
              border-radius: 12px;
              cursor: pointer;
              text-align: center;
              color: #fff;
              font-size: 0.95rem;
              transition: all 0.3s ease;
              min-height: 60px;
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              📁 Choose CSV file or drag & drop
            </label>
          </div>
          <button id="upload" class="upload-button" disabled style="
            width: 100%;
            padding: 16px 24px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            opacity: 0.5;
          ">Upload Highlights</button>
        </div>
        <br>
        <div style="background: rgba(255, 255, 255, 0.08); padding: 24px; border-radius: 16px; margin: 32px 0;">
          <h3 style="margin-bottom: 16px;">Quick Start:</h3>
          <div style="text-align: left; font-size: 0.95rem; line-height: 1.6;">
            <p style="margin-bottom: 12px;">📁 Upload your Readwise highlights in extension settings</p>
            <p style="margin-bottom: 12px;">📝 Add Obsidian notes through the settings page</p>
            <p style="margin-bottom: 12px;">🌐 Visit Facebook, Twitter, or Instagram to see the magic</p>
            ${this.newTabEnabled ? '<p>🚀 Open a new tab to see your wisdom feed</p>' : ''}
          </div>
        </div>

      `;

      container.style.transform = 'scale(1)';
      container.style.opacity = '1';
      container.style.transition = 'all 0.5s ease';

      // Setup CSV upload functionality
      this.setupCSVUpload();

      // Auto-close removed - let users take their time
    }, 300);
  }

  setupCSVUpload() {
    const csvFile = document.getElementById('csvFile');
    const fileLabel = document.getElementById('file-label');
    const uploadButton = document.getElementById('upload');

    if (!csvFile || !fileLabel || !uploadButton) return;

    const handleFile = (file) => {
      if (file && file.type === 'text/csv') {
        fileLabel.textContent = `📁 ${file.name}`;
        fileLabel.style.background = 'rgba(255, 255, 255, 0.15)';
        fileLabel.style.borderColor = 'rgba(255, 255, 255, 0.5)';
        uploadButton.disabled = false;
        uploadButton.style.opacity = '1';
        uploadButton.style.cursor = 'pointer';
        csvFile.files = createFileList(file);
      }
    };

    const createFileList = (file) => {
      const dt = new DataTransfer();
      dt.items.add(file);
      return dt.files;
    };

    // File input change event
    csvFile.addEventListener('change', (e) => {
      const file = e.target.files[0];
      handleFile(file);
    });

    // Drag and drop events on the label
    fileLabel.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.stopPropagation();
      fileLabel.style.background = 'rgba(255, 255, 255, 0.2)';
      fileLabel.style.borderColor = 'rgba(255, 255, 255, 0.6)';
    });

    fileLabel.addEventListener('dragleave', (e) => {
      e.preventDefault();
      e.stopPropagation();
      fileLabel.style.background = 'rgba(255, 255, 255, 0.1)';
      fileLabel.style.borderColor = 'rgba(255, 255, 255, 0.3)';
    });

    fileLabel.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      fileLabel.style.background = 'rgba(255, 255, 255, 0.1)';
      fileLabel.style.borderColor = 'rgba(255, 255, 255, 0.3)';
      
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFile(files[0]);
      }
    });

    // Global drag and drop events
    document.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.stopPropagation();
    });

    document.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFile(files[0]);
      }
    });

    uploadButton.addEventListener('click', () => {
      const file = csvFile.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const csvData = e.target.result;
        
        // Store the CSV data
        chrome.storage.local.set({ 
          readwiseData: csvData,
          readwiseImportedAt: new Date().toISOString()
        }, () => {
          // Show success message
          uploadButton.textContent = '✅ Uploaded Successfully!';
          uploadButton.disabled = true;
          
          // Auto-close after successful upload
          setTimeout(() => {
            window.close();
          }, 2000);
        });
      };
      
      reader.readAsText(file);
    });
  }

  // Analytics/tracking for improvement (privacy-friendly)
  trackOnboardingStep(step) {
    chrome.storage.local.get(['feedwiseAnalytics'], (data) => {
      const analytics = data.feedwiseAnalytics || {};
      analytics.onboardingSteps = analytics.onboardingSteps || [];
      analytics.onboardingSteps.push({
        step: step,
        timestamp: new Date().toISOString()
      });
      
      chrome.storage.local.set({ feedwiseAnalytics: analytics });
    });
  }
}

// Initialize onboarding when page loads
document.addEventListener('DOMContentLoaded', () => {
  new OnboardingManager();
});
