# Implementation Guide - Filter Logic Deep Dive

## 🎯 Complete Filter Implementation Example

This guide shows you exactly how to implement filtering by category, price, and search using various approaches.

## 1️⃣ Client-Side Filtering (Current Implementation)

### Advantages:
- ✅ Fast - No server round trips
- ✅ Great for small datasets (< 1000 products)
- ✅ Simple implementation
- ✅ Works offline

### Implementation:

```typescript
// In your component
const [filters, setFilters] = useState({
  category: '',
  minPrice: 0,
  maxPrice: 500,
  searchQuery: ''
});

// Filter products
const filteredProducts = useMemo(() => {
  return mockProducts.filter(product => {
    // Category filter
    if (filters.category && product.category !== filters.category) {
      return false;
    }

    // Price range filter
    if (product.price < filters.minPrice || product.price > filters.maxPrice) {
      return false;
    }

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const searchableText = `${product.name} ${product.description}`.toLowerCase();
      if (!searchableText.includes(query)) {
        return false;
      }
    }

    return true;
  });
}, [filters]);
```

## 2️⃣ Server-Side Filtering (Recommended for Production)

### Advantages:
- ✅ Scalable for large datasets
- ✅ Reduced initial load time
- ✅ Better SEO
- ✅ Database-level optimization

### API Route Example (Next.js):

```typescript
// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const searchParams = request.nextSearchParams;
  
  const category = searchParams.get('category');
  const minPrice = Number(searchParams.get('minPrice')) || 0;
  const maxPrice = Number(searchParams.get('maxPrice')) || Infinity;
  const search = searchParams.get('search');
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const sortOrder = searchParams.get('sortOrder') || 'desc';

  // Build Prisma query
  const products = await prisma.product.findMany({
    where: {
      ...(category && { category }),
      price: {
        gte: minPrice,
        lte: maxPrice,
      },
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
    },
    include: {
      variants: true,
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  return NextResponse.json(products);
}
```

### Client Component:

```typescript
'use client';

import { useQuery } from '@tanstack/react-query';

function ProductsPage() {
  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: 500,
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value.toString());
      });
      
      const response = await fetch(`/api/products?${params}`);
      return response.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <ProductFilters 
        filters={filters} 
        onFilterChange={setFilters} 
      />
      <ProductGrid products={products} />
    </div>
  );
}
```

## 3️⃣ URL-Based Filtering (Best for SEO)

### Advantages:
- ✅ Shareable filter states
- ✅ Browser back/forward works
- ✅ Better SEO
- ✅ Bookmarkable results

### Implementation with Next.js App Router:

```typescript
'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';

export default function ProductsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read filters from URL
  const filters = {
    category: searchParams.get('category') || '',
    minPrice: Number(searchParams.get('minPrice')) || 0,
    maxPrice: Number(searchParams.get('maxPrice')) || 500,
    search: searchParams.get('search') || '',
    sortBy: searchParams.get('sortBy') || 'newest',
  };

  // Update URL with new filters
  const updateFilters = useCallback((newFilters: Partial<typeof filters>) => {
    const params = new URLSearchParams(searchParams);
    
    // Update or remove parameters
    Object.entries({ ...filters, ...newFilters }).forEach(([key, value]) => {
      if (value && value !== '' && value !== 0) {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    });

    // Push new URL
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, router, pathname]);

  return (
    <div>
      <ProductFilters 
        filters={filters}
        onFilterChange={updateFilters}
      />
      <ProductGrid 
        category={filters.category}
        minPrice={filters.minPrice}
        maxPrice={filters.maxPrice}
        search={filters.search}
        sortBy={filters.sortBy}
      />
    </div>
  );
}
```

## 4️⃣ Advanced Filtering with Multiple Values

### Example: Multiple Category Selection

```typescript
interface Filters {
  categories: string[];  // Multiple categories
  sizes: string[];       // Multiple sizes
  colors: string[];      // Multiple colors
  priceRange: [number, number];
}

function filterProducts(products: Product[], filters: Filters) {
  return products.filter(product => {
    // Multiple category filter
    if (filters.categories.length > 0 && 
        !filters.categories.includes(product.category)) {
      return false;
    }

    // Check if product has any of the selected sizes
    if (filters.sizes.length > 0) {
      const hasSize = product.variants.some(v => 
        filters.sizes.includes(v.size)
      );
      if (!hasSize) return false;
    }

    // Check if product has any of the selected colors
    if (filters.colors.length > 0) {
      const hasColor = product.variants.some(v => 
        filters.colors.includes(v.color)
      );
      if (!hasColor) return false;
    }

    // Price range
    if (product.price < filters.priceRange[0] || 
        product.price > filters.priceRange[1]) {
      return false;
    }

    return true;
  });
}
```

### UI Component for Multiple Selection:

```typescript
function MultiSelectFilter({ 
  label, 
  options, 
  selected, 
  onChange 
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}) {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(s => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="space-y-2">
        {options.map(option => (
          <div key={option} className="flex items-center gap-2">
            <Checkbox
              checked={selected.includes(option)}
              onCheckedChange={() => toggleOption(option)}
              id={option}
            />
            <label htmlFor={option} className="text-sm cursor-pointer">
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 5️⃣ Database Query Examples (Prisma)

### Basic Filtering:

```typescript
// Get products by category
const products = await prisma.product.findMany({
  where: {
    category: 'CLOTHES',
  },
});

