import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';

const execAsync = promisify(exec);

export default class DownloadService {
  async downloadVideo(url: string, userId: string): Promise<{ downloadPath: string, fileName: string }> {
    const downloadDir = path.join(process.cwd(), 'public', 'downloads');
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir, { recursive: true });
    }

    const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const outputTemplate = path.join(downloadDir, `${uniqueId}.%(ext)s`);

    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    const command = `yt-dlp --user-agent "${userAgent}" --no-check-certificate --no-playlist -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best" -o "${outputTemplate}" "${url}"`;

    try {
      await execAsync(command);
      
      const files = fs.readdirSync(downloadDir);
      const downloadedFile = files.find(f => f.startsWith(uniqueId));

      if (!downloadedFile) {
         throw new Error("Dosya indirilemedi veya bulunamadı.");
      }

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
      
      let errorMessage = 'Video indirilemedi. Bağlantıyı kontrol edin veya platformun kısıtlamalarını doğrulayın.';
      
      const errorStr = error.toString();
      if (errorStr.includes('Log in for access') || errorStr.includes('This post may not be comfortable')) {
        errorMessage = 'Bu video yaş kısıtlamalı veya giriş gerektiriyor. Maalesef bu tür videoları şu an indiremiyoruz.';
      } else if (errorStr.includes('ExtractorError')) {
        errorMessage = 'Video platformu tarafından erişim engellendi. Lütfen daha sonra tekrar deneyin.';
      }

      throw new Error(errorMessage);
    }
  }
}
