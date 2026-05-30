import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { useLang } from '../lib/i18n';

type Props = {
  items: { label: string; onClick?: () => void }[];
};

export default function Breadcrumb({ items }: Props) {
  const { lang } = useLang();
  const Chevron = lang === 'ar' ? ChevronLeft : ChevronRight;

  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 py-3">
      <ol className="flex items-center gap-1.5 text-sm text-slate-500" itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-center gap-1.5"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            {i > 0 && <Chevron className="w-3.5 h-3.5 text-slate-300" />}
            {item.onClick ? (
              <button
                onClick={item.onClick}
                className="hover:text-emerald-700 transition flex items-center gap-1"
                itemProp="item"
              >
                {i === 0 && <Home className="w-3.5 h-3.5" />}
                <span itemProp="name">{item.label}</span>
              </button>
            ) : (
              <span className="text-slate-900 font-semibold" itemProp="name" aria-current="page">
                {item.label}
              </span>
            )}
            <meta itemProp="position" content={String(i + 1)} />
          </li>
        ))}
      </ol>
    </nav>
  );
}
