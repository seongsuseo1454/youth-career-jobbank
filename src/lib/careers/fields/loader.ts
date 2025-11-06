// src/lib/careers/fields/loader.ts
import type { FieldData } from '../career-types';

export async function loadField(fieldKey: string): Promise<FieldData | null> {
  try {
    let mod: any = null;

    switch (fieldKey) {
      case 'ai-data':
        mod = await import('./ai-data');
        break;
      case 'software-app':
        mod = await import('./software-app');
        break;
      case 'robot-mechatronics':
        mod = await import('./robot-mechatronics');
        break;
      case 'cyber-security':
        mod = await import('./cyber-security');
        break;
      case 'game-metaverse':
        mod = await import('./game-metaverse');
        break;
      case 'medical-bio':
        mod = await import('./medical-bio');
        break;
      case 'nursing-rehab':
        mod = await import('./nursing-rehab');
        break;
      case 'env-energy':
        mod = await import('./env-energy');
        break;
      case 'space-aero':
        mod = await import('./space-aero');
        break;
      case 'mobility':
        mod = await import('./mobility');
        break;
      default:
        return null;
    }

    return (mod?.default ?? null) as FieldData | null;
  } catch (e) {
    console.error('[loadField] failed:', fieldKey, e);
    return null;
  }
}