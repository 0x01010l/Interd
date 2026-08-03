import ToolPage from '../../components/tools/ToolPage';
import { getToolBySlug } from '../../data/tools';

export default function AdCopyGeneratorPage() {
  const tool = getToolBySlug('ad-copy-generator')!;
  return <ToolPage tool={tool} />;
}
