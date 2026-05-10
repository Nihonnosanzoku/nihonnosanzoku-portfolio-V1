import { NextRequest } from 'next/server';
import DownloadController from '@/server/download/download.controller';
import { cleanupDownloads } from '@/server/utils/file';

const downloadController = new DownloadController();

export async function POST(req: NextRequest) {
  // Configurable cleanup (e.g., 30 mins)
  await cleanupDownloads(30);
  return downloadController.handleDownload(req);
}
