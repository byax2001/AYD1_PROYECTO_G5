

function useLocalStorage(key, lista) {

    try {
       localStorage.setItem(key, JSON.stringify(lista))
    } catch (error) {
        console.error(error)
    }
}

export default useLocalStorage