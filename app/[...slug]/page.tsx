import DocPage from "../DocPage"
import CatalogPage from "../catalog/CatalogPage"

export default async function CatchAllPage({ params }: { params: Promise<{ slug: string[] }> }) {

  const { slug } = await params

  if (slug && slug[0] === "catalog") {
    const catalogId = slug[1]
    return <CatalogPage catalogId={catalogId} />
  }

  return <DocPage />
}