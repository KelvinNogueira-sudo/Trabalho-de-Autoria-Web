const API_URL = "http://localhost:3000";

// Busca todos os cafés no db.json
export async function getCafes() {
    let response;

    // Verifica se a API esta fora de ar
    try {
        response = await fetch(`${API_URL}/cafes`);
    } catch {
        throw new Error(`Não foi possível se conectar à API, verifique se o json-server está ligado!`);
    }

    // Tratamento caso não seja possível buscar os cafés
    if (!response.ok) {
        throw new Error(`Erro de API ao buscar cafés: ${response.status}`);
    }

    return await response.json();
}

// Busca os cafés pelo Id
export async function getCafeById(id) {
    const response = await fetch(`${API_URL}/cafes/${id}`);

    // Checa se o café existe com base no Id
    if (!response.ok) {
        throw new Error(
            `Falha ao buscar o café ${id}, (status: ${response.status})`,
        );
    }

    return await response.json();
}