const vm = new Vue({
    el: "#app",
    data: {
        produtos: [],
        produto: []
    },
    filters: {
        priceNumber(value) {
            return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
        }

    },
    methods: {
        fetchProdutos() {
            fetch("./api/produtos.json")
                .then(r => r.json())
                .then((json) => this.produtos = json)


        },
        fetchProduct(id) {
            fetch(`./api/produtos/${id}/dados.json`)
                .then(r => r.json())
                .then((json) => this.produto = json)
        },
        openModal(id) {
            this.fetchProduct(id);
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        },
        closeModal({ target, currentTarget }) {
            if (target === currentTarget) this.produto = false;

        }
    },
    created() {
        this.fetchProdutos();
    }

})