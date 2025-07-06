class OptionsManager {
  constructor() {
    this.currentTheme = localStorage.getItem('feedwise-theme') || 'light';
    this.init();
  }

  init() {
    this.setupTheme();
    this.setupSettings();
    this.setupFileUpload();
    this.setupDragAndDrop();
    this.setupObsidianSection();
    this.loadCurrentStats();
  }

  setupTheme() {
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.textContent = this.currentTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
    
    themeToggle.addEventListener('click', () => {
      this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', this.currentTheme);
      localStorage.setItem('feedwise-theme', this.currentTheme);
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
}

// Initialize the options manager and make it globally accessible
window.optionsManager = new OptionsManager();