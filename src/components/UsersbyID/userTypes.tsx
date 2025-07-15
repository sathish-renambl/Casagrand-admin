// types/userTypes.ts
export type TabKey = 'overview' | 'contact' | 'companyAddress' | 'plan' | 'director' | 'documents';

export type UserData = {
  companyName?: string;
  companyLogo?: string;
  status?: string;
  companySize?: string;
  volumeCount?: string;
  companyType?: string; 
  productInfo?: string;
  companyEmail?: string;
  companyPhone?: string;
  companyWebsite?: string;
  street?: string;
  area?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  directorName?: string;
  directorEmail?: string;
  directorPhone?: string;
  password?: string;
  companyProof?: string;
  taxRegistration?: string;
  certOfIncorporation?: string;
  directorProof?: string;
  orgId?: string;
  created_at?: string;
  updated_at?: string;
  companyAddress?: {
    street?: string;
    area?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };
  plan?: {
    name?: string;
    users?: number;
    planPrice?: string;
    expires?: string;
    planFeatures?: string[];
  };
};

export type TabType = {
  id: string;
  label: string;
  icon: React.ElementType;
};