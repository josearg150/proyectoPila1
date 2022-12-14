<template>
    <v-container>
        <v-row no-gutters>
            <v-col sm="10" class="mx-auto">
                <v-card class="pa-5">
                    <v-card-title>Agregar libro</v-card-title>
                    <v-divider></v-divider>
                    <v-form ref="form" @submit.prevent="submitForm" class="pa-5" enctype="multipart/form-data">
                        <v-text-field label="Título" v-model="libroNuevo.title" prepend-icon="mdi-note" :rules="rules"></v-text-field>
                        <v-text-field label="Autor" v-model="libroNuevo.autor" prepend-icon="mdi-account" :rules="rules"></v-text-field>
                        <v-text-field label="Género" v-model="libroNuevo.category" prepend-icon="mdi-view-list" :rules="rules"></v-text-field>
                        <v-textarea label="Reseña" v-model="libroNuevo.content" prepend-icon="mdi-pencil" :rules="rules"></v-textarea>
                        <v-file-input @change="selectFile" :rules="rules" show-size counter multiple label="Portada"></v-file-input>
                        <v-btn type="submit" class="mt-3" color="primary">Guardar</v-btn>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import API from "../api/libro";

export default {
    data() {
        return {
            rules: [(value) => !!value || "Este campo no puede estar vacío"],
            libroNuevo: {
                title: "",
                autor: "",
                category: "",
                content: "",
                image: "",
            },
            image: "",
        };
    },
    methods: {
        selectFile(file) {
            this.image = file[0];
        },
        async submitForm() {
            const formData = new FormData();
            formData.append('image', this.image);
            formData.append('title', this.libroNuevo.title);
            formData.append('autor', this.libroNuevo.autor);
            formData.append('category', this.libroNuevo.category);
            formData.append('usr', localStorage.getItem('usr'));
            formData.append('content', this.libroNuevo.content);
            if (this.$refs.form.validate()) {
                const response = await API.addPost(formData);
                this.$swal({
                            text: `${response.message}`,
                        });
                        this.$router.push({ name: 'home' });
            }
        }
    },
};
</script>