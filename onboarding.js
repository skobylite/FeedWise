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
        <p class="subtitle">FeedWise is ready to transform your social media experience</p>
        
        <div style="background: rgba(255, 255, 255, 0.08); padding: 24px; border-radius: 16px; margin: 32px 0;">
          <h3 style="margin-bottom: 16px;">Quick Start:</h3>
          <div style="text-align: left; font-size: 0.95rem; line-height: 1.6;">
            <p style="margin-bottom: 12px;">📁 Upload your Readwise highlights in extension settings</p>
            <p style="margin-bottom: 12px;">📝 Add Obsidian notes through the settings page</p>
            <p style="margin-bottom: 12px;">🌐 Visit Facebook, Twitter, or Instagram to see the magic</p>
            ${this.newTabEnabled ? '<p>🚀 Open a new tab to see your wisdom feed</p>' : ''}
          </div>
        </div>

        <div class="actions">
          <a href="chrome-extension://${chrome.runtime.id}/options.html" class="btn btn-primary">Upload Content</a>
        </div>
      `;

      container.style.transform = 'scale(1)';
      container.style.opacity = '1';
      container.style.transition = 'all 0.5s ease';

      // Auto-close after delay if user doesn't interact
      setTimeout(() => {
        if (document.visibilityState === 'visible') {
          window.close();
        }
      }, 8000);
    }, 300);
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
