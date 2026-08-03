import ToolPage from '../../components/tools/ToolPage';
import { getToolBySlug } from '../../data/tools';

export default function ProductFaqGeneratorPage() {
  const tool = getToolBySlug('product-faq-generator')!;
  return <ToolPage tool={tool} />;
}
