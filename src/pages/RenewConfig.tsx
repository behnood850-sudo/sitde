import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const packages = [
  { id: 1, label: "سرویس 1 کاربره - 2 گیگ 7 روزه", price: 8000 },
  { id: 2, label: "سرویس 1 کاربره - 10 گیگ 30 روزه", price: 30000 },
  { id: 3, label: "سرویس 2 کاربره - 20 گیگ 30 روزه", price: 53000 },
  { id: 4, label: "سرویس 2 کاربره - 30 گیگ 30 روزه", price: 78000 },
  { id: 5, label: "سرویس 3 کاربره - 50 گیگ 30 روزه", price: 130000 },
  { id: 6, label: "سرویس 4 کاربره - 100 گیگ 90 روزه", price: 260000 },
  { id: 7, label: "سرویس 4 کاربره - 200 گیگ 90 روزه", price: 520000 },
  { id: 8, label: "سرویس 5 کاربره - 400 گیگ 90 روزه", price: 1040000 },
];

// Mock config data
const configData: Record<string, { displayName: string; configId: string }> = {
  "5876": { displayName: "کاربر ربات", configId: "x2clh9kwkl" },
  "6476": { displayName: "کاربر ربات", configId: "tnh8x5c9y2" },
  "6407": { displayName: "کاربر ربات", configId: "xge4c7drlc" },
};

export default function RenewConfig() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<string>("");

  const config = id ? configData[id] : null;

  const handleRenew = () => {
    if (!selectedPackage) return;
    // Handle renewal logic
    console.log("Renewing with package:", selectedPackage);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto animate-fade-in">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 gap-2"
          onClick={() => navigate("/configs")}
        >
          <ArrowRight className="w-4 h-4" />
          بازگشت به لیست
        </Button>

        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-lg text-foreground">
            برای تمدید سرویس{" "}
            <span className="text-primary font-bold">{config?.configId || id}</span>
            {" "}با نام نمایشی{" "}
            <span className="text-primary font-bold">{config?.displayName || "کاربر ربات"}</span>
            {" "}از طریق دکمه فرم اقدام کنید
          </p>
        </div>

        {/* Package Selection */}
        <div className="space-y-4">
          <Select value={selectedPackage} onValueChange={setSelectedPackage}>
            <SelectTrigger className="w-full bg-secondary border-border text-foreground h-12">
              <SelectValue placeholder="انتخاب کنید" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border z-50">
              {packages.map((pkg) => (
                <SelectItem
                  key={pkg.id}
                  value={pkg.id.toString()}
                  className="text-foreground hover:bg-secondary focus:bg-secondary cursor-pointer py-3"
                >
                  <span className="flex items-center justify-between w-full gap-4">
                    <span>{pkg.label}</span>
                    <span className="text-foreground font-medium">
                      {pkg.price.toLocaleString("fa-IR")} تومان
                    </span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={handleRenew}
            disabled={!selectedPackage}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          >
            تمدید سرویس
          </Button>
        </div>
      </div>
    </Layout>
  );
}
