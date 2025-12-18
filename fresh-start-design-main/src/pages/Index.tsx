import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ConfigCard } from "@/components/ConfigCard";
import { sampleConfigs } from "@/data/sampleConfigs";
import { ConfigData } from "@/types/config";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [configs, setConfigs] = useState<ConfigData[]>(sampleConfigs);
  const [searchResults, setSearchResults] = useState<ConfigData[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults(configs);
    } else {
      const results = configs.filter(
        (config) =>
          config.name.includes(searchQuery) ||
          config.serviceCode.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    }
    setHasSearched(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleDelete = (id: string) => {
    setConfigs((prev) => prev.filter((config) => config.id !== id));
    setSearchResults((prev) => prev.filter((config) => config.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-8 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-3">
            جستجوی کانفیگ
          </h1>
          <p className="text-muted-foreground">
            کانفیگ خود را با نام یا کد سرویس جستجو کنید
          </p>
        </div>
      </header>

      {/* Search Section */}
      <section className="px-4 pb-8">
        <div className="container max-w-2xl mx-auto">
          <div className="gradient-border p-1 rounded-xl">
            <div className="flex gap-2 bg-card p-4 rounded-lg">
              <Input
                type="text"
                placeholder="نام کانفیگ یا کد سرویس را وارد کنید..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-secondary/50 border-border focus:border-primary"
              />
              <Button
                onClick={handleSearch}
                className="gradient-primary hover:opacity-90 px-6"
              >
                <Search className="w-5 h-5 ml-2" />
                جستجو
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="px-4 pb-12">
        <div className="container max-w-4xl mx-auto">
          {!hasSearched ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary/50 flex items-center justify-center">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg">
                برای مشاهده کانفیگ‌ها، جستجو کنید
              </p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-destructive/20 flex items-center justify-center">
                <Search className="w-10 h-10 text-destructive" />
              </div>
              <p className="text-muted-foreground text-lg">
                نتیجه‌ای یافت نشد
              </p>
              <p className="text-muted-foreground/70 text-sm mt-2">
                کلمه دیگری را امتحان کنید
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                {searchResults.length} کانفیگ یافت شد
              </p>
              {searchResults.map((config) => (
                <ConfigCard
                  key={config.id}
                  config={config}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
