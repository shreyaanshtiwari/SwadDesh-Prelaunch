/**
 * Regional Greeting Utility for SwadDesh
 * Maps Indian states and Union Territories to their authentic cultural greetings.
 * e.g. Rajasthan -> 'Khamma Ghani', Punjab -> 'Sat Shri Akaal', Tamil Nadu -> 'Vanakkam'
 */

export const REGIONAL_GREETINGS: Record<string, string> = {
    'rajasthan': 'Khamma Ghani',
    'punjab': 'Sat Shri Akaal',
    'chandigarh': 'Sat Shri Akaal',
    'haryana': 'Ram Ram',
    'gujarat': 'Kem Cho',
    'dadra and nagar haveli and daman and diu': 'Kem Cho',
    'maharashtra': 'Namaskar',
    'goa': 'Namaskar',
    'west bengal': 'Nomoshkar',
    'bengal': 'Nomoshkar',
    'assam': 'Nomoskar',
    'odisha': 'Namaskar',
    'orissa': 'Namaskar',
    'tamil nadu': 'Vanakkam',
    'tamilnadu': 'Vanakkam',
    'puducherry': 'Vanakkam',
    'pondicherry': 'Vanakkam',
    'kerala': 'Namaskaram',
    'andhra pradesh': 'Namaskaram',
    'andhra': 'Namaskaram',
    'telangana': 'Namaskaram',
    'karnataka': 'Namaskara',
    'bihar': 'Pranam',
    'uttar pradesh': 'Pranam',
    'up': 'Pranam',
    'madhya pradesh': 'Pranam',
    'mp': 'Pranam',
    'uttarakhand': 'Pranam',
    'himachal pradesh': 'Pranam',
    'himachal': 'Pranam',
    'chhattisgarh': 'Jai Johar',
    'jharkhand': 'Johar',
    'jammu and kashmir': 'Adaab',
    'jammu & kashmir': 'Adaab',
    'kashmir': 'Adaab',
    'ladakh': 'Julley',
    'sikkim': 'Tashi Delek',
    'arunachal pradesh': 'Tashi Delek',
    'arunachal': 'Tashi Delek',
    'manipur': 'Khurumjari',
    'meghalaya': 'Khublei',
    'mizoram': 'Chibai',
    'nagaland': 'Namaste',
    'tripura': 'Khulumkha',
    'delhi': 'Namaste',
    'new delhi': 'Namaste',
    'andaman and nicobar islands': 'Namaste',
    'andaman': 'Namaste',
    'lakshadweep': 'Namaskaram',
};

/**
 * Returns the authentic regional greeting for a given state.
 * Falls back to 'Pranam' if state is unknown or unspecified.
 */
export function getRegionalGreeting(state?: string | null): string {
    if (!state) return 'Pranam';

    const clean = state.trim().toLowerCase();

    if (REGIONAL_GREETINGS[clean]) {
        return REGIONAL_GREETINGS[clean];
    }

    for (const [key, greeting] of Object.entries(REGIONAL_GREETINGS)) {
        if (clean.includes(key) || key.includes(clean)) {
            return greeting;
        }
    }

    return 'Pranam';
}
