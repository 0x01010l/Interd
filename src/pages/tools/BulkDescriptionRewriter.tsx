import ToolPage from '../../components/tools/ToolPage';
import { getToolBySlug } from '../../data/tools';

export default function BulkDescriptionRewriterPage() {
  const tool = getToolBySlug('bulk-description-rewriter')!;
  return <ToolPage tool={tool} />;
}
