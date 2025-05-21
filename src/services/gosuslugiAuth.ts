
// Types for Госуслуги OAuth process
export interface GosuslugiToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export interface GosuslugiUserData {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  birthDate?: string;
  gender?: string;
  email?: string;
  phone?: string;
  citizenship?: string;
  snils?: string;
  inn?: string;
  verificationLevel: number; // 1-3 based on Госуслуги verification level
  address?: {
    region: string;
    city: string;
    street?: string;
    house?: string;
    flat?: string;
    postal?: string;
  };
  isOfficial?: boolean; // Available only for government officials
  officialPosition?: string;
  officialDepartment?: string;
}

// In a real application, these would be environment variables
const GOSUSLUGI_CLIENT_ID = 'mock-client-id';
const GOSUSLUGI_REDIRECT_URI = window.location.origin + '/gosuslugi/callback';

// Functions for Госуслуги OAuth flow
export const gosuslugiAuth = {
  // Start the OAuth flow by redirecting to Госуслуги login page
  initiateLogin: (forRepresentative: boolean = false) => {
    // Scope determines what user information we request
    // In a real app, this would be properly configured
    const scope = forRepresentative 
      ? 'fullname email phone address snils inn official_status'
      : 'fullname email phone address';
    
    // In a real implementation, this would redirect to the actual Госуслуги OAuth endpoint
    const authUrl = `https://esia.gosuslugi.ru/aas/oauth2/authorize?response_type=code&client_id=${GOSUSLUGI_CLIENT_ID}&redirect_uri=${encodeURIComponent(GOSUSLUGI_REDIRECT_URI)}&scope=${encodeURIComponent(scope)}&state=${forRepresentative ? 'representative' : 'voter'}`;
    
    // In a real app we'd redirect to authUrl 
    console.log('Redirecting to Госуслуги:', authUrl);
    
    // For demo purposes, we'll store the state to simulate the flow
    localStorage.setItem('gosuslugi_auth_state', forRepresentative ? 'representative' : 'voter');
    
    // Simulate redirect for the demo
    window.location.href = '/gosuslugi/callback?code=mock-auth-code&state=' + (forRepresentative ? 'representative' : 'voter');
  },
  
  // Exchange the authorization code for an access token
  exchangeCodeForToken: async (code: string): Promise<GosuslugiToken> => {
    // In a real app, this would be an API call to the Госуслуги token endpoint
    console.log('Exchanging code for token:', code);
    
    // Mock token response
    return {
      access_token: 'mock-access-token',
      token_type: 'Bearer',
      expires_in: 3600,
      refresh_token: 'mock-refresh-token',
      scope: 'fullname email phone address'
    };
  },
  
  // Fetch user information using the access token
  getUserInfo: async (token: string, isRepresentative: boolean = false): Promise<GosuslugiUserData> => {
    // In a real app, this would be an API call to the Госуслуги userinfo endpoint
    console.log('Fetching user info with token:', token);
    
    // Mock user data based on whether this is a representative or voter
    if (isRepresentative) {
      return {
        id: 'r-12345',
        firstName: 'Александр',
        lastName: 'Петров',
        middleName: 'Иванович',
        email: 'petrov@gov.ru',
        phone: '+7 (999) 888-77-66',
        verificationLevel: 3, // Подтвержденная учетная запись
        snils: '123-456-789-00',
        inn: '1234567890',
        address: {
          region: 'Москва',
          city: 'Москва',
          street: 'Тверская',
          house: '1',
          flat: '123',
          postal: '123456'
        },
        isOfficial: true,
        officialPosition: 'Депутат городской думы',
        officialDepartment: 'Департамент городского развития'
      };
    } else {
      return {
        id: 'v-67890',
        firstName: 'Мария',
        lastName: 'Иванова',
        middleName: 'Сергеевна',
        email: 'ivanova@example.com',
        phone: '+7 (999) 111-22-33',
        verificationLevel: 2, // Стандартная учетная запись
        address: {
          region: 'Москва',
          city: 'Москва',
          street: 'Ленина',
          house: '10',
          flat: '42',
          postal: '123456'
        }
      };
    }
  },
  
  // Map Госуслуги data to app user format
  mapUserDataToAppFormat: (data: GosuslugiUserData, isRepresentative: boolean) => {
    // Construct full name from parts
    const fullName = [data.lastName, data.firstName, data.middleName]
      .filter(Boolean)
      .join(' ');
      
    // Extract district from address data
    let district = '';
    if (data.address) {
      district = `${data.address.city}, ${data.address.street || ''}`;
    }
    
    return {
      id: data.id,
      fullName,
      email: data.email || '',
      phone: data.phone || '',
      district,
      verified: data.verificationLevel >= 2,
      isRepresentative,
      verificationLevel: data.verificationLevel,
      officialPosition: data.officialPosition,
      officialDepartment: data.officialDepartment,
      address: data.address
    };
  }
};
