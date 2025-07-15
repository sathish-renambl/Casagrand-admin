// services/apiService.js
// Define the type for the data parameter
interface CreateApiKeyData {
  name: string;
  expiryDate: string;
}

export const apiService = {
  getAllApiKeys: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
      {
        id: '1',
        name: 'Production API',
        key: 'pk_live_51H7abcdefghijklmnopqrstuvwxyz123456789',
        services: ['Payment', 'Analytics'],
        createdAt: '2024-01-15',
        expiryDate: '2025-01-15',
        status: 'active'
      },
      {
        id: '2',
        name: 'Development API',
        key: 'pk_test_51H8abcdefghijklmnopqrstuvwxyz987654321',
        services: ['Payment'],
        createdAt: '2024-02-20',
        expiryDate: '2024-12-31',
        status: 'active'
      },
      {
        id: '3',
        name: 'Analytics API',
        key: 'pk_analytics_51H9abcdefghijklmnopqrstuvwxyz555666777',
        services: ['Analytics', 'Reporting'],
        createdAt: '2024-03-10',
        expiryDate: '2025-03-10',
        status: 'expired'
      }
    ];
  },
  
  deleteApiKey: async (id: string) => {
    // Simulate using the id, e.g., logging or filtering
    console.log(`Deleting API key with id: ${id}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: 'API key deleted successfully' };
  },
  
  createApiKey: async (data: CreateApiKeyData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newKey = {
      id: Date.now().toString(),
      name: data.name,
      key: `pk_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      services: ['Payment'], // Default service
      createdAt: new Date().toISOString().split('T')[0],
      expiryDate: data.expiryDate,
      status: 'active'
    };
    return newKey;
  }
};