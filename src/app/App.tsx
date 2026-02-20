"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/app/components/ui/sonner';
import { Navbar } from './components/layout/Navbar';
import { ProductGrid } from './components/products/ProductGrid';
import { ProductFilters } from './components/products/ProductFilters';
import { mockProducts, filterProducts, sortProducts } from '@/lib/data/products';
import { HeroBanner } from "@/app/components/home/HeroBanner";
import { BlogSection } from "@/app/components/home/BlogSection";
import Footer from "./components/footer/Footer";
import { InstagramFeed } from './components/home/InstagramFeed';
import { FeaturedCollections } from './components/home/FeaturedCollections';
import { ShopTheLook } from './components/home/ShopTheLook';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { SeasonSection } from './components/home/SeasonSection';
import { useLanguage } from '@/lib/store/use-language';
import { translations } from '@/lib/i18n/translations';

const brandLogos = [
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg', value: 'Nike' },
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg', value: 'Zara' },
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg', value: 'Adidas' },
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Dior_Logo.svg', value: 'Dior' },
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Prada-Logo.svg', value: 'Prada' },
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Louis_Vuitton_logo_and_wordmark.svg', value: 'Louis Vuitton' },
];

function App() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>(''); // បន្ថែម State ថ្មីសម្រាប់ Brand
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortBy, setSortBy] = useState<string>('newest');

  const maxPrice = useMemo(() => Math.max(...mockProducts.map((p) => p.price)), []);

  const displayedProducts = useMemo(() => {
    let filtered = [...mockProducts];

    // ១. ច្រោះតាម Brand (ប្រសិនបើមានការរើស Brand ពី Logo)
    if (selectedBrand) {
      filtered = filtered.filter((p) => p.brand?.toLowerCase() === selectedBrand.toLowerCase());
    }

    // ២. ច្រោះតាម Category ពិសេស (Featured)
    if (selectedCategory === 'featured') {
      filtered = filtered.filter((p) => p.featured);
    } 
    // ៣. ច្រោះតាម Filters ផ្សេងៗ (Category, Price, Search)
    else {
      filtered = filterProducts(filtered, {
        category: selectedCategory || undefined,
        subCategory: selectedSubCategory || undefined,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        searchQuery: searchQuery || undefined,
      });
    }

    return sortProducts(filtered, sortBy as any);
  }, [selectedCategory, selectedBrand, selectedSubCategory, searchQuery, priceRange, sortBy]);

  // Function សម្រាប់រើស Brand ពី Logo
  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    setSelectedCategory(''); // លុប Category ចេញពេលរើស Brand
    setSelectedSubCategory('');
    setSearchQuery('');
    document.getElementById('product-anchor')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedBrand(''); // លុប Brand ចេញពេលរើស Category
    setSelectedSubCategory('');
    setSearchQuery('');
    document.getElementById('product-anchor')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory('');
    setSelectedBrand('');
    document.getElementById('product-anchor')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClearFilters = () => {
    setSelectedCategory('');
    setSelectedBrand('');
    setSelectedSubCategory('');
    setSearchQuery('');
    setPriceRange([0, maxPrice]);
    setSortBy('newest');
  };

  return (
    <div className="min-h-screen bg-white selection:bg-black selection:text-white">
      <Navbar onSearch={handleSearch} onCategorySelect={handleCategoryChange} />
      
      <HeroBanner />

      {/* 2. Brand Identity Section */}
      <section className="bg-zinc-900 text-white py-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500 mb-4 block">Manifesto</span>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-none">
              {t.home.heroTitle}
            </h1>
            <p className="max-w-2xl mx-auto text-zinc-400 text-sm md:text-lg font-medium leading-relaxed italic">
              {t.home.heroDesc}
            </p>
          </motion.div>
        </div>
      </section><br /><br />

      <FeaturedCollections />
      <SeasonSection />
      <ShopTheLook />

      {/* 4. Brand Curation */}
      <div className="bg-white">
        <div id="categories-section" className="container mx-auto px-4 py-6 text-center md:text-left">
          <h2 className="text-3xl font-bold">{t.home.shopByBrand}</h2>
        </div>
      </div>

      <div className="bg-white py-5 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-wrap justify-center gap-6">
              {brandLogos.map((brand) => (
                <button
                  key={brand.value}
                  onClick={() => handleBrandChange(brand.value)} // កែមកប្រើ handleBrandChange
                  className={`group flex min-w-[130px] flex-col items-center justify-center gap-3 rounded-xl border p-5 shadow-sm transition-all duration-300 active:scale-95 ${
                    selectedBrand === brand.value 
                    ? 'border-black bg-zinc-50 shadow-md scale-105' 
                    : 'border-gray-100 bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="flex h-12 w-12 items-center justify-center">
                    <img 
                      src={brand.logo} 
                      className={`max-h-12 max-w-12 object-contain transition-all duration-300 ${
                        selectedBrand === brand.value ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'
                      }`} 
                      alt={brand.value}
                    />
                  </div>
                </button>
              ))}
              
              <button 
                onClick={handleClearFilters} 
                className="group flex min-w-[130px] items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-5 text-[10px] font-black uppercase tracking-widest hover:bg-zinc-900 hover:text-white transition-all duration-300 active:scale-95"
              >
                {t.home.allProductsBtn}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Main Product Gallery */}
      <main id="product-anchor" className="container mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-zinc-100 pb-10">
          <div className="space-y-4">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-zinc-900">
              {selectedBrand 
                ? `${t.home.shopByBrand}: ${selectedBrand}`
                : selectedCategory === 'featured' 
                  ? t.products.featured 
                  : searchQuery 
                    ? `${t.products.searchResults} "${searchQuery}"`
                    : selectedCategory || t.products.allProducts}
            </h2>
            
            <div className="flex items-center gap-4">
              <span className="h-[1px] w-12 bg-zinc-900" />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                {lang === 'kh' 
                  ? `${t.products.found} ${displayedProducts.length} ${t.products.unit}`
                  : `${displayedProducts.length} ${t.products.unit} ${t.products.found}`}
              </p>
            </div>
          </div>
          
          {(searchQuery || selectedBrand || selectedCategory) && (
            <button 
              onClick={handleClearFilters}
              className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:underline"
            >
              {lang === 'kh' ? 'សម្អាតការជ្រើសរើស' : 'Clear All Filters'}
            </button>
          )}
        </div>

        <div className="grid gap-16 lg:grid-cols-[260px_1fr]">
          <aside className="relative">
            <div className="sticky top-32">
              <ProductFilters
                selectedCategory={selectedCategory}
                priceRange={priceRange}
                maxPrice={Math.ceil(maxPrice / 10) * 10}
                sortBy={sortBy}
                onCategoryChange={handleCategoryChange}
                onSubCategoryChange={(sub) => setSelectedSubCategory(sub)}
                onPriceRangeChange={setPriceRange}
                onSortChange={setSortBy}
                onClearFilters={handleClearFilters}
              />
            </div>
          </aside>

          <section>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory + selectedBrand + searchQuery + sortBy}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {displayedProducts.length > 0 ? (
                  <ProductGrid products={displayedProducts} />
                ) : (
                  <div className="py-20 text-center">
                    <p className="text-zinc-400 italic">{lang === 'kh' ? 'មិនមានទំនិញដែលអ្នកស្វែងរកទេ' : 'No products found'}</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </section>
        </div>
      </main>

      <BlogSection />
      <InstagramFeed />
      <Footer />
      <ScrollToTop />
      <Toaster position="bottom-center" expand={false} richColors />
    </div>
  );
}

export default App;