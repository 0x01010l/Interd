import ToolPage from '../../components/tools/ToolPage';
import { getToolBySlug } from '../../data/tools';

export default function ProductDescriptionGeneratorPage() {
  const tool = getToolBySlug('product-description-generator')!;
  return <ToolPage tool={tool} />;
}
