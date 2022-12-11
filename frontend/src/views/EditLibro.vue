<template>
    <v-container>
        <v-row no-gutters>
            <v-col sm="10" class="mx-auto">
                <v-card class="pa-5">
                    <v-card-title>Editando libro {{post.title}}</v-card-title>
                    <v-divider></v-divider>
                    <v-form ref="form" @submit.prevent="updateForm" class="pa-5" enctype="multipart/form-data">
                        <v-text-field label="Título" v-model="post.title" prepend-icon="mdi-note" :rules="rules"></v-text-field>
                        <v-text-field label="Autor" v-model="post.autor" prepend-icon="mdi-account" :rules="rules"></v-text-field>
                        <v-text-field label="Género" v-model="post.category" prepend-icon="mdi-view-list" :rules="rules"></v-text-field>
                        <v-textarea label="Reseña" v-model="post.content" prepend-icon="mdi-pencil" :rules="rules"></v-textarea>
                        <v-file-input @change="selectFile" show-size counter multiple label="Portada"></v-file-input>
                        <v-img :src="`/${post.image}`" width="120"></v-img>

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
            post: {
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
        this.post = response;
    },
    methods: {
        selectFile(file) {
            this.image = file[0];
        },
        async updateForm() {
            const formData = new FormData();
            formData.append('image', this.image);
            formData.append('title', this.post.title);
            formData.append('autor', this.post.autor);
            formData.append('category', this.post.category);
            formData.append('content', this.post.content);
            formData.append('old_image', this.post.image);
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