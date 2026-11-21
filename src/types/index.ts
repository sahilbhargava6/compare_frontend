export interface SkinMetrics {
  hydration: number;
  sebum_t_zone: number;
  redness: number;
  texture: number;
  biological_skin_age: number;
}

export interface PrescribedRoutine {
  step_1_balance: string;
  step_2_soothe: string;
  step_3_replenish: string;
}

export interface CuratedProduct {
  title: string;
  brand: string;
  platform: 'amazon' | 'nykaa' | 'flipkart' | string;
  price: number;
  tier: string;
  canonical_url: string;
  match_reason: string;
}

export interface SkinDiagnosis {
  skin_health_score: number;
  diagnosed_skin_type: string;
  display_skin_type: string;
  metrics: SkinMetrics;
  primary_concerns: string[];
  recommended_actives: string[];
  prescribed_routine: PrescribedRoutine;
  curated_products: CuratedProduct[];
}

export interface ScrapedProduct {
  title: string;
  brand: string;
  price: number;
  platform: string;
  canonical_url: string;
  image_url?: string;
  rating?: number;
  attributes?: Record<string, unknown>;
  tier_used?: string;
}

export interface AiCuration {
  personalized_analysis: {
    pros: string[];
    cons: string[];
  };
  recommended_alternatives: Array<{
    product_id: string;
    justification: string;
  }>;
}

export interface WatchlistItem {
  id: string;
  user_id: string;
  product_id: string;
  target_price: string | number;
  is_active: boolean;
  product?: {
    id: string;
    name: string;
    brand: string;
    canonical_url: string;
    platform: string;
    latest_price?: {
      price: string | number;
      recorded_at: string;
    };
  };
}

export interface ProductComparisonMetric {
  attribute: string;
  winner: 'product_a' | 'product_b' | 'tie';
  explanation: string;
}

export interface ProductComparisonResult {
  product_a: ScrapedProduct;
  product_b: ScrapedProduct;
  overall_verdict: string;
  best_for_user_reason: string;
  active_ingredients_comparison: string[];
  price_difference_percentage: number;
  metrics: ProductComparisonMetric[];
}
