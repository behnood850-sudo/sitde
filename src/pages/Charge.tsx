import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  CreditCard, Wallet, Copy, Check, 
  ChevronLeft, ArrowUpRight, AlertCircle,
  Receipt
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Layout } from "@/components/Layout";

const walletBalance = 909189;
const cardNumber = "6037-9974-1234-5678";
const cardHolder = "محمد احمدی";

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text.replace(/-/g, ''));
    setCopied(true);
    toast.success(`${label} کپی شد!`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      className="gap-2 hover:bg-primary/20 hover:text-primary"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-success" />
          کپی شد
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          کپی
        </>
      )}
    </Button>
  );
}

export default function Charge() {
  const [amount, setAmount] = useState("");
  const [trackingCode, setTrackingCode] = useState("");

  const handleSubmit = () => {
    if (!amount || parseInt(amount) < 10000) {
      toast.error("حداقل مبلغ شارژ ۱۰,۰۰۰ تومان است");
      return;
    }
    if (!trackingCode) {
      toast.error("لطفا کد پیگیری را وارد کنید");
      return;
    }
    toast.success("درخواست شارژ ثبت شد. پس از تایید، موجودی شما افزایش می‌یابد.");
  };

  const quickAmounts = [50000, 100000, 200000, 500000];

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">شارژ کیف پول</h1>
          <p className="text-muted-foreground">موجودی کیف پول خود را افزایش دهید</p>
        </div>

        {/* Balance & Transactions */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="glass-card glow-border p-6 animate-slide-up">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-primary/20">
                <Wallet className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">شارژ باقی مانده شما</p>
                <p className="text-3xl font-bold text-foreground">
                  {walletBalance.toLocaleString('fa-IR')}
                  <span className="text-sm text-muted-foreground mr-2">تومان</span>
                </p>
              </div>
            </div>
          </Card>

          <Link to="/transactions">
            <Card className="glass-card p-6 h-full flex items-center justify-between group hover:border-primary/50 transition-all animate-slide-up cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-accent/20">
                  <Receipt className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">تراکنش های شما</p>
                  <p className="font-semibold">لیست تراکنش ها</p>
                </div>
              </div>
              <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all" />
            </Card>
          </Link>
        </div>

        {/* Card to Card Section */}
        <Card className="glass-card glow-border overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-warning/20 to-orange-500/20 border-b border-border/50">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-warning/20">
                <CreditCard className="w-8 h-8 text-warning" />
              </div>
              <div>
                <h3 className="text-xl font-bold">پرداخت کارت به کارت</h3>
                <p className="text-sm text-muted-foreground">برای شارژ از طریق کارت به کارت کلیک کنید</p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            {/* Card Info */}
            <Card className="p-5 bg-gradient-to-br from-secondary/50 to-secondary/30 border-border/50">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">شماره کارت</p>
                  <p className="text-2xl font-mono font-bold tracking-wider text-foreground" dir="ltr">
                    {cardNumber}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    به نام: <span className="text-foreground">{cardHolder}</span>
                  </p>
                </div>
                <CopyButton text={cardNumber} label="شماره کارت" />
              </div>
            </Card>

            {/* Amount Input */}
            <div className="space-y-3">
              <Label className="text-muted-foreground">مبلغ واریزی (تومان)</Label>
              <Input
                type="number"
                placeholder="مثال: 100000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-secondary/50 border-border/50 h-12 text-lg"
                dir="ltr"
              />
              
              {/* Quick Amounts */}
              <div className="flex flex-wrap gap-2">
                {quickAmounts.map((amt) => (
                  <Button
                    key={amt}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setAmount(amt.toString())}
                    className={`border-border/50 ${
                      amount === amt.toString() ? "bg-primary/20 border-primary/50 text-primary" : ""
                    }`}
                  >
                    {amt.toLocaleString('fa-IR')} تومان
                  </Button>
                ))}
              </div>
            </div>

            {/* Tracking Code */}
            <div className="space-y-2">
              <Label className="text-muted-foreground">کد پیگیری تراکنش</Label>
              <Input
                placeholder="کد پیگیری پرداخت خود را وارد کنید..."
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                className="bg-secondary/50 border-border/50 h-12"
              />
            </div>

            {/* Submit Button */}
            <Button 
              onClick={handleSubmit}
              className="w-full h-12 bg-primary hover:bg-primary/90 transition-opacity gap-2 text-lg font-medium text-primary-foreground"
            >
              <ArrowUpRight className="w-5 h-5" />
              ثبت درخواست شارژ
            </Button>

            {/* Info */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-info/10 border border-info/20">
              <AlertCircle className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="text-info font-medium mb-1">راهنمای شارژ</p>
                <ol className="space-y-1 list-decimal list-inside">
                  <li>مبلغ مورد نظر را به شماره کارت بالا واریز کنید</li>
                  <li>کد پیگیری تراکنش را در فیلد بالا وارد کنید</li>
                  <li>پس از تایید توسط پشتیبانی، موجودی شما افزایش می‌یابد</li>
                </ol>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
