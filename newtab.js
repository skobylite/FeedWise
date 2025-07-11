class NewTabWisdom {
  constructor() {
    this.allContent = [];
    this.wisdomBatchSize = 3; // Load 3 wisdoms at a time
    this.isLoading = false;
    this.initialLoadComplete = false; // Prevent infinite scroll before initial load
    this.sessionStartTime = Date.now();
    this.init();
  }

  async init() {
    const userSettings = await this.getUserSettings();
    if (userSettings.newTabEnabled === false) {
      this.showOptInMessage();
      return;
    }

    // Track new tab session
    this.trackNewTabSession();

    this.detectAndApplyTheme();
    this.setupEventListeners();
    await this.loadContent();
    console.log('[NewTab] Content loaded, now loading initial wisdoms with', this.allContent.length, 'items available');
    console.log('[NewTab] About to call loadInitialWisdoms()');
    this.loadInitialWisdoms();
    this.initBrainCellsCounter();
  }

  detectAndApplyTheme() {
    // First check user's stored theme preference
    chrome.storage.local.get(['feedwiseTheme'], (data) => {
      let prefersDark;
      
      if (data.feedwiseTheme) {
        // Use user's explicit theme preference
        prefersDark = data.feedwiseTheme === 'dark';
        console.log('[WisdomFeed NewTab] User theme preference:', data.feedwiseTheme);
      } else {
        // Fall back to system preference if no user preference
        prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        console.log('[WisdomFeed NewTab] System prefers dark mode:', prefersDark);
      }
      
      // Use darker schemes for dark mode preference
      const defaultScheme = prefersDark ? '3' : '1'; // Scheme 3 is darker blue, scheme 1 is lighter
      this.changeColorScheme(defaultScheme);
      
      // Update active state
      document.querySelectorAll('.color-scheme').forEach(s => s.classList.remove('active'));
      const activeScheme = document.querySelector(`.color-scheme[data-scheme="${defaultScheme}"]`);
      if (activeScheme) {
        activeScheme.classList.add('active');
      }
    });
  }

  getUserSettings() {
    return new Promise((resolve) => {
      chrome.storage.local.get(['feedwiseSettings'], (data) => {
        resolve(data.feedwiseSettings || { newTabEnabled: true });
      });
    });
  }

  showOptInMessage() {
    document.body.innerHTML = `
      <div class="container">
        <div class="header">
          <h1>🦉 FeedWise</h1>
          <p>Your new tab experience is currently disabled</p>
        </div>
        <div class="wisdom-container">
          <div class="wisdom-card">
            <div class="wisdom-content">
              <h2 style="margin-bottom: 24px;">Enable FeedWise New Tab?</h2>
              <p style="margin-bottom: 32px; opacity: 0.8;">
                Transform every new tab into a moment of wisdom with your highlights and notes.
              </p>
              <div style="display: flex; gap: 16px; justify-content: center;">
                <button class="btn" id="enable-newtab">✨ Enable FeedWise</button>
                <button class="btn" id="keep-disabled">Keep Disabled</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('enable-newtab').addEventListener('click', () => this.enableNewTab());
    document.getElementById('keep-disabled').addEventListener('click', () => {
      window.location.href = 'chrome://newtab/';
    });
  }

  enableNewTab() {
    chrome.storage.local.set({
      feedwiseSettings: { newTabEnabled: true }
    }, () => window.location.reload());
  }

  setupEventListeners() {
    document.getElementById('add-note-btn').addEventListener('click', () => this.showAddNoteModal());
    
    // Color scheme switcher
    const colorSchemes = document.querySelectorAll('.color-scheme');
    colorSchemes.forEach(scheme => {
      scheme.addEventListener('click', (e) => {
        this.changeColorScheme(e.currentTarget.dataset.scheme);
        colorSchemes.forEach(s => s.classList.remove('active'));
        e.currentTarget.classList.add('active');
      });
    });

    // Infinite scroll
    this.setupInfiniteScroll();
    
    // Fix settings link
    chrome.runtime.getManifest && chrome.runtime.getURL && this.fixSettingsLink();
  }

  fixSettingsLink() {
    const settingsLink = document.querySelector('a[href*="EXTENSION_ID"]');
    if (settingsLink) {
      settingsLink.href = chrome.runtime.getURL('options.html');
    }
  }

  changeColorScheme(schemeNumber) {
    const body = document.body;
    const schemes = {
      1: { start: '#2d3561', end: '#3a2c4e' },
      2: { start: '#6b2c5f', end: '#7a2b36' },
      3: { start: '#1e4a6b', end: '#003d4a' },
      4: { start: '#1e4a2d', end: '#1c4a3a' }
    };
    
    const scheme = schemes[schemeNumber];
    if (scheme) {
      body.style.background = `linear-gradient(135deg, ${scheme.start} 0%, ${scheme.end} 100%)`;
    }
  }

  setupInfiniteScroll() {
    const sentinel = document.getElementById('scroll-sentinel');
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !this.isLoading && this.initialLoadComplete) {
        console.log('[NewTab] Infinite scroll triggered - loading more wisdom');
        this.loadMoreWisdom();
      }
    }, { threshold: 1.0 });

    observer.observe(sentinel);
  }

  async loadContent() {
    return new Promise((resolve) => {
      chrome.storage.local.get(['highlights', 'obsidianNotes'], (data) => {
        const highlights = data.highlights || [];
        const notes = data.obsidianNotes || [];
        console.log('[NewTab] Loaded highlights:', highlights.length, 'notes:', notes.length);
        const uploadSection = document.getElementById('upload-section');
        const wisdomFeed = document.getElementById('wisdom-feed');

        const highlightContent = highlights.map(h => ({
          content: h.quote,
          attribution: `${h.author || 'Unknown'} - ${h.source || 'Unknown Source'}`,
          type: 'highlight'
        }));

        const noteContent = notes.map(n => ({
          content: n.content,
          attribution: `${n.title.replace('.md', '')} - Obsidian Note`,
          type: 'note'
        }));

        if (highlights.length === 0 && notes.length === 0) {
          // Show upload section and set up its functionality
          uploadSection.style.display = 'block';
          this.setupFileUpload();
          
          // Also load default quotes to display below the upload section
          this.allContent = defaultQuotes.map(q => ({
              content: q.quote, 
              attribution: `${q.author} - ${q.source}`,
              type: 'default'
          }));
        } else {
          // Hide upload section if user has content
          uploadSection.style.display = 'none';
          
          // Load user content
          this.allContent = [...highlightContent, ...noteContent];
        }
        
        // Ensure the wisdom feed is visible to show either default quotes or user content
        wisdomFeed.style.display = 'flex';

        // Shuffle the content for variety
        this.allContent = this.allContent.sort(() => Math.random() - 0.5);
        console.log('[NewTab] Total content after shuffle:', this.allContent.length);
        resolve();
      });
    });
  }

  loadInitialWisdoms() {
    console.log('[NewTab] loadInitialWisdoms called with wisdomBatchSize:', this.wisdomBatchSize);
    this.loadWisdoms(this.wisdomBatchSize);
    // Mark initial load as complete after the setTimeout in loadWisdoms
    setTimeout(() => {
      this.initialLoadComplete = true;
      console.log('[NewTab] Initial load complete - infinite scroll now enabled');
    }, 600); // Slightly longer than the 500ms delay in loadWisdoms
  }

  loadMoreWisdom() {
    this.loadWisdoms(1);
  }

  loadWisdoms(count) {
    if (this.isLoading) return;
    this.isLoading = true;
    
    console.log('[NewTab] Loading', count, 'wisdoms. Available content:', this.allContent.length);
    
    const loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.style.display = 'block';

    // Simulate network delay for smoother UX
    setTimeout(() => {
      const feed = document.getElementById('wisdom-feed');
      for (let i = 0; i < count; i++) {
        if (this.allContent.length > 0) {
          const wisdom = this.allContent.shift(); // Get one from the shuffled list
          console.log('[NewTab] Displaying wisdom', i+1, ':', wisdom.content.substring(0, 50) + '...');
          this.displayWisdom(wisdom, feed);
        }
      }

      this.isLoading = false;
      loadingIndicator.style.display = 'none';

      if (this.allContent.length === 0) {
        this.showAllContentLoaded();
      }
    }, 500);
  }

  displayWisdom(wisdom, feed) {
    const card = document.createElement('div');
    card.className = 'wisdom-card';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'wisdom-content';
    if (wisdom.type === 'note') {
      contentDiv.innerHTML = this.parseMarkdown(wisdom.content);
    } else {
      contentDiv.textContent = wisdom.content;
    }

    const attributionDiv = document.createElement('div');
    attributionDiv.className = 'wisdom-attribution';
    attributionDiv.textContent = wisdom.attribution;

    card.appendChild(contentDiv);
    card.appendChild(attributionDiv);
    feed.appendChild(card);
    
    // Track wisdom viewed
    this.trackWisdomViewed();
  }
  
  showAllContentLoaded() {
    const sentinel = document.getElementById('scroll-sentinel');
    sentinel.innerHTML = '<p style="text-align: center; opacity: 0.8;">You\'ve reached the end of your wisdom for now.</p>';
    sentinel.style.height = 'auto';
  }

  parseMarkdown(markdown) {
    let html = markdown
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
      .replace(/`(.*?)`/gim, '<code>$1</code>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/__(.*?)__/gim, '<strong>$1</strong>')
      .replace(/\*([^*]*?)\*/gim, '<em>$1</em>')
      .replace(/_([^_]*?)_/gim, '<em>$1</em>')
      .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
      .replace(/^[\s]*[-*+] (.*$)/gim, '<li>$1</li>')
      .replace(/^[\s]*\d+\. (.*$)/gim, '<li>$1</li>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank">$1</a>')
      .replace(/~~(.*?)~~/gim, '<del>$1</del>')
      .replace(/\n\n/gim, '</p><p>')
      .replace(/\n/gim, '<br>');

    html = html.replace(/(<li>.*?<\/li>)([\s]*<br>[\s]*<li>.*?<\/li>)*/gim, (match) => {
      return '<ul>' + match.replace(/<br>[\s]*/g, '') + '</ul>';
    });
    
    if (!html.includes('<h1>') && !html.includes('<h2>') && !html.includes('<h3>') && 
        !html.includes('<ul>') && !html.includes('<blockquote>')) {
      html = '<p>' + html + '</p>';
    }
    
    html = html.replace(/<p><\/p>/gim, '')
             .replace(/<p>(<h[1-6]>.*?<\/h[1-6]>)<\/p>/gim, '$1')
             .replace(/<p>(<ul>.*?<\/ul>)<\/p>/gim, '$1')
             .replace(/<p>(<blockquote>.*?<\/blockquote>)<\/p>/gim, '$1')
             .replace(/<p>(<pre>.*?<\/pre>)<\/p>/gim, '$1');
    
    return html;
  }

  showAddNoteModal() {
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.8); display: flex; align-items: center;
      justify-content: center; z-index: 1000;
    `;

    modal.innerHTML = `
      <div style="background: white; border-radius: 12px; padding: 32px; max-width: 500px; width: 90%; color: #333;">
        <h2 style="margin-bottom: 16px; color: #333;">Add New Note</h2>
        <input type="text" id="note-title" placeholder="Note title" style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px; margin-bottom: 16px; font-size: 16px;">
        <textarea id="note-content" placeholder="Write your note here... (Markdown supported)" style="width: 100%; height: 200px; padding: 12px; border: 2px solid #ddd; border-radius: 8px; margin-bottom: 16px; font-size: 14px; font-family: inherit; resize: vertical;"></textarea>
        <div style="display: flex; gap: 12px; justify-content: flex-end;">
          <button id="cancel-note" style="padding: 8px 16px; border: 2px solid #ddd; background: white; border-radius: 6px; cursor: pointer;">Cancel</button>
          <button id="save-note" style="padding: 8px 16px; border: none; background: #667eea; color: white; border-radius: 6px; cursor: pointer;">Save Note</button>
        </div>
      </div>
    `;

    document.getElementById('cancel-note').addEventListener('click', () => document.body.removeChild(modal));
    document.getElementById('save-note').addEventListener('click', () => this.saveNote(modal));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) document.body.removeChild(modal);
    });
    document.getElementById('note-title').focus();
  }

  saveNote(modal) {
    const title = document.getElementById('note-title').value.trim();
    const content = document.getElementById('note-content').value.trim();

    if (!title || !content) {
      alert('Please fill in both title and content');
      return;
    }

    chrome.storage.local.get(['obsidianNotes'], (data) => {
      const notes = data.obsidianNotes || [];
      const newNote = {
        title: title.endsWith('.md') ? title : title + '.md',
        content: content,
        created: new Date().toISOString()
      };
      notes.push(newNote);
      chrome.storage.local.set({ obsidianNotes: notes }, () => {
        document.body.removeChild(modal);
        
        // Track note addition
        this.trackNoteAdded();
        
        // Add the new note to the top of the feed
        const feed = document.getElementById('wisdom-feed');
        this.displayWisdom(newNote, feed);
        // Prepend to allContent as well so it's not fetched again on scroll
        this.allContent.unshift(newNote);
      });
    });
  }

  setupFileUpload() {
    const fileInput = document.getElementById('csvFile');
    const uploadButton = document.getElementById('upload');
    const fileLabel = document.getElementById('file-label');

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        fileLabel.textContent = `📁 ${file.name}`;
        uploadButton.disabled = false;
      } else {
        fileLabel.textContent = '📁 Choose CSV file or drag & drop';
        uploadButton.disabled = true;
      }
    });

    uploadButton.addEventListener('click', () => {
      const file = fileInput.files[0];
      if (file) {
        this.processFile(file);
      }
    });

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      fileLabel.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      fileLabel.addEventListener(eventName, () => {
        fileLabel.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      fileLabel.addEventListener(eventName, () => {
        fileLabel.classList.remove('dragover');
      });
    });

    fileLabel.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        if (file.name.endsWith('.csv')) {
          fileInput.files = files;
          fileLabel.textContent = `📁 ${file.name}`;
          document.getElementById('upload').disabled = false;
        } else {
          alert('Please select a CSV file.');
        }
      }
    });
  }

  processFile(file) {
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
          alert(
            `Successfully uploaded ${validHighlights.length} valid highlights (${highlights.length} total). The page will now reload.`
          );
          window.location.reload();
        });
      } catch (error) {
        alert('Error processing file. Please check the CSV format.');
      }
    };
    reader.readAsText(file);
  }

  // Brain Cells Counter System
  initBrainCellsCounter() {
    this.loadAndDisplayBrainCells();
    
    // Update counter every 30 seconds while viewing
    setInterval(() => {
      this.updateBrainCellsFromViewing();
    }, 30000);
  }

  getEmojiForLevel(brainCells) {
    const levels = [
      { threshold: 0, emoji: '🧠' },      // Level 1: Basic brain
      { threshold: 100, emoji: '🤔' },    // Level 2: Thinking
      { threshold: 500, emoji: '💡' },    // Level 3: Light bulb moment
      { threshold: 1000, emoji: '🎓' },   // Level 4: Graduation cap
      { threshold: 2500, emoji: '🧙‍♂️' },  // Level 5: Wizard
      { threshold: 5000, emoji: '🔮' },   // Level 6: Crystal ball
      { threshold: 10000, emoji: '🚀' },  // Level 7: Rocket
      { threshold: 20000, emoji: '🌟' },  // Level 8: Star
      { threshold: 50000, emoji: '👑' },  // Level 9: Crown
      { threshold: 100000, emoji: '🧠‍🔥' } // Level 10: Burning brain
    ];

    for (let i = levels.length - 1; i >= 0; i--) {
      if (brainCells >= levels[i].threshold) {
        return levels[i].emoji;
      }
    }
    return '🧠';
  }

  async loadAndDisplayBrainCells() {
    return new Promise((resolve) => {
      chrome.storage.local.get(['feedwiseAnalytics'], (data) => {
        const analytics = data.feedwiseAnalytics || {};
        const brainCells = this.calculateBrainCells(analytics);
        
        const counter = document.getElementById('brain-cells-counter');
        const countEl = document.getElementById('brain-cells-count');
        const emojiEl = document.getElementById('brain-cells-emoji');
        
        if (counter && countEl && emojiEl) {
          countEl.textContent = brainCells.toLocaleString();
          emojiEl.textContent = this.getEmojiForLevel(brainCells);
          counter.style.display = 'block';
          
          // Animate the counter appearance
          counter.style.opacity = '0';
          counter.style.transform = 'scale(0.8)';
          setTimeout(() => {
            counter.style.transition = 'all 0.5s ease';
            counter.style.opacity = '1';
            counter.style.transform = 'scale(1)';
          }, 500);
        }
        
        resolve(brainCells);
      });
    });
  }

  calculateBrainCells(analytics) {
    const sessions = analytics.totalSessions || 0;
    const minutes = Math.floor((analytics.totalTimeSpent || 0) / 60000);
    const highlights = analytics.totalHighlights || 0;
    const notes = analytics.totalNotes || 0;
    
    return (sessions * 10) + (minutes * 2) + (highlights * 5) + (notes * 25);
  }

  updateBrainCellsFromViewing() {
    // Update analytics for viewing time
    chrome.storage.local.get(['feedwiseAnalytics'], (data) => {
      const analytics = data.feedwiseAnalytics || {};
      const today = new Date().toISOString().split('T')[0];
      
      if (!analytics.daily) analytics.daily = {};
      if (!analytics.daily[today]) analytics.daily[today] = {};
      
      // Add 30 seconds of viewing time
      analytics.daily[today].timeSpent = (analytics.daily[today].timeSpent || 0) + 30000;
      analytics.totalTimeSpent = (analytics.totalTimeSpent || 0) + 30000;
      
      chrome.storage.local.set({ feedwiseAnalytics: analytics }, () => {
        this.loadAndDisplayBrainCells();
      });
    });
  }

  parseCSV(csvText) {
    const lines = csvText.split('\n').filter(line => line.trim() !== '');
    const highlights = [];
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (line.trim() === '') continue;
      
      const parts = this.parseCSVLine(line);
      if (parts.length >= 3) {
        highlights.push({
          quote: parts[0]?.trim() || '',
          source: parts[1]?.trim() || 'Unknown Source',
          author: parts[2]?.trim() || 'Unknown'
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

  isValidHighlight(highlight) {
    if (!highlight || !highlight.quote) return false;
    
    const quote = highlight.quote.trim();
    if (quote.length < 5) return false;
    if (quote.match(/^[^a-zA-Z]*$/)) return false;
    
    return true;
  }

  // Analytics tracking methods
  trackNewTabSession() {
    chrome.storage.local.get(['feedwiseAnalytics'], (data) => {
      const analytics = data.feedwiseAnalytics || this.getDefaultAnalytics();
      const today = new Date().toDateString();
      
      // Track daily new tab sessions
      if (!analytics.dailyStats[today]) {
        analytics.dailyStats[today] = {
          sessions: 0,
          timeSpent: 0,
          highlightsViewed: 0,
          notesAdded: 0,
          platformsBlocked: [],
          newTabSessions: 0
        };
      }
      
      analytics.dailyStats[today].newTabSessions = (analytics.dailyStats[today].newTabSessions || 0) + 1;
      analytics.totalNewTabSessions = (analytics.totalNewTabSessions || 0) + 1;
      analytics.lastActiveDate = new Date().toISOString();
      
      chrome.storage.local.set({ feedwiseAnalytics: analytics });
      console.log('[WisdomFeed NewTab] Tracked new tab session');
    });
  }

  trackWisdomViewed() {
    chrome.storage.local.get(['feedwiseAnalytics'], (data) => {
      const analytics = data.feedwiseAnalytics || this.getDefaultAnalytics();
      const today = new Date().toDateString();
      
      if (!analytics.dailyStats[today]) {
        analytics.dailyStats[today] = {
          sessions: 0,
          timeSpent: 0,
          highlightsViewed: 0,
          notesAdded: 0,
          platformsBlocked: [],
          newTabSessions: 0
        };
      }
      
      analytics.dailyStats[today].highlightsViewed++;
      analytics.totalHighlightsViewed++;
      
      chrome.storage.local.set({ feedwiseAnalytics: analytics });
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
          platformsBlocked: [],
          newTabSessions: 0
        };
      }
      
      analytics.dailyStats[today].notesAdded++;
      analytics.totalNotesAdded++;
      
      chrome.storage.local.set({ feedwiseAnalytics: analytics });
    });
  }

  getDefaultAnalytics() {
    return {
      totalSessions: 0,
      totalTimeSpent: 0,
      totalHighlightsViewed: 0,
      totalNotesAdded: 0,
      totalNewTabSessions: 0,
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
}

document.addEventListener('DOMContentLoaded', () => {
  new NewTabWisdom();
});
