const incrementsByScopeId = new Map<string, number>()

export function useUniqueId(scopeId = 'element') {
    return {
        createId: () => {
            const newIncrementValue = (incrementsByScopeId.get(scopeId) ?? 0) + 1
            incrementsByScopeId.set(scopeId, newIncrementValue)

            return `${scopeId}-${newIncrementValue}`
        }
    }
}
