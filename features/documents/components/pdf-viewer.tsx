import { SmallerLoader } from '@/components/ui/small-loader';
import dynamic from 'next/dynamic';

export { RenderPdf } from './render-pdf';

export const PdfViewer = dynamic(
  async () => await import('@react-pdf/renderer').then((m) => m.PDFViewer),
  {
    ssr: false,
    loading: () => <SmallerLoader />,
  }
);