// Get products in price range
const products = await prisma.product.findMany({
  where: {
    price: {
      gte: 50,  // Greater than or equal
      lte: 200, // Less than or equal
    },
  },
});

// Search products
const products = await prisma.product.findMany({
  where: {
    OR: [
      { name: { contains: 'jacket', mode: 'insensitive' } },
      { description: { contains: 'jacket', mode: 'insensitive' } },
    ],
  },
});
```

### Advanced Filtering:

```typescript
const products = await prisma.product.findMany({
  where: {
    AND: [
      // Category filter
      { category: { in: ['CLOTHES', 'SHOES'] } },
      
      // Price range
      { price: { gte: 50, lte: 200 } },
      
      // Search in name or description
      {
        OR: [
          { name: { contains: searchQuery, mode: 'insensitive' } },
          { description: { contains: searchQuery, mode: 'insensitive' } },
        ],
      },
      
      // Has stock
      { stock: { gt: 0 } },
      
      // Has specific variant
      {
        variants: {
          some: {
            AND: [
              { size: { in: ['M', 'L'] } },
              { color: { in: ['Black', 'White'] } },
              { stock: { gt: 0 } },
            ],
          },
        },
      },
    ],
  },
  include: {
    variants: true,
  },
  orderBy: {
    price: 'asc',
  },
  take: 20,  // Limit results
  skip: 0,   // Pagination offset
});
```

## 6️⃣ Performance Optimization

### 1. Debounced Search

```typescript
import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Usage
function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    // This will only run 500ms after user stops typing
    if (debouncedSearch) {
      performSearch(debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search products..."
    />
  );
}
```

### 2. Pagination

```typescript
interface PaginationState {
  page: number;
  pageSize: number;
}

function ProductList() {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 20,
  });

  const { data, isLoading } = useQuery({
    queryKey: ['products', filters, pagination],
    queryFn: async () => {
      const params = new URLSearchParams({
        ...filters,
        page: pagination.page.toString(),
        pageSize: pagination.pageSize.toString(),
      });
      
      const response = await fetch(`/api/products?${params}`);
      return response.json();
    },
  });

  return (
    <>
      <ProductGrid products={data?.products} />
      <Pagination
        currentPage={pagination.page}
        totalPages={data?.totalPages}
        onPageChange={(page) => setPagination({ ...pagination, page })}
      />
    </>
  );
}
```

### 3. Infinite Scroll

```typescript
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

function InfiniteProductList() {
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['products', filters],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        ...filters,
        page: pageParam.toString(),
      });
      
      const response = await fetch(`/api/products?${params}`);
      return response.json();
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages.length + 1 : undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      {data?.pages.map((page, i) => (
        <React.Fragment key={i}>
          <ProductGrid products={page.products} />
        </React.Fragment>
      ))}
      {hasNextPage && <div ref={ref}>Loading more...</div>}
    </>
  );
}
```

## 7️⃣ Testing Filter Logic

```typescript
import { describe, it, expect } from 'vitest';
import { filterProducts, sortProducts } from '@/lib/data/products';

describe('Product Filtering', () => {
  it('filters by category', () => {
    const filtered = filterProducts(mockProducts, {
      category: 'CLOTHES',
    });
    
    expect(filtered.every(p => p.category === 'CLOTHES')).toBe(true);
  });

  it('filters by price range', () => {
    const filtered = filterProducts(mockProducts, {
      minPrice: 50,
      maxPrice: 150,
    });
    
    expect(filtered.every(p => p.price >= 50 && p.price <= 150)).toBe(true);
  });

  it('filters by search query', () => {
    const filtered = filterProducts(mockProducts, {
      searchQuery: 'jacket',
    });
    
    expect(
      filtered.every(p => 
        p.name.toLowerCase().includes('jacket') ||
        p.description.toLowerCase().includes('jacket')
      )
    ).toBe(true);
  });
});

describe('Product Sorting', () => {
  it('sorts by price ascending', () => {
    const sorted = sortProducts(mockProducts, 'price-asc');
    
    for (let i = 0; i < sorted.length - 1; i++) {
      expect(sorted[i].price).toBeLessThanOrEqual(sorted[i + 1].price);
    }
  });
});
```

## 🎓 Summary

**Choose your approach based on:**

1. **Client-Side Filtering**: Small datasets (< 1000 items), fast filtering, offline support
2. **Server-Side Filtering**: Large datasets, better scalability, database optimization
3. **URL-Based Filtering**: Best for SEO, shareable results, browser history
4. **Hybrid Approach**: Combine all three for optimal UX

**Key Principles:**
- ✅ Use `useMemo` for expensive calculations
- ✅ Debounce search inputs
- ✅ Implement pagination for large datasets
- ✅ Keep filters in sync with URL for better UX
- ✅ Show loading states during filtering
- ✅ Provide clear filter indicators
- ✅ Allow easy filter reset

The current implementation uses **client-side filtering with React state**, which is perfect for demonstration and small to medium catalogs. For production with large inventories, migrate to **server-side filtering with URL parameters**.
