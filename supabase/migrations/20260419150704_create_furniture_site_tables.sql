/*
  # Furniture site tables

  1. New Tables
    - `blog_posts`: Arabic blog articles (title, slug, excerpt, content, image, published_at)
    - `contact_messages`: Incoming contact form submissions (name, phone, message)
  2. Security
    - RLS enabled on both tables
    - Public read for blog_posts
    - Public insert for contact_messages (contact form)
  3. Seed
    - A few sample Arabic blog posts so the Blog page is populated
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  published_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read blog posts"
  ON blog_posts FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can submit contact messages"
  ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

INSERT INTO blog_posts (title, slug, excerpt, content, image_url, published_at)
VALUES
  (
    'أفضل طرق بيع الأثاث المستعمل بتبوك',
    'best-ways-to-sell-used-furniture-tabuk',
    'تعرف على أسهل الطرق للحصول على أفضل سعر عند بيع أثاث منزلك المستعمل في تبوك مع ضمان النقل المجاني.',
    'يبحث الكثير من سكان مدينة تبوك عن طرق موثوقة لبيع الأثاث المستعمل بأسعار عادلة وبدون عناء. في هذا المقال نشرح لكم أهم الخطوات للحصول على أعلى سعر، من تصوير القطع بشكل جيد إلى التواصل مع شركة متخصصة لشراء الأثاث المستعمل وتقديم تقييم فوري. نحن نوفر خدمة المعاينة المجانية والدفع الفوري نقداً.',
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
    now() - interval '2 days'
  ),
  (
    'كيف تختار شركة شراء أثاث مستعمل موثوقة بتبوك',
    'choose-trusted-used-furniture-company-tabuk',
    'دليلك لاختيار شركة شراء أثاث مستعمل بتبوك توفر لك الثقة والسرعة وأفضل الأسعار في السوق.',
    'اختيار شركة شراء الأثاث المستعمل المناسبة يوفر عليك الوقت والجهد ويضمن لك سعراً عادلاً. نستعرض هنا أهم المعايير: الخبرة، سرعة الاستجابة، توفير فريق نقل، تقييم حيادي للقطع، والالتزام بالمواعيد. شركتنا تعمل على مدار 24 ساعة في جميع أحياء تبوك.',
    'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200',
    now() - interval '7 days'
  ),
  (
    'أسعار شراء غرف النوم والمطابخ المستعملة بتبوك',
    'used-bedrooms-kitchens-prices-tabuk',
    'نظرة عامة على الأسعار الحالية لشراء غرف النوم والمطابخ المستعملة في تبوك والعوامل المؤثرة عليها.',
    'تعتمد أسعار غرف النوم والمطابخ المستعملة على عدة عوامل مثل الماركة وسنة الصنع والحالة العامة واكتمال القطع. نحن نضمن لك أفضل سعر في السوق مع إمكانية الفك والنقل مجاناً من منزلك.',
    'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200',
    now() - interval '14 days'
  );
