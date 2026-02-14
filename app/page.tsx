import Header from "../components/Header";
import Hero from "../components/Hero";
import BookingWidget from "../components/BookingWidget";
import Services from "../components/Services";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import ErrorBoundary from "../components/ErrorBoundary";
import { MessageCircle, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div className="noise fixed inset-0 z-0"></div>
      <div className="relative z-10">
        <Header />
        <main className="pb-24 lg:pb-0">
          <Hero />
          
          <section id="booking" className="container mx-auto px-4 -mt-16 md:-mt-24 relative z-20">
            <ErrorBoundary>
              <BookingWidget />
            </ErrorBoundary>
          </section>

          {/* Social Proof Counters */}
          <section className="py-16 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div className="space-y-2">
                  <p className="text-3xl md:text-4xl font-extrabold text-primary">+15,000</p>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">خدمة مكتملة</p>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl md:text-4xl font-extrabold text-primary">4.8/5</p>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">متوسط التقييم</p>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl md:text-4xl font-extrabold text-primary">+2,500</p>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">فني معتمد</p>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl md:text-4xl font-extrabold text-primary">24/7</p>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">دعم 24/7</p>
                </div>
              </div>
            </div>
          </section>

          <Services />
          <Pricing />

          {/* Testimonials Section */}
          <section id="reviews" className="py-24 bg-slate-50 dark:bg-slate-900">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">تقييمات</h2>
                <p className="text-xl text-slate-600 dark:text-slate-400">آلاف العملاء يثقون بنا يومياً</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-700">
                    <div className="flex gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} size={18} fill="#f97316" className="text-secondary" />)}
                    </div>
                    <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 italic font-medium">
                      "خدمة ممتازة وسريعة جداً، الفني وصل في الميعاد بالظبط وصلح المشكلة باحترافية عالية. شكراً جزيلاً!"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">A</div>
                      <div>
                        <p className="font-bold dark:text-white">أحمد محمد</p>
                        <p className="text-sm text-slate-500">القاهرة</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          <FAQ />
        </main>
        <Footer />
      </div>
    </div>
  );
}