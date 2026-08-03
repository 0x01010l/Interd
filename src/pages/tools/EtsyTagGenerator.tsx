import ToolPage from '../../components/tools/ToolPage';
import { getToolBySlug } from '../../data/tools';

export default function EtsyTagGeneratorPage() {
  const tool = getToolBySlug('etsy-tag-generator')!;
  return <ToolPage tool={tool} />;
}
