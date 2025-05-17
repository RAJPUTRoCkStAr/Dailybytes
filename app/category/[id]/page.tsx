import { Metadata } from "next";
import { categories } from "@/lib/data";
import { AdBanner } from "@/components/ad-banner";
import { SectionHeader } from "@/components/section-header";
import { CategoryContent } from "@/components/category-content";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const category = categories.find((c) => c.id === params.id);
  return {
    title: `${category?.name || "Category"} - DailyBytes`,
    description: category?.description || "Browse content in this category",
  };
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    id: category.id,
  }));
}

export default function CategoryPage({ params }: { params: { id: string } }) {
  const category = categories.find((c) => c.id === params.id);
  const title = category?.name || "Category";

  return (
    <div className="container py-8">
      <SectionHeader
        title={title}
        description={category?.description}
        className="mb-8"
      />

      <CategoryContent categoryId={params.id} />

      <AdBanner className="mt-12" />
    </div>
  );
}