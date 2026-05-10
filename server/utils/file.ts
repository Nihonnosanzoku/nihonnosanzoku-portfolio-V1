import fs from 'fs/promises';
import path from 'path';

/**
 * Handles uploading a File object to public/uploads
 * Returns the public URL path (/uploads/filename)
 */
export async function uploadFile(file: File): Promise<string | null> {
  if (!file || file.size === 0) return null;

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure the uploads directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    // Create unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}-${originalName}`;
    const filePath = path.join(uploadDir, filename);

    await fs.writeFile(filePath, buffer);
    
    console.log(`[Upload] Saved ${filename} to ${filePath}`);
    
    return `/uploads/${filename}`;
  } catch (error) {
    console.error('[Upload Error]', error);
    return null;
  }
}

export async function cleanupDownloads(maxAgeMinutes: number = 30): Promise<void> {
  const downloadDir = path.join(process.cwd(), 'public', 'downloads');
  try {
    const files = await fs.readdir(downloadDir);
    const now = Date.now();
    const maxAgeMs = maxAgeMinutes * 60 * 1000;
    for (const file of files) {
      const filePath = path.join(downloadDir, file);
      const stats = await fs.stat(filePath);
      if (now - stats.mtimeMs > maxAgeMs) {
        await fs.unlink(filePath);
        console.log(`[Cleanup] Deleted old download: ${file}`);
      }
    }
  } catch (error) {
    console.warn('[Cleanup Warning] Could not cleanup downloads:', (error as any).message);
  }
}
