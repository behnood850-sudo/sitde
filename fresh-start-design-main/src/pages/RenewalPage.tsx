import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowRight, Check, Calendar, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { sampleConfigs, renewalPlans } from "@/data/sampleConfigs";
import { toast } from "@/hooks/use-toast";

const RenewalPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const config = sampleConfigs.find((c) => c.id === id);

  if (!config) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-lg">کانفیگ یافت نشد</p>
          <Button onClick={() => navigate("/")} className="mt-4">
            بازگشت
          </Button>
        </div>
      </div>
    );
  }

  const handleRenew = () => {
    if (!selectedPlan) {
      toast({
        title: "خطا",
        description: "لطفاً یک پلن انتخاب کنید",
        variant: "destructive",
      });
      return;
    }

    const plan = renewalPlans.find((p) => p.id === selectedPlan);
    toast({
      title: "تمدید موفق!",
      description: `کانفیگ "${config.name}" با ${plan?.name} تمدید شد`,
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-6 px-4 border-b border-border">
        <div className="container max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4 hover:bg-secondary"
          >
            <ArrowRight className="w-5 h-5 ml-2" />
            بازگشت
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold text-gradient">
            تمدید سرویس
          </h1>
        </div>
      </header>

      {/* Config Info */}
      <section className="px-4 py-6">
        <div className="container max-w-4xl mx-auto">
          <Card className="gradient-border bg-card/80">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                اطلاعات کانفیگ فعلی
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">نام کانفیگ</p>
                  <p className="text-sm text-foreground">{config.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">کد سرویس</p>
                  <p className="text-sm text-foreground font-mono" dir="ltr">
                    {config.serviceCode}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">تاریخ انقضای فعلی</p>
                  <p className="text-sm text-foreground">{config.expiryDate}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">روز باقی‌مانده</p>
                  <p className="text-sm text-foreground">{config.remainingDays} روز</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Plans Section */}
      <section className="px-4 pb-8">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            انتخاب پلن تمدید
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renewalPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedPlan === plan.id
                    ? "gradient-border ring-2 ring-primary"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {plan.name}
                      </h3>
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>مدت: {plan.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <HardDrive className="w-4 h-4" />
                          <span>حجم: {plan.volume}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-xl font-bold text-gradient">
                        {plan.price}
                      </p>
                      {selectedPlan === plan.id && (
                        <div className="mt-2 w-6 h-6 rounded-full gradient-primary flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Confirm Button */}
      <section className="px-4 pb-12">
        <div className="container max-w-4xl mx-auto">
          <Button
            onClick={handleRenew}
            disabled={!selectedPlan}
            className="w-full gradient-primary hover:opacity-90 py-6 text-lg disabled:opacity-50"
          >
            تأیید و پرداخت
          </Button>
        </div>
      </section>
    </div>
  );
};

export default RenewalPage;
