import { useState, useMemo } from 'react';
import { Toaster } from '@/app/components/ui/sonner';
import { Navbar } from './components/layout/Navbar';
import { ProductGrid } from './components/products/ProductGrid';
import { ProductFilters } from './components/products/ProductFilters';
import { mockProducts, filterProducts, sortProducts } from '@/lib/data/products';
import type { Product } from '@/types/product';
import { HeroBanner } from "@/app/components/home/HeroBanner";
import { ProductList } from "@/app/components/products/ProductList";
import { BlogSection } from "@/app/components/home/BlogSection";
import Footer from "./components/footer/Footer";
import { InstagramFeed } from './components/home/InstagramFeed';
import { FeaturedCollections } from './components/home/FeaturedCollections';
import { ShopTheLook } from './components/home/ShopTheLook';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { SeasonSection } from './components/home/SeasonSection';

const brandLogos = [
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg', value: 'Nike' },
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg', value: 'Zara' },
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg', value: 'Adidas' },
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Dior_Logo.svg', value: 'Dior' },
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Prada-Logo.svg', value: 'Prada' },
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Louis_Vuitton_logo_and_wordmark.svg', value: 'Louis Vuitton' },
  { logo: 'https://www.freepnglogos.com/uploads/chanel-logo-cc-png-6.png', value: 'Chanel' },
];




function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortBy, setSortBy] = useState<string>('newest');

  const maxPrice = useMemo(() => {
    return Math.max(...mockProducts.map((p) => p.price));
  }, []);

  const displayedProducts = useMemo(() => {
    let filtered = mockProducts;

    if (selectedCategory === 'featured') {
      filtered = filtered.filter((p) => p.featured);
    } else {
      filtered = filterProducts(filtered, {
        category: selectedCategory || undefined,
        subCategory: selectedSubCategory || undefined,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        searchQuery: searchQuery || undefined,
      });
    }

    filtered = sortProducts(
      filtered,
      sortBy as 'price-asc' | 'price-desc' | 'name' | 'newest'
    );

    return filtered;
  }, [selectedCategory, selectedSubCategory, searchQuery, priceRange, sortBy]);

  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubCategory('');
    setSearchQuery('');
  };

  const handleSubCategoryChange = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory('');
  };

  const handleClearFilters = () => {
    setSelectedCategory('');
    setSelectedSubCategory('');
    setSearchQuery('');
    setPriceRange([0, maxPrice]);
    setSortBy('newest');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onSearch={handleSearch} onCategorySelect={handleCategoryChange} />

      <HeroBanner />


      <section className="bg-[#1a1f2c] text-white py-6 md:py-6 lg:py-6">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            ZWAY Fashion Store
          </h1>
          <p className="max-w-2xl mx-auto text-gray-300 text-sm md:text-base opacity-90">
            Discover our curated collection of premium clothing, jewelry, shoes, hats,
            and bags. Elevate your style with timeless pieces.
          </p>
        </div>
      </section>

      <BlogSection />

      <InstagramFeed />

      <FeaturedCollections />

      <ShopTheLook />

      <SeasonSection />

      {/* Brands Section */}
      
      <div className="bg-white">
        <div id="categories-section" className="container mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold">Shop by Brand</h2>
        </div>
      </div>
      <div className="bg-white py-5 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-wrap justify-center gap-6">
              {brandLogos.map((brand) => (
                <button
                  key={brand.value}
                  onClick={() => handleCategoryChange(brand.value)}
                  className="group flex min-w-[130px] flex-col items-center justify-center gap-3 rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:bg-gray-200 hover:shadow-md active:scale-95"
                >
                  <div className="flex h-12 w-12 items-center justify-center">
                    <img 
                      src={brand.logo} 
                      className="max-h-12 max-w-12 object-contain grayscale transition-all duration-300 group-hover:grayscale-0" 
                    />
                  </div>
                  
                </button>
              ))}
              <button onClick={() => handleCategoryChange('')} className="group flex min-w-[130px] flex-col items-center justify-center gap-3 rounded-xl border border-gray-500 bg-gray-300 p-5 shadow-sm transition-all duration-300 hover:shadow-md active:scale-95">All Products...</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="bg-white container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">
            {selectedCategory === 'featured'
              ? 'Featured Products'
              : selectedCategory
              ? selectedCategory.charAt(0) + selectedCategory.slice(1).toLowerCase()
              : searchQuery
              ? `Search Results for "${searchQuery}"`
              : 'All Products'}
          </h2>
          <p className="mt-2 text-gray-600">
            {displayedProducts.length} product{displayedProducts.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="bg-white grid gap-8 lg:grid-cols-[220px_1fr]">
          <aside>
            <ProductFilters
              selectedCategory={selectedCategory}
              priceRange={priceRange}
              maxPrice={Math.ceil(maxPrice / 10) * 10}
              sortBy={sortBy}
              onCategoryChange={handleCategoryChange}
              onSubCategoryChange={handleSubCategoryChange}
              onPriceRangeChange={setPriceRange}
              onSortChange={setSortBy}
              onClearFilters={handleClearFilters}
            />
          </aside>

          <section>
            <ProductGrid products={displayedProducts} />
          </section>
        </div>22
      </main>
      <ScrollToTop />
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;