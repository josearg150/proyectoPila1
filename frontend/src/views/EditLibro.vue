<template>
    <v-container>
        <v-row no-gutters>
            <v-col sm="10" class="mx-auto">
                <v-card class="pa-5">
                    <v-card-title>Editando libro {{libro.title}}</v-card-title>
                    <v-divider></v-divider>
                    <v-img :src="`/${libro.image}`" width="120"></v-img>
                    <v-form ref="form" @submit.prevent="updateForm" class="pa-5" enctype="multipart/form-data">
                        <v-text-field label="Título" v-model="libro.title" prepend-icon="mdi-note" :rules="rules"></v-text-field>
                        <v-text-field label="Autor" v-model="libro.autor" prepend-icon="mdi-account" :rules="rules"></v-text-field>
                        <v-text-field label="Género" v-model="libro.category" prepend-icon="mdi-view-list" :rules="rules"></v-text-field>
                        <v-textarea label="Reseña" v-model="libro.content" prepend-icon="mdi-pencil" :rules="rules"></v-textarea>
                        <v-file-input @change="selectFile" show-size counter multiple label="Portada"></v-file-input>

                        <v-btn type="submit" class="mt-3" color="success">Guardar cambios</v-btn>
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
            libro: {
                title: "",
                autor: "",
                category: "",
                content: "",
                image: "",
            },
            image: "",
        };
    },
    async created() {
        const response = await API. getLibroID(this.$route.params.id);
        this.libro = response;
    },
    methods: {
        selectFile(file) {
            this.image = file[0];
        },
        async updateForm() {
            const formData = new FormData();
            formData.append('image', this.image);
            formData.append('title', this.libro.title);
            formData.append('autor', this.libro.autor);
            formData.append('category', this.libro.category);
            formData.append('content', this.libro.content);
            formData.append('old_image', this.libro.image);
            if (this.$refs.form.validate()) {
                const response = await API. updateLibro(this.$route.params.id, formData);
                this.$swal({
                            text: `${response.message}`,
                        });
                        this.$router.push({ name: 'home' });
            }
        }
    },
};
</script>