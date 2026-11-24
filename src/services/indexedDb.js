// IndexedDB helper for robust browser-side file storage
const DB_NAME = 'NOTEshare_DB';
const DB_VERSION = 1;
const STORE_NAME = 'resource_files';

export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveFileToDB = async (id, file, metadata = {}) => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      const record = {
        id,
        name: file.name,
        type: file.type || 'application/pdf',
        size: file.size,
        lastModified: file.lastModified || Date.now(),
        data: file, // File or Blob
        metadata,
        uploadedAt: new Date().toISOString()
      };

      const request = store.put(record);
      request.onsuccess = () => resolve(record);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('IndexedDB write error, falling back:', err);
    return null;
  }
};

export const getFileFromDB = async (id) => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('IndexedDB read error:', err);
    return null;
  }
};

export const deleteFileFromDB = async (id) => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('IndexedDB delete error:', err);
    return false;
  }
};

// Generates a mock realistic educational document Blob for seed items when no physical file is present
export const generateMockDocumentBlob = (title, subject, category) => {
  const content = `%PDF-1.4
%NOTEshare Academic Document
Title: ${title}
Subject: ${subject}
Category: ${category}
Platform: NOTEshare University Academic Resource Management
Date: ${new Date().toLocaleDateString()}
---
This document was generated and stored securely in NOTEshare.
All educational resources on this platform are organized for university students.
`;
  return new Blob([content], { type: 'application/pdf' });
};

// Downloads a file directly to the user's computer
export const triggerBrowserDownload = async (resource) => {
  let blob = null;
  let filename = `${resource.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${resource.fileType?.toLowerCase() || 'pdf'}`;

  // Check if there is a file stored in IndexedDB
  const stored = await getFileFromDB(resource.id);
  if (stored && stored.data) {
    blob = stored.data;
    if (stored.name) filename = stored.name;
  } else {
    // Generate educational mock PDF
    blob = generateMockDocumentBlob(resource.title, resource.subject, resource.category);
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
};
