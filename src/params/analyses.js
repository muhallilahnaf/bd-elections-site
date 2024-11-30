import analysisItems from '$lib/data/analysisItems.json';

export const match = (param) => {
    return analysisItems.some(item => item.slug === param)
}