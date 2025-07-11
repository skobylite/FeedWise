class OptionsManager {
  constructor() {
    this.currentTheme = 'light'; // Default
    this.init();
  }

  init() {
    this.loadTheme();
    this.setupSettings();
    this.setupFileUpload();
    this.setupDragAndDrop();
    this.setupObsidianSection();
    this.setupReadwiseSection();
    this.loadCurrentStats();
    this.loadAnalytics();
    this.initBrainCellsCounter();
  }

  loadTheme() {
    // Load theme from chrome.storage
    chrome.storage.local.get(['feedwiseTheme'], (data) => {
      this.currentTheme = data.feedwiseTheme || 'light';
      this.setupTheme();
    });
  }

  setupTheme() {
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.textContent = this.currentTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
    
    themeToggle.addEventListener('click', () => {
      this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', this.currentTheme);
      
      // Save to chrome.storage instead of localStorage
      chrome.storage.local.set({ feedwiseTheme: this.currentTheme }, () => {
        console.log('[FeedWise] Theme saved:', this.currentTheme);
      });
      
      themeToggle.textContent = this.currentTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
    });
  }

  setupSettings() {
    // Setup new tab toggle
    const newtabToggle = document.getElementById('newtab-toggle');
    
    // Load current settings
    chrome.storage.local.get(['feedwiseSettings'], (data) => {
      const settings = data.feedwiseSettings || { 
        newTabEnabled: true,
        platforms: {
          facebook: true,
          twitter: true,
          instagram: true
        }
      };
      
      // Set new tab toggle
      if (settings.newTabEnabled) {
        newtabToggle.classList.add('active');
      }
      
      // Set platform toggles
      const platforms = ['facebook', 'twitter', 'instagram'];
      platforms.forEach(platform => {
        const toggle = document.getElementById(`${platform}-toggle`);
        if (toggle && settings.platforms && settings.platforms[platform] !== false) {
          toggle.classList.add('active');
        }
      });
    });

    // Handle new tab toggle
    newtabToggle.addEventListener('click', () => {
      newtabToggle.classList.toggle('active');
      const enabled = newtabToggle.classList.contains('active');
      
      this.updateSetting('newTabEnabled', enabled);
    });

    // Handle platform toggles
    const platforms = ['facebook', 'twitter', 'instagram'];
    platforms.forEach(platform => {
      const toggle = document.getElementById(`${platform}-toggle`);
      if (toggle) {
        toggle.addEventListener('click', () => {
          toggle.classList.toggle('active');
          const enabled = toggle.classList.contains('active');
          
          chrome.storage.local.get(['feedwiseSettings'], (data) => {
            const settings = data.feedwiseSettings || {};
            settings.platforms = settings.platforms || {};
            settings.platforms[platform] = enabled;
            chrome.storage.local.set({ feedwiseSettings: settings });
          });
        });
      }
    });

    // Setup onboarding button
    const onboardingBtn = document.getElementById('show-onboarding');
    onboardingBtn.addEventListener('click', () => {
      chrome.tabs.create({
        url: chrome.runtime.getURL('onboarding.html')
      });
    });
  }

  updateSetting(key, value) {
    chrome.storage.local.get(['feedwiseSettings'], (data) => {
      const settings = data.feedwiseSettings || {};
      settings[key] = value;
      chrome.storage.local.set({ feedwiseSettings: settings });
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
  }

  setupDragAndDrop() {
    const fileLabel = document.getElementById('file-label');
    const fileInput = document.getElementById('csvFile');

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
          this.showMessage('Please select a CSV file.', 'error');
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
          this.showMessage(
            `✅ Successfully uploaded ${validHighlights.length} valid highlights (${highlights.length} total)`,
            'success'
          );
          this.loadCurrentStats();
        });
      } catch (error) {
        this.showMessage('❌ Error processing file. Please check the CSV format.', 'error');
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
      
      // Parse CSV line - new format: Highlight,Book Title,Book Author,...
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

  isValidHighlight(highlight) {
    if (!highlight || !highlight.quote) return false;
    
    // Much more lenient validation since we now group related highlights
    const quote = highlight.quote.trim();
    
    // Must have some content
    if (quote.length < 5) return false;
    
    // Filter out obvious junk (just punctuation, numbers, etc.)
    if (quote.match(/^[^a-zA-Z]*$/)) return false;
    
    return true;
  }

  showMessage(text, type) {
    const messageEl = document.getElementById('status-message');
    messageEl.textContent = text;
    messageEl.className = `status-message ${type} show`;
    
    setTimeout(() => {
      messageEl.classList.remove('show');
    }, 5000);
  }

  setupObsidianSection() {
    const fileInput = document.getElementById('obsidian-files');
    const uploadButton = document.getElementById('upload-notes');
    const fileLabel = document.getElementById('obsidian-file-label');
    const notesList = document.getElementById('obsidian-notes-list');
    
    // Paste section elements
    const titleInput = document.getElementById('note-title');
    const contentTextarea = document.getElementById('note-content');
    const addButton = document.getElementById('add-note');

    // Load existing notes
    this.loadObsidianNotes();

    // File upload handlers
    fileInput.addEventListener('change', (e) => {
      const files = e.target.files;
      if (files.length > 0) {
        fileLabel.textContent = `📝 ${files.length} file(s) selected`;
        uploadButton.disabled = false;
      } else {
        fileLabel.textContent = '📝 Choose Obsidian Notes (.md files)';
        uploadButton.disabled = true;
      }
    });

    uploadButton.addEventListener('click', () => {
      this.processObsidianFiles(fileInput.files);
    });

    // Paste section handlers
    const checkPasteForm = () => {
      const hasTitle = titleInput.value.trim().length > 0;
      const hasContent = contentTextarea.value.trim().length > 0;
      addButton.disabled = !(hasTitle && hasContent);
    };

    titleInput.addEventListener('input', checkPasteForm);
    contentTextarea.addEventListener('input', checkPasteForm);

    addButton.addEventListener('click', () => {
      this.addPastedNote(titleInput.value.trim(), contentTextarea.value.trim());
    });
  }

  loadCurrentStats() {
    chrome.storage.local.get(['highlights', 'uploadDate', 'totalCount', 'validCount'], (data) => {
      const statsSection = document.getElementById('stats-section');
      
      if (data.highlights && data.highlights.length > 0) {
        statsSection.style.display = 'block';
        
        document.getElementById('total-count').textContent = data.totalCount || data.highlights.length;
        document.getElementById('valid-count').textContent = data.validCount || data.highlights.length;
        
        const uploadDate = data.uploadDate ? new Date(data.uploadDate).toLocaleDateString() : 'Unknown';
        document.getElementById('last-updated').textContent = uploadDate;
      } else {
        statsSection.style.display = 'none';
      }
    });
  }

  async processObsidianFiles(files) {
    if (files.length === 0) return;

    const notes = [];
    let processedCount = 0;

    this.showObsidianStatus('📤 Processing notes...', 'loading');

    for (const file of files) {
      if (file.name.endsWith('.md')) {
        try {
          const content = await file.text();
          notes.push({
            title: file.name.replace('.md', ''),
            content: content,
            filename: file.name,
            uploadDate: new Date().toISOString()
          });
          processedCount++;
        } catch (error) {
          console.error('Error reading file:', file.name, error);
        }
      }
    }

    if (notes.length > 0) {
      // Get existing notes and merge
      chrome.storage.local.get(['obsidianNotes'], (data) => {
        const existingNotes = data.obsidianNotes || [];
        const allNotes = [...existingNotes, ...notes];
        
        chrome.storage.local.set({ obsidianNotes: allNotes }, () => {
          this.showObsidianStatus(`✅ Successfully uploaded ${notes.length} notes!`, 'success');
          this.loadObsidianNotes();
          
          // Reset form
          document.getElementById('obsidian-files').value = '';
          document.getElementById('obsidian-file-label').textContent = '📝 Choose Obsidian Notes (.md files)';
          document.getElementById('upload-notes').disabled = true;
        });
      });
    } else {
      this.showObsidianStatus('❌ No valid markdown files found.', 'error');
    }
  }

  loadObsidianNotes() {
    chrome.storage.local.get(['obsidianNotes'], (data) => {
      const notesList = document.getElementById('obsidian-notes-list');
      const notes = data.obsidianNotes || [];

      if (notes.length === 0) {
        notesList.classList.remove('show');
        return;
      }

      notesList.classList.add('show');
      notesList.innerHTML = notes.map((note, index) => `
        <div class="obsidian-note-item">
          <span class="obsidian-note-name">${note.title}</span>
          <button class="obsidian-note-remove" onclick="window.optionsManager.removeNote(${index})">Remove</button>
        </div>
      `).join('');
    });
  }

  removeNote(index) {
    chrome.storage.local.get(['obsidianNotes'], (data) => {
      const notes = data.obsidianNotes || [];
      notes.splice(index, 1);
      
      chrome.storage.local.set({ obsidianNotes: notes }, () => {
        this.loadObsidianNotes();
        this.showObsidianStatus('✅ Note removed successfully!', 'success');
      });
    });
  }

  addPastedNote(title, content) {
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
        this.showObsidianStatus(`✅ Note "${title}" added successfully!`, 'success');
        this.loadObsidianNotes();
        
        // Clear form
        document.getElementById('note-title').value = '';
        document.getElementById('note-content').value = '';
        document.getElementById('add-note').disabled = true;
      });
    });
  }

  showObsidianStatus(message, type) {
    const statusEl = document.getElementById('obsidian-status');
    statusEl.textContent = message;
    statusEl.className = `obsidian-status ${type}`;
    statusEl.style.display = 'block';
    
    if (type === 'success' || type === 'error') {
      setTimeout(() => {
        statusEl.style.display = 'none';
      }, 3000);
    }
  }

  loadAnalytics() {
    chrome.storage.local.get(['feedwiseAnalytics'], (data) => {
      const analytics = data.feedwiseAnalytics || this.getDefaultAnalytics();
      
      // Use the same calculation as the header counter
      const totalBrainCells = this.calculateBrainCells(analytics);
      
      // Update the display
      document.getElementById('total-brain-cells').textContent = totalBrainCells.toLocaleString();
      document.getElementById('total-sessions').textContent = analytics.totalSessions.toLocaleString();
      document.getElementById('total-highlights-viewed').textContent = analytics.totalHighlightsViewed.toLocaleString();
      
      // Convert time to minutes
      const minutesSpent = Math.floor(analytics.totalTimeSpent / (1000 * 60));
      document.getElementById('total-time-spent').textContent = `${minutesSpent}m`;
      
      // Platform breakdown
      const platformStats = analytics.platformStats || {};
      document.getElementById('facebook-sessions').textContent = `${platformStats.facebook || 0} sessions`;
      document.getElementById('twitter-sessions').textContent = `${platformStats.twitter || 0} sessions`;
      document.getElementById('instagram-sessions').textContent = `${platformStats.instagram || 0} sessions`;
      
      // Load badges
      this.loadBadges(totalBrainCells);
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

  // Brain Cells Counter System
  initBrainCellsCounter() {
    this.loadAndDisplayBrainCells();
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
          }, 300);
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

  loadBadges(currentBrainCells) {
    const levels = [
      { threshold: 0, emoji: '🧠', name: 'First Steps', description: 'Started your wisdom journey' },
      { threshold: 100, emoji: '🤔', name: 'Deep Thinker', description: 'Pondering the big questions' },
      { threshold: 500, emoji: '💡', name: 'Enlightened', description: 'Having those lightbulb moments' },
      { threshold: 1000, emoji: '🎓', name: 'Scholar', description: 'Graduated to wisdom seeker' },
      { threshold: 2500, emoji: '🧙‍♂️', name: 'Wisdom Wizard', description: 'Mastering the art of knowledge' },
      { threshold: 5000, emoji: '🔮', name: 'Oracle', description: 'Seeing beyond the ordinary' },
      { threshold: 10000, emoji: '🚀', name: 'Knowledge Rocket', description: 'Blasting off to new heights' },
      { threshold: 20000, emoji: '🌟', name: 'Wisdom Star', description: 'Shining bright with insight' },
      { threshold: 50000, emoji: '👑', name: 'Wisdom Royalty', description: 'Ruling the realm of knowledge' },
      { threshold: 100000, emoji: '🧠‍🔥', name: 'Brain on Fire', description: 'Ultimate wisdom achieved' }
    ];

    const badgesContainer = document.getElementById('badges-container');
    if (!badgesContainer) return;

    badgesContainer.innerHTML = '';

    levels.forEach(level => {
      const earned = currentBrainCells >= level.threshold;
      
      const badge = document.createElement('div');
      badge.className = `badge ${earned ? 'earned' : ''}`;
      
      badge.innerHTML = `
        <span class="badge-emoji">${level.emoji}</span>
        <span class="badge-text">${level.name}</span>
        <span class="badge-threshold">(${level.threshold.toLocaleString()})</span>
      `;
      
      badge.title = level.description;
      badgesContainer.appendChild(badge);
    });
  }

  // Readwise API Integration
  setupReadwiseSection() {
    const apiKeyInput = document.getElementById('readwise-api-key');
    const saveKeyButton = document.getElementById('save-readwise-key');
    const syncButton = document.getElementById('sync-readwise');
    const statusEl = document.getElementById('readwise-status');

    // Load saved API key
    chrome.storage.local.get(['readwiseApiKey'], (data) => {
      if (data.readwiseApiKey) {
        apiKeyInput.value = data.readwiseApiKey;
        syncButton.disabled = false;
      }
    });

    // Save API key
    saveKeyButton.addEventListener('click', () => {
      const apiKey = apiKeyInput.value.trim();
      if (!apiKey) {
        this.showReadwiseStatus('Please enter a valid API key', 'error');
        return;
      }

      // Validate API key
      this.validateReadwiseApiKey(apiKey).then(isValid => {
        if (isValid) {
          chrome.storage.local.set({ readwiseApiKey: apiKey }, () => {
            this.showReadwiseStatus('✅ API key saved successfully!', 'success');
            syncButton.disabled = false;
          });
        } else {
          this.showReadwiseStatus('❌ Invalid API key. Please check and try again.', 'error');
        }
      });
    });

    // Sync highlights
    syncButton.addEventListener('click', () => {
      this.syncReadwiseHighlights();
    });
  }

  async validateReadwiseApiKey(apiKey) {
    try {
      const response = await fetch('https://readwise.io/api/v2/auth/', {
        headers: {
          'Authorization': `Token ${apiKey}`
        }
      });
      return response.ok;
    } catch (error) {
      console.error('Error validating Readwise API key:', error);
      return false;
    }
  }

  async syncReadwiseHighlights() {
    const statusEl = document.getElementById('readwise-status');
    statusEl.textContent = '🔄 Syncing highlights from Readwise...';
    statusEl.className = 'readwise-status loading';

    try {
      // Get API key
      const data = await new Promise(resolve => {
        chrome.storage.local.get(['readwiseApiKey'], resolve);
      });

      if (!data.readwiseApiKey) {
        this.showReadwiseStatus('❌ No API key found. Please save your API key first.', 'error');
        return;
      }

      // Fetch highlights from Readwise
      const highlights = await this.fetchReadwiseHighlights(data.readwiseApiKey);
      
      if (highlights.length === 0) {
        this.showReadwiseStatus('✅ No new highlights found.', 'success');
        return;
      }

      // Transform Readwise highlights to FeedWise format
      const feedwiseHighlights = highlights.map(h => ({
        quote: h.text,
        source: h.title || 'Unknown',
        author: h.author || 'Unknown'
      }));

      // Get existing highlights and merge
      const existingData = await new Promise(resolve => {
        chrome.storage.local.get(['highlights'], resolve);
      });

      const existingHighlights = existingData.highlights || [];
      const allHighlights = [...existingHighlights, ...feedwiseHighlights];

      // Remove duplicates based on quote text
      const uniqueHighlights = allHighlights.filter((highlight, index, self) =>
        index === self.findIndex(h => h.quote === highlight.quote)
      );

      // Save to storage
      chrome.storage.local.set({ 
        highlights: uniqueHighlights,
        lastReadwiseSync: new Date().toISOString()
      }, () => {
        this.showReadwiseStatus(`✅ Successfully synced ${feedwiseHighlights.length} highlights!`, 'success');
      });

    } catch (error) {
      console.error('Error syncing Readwise highlights:', error);
      this.showReadwiseStatus('❌ Error syncing highlights. Please try again.', 'error');
    }
  }

  async fetchReadwiseHighlights(apiKey) {
    const highlights = [];
    let nextPageCursor = null;

    do {
      const url = new URL('https://readwise.io/api/v2/export/');
      if (nextPageCursor) {
        url.searchParams.append('pageCursor', nextPageCursor);
      }
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Token ${apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`Readwise API error: ${response.status}`);
      }

      const data = await response.json();
      
      // Extract highlights from books
      data.results.forEach(book => {
        if (book.highlights) {
          book.highlights.forEach(highlight => {
            if (highlight.text && highlight.text.length > 15) {
              highlights.push({
                text: highlight.text,
                title: book.title,
                author: book.author,
                category: book.category,
                highlighted_at: highlight.highlighted_at
              });
            }
          });
        }
      });

      nextPageCursor = data.nextPageCursor;
      
      // Add delay to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));

    } while (nextPageCursor);

    return highlights;
  }

  showReadwiseStatus(message, type) {
    const statusEl = document.getElementById('readwise-status');
    statusEl.textContent = message;
    statusEl.className = `readwise-status ${type}`;
    
    if (type === 'success' || type === 'error') {
      setTimeout(() => {
        statusEl.textContent = '';
        statusEl.className = 'readwise-status';
      }, 5000);
    }
  }
}

// Initialize the options manager and make it globally accessible
window.optionsManager = new OptionsManager();