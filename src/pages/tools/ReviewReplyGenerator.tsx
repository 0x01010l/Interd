import ToolPage from '../../components/tools/ToolPage';
import { getToolBySlug } from '../../data/tools';

export default function ReviewReplyGeneratorPage() {
  const tool = getToolBySlug('review-reply-generator')!;
  return <ToolPage tool={tool} />;
}
