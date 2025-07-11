import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

type Product = {
  _id: number;
  title: string;
  color: string;
  size: string;
  description: string;
  price: number;
  soldcount: number;
  stockQuantity: number;
  images: {
    url: string;
    alt: string;
    main: boolean;
  }[];
  category: string;
  brand: string;
  discount: number;
  priceAfterDiscount: number;
  url: string;
};

type SliderRangeProps = {
  products: Product[];
  setFilteredProducts: any
};

export default function SliderRange({ products, setFilteredProducts }: SliderRangeProps) {
  const prices = products.map(p => p.priceAfterDiscount);
  const min = prices.length ? Math.floor(Math.min(...prices)) : 0;
  const max = prices.length ? Math.ceil(Math.max(...prices)) : 10000;
  const [value, setValue] = useState<[number, number]>([min, max]);
  useEffect(() => {
    setValue([min, max]);
  }, [products]);



  useEffect(() => {
    const filtered = products.filter(
      (product) => product.priceAfterDiscount >= value[0] && product.priceAfterDiscount <= value[1]
    );
    setFilteredProducts(filtered);
  }, [value, products, setFilteredProducts]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <Label className="leading-6">Prix (DA)</Label>
        <output className="text-sm font-medium tabular-nums">
          {value[0]} DA - {value[1]} DA
        </output>
      </div>
      <Slider
        value={value}
        onValueChange={(val) => setValue(val as [number, number])}
        aria-label="Sélectionner un intervalle de prix"
        min={min}
        max={max}
        step={1}
      />
    </div>
  );
}
