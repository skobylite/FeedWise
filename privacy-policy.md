# Privacy Policy for FeedWise

**Last Updated: January 2025**

## Overview

FeedWise is a browser extension that transforms your social media feeds into curated wisdom by replacing feeds with your Readwise highlights and Obsidian notes. We are committed to protecting your privacy and being transparent about how the extension works.

## Data Collection and Storage

### What Data We Collect
- **Readwise Highlights**: CSV files you voluntarily upload containing your book highlights
- **Obsidian Notes**: Markdown files you voluntarily upload or manually enter
- **Extension Settings**: Your preferences for themes, new tab behavior, and platform settings
- **Usage Analytics** (Optional): Anonymous usage patterns to improve the extension

### What Data We DON'T Collect
- ❌ Personal information (name, email, phone number)
- ❌ Social media account credentials or login information
- ❌ Your social media posts, messages, or private content
- ❌ Browsing history outside of supported platforms
- ❌ Financial or payment information
- ❌ Location data

## Data Storage

### Local Storage Only
All your data is stored **locally on your device** using Chrome's secure storage APIs:
- `chrome.storage.local` for highlights, notes, and settings
- `localStorage` for theme preferences
- No data is transmitted to external servers
- No cloud storage or remote databases are used

### Data Persistence
- Data persists across browser sessions
- Data remains when updating the extension
- Data is only removed when you uninstall the extension or manually clear it

## Data Usage

### How We Use Your Data
- **Display Content**: Show your highlights and notes in place of social media feeds
- **Personalization**: Remember your theme and layout preferences
- **Functionality**: Enable/disable features on specific platforms

### Data Sharing
- **We do NOT share, sell, or transmit your data to any third parties**
- **We do NOT have access to your data** - it stays on your device
- **We do NOT use your data for advertising or marketing**

## Platform Integration

### Social Media Platforms
FeedWise works on:
- Facebook (facebook.com)
- Twitter/X (twitter.com, x.com)
- Instagram (instagram.com)

### What the Extension Does
- **Content Replacement**: Hides the original feed and shows your wisdom content
- **Theme Application**: Applies dark/light mode styling
- **Navigation Detection**: Detects when you're on supported pages

### What the Extension Does NOT Do
- Read your social media posts or messages
- Access your friends list or contacts
- Modify your social media account settings
- Post content on your behalf
- Track your social media activity

## Permissions Explained

### Required Permissions
- **Storage**: Save your highlights, notes, and preferences locally
- **ActiveTab**: Apply the extension to the current tab when activated
- **WebNavigation**: Detect when you navigate to supported social media sites
- **Scripting**: Insert the wisdom feed interface into web pages

### Optional Permissions
- **FileSystem**: (Not currently used) Future feature for direct file access

## Your Rights and Control

### Data Control
- **View Your Data**: Access all stored data through the extension options
- **Delete Data**: Remove highlights, notes, or all data at any time
- **Export Data**: Copy your notes and settings for backup
- **Disable Features**: Turn off specific platforms or the entire extension

### Transparency
- All source code functionality is transparent and verifiable
- No hidden data collection or transmission
- No tracking scripts or analytics unless explicitly enabled

## Updates and Changes

### Extension Updates
- Extension updates preserve your existing data
- We will notify users of any significant privacy policy changes
- Continued use after updates constitutes acceptance of changes

### Data Migration
- We do not access your data during updates
- All data migrations happen locally on your device

## Contact and Support

### Questions or Concerns
If you have questions about this privacy policy or data practices:
- Review the extension's source code for complete transparency
- Contact through Chrome Web Store support channels

### Data Deletion Requests
To completely remove all data:
1. Go to extension settings
2. Click "Clear All Data" (if implemented)
3. Or uninstall the extension from Chrome Extensions page

## Compliance

### GDPR Compliance
- Data processing is based on legitimate interest (functionality you requested)
- You have the right to access, rectify, or delete your data
- Data is processed locally, minimizing privacy risks

### CCPA Compliance
- We do not sell personal information
- We do not share personal information with third parties
- You can request deletion of your data at any time

## Children's Privacy

FeedWise does not knowingly collect data from children under 13. The extension is designed for users who have existing Readwise accounts and personal note collections.

## Data Security

### Security Measures
- Data stored using Chrome's secure storage APIs
- No transmission of sensitive data over networks
- Local storage encryption provided by Chrome browser
- Regular security reviews of extension code

### Breach Prevention
- Minimal data collection reduces risk exposure
- Local-only storage eliminates server-side vulnerabilities
- Open-source approach allows security verification

## Technical Details

### Data Format
- Highlights stored as structured JSON objects
- Notes stored as markdown text with metadata
- Settings stored as key-value pairs
- No executable code stored in user data

### Data Lifecycle
1. **Collection**: Only when you upload files or enter notes
2. **Processing**: Local parsing and organization
3. **Storage**: Secure local browser storage
4. **Usage**: Display in extension interface
5. **Deletion**: When you remove items or uninstall

---

**This privacy policy reflects our commitment to your privacy and data protection. FeedWise is designed with privacy-by-design principles, keeping your data local and secure.**