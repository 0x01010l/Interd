import ToolPage from '../../components/tools/ToolPage';
import { getToolBySlug } from '../../data/tools';

export default function ShopifyTitleGeneratorPage() {
  const tool = getToolBySlug('shopify-title-generator')!;
  return <ToolPage tool={tool} />;
}
