import ToolPage from '../../components/tools/ToolPage';
import { getToolBySlug } from '../../data/tools';

export default function SeoMetaGeneratorPage() {
  const tool = getToolBySlug('seo-meta-generator')!;
  return <ToolPage tool={tool} />;
}
