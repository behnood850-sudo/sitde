import { useState } from "react";
import { Search as SearchIcon, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Layout } from "@/components/Layout";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold gradient-text mb-2">جستجوی کانفیگ</h1>
          <p className="text-muted-foreground">با شناسه یا نام کانفیگ جستجو کنید</p>
        </div>

        {/* Search Box */}
        <Card className="glass-card glow-border p-6 animate-slide-up">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="شناسه کانفیگ، نام نمایشی یا سرور..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-12 h-14 text-lg bg-secondary/50 border-border/50"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            <Button className="h-14 px-6 bg-gradient-to-r from-primary to-accent">
              <SearchIcon className="w-5 h-5" />
            </Button>
          </div>
        </Card>

        {/* Empty State */}
        {!searchTerm && (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary/50 flex items-center justify-center">
              <SearchIcon className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">جستجو کنید</h3>
            <p className="text-muted-foreground">
              برای یافتن کانفیگ، عبارت مورد نظر را در کادر بالا وارد کنید
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
