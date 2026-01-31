import analysisItems from '$lib/data/affidavitAnalysisItems.json';

export const match = (param) => {
    return analysisItems.some(item => item.slug === param)
}