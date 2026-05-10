import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';

const execAsync = promisify(exec);

export class DownloadService {
  async downloadVideo(url: string, userId: string): Promise<{ downloadPath: string, fileName: string }> {
    // 1. Create downloads directory inside public folder
    const downloadDir = path.join(process.cwd(), 'public', 'downloads');
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir, { recursive: true });
    }

    // 2. Generate unique filename (for temporary storage)
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const outputTemplate = path.join(downloadDir, `${uniqueId}.%(ext)s`);

    // 3. Command to download via yt-dlp prioritizing mp4
    const command = `yt-dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best" -o "${outputTemplate}" "${url}"`;

    try {
      // Execute yt-dlp on the system
      await execAsync(command);
      
      // Because we requested mp4 or best fallback, we assume .mp4 for simplicity,
      // but in production we can parse the stdout to get the exact filename yt-dlp saved.
      // We will look for files starting with uniqueId in the folder.
      const files = fs.readdirSync(downloadDir);
      const downloadedFile = files.find(f => f.startsWith(uniqueId));

      if (!downloadedFile) {
         throw new Error("Dosya indirilemedi veya bulunamadı.");
      }

      // 4. Schedule automatic deletion after 30 minutes
      setTimeout(() => {
        const filePath = path.join(downloadDir, downloadedFile);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log(`[Cleaner] Yt-dlp cache silindi: ${downloadedFile}`);
        }
      }, 30 * 60 * 1000); 

      return {
        downloadPath: `/downloads/${downloadedFile}`,
        fileName: downloadedFile
      };
    } catch (error: any) {
      console.error('yt-dlp Error:', error);
      throw new Error('Video indirilemedi. Bağlantıyı kontrol edin veya yt-dlp kurulumunu doğrulayın.');
    }
  }
}
