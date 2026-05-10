import { Metadata } from 'next';
import DownloadClient from './DownloadClient';

export const metadata: Metadata = {
  title: 'Video İndirici | Nihonnosanzoku',
  description: 'Sosyal medya platformlarından video indirin.',
};

export default function DownloadPage() {
  return <DownloadClient />;
}
