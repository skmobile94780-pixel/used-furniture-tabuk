import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from './supabase';
import { makeWhatsappLink, makeTelLink } from './site';

type Settings = {
  phone: string;
  phoneIntl: string;
  whatsappNumber: string;
  whatsappMessage: string;
};

type SettingsContextType = Settings & {
  whatsappLink: string;
  telLink: string;
  loaded: boolean;
};

const defaults: Settings = {
  phone: '0531442546',
  phoneIntl: '+966531442546',
  whatsappNumber: '966531442546',
  whatsappMessage: 'السلام عليكم، أرغب ببيع أثاث مستعمل بتبوك، هل يمكنكم المعاينة؟',
};

const SettingsContext = createContext<SettingsContextType>({
  ...defaults,
  whatsappLink: makeWhatsappLink(defaults.whatsappNumber, defaults.whatsappMessage),
  telLink: makeTelLink(defaults.phoneIntl),
  loaded: false,
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaults);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    supabase
      .from('site_settings')
      .select('key, value')
      .then(({ data }) => {
        if (data && data.length > 0) {
          const map: Record<string, string> = {};
          for (const row of data) map[row.key] = row.value;
          setSettings({
            phone: map['phone_number'] || defaults.phone,
            phoneIntl: map['phone_intl'] || defaults.phoneIntl,
            whatsappNumber: map['whatsapp_number'] || defaults.whatsappNumber,
            whatsappMessage: map['whatsapp_message'] || defaults.whatsappMessage,
          });
        }
        setLoaded(true);
      });
  }, []);

  const value: SettingsContextType = {
    ...settings,
    whatsappLink: makeWhatsappLink(settings.whatsappNumber, settings.whatsappMessage),
    telLink: makeTelLink(settings.phoneIntl),
    loaded,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
