import { NextRequest, NextResponse } from 'next/server';
import { DownloadDto } from '../dto/DownloadDto';
import { ValidationPipe } from '../pipes/ValidationPipe';
import { DownloadService } from '../services/DownloadService';
import { auth } from '../auth/auth';

export class DownloadController {
  private downloadService = new DownloadService();

  async handleDownload(req: NextRequest) {
    // 1. Authorization check
    const session = await auth();
    if (!session || !session.user || !(session.user as any).role) {
      return NextResponse.json({ error: 'Bu işlem için kayıtlı ve onaylı giriş yapmalısınız.' }, { status: 403 });
    }

    try {
      const body = await req.json();
      
      // 2. Validation using class-validator
      const { data, errors } = await ValidationPipe(DownloadDto, body);
      if (errors.length > 0) {
        return NextResponse.json({ error: 'Doğrulama hatası', details: errors }, { status: 400 });
      }

      if (!data) {
        return NextResponse.json({ error: 'Geçersiz veri' }, { status: 400 });
      }
      
      // 3. Execution
      const userId = (session.user as any).id || 'unknown';
      const result = await this.downloadService.downloadVideo(data.url, userId);
      
      return NextResponse.json({ message: 'İndirme başarılı', ...result }, { status: 200 });

    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
