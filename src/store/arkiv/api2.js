function apiProducts() {
    return fetch("https://fakestoreapi.com/products/")
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
}

export default { apiProducts };