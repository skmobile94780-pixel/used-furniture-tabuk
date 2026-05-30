import { useEffect, useState } from 'react';
import { Calendar, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { supabase, BlogPost } from '../lib/supabase';
import { useLang } from '../lib/i18n';
import Breadcrumb from '../components/Breadcrumb';

type Props = {
  onNavigateHome?: () => void;
};

export default function Blog({ onNavigateHome }: Props) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [active, setActive] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const { lang, t } = useLang();

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false });
      setPosts((data as BlogPost[]) ?? []);
      setLoading(false);
    })();
  }, []);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const BackArrow = lang === 'ar' ? ArrowLeft : ArrowRight;
  const ReadMoreArrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  if (active) {
    return (
      <article className="max-w-3xl mx-auto px-4 py-14 sm:py-20" itemScope itemType="https://schema.org/BlogPosting">
        <button
          onClick={() => setActive(null)}
          className="inline-flex items-center gap-2 text-sm text-emerald-700 hover:text-emerald-800 font-semibold mb-6"
        >
          <BackArrow className="w-4 h-4" />
          {t.blog.backToBlog[lang]}
        </button>
        <div className="rounded-2xl overflow-hidden shadow-lg mb-6">
          <img
            src={active.image_url}
            alt={active.title}
            className="w-full h-[320px] object-cover"
            itemProp="image"
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
          <Calendar className="w-4 h-4" aria-hidden="true" />
          <time dateTime={active.published_at} itemProp="datePublished">
            {formatDate(active.published_at)}
          </time>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-5" itemProp="headline">{active.title}</h1>
        <p className="text-lg text-slate-600 leading-relaxed mb-6" itemProp="description">{active.excerpt}</p>
        <div className="prose max-w-none text-slate-700 leading-relaxed whitespace-pre-line" itemProp="articleBody">
          {active.content}
        </div>
      </article>
    );
  }

  return (
    <div>
      <section className="bg-gradient-to-bl from-emerald-50 via-white to-white py-14 sm:py-16">
        <Breadcrumb
          items={[
            { label: t.breadcrumb.home[lang], onClick: onNavigateHome },
            { label: t.blog.badge[lang] },
          ]}
        />
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="inline-block text-xs sm:text-sm font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full mb-4">
            {t.blog.badge[lang]}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-4">
            {t.blog.title[lang]}
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            {t.blog.subtitle[lang]}
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-16 text-slate-400">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20 text-slate-500">{t.blog.noPosts[lang]}</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((p) => (
                <article
                  key={p.id}
                  className={`group ${lang === 'ar' ? 'text-right' : 'text-left'} bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer`}
                  onClick={() => {
                    setActive(p);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  itemScope
                  itemType="https://schema.org/BlogPosting"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={p.image_url}
                      alt={p.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      itemProp="image"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                      <time dateTime={p.published_at} itemProp="datePublished">
                        {formatDate(p.published_at)}
                      </time>
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900 mb-2 leading-snug group-hover:text-emerald-700 transition" itemProp="headline">
                      {p.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3" itemProp="description">{p.excerpt}</p>
                    <div className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-emerald-700">
                      {t.blog.readMore[lang]}
                      <ReadMoreArrow className="w-4 h-4" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
